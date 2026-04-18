// SPDX-License-Identifier: GPL-2.0
#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/gpio.h>
#include <linux/interrupt.h>
#include <linux/uaccess.h>
#include <linux/slab.h>
#include <linux/ktime.h>
#include <linux/timekeeping.h>
#include <linux/delay.h>
#include <linux/fs.h>        // file_operations, vfs_unlink
#include <linux/file.h>
#include <linux/init.h>
#include <linux/namei.h>
#include <linux/err.h>
#include <linux/miscdevice.h>
#include <linux/mutex.h>
#include <linux/string.h>
#include <linux/platform_device.h>
#include <linux/pwm.h>
#include <linux/stat.h>
#include <linux/mount.h>
#include <linux/dcache.h>
#include <linux/path.h>
#include <linux/version.h> // 커널 버전을 확인하기 위해 추가

// 모듈 라이선스 명시
MODULE_LICENSE("GPL");
// 모듈 저자 정보
MODULE_AUTHOR("yang & Gemini");
// 모듈 설명
MODULE_DESCRIPTION("IR Receiver & Transmitter using GPIO and PWM API with file interface");
// VFS 함수 사용을 위한 심볼 임포트 (커널 내부용)
// vfs_rename이 제거되었으므로 더 이상 필요하지 않을 수 있지만,
// 다른 VFS 함수(vfs_unlink 등)를 위해 유지합니다.
MODULE_IMPORT_NS(VFS_internal_I_am_really_a_filesystem_and_am_NOT_a_driver);

// IR 수신을 위한 GPIO 핀 번호
#define GPIO_IN                  39
// 캡처된 IR 데이터를 저장할 디렉토리 경로
#define SAVE_DIR                 "/data/misc/ir_data/"
// 캡처할 최대 엣지(신호 변화) 개수
#define MAX_EDGES                1024
// 파일 이름의 최대 길이 (명령어 포함하여 충분히 길게)
#define MAX_COMMAND_LEN          256 // "delete filename" + path

// PWM 설정 (나노초 단위)
#define PWM_FREQUENCY_HZ         38000 // IR 통신에 일반적으로 사용되는 38 kHz 주파수
#define PWM_PERIOD_NS            (1000000000 / PWM_FREQUENCY_HZ) // 38kHz 주파수에 대한 주기 (나노초)
#define PWM_DUTY_CYCLE_NS        (PWM_PERIOD_NS / 4) // 25% 듀티 사이클 (주기의 1/4)

// 전역 변수 선언
static int irq_num;             // IR GPIO에 할당된 IRQ 번호
static bool capturing = false;  // IR 신호 캡처 중인지 여부 플래그
static ktime_t last_time;       // 마지막 IRQ 발생 시간
static u32 *edge_intervals;     // 캡처된 엣지 간격(시간)을 저장할 배열
static int edge_count;          // 캡처된 엣지 개수
static DEFINE_MUTEX(capture_mutex); // 캡처 작업 중 edge_intervals 접근을 보호하는 뮤텍스
static DEFINE_MUTEX(send_mutex);    // 송신 작업 중 경쟁 조건을 방지하는 뮤텍스
static DEFINE_MUTEX(file_op_mutex); // 파일 시스템 작업(삭제) 중 동시 접근 방지를 위한 뮤텍스

static struct pwm_device *ir_pwm_dev; // IR 송신에 사용될 PWM 디바이스 포인터

// misc_device 구조체에 대한 전방 선언
extern struct miscdevice ir_misc_device;

// --- 헬퍼 함수 프로토타입 (선언) ---
static int ensure_directory_exists(const char *path); // 디렉토리가 없으면 생성하는 함수
static irqreturn_t ir_gpio_isr(int irq, void *data);   // IR GPIO 인터럽트 핸들러
static int ir_handle_capture(const char *filename);    // IR 신호 캡처를 처리하는 함수
static int ir_handle_send(const char *filename);       // IR 신호 송신을 처리하는 함수
static int ir_handle_delete(const char *filename);     // IR 신호 파일 삭제를 처리하는 함수
// static int ir_handle_rename(const char *old_filename, const char *new_filename); // rename 함수 제거

// --- 디바이스 파일 작업 구현 ---
// /dev/ir_ctrl 파일 열기 시 호출
static int ir_ctrl_open(struct inode *inode, struct file *file) {
    pr_info("[IR] /dev/%s opened.\n", ir_misc_device.name);
    return 0; // 성공
}

// /dev/ir_ctrl 파일 닫기 시 호출
static int ir_ctrl_release(struct inode *inode, struct file *file) {
    pr_info("[IR] /dev/%s closed.\n", ir_misc_device.name);
    return 0; // 성공
}

