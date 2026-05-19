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

---

### 2026-04-23 — Next.js 초기 셋업

- Next.js 15 + TypeScript + Tailwind CSS 프로젝트 생성
- Geist 폰트 적용, `lang="ko"` 설정, 기본 globals.css 구성
- 커밋: `feat: Next.js 15 + TypeScript + Tailwind CSS 초기 셋업`

---

### 2026-05-12 ~ 2026-05-13 — Framer Motion 애니메이션 전면 적용 및 문의 폼 추가

**Framer Motion 설치 및 전 섹션 애니메이션 적용**
- `framer-motion` 패키지 설치
- `FadeIn` 공통 컴포넌트 신규 제작 (`src/components/FadeIn.tsx`) — `whileInView` 기반 scroll-triggered fadeIn 래퍼
- Hero: 페이지 로드 시 label → 이름 → 소개글 → 버튼 순 stagger 등장 애니메이션
- Nav: 스크롤 24px 이상 시 shadow + border 강화 효과 (scroll listener 기반)
- About: 프로필/소개 블록 FadeIn 적용, 프로필 사진 hover 효과(border 하이라이트·brightness) 및 lightbox 기능 추가
- Projects: 카드 scroll-triggered 순차 등장 + hover 시 6px lift + shadow 효과, `'use client'` 전환
- Skills: 섹션 카드 stagger 등장 + 각 태그 scale/fade 순차 등장 (`Variants` 타입 적용)
- Experience: 기존 IntersectionObserver 제거 → Framer Motion `whileInView` 전환
- Contact: 카드 FadeIn 순차 등장 + hover lift 효과
- 커밋: `feat: Framer Motion 애니메이션 적용 및 문의 폼 추가 (Web3Forms)`

**Contact 문의 폼 추가 (Web3Forms)**
- Contact 섹션 하단에 이름 / 이메일 / 메시지 폼 추가
- `Web3Forms` 연동 (`https://api.web3forms.com/submit`)
- API 키 `.env.local` 환경변수로 관리 (`NEXT_PUBLIC_WEB3FORMS_KEY`)
- 전송 성공/실패 피드백 메시지 표시 후 4초 자동 소멸
- Vercel 프로덕션 환경변수 등록 완료
- 커밋: `feat: Framer Motion 애니메이션 적용 및 문의 폼 추가 (Web3Forms)`

---

### 2026-05-05 — MVP 전 섹션 구현 및 배포 준비

**기본 구조 구현**
- Nav (고정, 반응형 햄버거 메뉴), Hero, About (프로필 이미지 포함), Skills, Experience 섹션 구현
- 커밋: `feat: Next.js 포트폴리오 기본 구조 구현`

**Projects·Skills·Contact 섹션 구현 및 Nav 개선**
- Projects: 7개 프로젝트 카드 2열 그리드, ProjectGallery 모달 (이미지/영상 분리 버튼)
- Skills: 자격증 이미지 인라인 표시 및 클릭 확대 (CertImage 컴포넌트)
- Contact: 이메일·GitHub·LinkedIn·블로그 링크 카드 4종
- Nav: 스크롤 감지 제거 → 항상 반투명 고정 배경 (`bg-zinc-950/80 backdrop-blur-md`)
- Favicon: 기본 favicon.ico 제거, YKJ SVG 아이콘(`icon.svg`) 교체
- `content/` 스크린샷 → `public/projects/` 이동 (Next.js Image 서빙 경로 정리)
- 커밋: `feat: Projects·Skills·Contact 섹션 구현 및 Nav 개선`

**설정 정리**
- `.claude/settings.local.json` git 추적 제거 (`git rm --cached`)
- 커밋: `chore: settings.local.json git 추적 제거`

**SEO 메타데이터 개선 및 콘텐츠 현행화**
- `layout.tsx`: description 현행화, `metadataBase`·`openGraph`·`twitter`·`robots` 추가
- `public/robots.txt` 생성, `src/app/sitemap.ts` 생성 (Next.js 내장 sitemap API)
- About 자기소개 문구 개편 ("불편함을 발견하면 직접 만드는 개발자" 스토리 중심)
- Skills 자격증 아이콘 📜 변경, Projects·Skills 기여도 항목 제거
- 커밋: `feat: SEO 메타데이터 개선 및 콘텐츠 현행화`

**보안 헤더 추가**
- `next.config.ts`에 `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection` 헤더 설정
- 커밋: `chore: 보안 헤더 추가`

---

### 2026-05-15 — Google Search Console 등록 및 SEO 강화

