# 사내 AX — Utarex Brain 지식베이스 + MCP 서버

## 한 줄 요약

팀 지식베이스(브레인) 구축부터 Claude 연동 MCP 서버(AI 비서 '동수')까지, 사내 AI 전환(AX)을 단독 추진 — 26개 tool, 권한 모델, 자립 번들 배포

## 기본 정보

| 항목 | 내용 |
|------|------|
| 유형 | 사내 도구 / 개인 프로젝트 |
| 기여도 | 100% |
| 기간 | 2026.07 ~ 2026.08 |
| 소속 | 유타렉스 |

## 배경

참고 이미지: `gitea_repo.png`, `persona_doc.png`

유타렉스 팀의 프로젝트 현황·의사결정·작업 로그가 여기저기 흩어져 있어, 팀원이 매번 문서를 직접 찾아 읽어야 했다. 업무에 AI를 실제로 녹이는 AX(AI 전환)를 목표로, 먼저 팀 지식을 한곳에 모으는 사내 브레인(Gitea 지식베이스)을 설계하고, Claude 안에서 대화만으로 이를 조회·기록할 수 있는 MCP 서버를 구축했다. 추가 SaaS 없이 Claude Team + Gitea 셀프호스팅만으로 운영한다.

## 나의 역할과 기여

- 사내 브레인(Gitea 지식베이스) 구조 설계 — 프로젝트별 현황·도메인·의사결정·로그 + 7카테고리 템플릿, 회사 공통 컨벤션
- MCP(Model Context Protocol) 서버 단독 설계·구현 — 26개 tool (읽기/쓰기) 정의
- 페르소나·운영 규칙을 코드에 하드코딩하지 않고 Gitea의 `PERSONA.md` 단일 소스에서 매 세션 라이브 로드하는 구조 설계 → 서버 재배포 없이 규칙 갱신 가능
- `OWNERS.md` 기반 권한 매트릭스 설계 — 쓰기 요청을 PM/구성원·본인 도메인/공유 파일 기준으로 판정해 success / requires_confirmation / denied 3-상태로 반환
- SHA-guarded 쓰기(POST=생성, PUT+sha=갱신) 구현으로 409 동시수정 충돌 감지, 조용한 덮어쓰기 방지
- Python 3.13 임베더블 런타임 + 의존 라이브러리를 모두 포함한 `.mcpb` 자립 번들 패키징 — 대상 PC에 Python 설치 없이 Claude Desktop 폼 입력만으로 설치되도록 배포 파이프라인 구축

## 기술 스택

| 영역 | 기술 |
|------|------|
| 서버 | Python 3.13, MCP (Model Context Protocol, stdio) |
| 연동 | Gitea REST API (base64/sha/409 충돌 처리) |
| 배포 | `.mcpb` 자립 번들 (Python 임베더블 런타임 + pywin32) |
| 클라이언트 | Claude Desktop, Claude Code |

## 정량적 성과

- 실사용 현황(2026-08 기준): 세션 166회, 누적 토큰 28.6M, 활성일 46/121일, 최장 세션 4일 0h20m
- 근거 자료: `usage_stats.png`

## 미디어

- 시연 영상: `mcp_demo.mp4`
- 스크린샷: `gitea_repo.png`(소스 레포), `claude_demo.png`(실사용 데모), `persona_doc.png`(운영 매뉴얼 문서), `usage_stats.png`(사용량 통계)

## 링크

- GitHub: 비공개 (회사 프로젝트)
- 데모: 상세 페이지 갤러리로 대체