// /dev/ir_ctrl 파일에 쓰기 시 호출 (사용자로부터 "capture" 또는 "send" 명령을 받음)
static ssize_t ir_ctrl_write(struct file *file, const char __user *buf, size_t count, loff_t *f_pos) {
    char kbuf[MAX_COMMAND_LEN];
    size_t command_len;
    char *filename_ptr;
    int ret = -EINVAL; // 기본적으로 잘못된 인자 오류로 초기화

    // 유효하지 않은 쓰기 크기 확인
    if (count == 0 || count >= sizeof(kbuf)) {
        pr_err("[IR] Invalid write size: %zu\n", count);
        return -EINVAL;
    }

    // 사용자 공간에서 커널 공간으로 명령 복사
    if (copy_from_user(kbuf, buf, count)) {
        pr_err("[IR] Failed to copy data from user.\n");
        return -EFAULT;
    }
    kbuf[count] = '\0'; // 수신된 명령 널 종료

    // 명령 끝에 개행 문자가 있으면 제거
    command_len = strlen(kbuf);
    if (command_len > 0 && kbuf[command_len - 1] == '\n') {
        kbuf[command_len - 1] = '\0';
        command_len--;
    }

    pr_info("[IR] Received command: '%s'\n", kbuf);

    // "capture" 명령 처리
    if (strncmp(kbuf, "capture ", 8) == 0) {
        filename_ptr = kbuf + 8; // 파일 이름은 "capture " 다음부터 시작
        if (strlen(filename_ptr) > 0) {
            ret = ir_handle_capture(filename_ptr);
        } else {
            pr_err("[IR] Capture command requires a filename.\n");
        }
    // "send" 명령 처리
    } else if (strncmp(kbuf, "send ", 5) == 0) {
        filename_ptr = kbuf + 5; // 파일 이름은 "send " 다음부터 시작
        if (strlen(filename_ptr) > 0) {
            ret = ir_handle_send(filename_ptr);
        } else {
            pr_err("[IR] Send command requires a filename.\n");
        }
    // "delete" 명령 처리
    } else if (strncmp(kbuf, "delete ", 7) == 0) {
        filename_ptr = kbuf + 7; // 파일 이름은 "delete " 다음부터 시작
        if (strlen(filename_ptr) > 0) {
            ret = ir_handle_delete(filename_ptr);
        } else {
            pr_err("[IR] Delete command requires a filename.\n");
        }
    // "rename" 명령 처리 (제거됨)
    // } else if (strncmp(kbuf, "rename ", 7) == 0) {
    //     pr_err("[IR] Rename command is not supported.\n");
    //     ret = -ENOSYS; // Not implemented
    // 알 수 없는 명령
    } else {
        pr_err("[IR] Unknown command: '%s'\n", kbuf);
    }

    return (ret == 0) ? count : ret; // 성공 시 쓰여진 바이트 수 반환, 실패 시 오류 코드 반환
}

// --- 디바이스 파일 작업 정의 ---
static const struct file_operations ir_ctrl_fops = {
    .owner   = THIS_MODULE,
    .open    = ir_ctrl_open,
    .release = ir_ctrl_release,
    .write   = ir_ctrl_write,
};

// misc_device 구조체 선언 및 초기화 (fops 정의 후)
struct miscdevice ir_misc_device = {
    .minor = MISC_DYNAMIC_MINOR, // 동적으로 마이너 번호 할당
    .name = "ir_ctrl",           // /dev/ir_ctrl로 디바이스 파일 생성
    .fops = &ir_ctrl_fops,       // 파일 작업 구조체 연결
    .mode = 0666,                // 디바이스 파일 권한 설정 (읽기/쓰기 가능, 필요시 0777)
};


// --- 헬퍼 함수 정의 ---

