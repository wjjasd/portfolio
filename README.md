# 포트폴리오 웹사이트

프로덕트 엔지니어 양기정의 포트폴리오 웹사이트 레포지토리입니다.

- **URL**: https://kjyang.kro.kr
- **배포**: Vercel

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | Next.js 16 (App Router) |
| 언어 | TypeScript |
| 스타일링 | Tailwind CSS v4 |
| 애니메이션 | Framer Motion |
| 문의 폼 | Web3Forms |
| 배포 | Vercel |

---

## 레포지토리 구조

```
portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # 메타데이터 (SEO, OG, JSON-LD)
│   │   ├── page.tsx                # 메인 페이지
│   │   ├── opengraph-image.tsx     # OG 이미지 동적 생성 (1200×630)
│   │   └── sitemap.ts              # 사이트맵 자동 생성
│   └── components/
│       ├── Nav.tsx                 # 고정 상단 네비게이션
│       ├── Hero.tsx                # 히어로 섹션
│       ├── About.tsx               # 자기소개
│       ├── Projects.tsx            # 프로젝트 카드 그리드
│       ├── ProjectGallery.tsx      # 프로젝트 이미지/영상 모달
│       ├── Skills.tsx              # 기술 스택 및 자격증
│       ├── Experience.tsx          # 경력 타임라인
│       ├── Contact.tsx             # 문의 폼 + 링크
│       ├── FadeIn.tsx              # 스크롤 페이드인 애니메이션
│       └── JsonLd.tsx              # JSON-LD 구조화 데이터
├── public/
│   ├── projects/                   # 프로젝트 스크린샷·GIF
│   ├── robots.txt
│   └── profile.jpg
├── content/                        # 포트폴리오 콘텐츠 원본 (md + 미디어)
└── docs/                           # 기획·계획·작업 문서
    ├── plan/                       # 개발 일정 계획, 기획서
    └── work_log.md                 # 작업 일지
```

---

## 로컬 실행

```bash
npm install
npm run dev
```

`http://localhost:3000` 에서 확인

---

## 개발 계획

`docs/plan/개발_일정_계획.md` 참고 (6주 스프린트)
