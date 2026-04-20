# 작업 일지

**모델**: Claude Sonnet 4.6  
**토큰 사용량**: 직접 조회 불가 (대화 전체 추정 약 150,000~200,000 토큰)

---

### 2026-03 초 ~ 중순 — 기획 단계 (별도 Claude 프로젝트 "포트폴리오 웹사이트 기획")

기획서 버전 이력:

| 버전 | 변경 내용 |
|------|---------|
| v1.0 | 최초 작성 — 목표/제약/백로그/일정/기술스택/QA 체크리스트 |
| v1.1 | 디자인 도구 변경 — Figma 단독 → Google Stitch + Figma 병행 |
| v1.2 | 프로젝트 라인업 섹션 추가 (5개: IoT관제·MyCONECT·누수감지·utarex웹·생산성툴) |
| v1.3 | 세부 내용 보완, 프로젝트 7개로 확장 (InOutCountBar·포트폴리오 웹사이트 추가) |
| v1.4 | 도메인 확정 반영 (`kjyang.kro.kr`), 포트폴리오 웹사이트 04번 삽입·기존 번호 재정렬 |

---

### 2026-03-27 — 기획서 v1.4 완성 (git 이전)

- 목표 설정, 제약 사항, 섹션 구성, MoSCoW 우선순위, 개발 계획, 리스크 정의 확정

---

### 2026-03 중순 — 프로젝트 목록·기획서 2차 업데이트 (별도 Claude 프로젝트)

**프로젝트 목록 v1.0 → v1.2**

- v1.1: MyCONECT 세부 내용 입력
  - 소속(홀리츠), 기술스택, 작업 내역 상세화
  - 성과 섹션 재작성 — 정량 수치 대신 기술적 임팩트 중심으로 변경 (서비스 종료·소스 비공개 사유)
  - 라인업 핵심 강점 수정: "실제 스토어 출시" → "BLE+REST 복합 제어, 초기~배포 전 사이클"
  - Bluetena: 단독 카드 아닌 MyCONECT 내 보조 언급으로 활용 결정
- v1.2: InOutCountBar 신규 추가 (6번 프로젝트로 분리)
  - GitHub 확인 후 사내 생산성 툴에 묶지 않고 별도 프로젝트로 분리 결정
  - JitPack 배포, 데모 GIF, GitHub 공개 확인

**기획서 v1.2 → v1.3**

- Blog/Articles 섹션 확정, Tistory URL 명시 (`dev-yangkj.tistory.com`)
- 백로그 C1 구체화: Hashnode → Tistory RSS 파싱
- 12. 기술 블로그 현황 섹션 신규 추가
  - 공개 글 10편 (비기술 글 3편 비공개 처리 완료)
  - 활용 우선순위: MQTT 시리즈 3편 ⭐⭐⭐, 토스 애니메이션 ⭐⭐ 등

**기타 결정 사항**

- Mogabi (음악 SNS, 첫 번째 회사) — 일부 기능만 담당, 포트폴리오 제외 결정

---

### 2026-03-31 ~ 2026-04-01 — 프로젝트 목록 v1.3, 기획서 v1.4 완성 (git 이전)

- 프로젝트 목록 v1.2 → v1.3: 세부 내용 보완, 기간·성과·링크 초안 입력
- 기획서 v1.3 → v1.4: 도메인 확정(`kjyang.kro.kr`), 포트폴리오 웹사이트 04번 삽입·기존 번호 재정렬 → 최종 7개 프로젝트 확정

---

### 2026-04-04 — 레포 초기 구성 및 기획 문서 커밋

**레포지토리 생성** (15:49)
- GitHub 레포 생성 및 Initial commit (LICENSE, README)

**기획서·프로젝트 목록 최초 커밋** (16:21)
- 위에서 작성한 기획서 v1.4, 프로젝트 목록 v1.3 → v1.4 git에 최초 반영
- 커밋: `docs: 프로젝트 목록 v1.4 업데이트 — 포트폴리오 웹사이트 4번 추가`

**프로젝트 목록 상세화** (18:58)
- 기간·소속·성과 수치 등 미입력 항목 보완
- 정기보고 로그 분석 파일 3종, SEO 이미지 등 참고 자료 추가
- 커밋: `docs: 프로젝트 목록 v1.3 상세정보 보완 및 참고자료 추가`

---

### 2026-04-18 — 콘텐츠 디렉토리 재편

- 기존 `docs/` 하위에 혼재하던 콘텐츠를 `content/` 로 분리
- 섹션별 번호 체계 확립: `01_about` / `02_projects` / `03_skills` / `04_experience` / `05_design`
- 커밋: `refactor: 콘텐츠 구조를 content/ 디렉토리로 재편성`