// 지정된 디렉토리가 존재하는지 확인하고, 없으면 생성하는 함수
static int ensure_directory_exists(const char *path) {
    struct path parent_path_struct;
    struct dentry *parent_dentry = NULL;
    struct dentry *new_dentry = NULL;
    struct inode *parent_inode = NULL;
    char *path_copy = NULL;
    char *dir_name = NULL;
    char *last_slash = NULL;
    int err;

    // 1. 디렉토리가 이미 존재하는지 확인
    err = kern_path(path, LOOKUP_DIRECTORY, &parent_path_struct);
    if (!err) { // 디렉토리가 이미 존재하는 경우
        path_put(&parent_path_struct); // path 참조 해제
        pr_info("[IR] Directory '%s' already exists.\n", path);
        return 0;
    }

    // 2. 디렉토리가 존재하지 않는 경우 (err == -ENOENT)
    if (err == -ENOENT) {
        pr_info("[IR] Directory '%s' does not exist. Attempting to create it.\n", path);

        path_copy = kstrdup(path, GFP_KERNEL); // 경로 복사 (수정 가능하도록)
        if (!path_copy) {
            pr_err("[IR] Failed to allocate memory for path copy.\n");
            return -ENOMEM;
        }

        // 경로에서 마지막 슬래시를 찾아 디렉토리 이름과 부모 경로 분리
        last_slash = strrchr(path_copy, '/');

        if (!last_slash || last_slash == path_copy) { // 유효하지 않거나 루트 경로인 경우
            pr_err("[IR] Invalid or root path for mkdir: '%s'\n", path);
            err = -EINVAL;
            goto free_path_copy;
        }

        *last_slash = '\0'; // 마지막 슬래시를 널 문자로 대체하여 부모 경로만 남김
        dir_name = last_slash + 1; // 널 문자 다음이 새로 생성할 디렉토리 이름

        if (strlen(dir_name) == 0) { // 디렉토리 이름이 비어있는 경우
            pr_err("[IR] Directory name is empty for path: '%s'\n", path);
            err = -EINVAL;
            goto free_path_copy;
        }

        // 부모 디렉토리의 path 정보 얻기
        err = kern_path(path_copy, LOOKUP_DIRECTORY, &parent_path_struct);
        if (err) {
            pr_err("[IR] Parent directory '%s' for '%s' does not exist or inaccessible: %d\n", path_copy, path, err);
            goto free_path_copy;
        }

        parent_dentry = parent_path_struct.dentry;
        parent_inode = d_inode(parent_dentry); // 부모 디렉토리의 inode 얻기

        // 새로운 dentry를 찾아 생성 (lookup_one_len은 실제 파일/디렉토리 생성 전 dentry를 준비)
        new_dentry = lookup_one_len(dir_name, parent_dentry, strlen(dir_name));
        if (IS_ERR(new_dentry)) {
            pr_err("[IR] Failed to get dentry for '%s' in '%s': %ld\n", dir_name, path_copy, PTR_ERR(new_dentry));
            err = PTR_ERR(new_dentry);
            goto put_parent_path;
        }

        // vfs_mkdir을 사용하여 디렉토리 생성 (권한은 0777)
        err = vfs_mkdir(parent_inode, new_dentry, S_IRWXU | S_IRWXG | S_IRWXO); // 0777 사용
        // S_IRWXU | S_IRWXG | S_IRWXO 는 0777과 동일합니다.

        if (err == 0) {
            pr_info("[IR] Successfully created directory '%s'.\n", path);
        } else if (err == -EEXIST) { // 이미 존재하는 경우 (경쟁 조건)
            pr_info("[IR] Directory '%s' already existed (race condition).\n", path);
            err = 0; // 오류가 아니므로 0으로 설정
        } else {
            pr_err("[IR] Failed to create directory '%s' using vfs_mkdir: %d\n", path, err);
        }

        dput(new_dentry);  // new_dentry 참조 카운트 감소 (룩업으로 증가된 카운트)

put_parent_path:
        path_put(&parent_path_struct); // parent_path_struct의 dentry 참조 카운트 감소
    } else {
        // 다른 종류의 오류인 경우
        pr_err("[IR] Error checking directory '%s': %d\n", path, err);
    }

free_path_copy:
    kfree(path_copy); // 복사된 경로 메모리 해제
    return err;
}


// --- IR 수신을 위한 인터럽트 핸들러 ---
static irqreturn_t ir_gpio_isr(int irq, void *data) {
    ktime_t now = ktime_get(); // 현재 시간
    u32 duration_us = ktime_to_us(ktime_sub(now, last_time)); // 이전 엣지로부터의 시간 간격 (마이크로초)

    if (capturing) { // 캡처 모드인 경우
        if (edge_count < MAX_EDGES) { // 버퍼가 가득 차지 않았다면
            edge_intervals[edge_count++] = duration_us; // 간격을 저장하고 엣지 카운트 증가
        } else {
            pr_warn("[IR] Max edges reached, stopping capture.\n");
            capturing = false; // 버퍼가 가득 차면 캡처 중지
        }
    }
    last_time = now; // last_time 갱신
    return IRQ_HANDLED; // 인터럽트 처리 완료
}

