# 포트폴리오 웹사이트

프로덕트 엔지니어 양기정의 포트폴리오 웹사이트. 터미널/CLI 컨셉으로, 섹션마다 `❯ 명령어` 한 줄과 그 출력으로 구성된다.

- **URL**: https://kjyang.kro.kr (한국어 `/`, 영어 `/en`)
- **상태**: 운영 중. 2026-10 터미널 컨셉 리디자인 배포
- **작업 기록·의사결정**: brain vault `10_projects/portfolio/` 참조

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | Next.js 16 (App Router) · React 19 |
| 언어 | TypeScript |
| 스타일링 | Tailwind CSS v4 (`@theme` 토큰) |
| 렌더링 | React Server Components · SSG/ISR (1시간) |
| 애니메이션 | CSS 애니메이션 (keyframes · steps) |
| 다국어 | next-intl v4 (`localePrefix: as-needed`) |
| 폰트 | Geist Mono (`next/font`) + 한글 시스템 폰트 |
| 문의 폼 | Web3Forms |
| 블로그 | Tistory RSS (ISR) |
| GitHub 기여 그래프 | GitHub GraphQL API (ISR) |
| 분석 | Google Analytics 4 (첫 상호작용 또는 load 3초 후 지연 로드) |
| 배포 | Vercel |

---

## 섹션 구성

| 섹션 | 명령어 | 컴포넌트 |
|------|--------|----------|
| Hero | `whoami` | `Hero.tsx` |
| About | `cat ~/.profile` | `About.tsx` |
| Projects | `ls projects/` | `Projects.tsx` |
| Skills | `ls skills/` | `Skills.tsx` |
| Experience | `git log --graph career` | `Experience.tsx` |
| GitHub | `./contrib.sh 52w` | `GitHubContributions.tsx` |
| Blog | `head -5 blog.rss` | `Blog.tsx` |
| Contact | `cat ~/.contacts` | `Contact.tsx` |

명령어 문자열은 `src/components/terminal/commands.ts`에서 영문 상수로 관리한다. 본문만 번역한다.

---

## 레포지토리 구조

```
portfolio/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx            # 메타데이터, 폰트, 재생 판단 부트 스크립트, GA
│   │   │   ├── page.tsx              # 메인 페이지 (섹션 조립)
│   │   │   └── opengraph-image.tsx   # OG 이미지 동적 생성
│   │   ├── sitemap.ts                # /sitemap.xml
│   │   ├── globals.css               # 디자인 토큰 (@theme)
│   │   └── terminal.css              # 타이핑·스피너·reveal 애니메이션
│   ├── components/
│   │   ├── terminal/                 # 터미널 공용 컴포넌트
│   │   │                             # (PromptLine, Spinner, ToolCallHeader,
│   │   │                             #  OutputBlock, Checklist, DiffBlock, Glyph,
│   │   │                             #  TerminalSection, TerminalRuntime, commands.ts)
│   │   ├── Hero.tsx · About.tsx · Projects.tsx · Skills.tsx
│   │   ├── Experience.tsx · GitHubContributions.tsx · Blog.tsx · Contact.tsx
│   │   ├── Nav.tsx · Footer.tsx · JsonLd.tsx
│   │   ├── ProjectDialog.tsx         # 프로젝트 상세 모달 (<dialog>)
│   │   ├── ProjectModalBody.tsx      # 모달 본문 (열 때 dynamic import)
│   │   ├── ProjectGallery.tsx        # 모달 내 이미지/영상 뷰어
│   │   ├── ImageDialog.tsx           # 프로필·자격증 이미지 확대
│   │   └── ContactForm.tsx           # 문의 폼 (Web3Forms)
│   ├── data/                         # 프로젝트·경력·스킬 데이터 (ko/en)
│   ├── i18n/                         # next-intl 라우팅·요청 설정
│   ├── messages/                     # ko.json · en.json
│   └── proxy.ts                      # 로케일 미들웨어 (Next 16 명칭)
├── public/
│   ├── projects/                     # 프로젝트 스크린샷·GIF
│   ├── robots.txt
│   └── profile.jpg
└── content/                          # 포트폴리오 콘텐츠 원본 (md + 미디어)
```

---

## 설계 원칙

- **서버 컴포넌트 우선**: 섹션은 전부 서버에서 렌더한다. 클라이언트 컴포넌트는 Nav, 모달, 문의 폼, `TerminalRuntime`처럼 상호작용이 필요한 작은 단위만 둔다.
- **애니메이션은 장식 레이어**: 텍스트는 처음부터 HTML에 들어 있고, CSS로 가리고 보여주기만 한다. 기본 상태는 완성된 정적 화면이며, 숨김 규칙은 `html[data-term="play"]` 아래에만 둔다.
- **첫 방문에만 재생**: `<head>` 인라인 스크립트가 `sessionStorage`와 `prefers-reduced-motion`을 보고 재생 여부를 정한다. 재방문, JS 비활성, 모션 줄이기 설정에서는 연출 없이 바로 완성 화면이 보인다.
- **LCP 앵커**: Hero의 Welcome 박스(이름·역할·소개)는 애니메이션 없이 첫 페인트부터 보이게 둔다.
- **글리프는 SVG**: `✻ ⏺ ⎿ ☒ ◐ ❯` 등은 폰트 대신 `Glyph` 컴포넌트의 inline SVG로 그린다. 기기별 이모지 치환이나 두부(□) 표시를 막기 위해서다.

---

## 로컬 실행

```bash
npm install
npm run dev
```

`http://localhost:3000` 에서 확인

### 환경 변수 (`.env.local`)

| 변수 | 용도 | 없을 때 |
|------|------|---------|
| `NEXT_PUBLIC_WEB3FORMS_KEY` | 문의 폼 전송 | 폼 전송 실패 |
| `GITHUB_TOKEN` | GitHub 기여 그래프 (GraphQL) | 안내 문구로 대체 |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 | GA 스크립트 미출력 |

### 스크립트

```bash
npm run build   # 프로덕션 빌드
npm run start   # 빌드 결과 실행
npm run lint    # ESLint
```