---

### 2026-04-19 — 프로젝트 템플릿·skills.md 작성

**프로젝트 06·07 템플릿 생성** (19:26)
- `06_productivity_tools/`, `07_inout_count_bar/` 폴더 구조 생성
- 기존 01~05 project.md 형식 분석 후 동일 포맷으로 project.md 작성
- 커밋: `feat: 06 사내 생산성 툴, 07 InOutCountBar 프로젝트 템플릿 추가`

**skills.md 신규 작성** (19:44)
- 전 프로젝트 기술스택 집계하여 `content/03_skills/skills.md` 신규 생성
- 섹션 구성: Android·모바일 / 임베디드 / 웹 프론트엔드 / 백엔드·배포·인프라 / 자동화·스크립트 / 협업·도구
- 커밋: `feat: 03_skills/skills.md 추가`

**Google Play Store 추가** (19:48)
- 커밋: `feat: skills.md 배포 항목에 Google Play Store 추가`

**자격증·교육 이수 섹션 추가** (20:03)
- 자격증: 정보처리기사 (2019.11.22)
- 교육 이수: 더조은컴퓨터아카데미 풀스택개발자과정 (2020.07~2021.01)
- license.jpg 커밋
- 커밋: `feat: skills.md에 자격증·교육 이수 섹션 추가`, `feat: 정보처리기사 자격증 이미지 추가`

**파일 정리** (20:04)
- bluetena 이미지 `01_gs25` → `02_myconnect` 이동
- 명함 분리: `holich_business_card.jpg`, `utarex_business_card.jpg`
- demo.gif 추가, `04_portfolio/project.md` 수정
- 커밋: `refactor: 파일 정리 — bluetena 이미지 이동, 명함 분리, demo.gif 추가`

---

### 2026-04-20 — skills.md 추가 보완·설계 섹션 신설

**skills.md 대규모 추가** (18:39)
- 풀스택 과정 기술: jQuery, Ajax, JSP, Spring Framework, MyBatis, Apache Tomcat
- 클라우드: Amazon EC2, GCP Storage, NCP, Kafka, Redis, Docker
- 데이터베이스 섹션 신설: MySQL, SQLite, Room
- 모바일 분석: Firebase Analytics, FCM, Google Ads, Google Analytics

**05_design 섹션 신설** (18:39)
- 구현 미진행 NCP 아키텍처 설계를 프로젝트가 아닌 독립 섹션으로 분리 결정
- `content/05_design/design.md` 작성 (고객사명 익명 처리)
- IoT 관제 서버 설계, 공공 IoT 서비스 설계 요약
- 설계서 PDF 보관
- 커밋: `feat: skills.md 기술 추가 및 05_design 섹션 신설`

---

### 2026-04-21 — project.md 보완·경력 신설·최종 점검

**InOutCountBar project.md 수정** (00:42)
- 기간 `2025.12 ~ 2025.12` → `2025.12` 단일 표기
- 미디어 경로 `screenshots/demo.gif` 확정
- 커밋: `fix: InOutCountBar 프로젝트 기간 단일 표기, 데모 GIF 경로 확정`

**사내 생산성 툴 project.md 상세화** (00:48)
- Daily Reporter 소스코드(`daily_reporter.py`) 분석
- 기술스택: Python / tkinter / winreg / threading 추가
- 주요 기능 섹션 신설 (정시 팝업, 레지스트리 자동시작, exe 배포 등)
- 기간: GitHub 레포 생성일(`2026-04-11`) 기준 `2026.04` 반영
- 커밋: `feat: 사내 생산성 툴 project.md 상세화`

**04_experience 경력 섹션 신설** (01:23)
- `content/04_experience/experience.md` 신규 작성
- 유타렉스 (2024.02~현재) / 홀리츠 (2021.01~2023.04)
- 직함 대신 역할 기준으로 기재 (말단 직책)
- 커밋: `feat: 04_experience 경력 섹션 신설`

**미디어 추가 및 콘텐츠 정리** (01:32)
- Daily Reporter 스크린샷 2장 추가
- NCP 아키텍처 설계서 PDF 추가
- `03_leak_detector`: 정량 수치 없음 → 미기재 항목 삭제
- `checklist.md` 현행화
- 커밋: `feat: 미디어 추가 및 콘텐츠 정리`

**착수 전 최종 준비** (01:36)
- `docs/plan/개발_일정_계획.md` 착수 전 체크리스트 전항목 완료 처리
- 숙련도 레벨 항목 삭제 (생략하기로 결정)
- 프로필 사진 `content/01_about/profile.jpg` 추가 (임시)
- 커밋: `feat: 착수 전 준비 완료 — 프로필 사진 추가, 체크리스트 현행화`