// 캡처 명령을 처리하는 헬퍼 함수
static int ir_handle_capture(const char *filename) {
    char full_data_path[MAX_COMMAND_LEN]; // 충분히 큰 버퍼
    struct file *data_file = NULL;
    mm_segment_t old_fs; // 사용자/커널 공간 접근 권한 저장용
    int i;
    int ret = 0;

    mutex_lock(&capture_mutex); // 캡처 작업 중 동시 접근 방지를 위한 뮤텍스 잠금

    if (capturing) { // 이미 캡처 중인 경우
        pr_info("[IR] Capture already in progress.\n");
        ret = -EEXIST;
        goto out;
    }

    // 엣지 간격을 저장할 메모리 할당
    edge_intervals = kcalloc(MAX_EDGES, sizeof(u32), GFP_KERNEL);
    if (!edge_intervals) {
        pr_err("[IR] Failed to allocate memory for edge_intervals.\n");
        ret = -ENOMEM;
        goto out;
    }

    edge_count = 0;             // 엣지 카운트 초기화
    last_time = ktime_get();    // 캡처 시작 시간 기록
    capturing = true;           // 캡처 시작 플래그 설정

    pr_info("[IR] Starting IR capture for file: %s\n", filename);

    // 일정 시간 동안 캡처 허용 (예: 3초)
    msleep(3000); // 필요에 따라 조정 가능

    capturing = false; // 캡처 중지

    // 캡처된 데이터를 파일에 저장할 경로 생성
    snprintf(full_data_path, sizeof(full_data_path), SAVE_DIR "%s.txt", filename);

    // 데이터 파일을 쓰기 모드로 열거나 생성 (권한 0777로 변경)
    data_file = filp_open(full_data_path, O_WRONLY | O_CREAT | O_TRUNC, 0777); // 권한 0777로 변경
    if (IS_ERR(data_file)) {
        pr_err("[IR] Failed to open %s for write: %ld\n", full_data_path, PTR_ERR(data_file));
        ret = -EIO;
        goto out_free_mem;
    }

    old_fs = get_fs();      // 현재 FS(File System) 권한 저장
    set_fs(KERNEL_DS);      // 커널 공간 접근 권한으로 설정 (파일 쓰기 위해)

    // 캡처된 엣지 간격들을 파일에 한 줄씩 기록
    for (i = 0; i < edge_count; i++) {
        char line_buf[32];
        int len = snprintf(line_buf, sizeof(line_buf), "%u\n", edge_intervals[i]);
        kernel_write(data_file, line_buf, len, &data_file->f_pos);
    }

    set_fs(old_fs);         // 원래 FS 권한으로 복원
    filp_close(data_file, NULL); // 파일 닫기
    pr_info("[IR] Capture complete. Saved %d edges to %s\n", edge_count, full_data_path);

out_free_mem:
    kfree(edge_intervals); // 할당된 메모리 해제
    edge_intervals = NULL;
out:
    mutex_unlock(&capture_mutex); // 뮤텍스 잠금 해제
    return ret;
}