**Google Search Console 등록**
- 도메인 속성 `kjyang.kro.kr` 추가
- 내도메인.한국 DNS 설정에 TXT 레코드 추가로 소유권 인증 완료
  - 기존 Vercel 연결용 `_vercel` TXT 레코드와 함께 공존

**SEO 강화 (5단계)**
- `keywords` 추가 — 양기정, kjyang, 개발자, Product Engineer, Android, AOSP 등
- `title` 키워드 강화 — `"양기정 (kjyang) | Product Engineer · 개발자 포트폴리오"` + `template` 설정 (하위 페이지 자동 적용)
- OG 이미지 동적 생성 — `src/app/opengraph-image.tsx` 생성 (1200×630, Next.js ImageResponse)
  - twitter card도 `summary` → `summary_large_image` 업그레이드
- JSON-LD 구조화 데이터 — `src/components/JsonLd.tsx` 생성, `layout.tsx`에 삽입
  - schema.org `Person` 타입, GitHub(`wjjasd`) 링크 포함
- `canonical` URL 설정 — `alternates.canonical: "https://kjyang.kro.kr"`

**Google Analytics 4 연동**
- GA4 속성 생성 (업종: 인터넷 및 통신, 목표: 웹 트래픽 파악 + 사용자 참여 및 유지율)
- `@next/third-parties` 패키지 설치
- `NEXT_PUBLIC_GA_ID` 환경변수로 측정 ID 관리 (`.env.local` + Vercel 환경변수 등록)
- `layout.tsx`에 `<GoogleAnalytics>` 컴포넌트 삽입
- 커밋: `feat: Google Analytics 4 연동`

**About·Skills 섹션 콘텐츠 개선**
- About: 자기소개 문구 4문단으로 개편 (아이디어→제품, 경력 스토리, 철학, 현재 업무)
  - 현재 업무: RK3588 기반 Android·Linux 게이트웨이, Modbus·BLE·Sub-G 센서 연동, 클라우드 관제 플랫폼 연계
  - 스킬 태그: 개별 기술(Android, AOSP 등) → 스킬 섹션 대그룹 6개로 교체
  - 이름/직함 하단에 `정보처리기사` 표기 추가
- Skills: 그룹 구조 정리
  - `분석 / SEO` 그룹 신설 (GA4, Search Console, Open Graph, JSON-LD)
  - `데이터베이스` 그룹 제거 → `백엔드 / 인프라`에 통합
  - 웹 프론트엔드: `React`, `Web3Forms` 추가 / `RSS 파싱` 제거
  - 백엔드/인프라: `Apache Tomcat`, `GCP Storage` 추가 / `Cloudflare Pages` 제거
  - 자동화/협업: `tkinter`, `winreg` 추가
  - Android: `Room` 중복 제거
- README: 기술 스택 표에 `Google Analytics 4` 항목 추가
- 커밋: `feat: About·Skills 섹션 콘텐츠 개선`

---

### 2026-05-19 — Blog 섹션 추가 (Tistory RSS 연동)

**Blog 섹션 구현**
- `src/components/Blog.tsx` 신규 생성 — Next.js 서버 컴포넌트(RSC), Tistory RSS(`dev-yangkj.tistory.com/rss`) fetch + XML 파싱
  - ISR `revalidate: 3600` 적용 (1시간마다 갱신)
  - 외부 패키지 추가 없이 자체 파싱 헬퍼 구현 (`extractTag`, `decodeHtmlEntities`, `extractFirstImageSrc`)
  - fetch 실패 시 섹션 자체를 `null`로 반환하는 graceful fallback 처리
- `src/components/BlogCards.tsx` 신규 생성 — Client Component, Framer Motion 카드 애니메이션
  - 최신 글 3개 카드: 썸네일 + 제목 + 날짜
  - 썸네일 없는 글은 인디고 그라디언트 fallback 표시
  - "블로그 전체 보기 →" 외부 링크 버튼
- `src/app/page.tsx`: `<Blog />` 추가 (Experience ~ Contact 사이)
- `src/components/Nav.tsx`: navItems에 `Blog` 항목 추가
- 커밋: `feat: Blog 섹션 추가 — Tistory RSS 연동`

**버그 수정 2건**
- RSS `<description>`이 CDATA가 아닌 HTML 엔티티 인코딩(`&lt;img&gt;`)으로 제공 → `decodeHtmlEntities` 함수 추가로 해결
- 정규식 greedy 매칭 버그: `<img[^>]+src=` 에서 `[^>]+`이 greedy라 `onerror` 속성 내 fallback no-image URL을 잡는 문제 → `[^>]+?` (non-greedy)로 수정

---
