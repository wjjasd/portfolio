# 호텔 서비스 플랫폼 (MyCONECT)

## 한 줄 요약

기능 구현, Google Play 배포·유지보수 담당 — BLE·REST 기반 호텔 종합 솔루션

## 기본 정보

| 항목 | 내용 |
|------|------|
| 유형 | 호텔 종합 솔루션 (모바일 어플리케이션) |
| 기여도 | 98% |
| 기간 | 2021.01 ~ 2023.04 |
| 소속 | 홀리츠 |

## 프로젝트 개요

호텔 투숙객이 프런트를 거치지 않고 스마트폰으로 체크인/아웃, 룸서비스, 도어락 제어 등을 직접 처리할 수 있는 솔루션. BLE 기반 물리적 기기 제어와 REST API 기반 호텔 업무 처리 기능 제공.

## 나의 역할과 기여

- 프로젝트 초기 설계 이후 구현 단계부터 참여 (기여도 80%)
- 기능 개발, 디자인 리뉴얼, Google Play Store 배포, 성능 최적화, 유지보수 담당
- REST API 기반 호텔 업무 처리 로직 구현 (호텔 검색, 예약, 체크인/아웃, 룸서비스, 결제, 발렛파킹)
- BLE 기반 도어락·엘리베이터·객실 기기 원격 제어 구현 (서드파티 SDK 연동)
- MVVM + RxKotlin 아키텍처 적용
- BLE 역량 심화를 위해 사내 BLE 개발 도구 Bluetena (Bluetooth 탐색·연결·Property Read/Write 앱) 별도 제작

## 기술 스택

| 영역 | 기술 |
|------|------|
| 플랫폼 | Android / Kotlin, Java |
| 아키텍처 | MVVM |
| 비동기 | RxKotlin |
| 네트워크 | Retrofit2 (REST API) |
| 하드웨어 | Android BLE (서드파티 SDK) |
| UI | View Binding, Data Binding |
| 협업툴 | Bitbucket / SourceTree / Slack |

## 앱 구성

- **MyCONECT Guest (고객용)**: 호텔 검색, 예약, 체크인/아웃, 객실키, 룸서비스, 결제, 발렛파킹
- **MyCONECT Staff (직원용)**: 컨시어지, 하우스키핑 등 호텔 업무 처리 직원용 어플리케이션
- **MyCONECT Valet (직원용)**: 발렛파킹 업무 처리 어플리케이션
- **Blutena**: BLE 장치 테스트 보조 도구

## 성과

- Google Play Store 출시 (현재 서비스 종료)

## 미디어

- 스크린샷: `screenshots/` 폴더 참고 (추가 예정)
- 핵심 코드 캡처 예정 (BLE 제어 로직, MVVM 구조 / 민감 정보 마스킹 후 활용)

## 링크

- 스토어 링크: 서비스 종료 (링크 없음)
- 솔루션 소개 홈페이지: https://www.myconect.biz