// 송신 명령을 처리하는 헬퍼 함수
static int ir_handle_send(const char *filename) {
    // C99 확장 오류 방지를 위해 블록 맨 앞으로 변수 선언 이동
    char full_data_path[MAX_COMMAND_LEN];
    struct file *data_file;
    mm_segment_t old_fs;
    char *read_buf = NULL;
    char *line_ptr;
    char *end_of_line;
    ssize_t bytes_read;
    loff_t file_pos = 0;
    int ret = 0;

    size_t current_buf_len = 0;
    // Active-High LED이므로, state가 true일 때 PWM이 활성화되어 HIGH 신호가 출력되어 LED가 켜집니다.
    bool state = true; // true: IR LED ON (PWM 활성화), false: IR LED OFF (PWM 비활성화)
    unsigned int duration_us; // 마이크로초 단위 지속 시간
    char *p; // 문자열 처리용 포인터
    struct pwm_state tx_config_state;

    #define MAX_LINE_BUF_SIZE 32 // 한 줄을 읽을 최대 버퍼 크기

    mutex_lock(&send_mutex); // 송신 작업 중 동시 접근 방지를 위한 뮤텍스 잠금

    // PWM 디바이스가 초기화되었는지 확인
    if (!ir_pwm_dev) {
        pr_err("[IR] PWM device not initialized. Cannot send IR signal.\n");
        ret = -EIO;
        goto out_unlock_send;
    }

    // 데이터 파일을 읽을 전체 경로 생성
    snprintf(full_data_path, sizeof(full_data_path), SAVE_DIR "%s.txt", filename);
    pr_info("[IR] Transmitting from file: %s\n", full_data_path);

    // 데이터 파일을 읽기 모드로 열기
    data_file = filp_open(full_data_path, O_RDONLY, 0);
    if (IS_ERR(data_file)) {
        pr_err("[IR] Failed to open %s for read: %ld\n", full_data_path, PTR_ERR(data_file));
        ret = -ENOENT;
        goto out_unlock_send;
    }

    // 파일 읽기를 위한 버퍼 할당
    read_buf = kzalloc(MAX_LINE_BUF_SIZE, GFP_KERNEL);
    if (!read_buf) {
        ret = -ENOMEM;
        goto out_close_file;
    }

    old_fs = get_fs();      // 현재 FS(File System) 권한 저장
    set_fs(KERNEL_DS);      // 커널 공간 접근 권한으로 설정 (파일 읽기 위해)

    // --- 첫 번째 캡처 간격 (초기 대기 시간) 건너뛰는 로직 ---
    // 캡처된 파일의 첫 번째 값은 일반적으로 초기 대기 시간이므로, 송신 시 이를 건너뛰어 실제 신호부터 시작
    {
        char first_line_buf[MAX_LINE_BUF_SIZE];
        loff_t temp_pos = 0;
        ssize_t first_bytes_read;
        char *temp_end_of_line;

        first_bytes_read = kernel_read(data_file, first_line_buf, MAX_LINE_BUF_SIZE - 1, &temp_pos);
        if (first_bytes_read <= 0) { // 파일이 비었거나 읽기 오류
            pr_err("[IR] Error or empty file while skipping initial delay: %zd\n", first_bytes_read);
            ret = -EINVAL;
            goto out_cleanup_file_read;
        }
        first_line_buf[first_bytes_read] = '\0'; // 널 종료
        temp_end_of_line = strchr(first_line_buf, '\n');
        if (!temp_end_of_line) { // 첫 줄에 개행 문자가 없으면 (파일이 너무 짧거나 이상한 경우)
            pr_warn("[IR] No newline found in first line (initial delay). File might be malformed or too short.\n");
        } else {
            // 개행 문자 이후로 file_pos를 정확히 업데이트하여 다음 읽기가 올바른 위치에서 시작하도록 함
            file_pos = temp_pos - (first_bytes_read - (temp_end_of_line - first_line_buf + 1));
        }
        pr_info("[IR] Skipped initial captured delay (first line in file).\n");
    }
    // --- 첫 번째 캡처 간격 건너뛰는 로직 끝 ---


    pwm_get_state(ir_pwm_dev, &tx_config_state); // 현재 PWM 상태 가져오기
    tx_config_state.period = PWM_PERIOD_NS;
    tx_config_state.duty_cycle = PWM_DUTY_CYCLE_NS;
    tx_config_state.polarity = PWM_POLARITY_NORMAL; // Active-High LED
    tx_config_state.enabled = false; // 시작 시에는 비활성화 상태로 둡니다.

    // PWM 컨트롤러에 초기 설정 적용 (enabled=false)
    ret = pwm_apply_state(ir_pwm_dev, &tx_config_state);
    if (ret < 0) {
        pr_err("[IR] Failed to apply initial PWM config: %d\n", ret);
        goto out_cleanup_file_read;
    }


    // 파일에서 데이터를 읽어 IR 신호 송신
    while (true) {
        // 버퍼가 충분히 비어있지 않으면 추가로 읽기
        if (current_buf_len < MAX_LINE_BUF_SIZE - 1) {
            bytes_read = kernel_read(data_file, read_buf + current_buf_len,
                                     MAX_LINE_BUF_SIZE - 1 - current_buf_len, &file_pos);
            if (bytes_read < 0) { // 읽기 오류
                pr_err("[IR] Error reading from file: %zd\n", bytes_read);
                ret = bytes_read;
                break;
            }
            if (bytes_read == 0 && current_buf_len == 0) { // 파일 끝에 도달했고 버퍼가 비어있음
                break;
            }
            current_buf_len += bytes_read;
            read_buf[current_buf_len] = '\0'; // 널 종료
        }

        line_ptr = read_buf; // 현재 버퍼의 시작 포인터

        // 버퍼에서 한 줄씩 파싱
        while (true) {
            end_of_line = strchr(line_ptr, '\n'); // 개행 문자 찾기
            if (!end_of_line) { // 현재 버퍼에 개행 문자가 없으면 (한 줄이 끝나지 않음)
                if (bytes_read == 0) { // 파일 끝에 도달했고, 처리할 마지막 줄이 있다면
                    if (strlen(line_ptr) > 0) { // 불완전한 마지막 줄 처리
                        // --- 공백/캐리지 리턴 제거 로직 (EOF 처리) ---
                        p = line_ptr + strlen(line_ptr) - 1;
                        while (p >= line_ptr && (*p == ' ' || *p == '\r' || *p == '\t')) {
                            *p = '\0';
                            p--;
                        }
                        // --- 공백/캐리지 리턴 제거 로직 끝 ---
                        // 지속 시간 값을 숫자로 변환
                        if (kstrtouint(line_ptr, 10, &duration_us) == 0) {
                            if (state) { // IR LED 켜기 (PWM 활성화)
                                int enable_ret = pwm_enable(ir_pwm_dev);
                                if (enable_ret < 0) {
                                    pr_err("[IR] Failed to enable PWM (last line): %d\n", enable_ret);
                                    ret = enable_ret;
                                    goto error_exit_loop;
                                }
                            } else { // IR LED 끄기 (PWM 비활성화)
                                // pwm_disable은 void를 반환하므로, 반환 값을 받지 않음.
                                pwm_disable(ir_pwm_dev);
                            }
                            udelay(duration_us); // 해당 시간만큼 지연
                            state = !state; // 상태 반전 (ON -> OFF, OFF -> ON)
                        } else {
                            pr_warn("[IR] Failed to convert final line to uint: '%s'\n", line_ptr);
                            ret = -EINVAL;
                        }
                    }
                }
                // 처리되지 않은 나머지 데이터를 버퍼 시작으로 이동하여 다음 읽기 준비
                memmove(read_buf, line_ptr, strlen(line_ptr) + 1);
                current_buf_len = strlen(line_ptr);
                goto next_read_chunk; // 다음 파일 청크 읽으러 이동
            }

            *end_of_line = '\0'; // 현재 줄의 끝에 널 문자 추가

            // --- 공백/캐리지 리턴 제거 로직 ---
            p = end_of_line - 1;
            while (p >= line_ptr && (*p == ' ' || *p == '\r' || *p == '\t')) {
                *p = '\0'; // 공백, 캐리지 리턴, 탭 문자를 널 문자로 대체
                p--;
            }
            // --- 공백/캐리지 리턴 제거 로직 끝 ---

            // 지속 시간 값을 숫자로 변환
            if (kstrtouint(line_ptr, 10, &duration_us) == 0) {
                if (state) { // IR LED 켜기 (PWM 활성화)
                    int enable_ret = pwm_enable(ir_pwm_dev);
                    if (enable_ret < 0) {
                        pr_err("[IR] Failed to enable PWM: %d\n", enable_ret);
                        ret = enable_ret;
                        goto error_exit_loop;
                    }
                } else { // IR LED 끄기 (PWM 비활성화)
                    // pwm_disable은 void를 반환하므로, 반환 값을 받지 않음.
                    pwm_disable(ir_pwm_dev);
                }
                udelay(duration_us); // 해당 시간만큼 지연
                state = !state; // 상태 반전
            } else {
                pr_warn("[IR] Failed to convert line to uint: '%s'\n", line_ptr);
                ret = -EINVAL;
                break; // 오류 발생 시 루프 종료
            }

            line_ptr = end_of_line + 1; // 다음 줄 시작으로 포인터 이동
        }

        if (ret != 0) break; // 오류 발생 시 외부 루프 종료

next_read_chunk:
        if (bytes_read == 0 && current_buf_len == 0) break; // 파일의 끝에 도달했고 버퍼가 완전히 비었으면 종료
    }

error_exit_loop:; // goto 레이블을 위한 빈 문장

    // 송신 완료 후 IR LED를 끕니다.
    // pwm_disable()은 void를 반환하므로, 반환 값을 받지 않음.
    pwm_disable(ir_pwm_dev);
    pr_info("[IR] PWM disabled after transmission (IR LED OFF).\n");

out_cleanup_file_read:
    set_fs(old_fs); // 원래 FS 권한으로 복원
out_close_file:
    if (!IS_ERR(data_file)) { // data_file이 유효한지 확인 후 닫기
        filp_close(data_file, NULL);
    }
    kfree(read_buf); // 버퍼 메모리 해제
    pr_info("[IR] Send complete\n");
out_unlock_send:
    mutex_unlock(&send_mutex); // 뮤텍스 잠금 해제
    return ret;
}

