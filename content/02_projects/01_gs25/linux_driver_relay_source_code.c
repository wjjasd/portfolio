#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/init.h>
#include <linux/fs.h>
#include <linux/uaccess.h>
#include <linux/kthread.h>
#include <linux/tty.h>
#include <linux/poll.h>
#include <linux/delay.h>
#include <linux/file.h>
#include <linux/fcntl.h>
#include <linux/string.h>
#include <linux/slab.h>
#include <linux/termios.h>
#include <linux/jiffies.h>

MODULE_LICENSE("GPL");
MODULE_AUTHOR("KJ Yang");
MODULE_DESCRIPTION("Relay control module");
MODULE_IMPORT_NS(VFS_internal_I_am_really_a_filesystem_and_am_NOT_a_driver);

static struct task_struct *reader_thread;
static struct file *gpio_value_fp_104 = NULL, *gpio_value_fp_105 = NULL, *gpio_value_fp_107 = NULL, *gpio_value_fp_108 = NULL;
static struct file *gpio_ctrl_fp_104 = NULL, *gpio_ctrl_fp_105 = NULL, *gpio_ctrl_fp_107 = NULL, *gpio_ctrl_fp_108 = NULL;
static bool gpio_on_104 = false, gpio_on_105 = false, gpio_on_107 = false, gpio_on_108 = false;

static int write_to_file(const char *path, const char *data)
{
    struct file *fp;
    mm_segment_t old_fs;
    loff_t pos = 0;
    int ret;

    old_fs = get_fs();
    set_fs(KERNEL_DS);

    fp = filp_open(path, O_WRONLY|O_CREAT, 0666);
    if (IS_ERR(fp)) {
        pr_err("[RELAY_GPIO] Failed to open %s\n", path);
        set_fs(old_fs);
        return -1;
    }

    ret = kernel_write(fp, data, strlen(data), &pos);
    filp_close(fp, NULL);
    set_fs(old_fs);
    return ret;
}

static void set_gpio_value(struct file *gpio_fp, bool value, bool *gpio_on, const char *gpio_name)
{
    mm_segment_t old_fs;
    loff_t pos = 0;
    char buf = value ? '1' : '0';
    int ret;

    if (!gpio_fp || *gpio_on == value)
        return;

    old_fs = get_fs();
    set_fs(KERNEL_DS);
    ret = kernel_write(gpio_fp, &buf, 1, &pos);
    set_fs(old_fs);

    if (ret < 0) {
        pr_err("[RELAY_GPIO] Failed to write to GPIO%s: %d\n", gpio_name, ret);
    } else {
        *gpio_on = value;
        pr_info("[RELAY_GPIO] GPIO%s set to %d\n", gpio_name, value);
    }
}

static void check_control_file_and_update_gpio(struct file *ctrl_fp, struct file *gpio_fp, bool *gpio_on, const char *gpio_name)
{
    mm_segment_t old_fs;
    loff_t pos = 0;
    char buf;
    int ret;

    if (!ctrl_fp || !gpio_fp)
        return;

    old_fs = get_fs();
    set_fs(KERNEL_DS);

    vfs_llseek(ctrl_fp, 0, SEEK_SET);
    ret = kernel_read(ctrl_fp, &buf, 1, &pos);

    set_fs(old_fs);

    if (ret > 0) {
        if (buf == '1')
            set_gpio_value(gpio_fp, true, gpio_on, gpio_name);
        else if (buf == '0')
            set_gpio_value(gpio_fp, false, gpio_on, gpio_name);
    }
}

static int export_and_init_gpio(void)
{
    write_to_file("/sys/class/gpio/export", "104");
    write_to_file("/sys/class/gpio/export", "105");
    write_to_file("/sys/class/gpio/export", "107");
    write_to_file("/sys/class/gpio/export", "108");
    msleep(100);

    write_to_file("/sys/class/gpio/gpio104/direction", "out");
    write_to_file("/sys/class/gpio/gpio105/direction", "out");
    write_to_file("/sys/class/gpio/gpio107/direction", "out");
    write_to_file("/sys/class/gpio/gpio108/direction", "out");

    write_to_file("/sys/class/gpio/gpio104/value", "0");
    write_to_file("/sys/class/gpio/gpio105/value", "0");
    write_to_file("/sys/class/gpio/gpio107/value", "0");
    write_to_file("/sys/class/gpio/gpio108/value", "0");

    gpio_value_fp_104 = filp_open("/sys/class/gpio/gpio104/value", O_WRONLY, 0);
    gpio_value_fp_105 = filp_open("/sys/class/gpio/gpio105/value", O_WRONLY, 0);
    gpio_value_fp_107 = filp_open("/sys/class/gpio/gpio107/value", O_WRONLY, 0);
    gpio_value_fp_108 = filp_open("/sys/class/gpio/gpio108/value", O_WRONLY, 0);

    gpio_ctrl_fp_104 = filp_open("/dev/gpio104_control", O_RDWR|O_CREAT, 0666);
    gpio_ctrl_fp_105 = filp_open("/dev/gpio105_control", O_RDWR|O_CREAT, 0666);
    gpio_ctrl_fp_107 = filp_open("/dev/gpio107_control", O_RDWR|O_CREAT, 0666);
    gpio_ctrl_fp_108 = filp_open("/dev/gpio108_control", O_RDWR|O_CREAT, 0666);

    return 0;
}

static int reader_fn(void *data)
{
    while (!kthread_should_stop()) {
        check_control_file_and_update_gpio(gpio_ctrl_fp_104, gpio_value_fp_104, &gpio_on_104, "104");
        check_control_file_and_update_gpio(gpio_ctrl_fp_105, gpio_value_fp_105, &gpio_on_105, "105");
        check_control_file_and_update_gpio(gpio_ctrl_fp_107, gpio_value_fp_107, &gpio_on_107, "107");
        check_control_file_and_update_gpio(gpio_ctrl_fp_108, gpio_value_fp_108, &gpio_on_108, "108");
        msleep(500);
    }
    return 0;
}

static int __init relay_init(void)
{
    pr_info("[RELAY_GPIO] Module loaded\n");
    if (export_and_init_gpio() != 0)
        return -1;
    reader_thread = kthread_run(reader_fn, NULL, "gpio_reader_thread");
    return 0;
}

static void __exit relay_exit(void)
{
    pr_info("[RELAY_GPIO] Module unloading\n");
    if (reader_thread)
        kthread_stop(reader_thread);

    set_gpio_value(gpio_value_fp_104, false, &gpio_on_104, "104");
    set_gpio_value(gpio_value_fp_105, false, &gpio_on_105, "105");
    set_gpio_value(gpio_value_fp_107, false, &gpio_on_107, "107");
    set_gpio_value(gpio_value_fp_108, false, &gpio_on_108, "108");

    if (gpio_value_fp_104) filp_close(gpio_value_fp_104, NULL);
    if (gpio_value_fp_105) filp_close(gpio_value_fp_105, NULL);
    if (gpio_value_fp_107) filp_close(gpio_value_fp_107, NULL);
    if (gpio_value_fp_108) filp_close(gpio_value_fp_108, NULL);

    if (gpio_ctrl_fp_104) filp_close(gpio_ctrl_fp_104, NULL);
    if (gpio_ctrl_fp_105) filp_close(gpio_ctrl_fp_105, NULL);
    if (gpio_ctrl_fp_107) filp_close(gpio_ctrl_fp_107, NULL);
    if (gpio_ctrl_fp_108) filp_close(gpio_ctrl_fp_108, NULL);
}

module_init(relay_init);
module_exit(relay_exit);
