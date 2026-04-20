# InOutCountBar (Android 오픈소스 라이브러리)

## 한 줄 요약

사내 필요에서 출발해 JitPack 배포까지 — IN·OUT·COUNT 세 지표를 하나의 막대로 시각화하는 Android 커스텀 뷰 라이브러리

## 기본 정보

| 항목 | 내용 |
|------|------|
| 유형 | Android 오픈소스 커스텀 뷰 라이브러리 |
| 기여도 | 100% |
| 기간 | 2025.12 |
| 소속 | 유타렉스 (사내 필요에서 출발 → 오픈소스 배포) |

## 배경

IoT 관제 시스템 개발 중 입장·퇴장·현재 인원 세 가지 데이터를 하나의 UI 컴포넌트로 표현해야 하는 요구가 생겼다. 적합한 기성 라이브러리가 없어 직접 제작했고, 재사용 가능성을 고려해 오픈소스로 배포했다.

## 나의 역할과 기여

- 커스텀 뷰 설계·구현 단독 수행
- JitPack 배포 설정 및 README·데모 GIF 작성
- XML 속성(색상, 텍스트 크기 등) 커스터마이징 지원 구현

## 기술 스택

| 영역 | 기술 |
|------|------|
| 언어 | Kotlin |
| 플랫폼 | Android Custom View |
| 배포 | JitPack |

## 주요 기능

- 입장(IN)·퇴장(OUT)·현재 인원(COUNT) 비율을 단일 막대 그래프로 시각화
- 비율 변화에 따른 부드러운 애니메이션
- XML로 색상·텍스트 크기 등 커스텀 속성 설정 가능
- JitPack 단일 의존성 추가로 즉시 사용 가능

## 성과

- JitPack 배포 완료 (`com.github.wjjasd:InoutCountbar:1.0.1`) ✅
- GitHub 공개 레포지토리 운영 ✅
- 데모 GIF 제작 및 README 작성 완료 ✅

## 미디어

- 데모 GIF: `screenshots/demo.gif`

## 링크

- GitHub: https://github.com/wjjasd/InoutCountbar
- JitPack: https://jitpack.io/#wjjasd/InoutCountbar