// IR 신호 파일 삭제를 처리하는 헬퍼 함수
static int ir_handle_delete(const char *filename) {
    char full_data_path[MAX_COMMAND_LEN];
    mm_segment_t old_fs;
    int ret;
    struct path path_struct;

    mutex_lock(&file_op_mutex); // 파일 시스템 작업 중 뮤텍스 잠금

    snprintf(full_data_path, sizeof(full_data_path), SAVE_DIR "%s.txt", filename);
    pr_info("[IR] Attempting to delete file: %s\n", full_data_path);

    old_fs = get_fs();
    set_fs(KERNEL_DS); // 커널 공간 접근 권한으로 설정

    // 파일을 찾아서 path 구조체 얻기
    ret = kern_path(full_data_path, LOOKUP_FOLLOW, &path_struct);
    if (ret) {
        pr_err("[IR] Failed to find file %s for deletion: %d\n", full_data_path, ret);
        goto out;
    }

    // vfs_unlink를 사용하여 파일 삭제
    // vfs_unlink는 dentry와 inode를 필요로 함
    ret = vfs_unlink(d_inode(path_struct.dentry->d_parent), path_struct.dentry, NULL);
    if (ret) {
        pr_err("[IR] Failed to delete file %s: %d\n", full_data_path, ret);
    } else {
        pr_info("[IR] Successfully deleted file: %s\n", full_data_path);
    }

    path_put(&path_struct); // path 참조 해제

out:
    set_fs(old_fs); // 원래 FS 권한으로 복원
    mutex_unlock(&file_op_mutex); // 뮤텍스 잠금 해제
    return ret;
}

