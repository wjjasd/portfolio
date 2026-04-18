# IoT 통합 관제 시스템

## 한 줄 요약

GS편의점 50개 매장 실증, 정부과제 납품 — AOSP 커스터마이징부터 Android 앱까지 단독 설계·구현한 IoT 통합 관제 솔루션

## 기본 정보

| 항목 | 내용 |
|------|------|
| 유형 | 정부과제 / 회사 핵심 제품 |
| 기여도 | 98% |
| 기간 | 2024.02 ~ 2026.06 |
| 소속 | 유타렉스 |

## 배경

참고 이미지: `screenshots/entire_system_architecture.png`

상업시설의 에너지 절감을 위한 자율 운전 시스템 개발에서 유타렉스는 매장내 시스템 에어컨과 환경센서, 조명, 간판, 전력량계 등 다양한 주변 기기의 통합 모니터링과 제어를 담당하였습니다. 외부 플랫폼과 현장 기기사이의 연결 다리 역활을 수행하는 하드웨어를 개발하고 그위에서 운용할 소프트웨어 개발이 필요했습니다.

## 나의 역할과 기여

- AOSP Android 13 (RK3588) 커스터마이징: 핀맵 수정, IR 드라이버·Relay 드라이버 개발 (외주 기본 포팅 인수인계 후 담당)
- Android 앱 핵심 로직 설계 및 구현 (기여도 98%)
- BLE / MQTT / REST / MODBUS 등 다양한 프로토콜을 활용한 주변기기 및 외부 서버 연동
- 실증지 운영 관리: GS25 편의점에 설치한 기기들에 대한 유지보수, 버그 리포트 대응, 모니터링 데이터 수집율 관리 등

## 기술 스택

| 영역 | 기술 |
|------|------|
| OS | AOSP Android 13 (RK3588) |
| 앱 | Android Native / Kotlin |
| 통신 | BLE / MQTT / REST / MODBUS / PWM / GPIO |
| 협업 | Gitea / SourceTree / Confluence |

## 정량적 성과

| 지표 | 수정 전 | 수정 후 | 개선폭 |
|------|--------|--------|--------|
| 데이터 누락률 | 4.0% | **0%** | -4.0%p (완전 해소) |
| 에러→성공 복구율 | 37.1% | **100%** | +62.9%p |
| 1일 평균 누락 건수 | 11.5건 | **0건** | 완전 해소 |

- 납품 규모: 150대 / 수도권 약 60여 개 GS편의점 실증 완료
- 근거 자료: `regular_report_before_fix.png`, `regular_report_after_fix.png`, `regular_report_debug_report_01.png`, `regular_report_debug_report_02.png`, `regular_report_debug_report_03.png`

## 미디어

- 스크린샷: `screenshots/` 폴더 참고
- 소스코드: `linux_driver_ir_source_code.c`, `linux_driver_relay_source_code.c`, 

## 링크

- GitHub: 비공개 (회사 프로젝트)
- 데모/라이브: 상세 페이지로 대체
- SmartThings API 연동 데모: https://youtube.com/shorts/9hzoaLreZBA?feature=share
- Relay 제어 테스트 영상: https://youtu.be/0JFZdDppL7Y