// ir_handle_rename 함수는 제거됨
/*
static int ir_handle_rename(const char *old_name_user, const char *new_name_user)
{
    struct path old_path_struct;
    struct path new_path_struct;
    char *old_name_k = NULL;
    char *new_name_k = NULL;
    int ret = -EINVAL;
    struct dentry *old_dentry = NULL;
    struct dentry *new_dentry = NULL;
    struct inode *old_dir_inode = NULL;
    struct inode *new_dir_inode = NULL;
    struct inode *delegated_inode = NULL;

    old_name_k = kstrdup(old_name_user, GFP_KERNEL);
    new_name_k = kstrdup(new_name_user, GFP_KERNEL);
    if (!old_name_k || !new_name_k) {
        pr_err("[IR] Failed to allocate memory for path names.\n");
        ret = -ENOMEM;
        goto out;
    }

    pr_info("[IR] Attempting to rename file from %s to %s\n", old_name_k, new_name_k);

    ret = kern_path(old_name_k, LOOKUP_FOLLOW, &old_path_struct);
    if (ret) {
        pr_err("[IR] Failed to lookup old path '%s': %d\n", old_name_k, ret);
        goto out;
    }

    old_dentry = old_path_struct.dentry;
    old_dir_inode = d_inode(old_dentry->d_parent);

    pr_debug("[IR] DEBUG: old_path_struct.dentry: %p, old_path_struct.dentry->d_parent: %p\n",
             old_dentry, old_dentry->d_parent);

    new_dentry = kern_path_create(AT_FDCWD, new_name_k, &new_path_struct, LOOKUP_RENAME_TARGET);
    if (IS_ERR(new_dentry)) {
        ret = PTR_ERR(new_dentry);
        pr_err("[IR] Failed to prepare new path '%s': %d\n", new_name_k, ret);
        goto out_old_path_put;
    }

    new_dir_inode = d_inode(new_path_struct.dentry->d_parent);

    pr_debug("[IR] DEBUG: new_path_struct.dentry: %p\n", new_path_struct.dentry);
    pr_debug("[IR] DEBUG: new_parent_dentry name: %pd\n", new_path_struct.dentry->d_parent);

    pr_debug("[IR] DEBUG: Calling vfs_rename with parameters:\n");
    pr_debug("[IR] arg1 (old_dir_inode): %p\n", old_dir_inode);
    pr_debug("[IR] arg2 (old_dentry): %p\n", old_dentry);
    pr_debug("[IR] arg3 (new_dir_inode): %p\n", new_dir_inode);
    pr_debug("[IR] arg4 (new_dentry): %p\n", new_dentry);
    pr_debug("[IR] arg5 (delegated_inode): %p\n", &delegated_inode);
    pr_debug("[IR] arg6 (flags): %x\n", 0);

    ret = vfs_rename(old_dir_inode, old_dentry,
                     new_dir_inode, new_dentry,
                     NULL,
                     0);
    if (ret) {
        pr_err("[IR] vfs_rename failed with error: %d\n", ret);
    } else {
        pr_info("[IR] File renamed successfully.\n");
    }

    path_put(&new_path_struct);
out_old_path_put:
    path_put(&old_path_struct);
out:
    kfree(old_name_k);
    kfree(new_name_k);
    return ret;
}
*/

// --- 플랫폼 드라이버 probe 및 remove 함수 ---

// probe 함수: 플랫폼 디바이스가 이 드라이버와 매칭될 때 호출됨
static int ir_probe(struct platform_device *pdev) {
    int ret;
    int ir_gpio = GPIO_IN;
    struct pwm_state current_pwm_state;

    pr_info("[IR] ir_probe called.\n");

    // 0. 데이터 저장 디렉토리 존재 확인 및 생성
    ret = ensure_directory_exists(SAVE_DIR);
    if (ret != 0 && ret != -EEXIST) {
        pr_err("[IR] Failed to ensure data directory %s exists: %d\n", SAVE_DIR, ret);
        return ret;
    }

    // 1. IR 수신을 위한 GPIO 요청
    ret = gpio_request(ir_gpio, "ir_gpio_in");
    if (ret) {
        pr_err("[IR] Failed to request GPIO %d (input): %d\n", ir_gpio, ret);
        return ret;
    }

    // GPIO를 입력 방향으로 설정
    ret = gpio_direction_input(ir_gpio);
    if (ret) {
        pr_err("[IR] Failed to set GPIO %d to input: %d\n", ir_gpio, ret);
        gpio_free(ir_gpio);
        return ret;
    }

    // 2. GPIO에 해당하는 IRQ 번호 얻기
    irq_num = gpio_to_irq(ir_gpio);
    if (irq_num < 0) {
        pr_err("[IR] Failed to get IRQ number for GPIO %d: %d\n", ir_gpio, irq_num);
        gpio_free(ir_gpio);
        return irq_num;
    }

    // 3. IRQ 요청 (신호 상승 및 하강 엣지 모두 감지, 공유 가능한 IRQ)
    ret = request_irq(irq_num, ir_gpio_isr, IRQF_TRIGGER_RISING | IRQF_TRIGGER_FALLING | IRQF_SHARED, "ir_gpio_irq", (void *)&ir_gpio);
    if (ret) {
        pr_err("[IR] Failed to request IRQ %d for GPIO %d: %d\n", irq_num, ir_gpio, ret);
        gpio_free(ir_gpio);
        return ret;
    }

    // 4. misc 디바이스 등록 (/dev/ir_ctrl 파일 생성)
    ret = misc_register(&ir_misc_device);
    if (ret) {
        pr_err("[IR] Failed to register misc device /dev/%s: %d\n", ir_misc_device.name, ret);
        free_irq(irq_num, (void *)&ir_gpio);
        gpio_free(ir_gpio);
        return ret;
    }

    // 5. PWM 디바이스 가져오기 (devm_pwm_get은 리소스 관리됨)
    ir_pwm_dev = devm_pwm_get(&pdev->dev, "ir_pwm");
    if (IS_ERR(ir_pwm_dev)) {
        ret = PTR_ERR(ir_pwm_dev);
        pr_err("[IR] Failed to get PWM device: %d\n", ret);
        misc_deregister(&ir_misc_device);
        free_irq(irq_num, (void *)&ir_gpio);
        gpio_free(ir_gpio);
        return ret;
    }

    // 6. PWM 주기 및 듀티 사이클 설정
    ret = pwm_config(ir_pwm_dev, PWM_DUTY_CYCLE_NS, PWM_PERIOD_NS);
    if (ret < 0) {
        pr_err("[IR] Failed to configure PWM device: %d\n", ret);
        misc_deregister(&ir_misc_device);
        free_irq(irq_num, (void *)&ir_gpio);
        gpio_free(ir_gpio);
        return ret;
    }

    // 7. PWM 극성을 NORMAL로 명시적으로 설정
    pwm_get_state(ir_pwm_dev, &current_pwm_state);
    current_pwm_state.polarity = PWM_POLARITY_NORMAL;
    ret = pwm_apply_state(ir_pwm_dev, &current_pwm_state);
    if (ret < 0) {
        pr_err("[IR] Failed to apply PWM state with NORMAL polarity: %d\n", ret);
        misc_deregister(&ir_misc_device);
        free_irq(irq_num, (void *)&ir_gpio);
        gpio_free(ir_gpio);
        return ret;
    }
    pr_info("[IR] PWM polarity set to NORMAL using pwm_apply_state.\n");

    // PWM을 초기적으로 비활성화 (IR LED를 끈 상태)
    pwm_disable(ir_pwm_dev);
    pr_info("[IR] PWM device configured and disabled initially.\n");

    pr_info("[IR] Module loaded successfully. IR GPIO %d, IRQ %d. Device /dev/%s created. PWM API active.\n",
            ir_gpio, irq_num, ir_misc_device.name);
    return 0;
}

// remove 함수: 드라이버가 언로드되거나 디바이스가 제거될 때 호출됨
static int ir_remove(struct platform_device *pdev) {
    int ir_gpio = GPIO_IN;

    pr_info("[IR] ir_remove called.\n");

    if (ir_pwm_dev) {
        pwm_disable(ir_pwm_dev);
        pr_info("[IR] PWM disabled on module unload.\n");
    }

    misc_deregister(&ir_misc_device);
    pr_info("[IR] Misc device /dev/%s removed.\n", ir_misc_device.name);

    free_irq(irq_num, (void *)&ir_gpio);
    pr_info("[IR] IRQ %d freed.\n", irq_num);

    gpio_free(ir_gpio);
    pr_info("[IR] GPIO %d freed.\n", ir_gpio);

    ir_pwm_dev = NULL;

    pr_info("[IR] Module unloaded.\n");
    return 0;
}

// --- 디바이스 트리 매칭 정보 ---
static const struct of_device_id ir_dt_ids[] = {
    { .compatible = "utarex,ir-gpio-pwm-remote" },
    { /* sentinel */ }
};
MODULE_DEVICE_TABLE(of, ir_dt_ids);

// --- 플랫폼 드라이버 정의 ---
static struct platform_driver ir_driver = {
    .probe       = ir_probe,
    .remove      = ir_remove,
    .driver      = {
        .name    = "utarex_ir_gpio_pwm_driver",
        .of_match_table = ir_dt_ids,
    },
};

// --- 모듈 초기화 및 종료 함수 ---
static int __init ir_init(void) {
    pr_info("[IR] Module init: Attempting to register platform driver.\n");
    return platform_driver_register(&ir_driver);
}

static void __exit ir_exit(void) {
    pr_info("[IR] Module exit: Attempting to unregister platform driver.\n");
    platform_driver_unregister(&ir_driver);
}

module_init(ir_init);
module_exit(ir_exit);
