# 아키텍처 설계

구현 단계까지 진행되지 않았으나, 기획·설계를 단독으로 수행한 결과물입니다.

---

## IoT 관제 서버 아키텍처 설계

### 한 줄 요약

현장 IoT 게이트웨이 최대 1,000대 규모의 데이터 수집·관제 서버를 Naver Cloud Platform 기반으로 단독 설계

### 기본 정보

| 항목 | 내용 |
|------|------|
| 소속 | 유타렉스 |
| 작성일 | 2026.03.09 |
| 클라우드 | Naver Cloud Platform (NCP) |
| 문서 | `docs/IoT_관제서버_NCP_아키텍처_설계서_v1.pdf` |

### 설계 범위

- **네트워크**: VPC / Public·Private Subnet 분리, ACG 포트 제어, Bastion Host
- **수집 레이어**: Network Load Balancer → API WAS (Auto Scaling) → Cloud Kafka
- **처리·저장 레이어**: Consumer Worker → MySQL (Master+Slave) + Redis 캐시 + Object Storage
- **조회 레이어**: 대시보드·현장 상세 조회 API, CQRS 부분 적용
- **보안**: TLS 전 구간 암호화, API Key 인증, JWT 관리자 인증, 최소 권한 DB 계정 분리
- **운영**: Blue-Green 배포, Auto Scaling, Cloud Insight 모니터링, SENS 알림

### 기술 스택

| 영역 | 기술 |
|------|------|
| 언어·프레임워크 | Node.js 22, Express.js |
| 메시지 큐 | NCP Cloud Kafka |
| DB | NCP Cloud DB for MySQL (Master+Slave), Cloud DB for Redis |
| 스토리지 | NCP Object Storage |
| 인프라 | NCP VPC, Network LB, Auto Scaling |
| CI/CD | NCP SourcePipeline, Docker |
| 모니터링 | Cloud Insight, Log Analytics, SENS |

### 설계 핵심 결정

- 초기 **모듈형 모놀리스** → 규모 확장 시 마이크로서비스 이행 전략
- 수집(Write)과 조회(Read) 경로 분리 (CQRS 부분 적용)
- `sensor_data_5m` 테이블 일 단위 RANGE 파티셔닝 + 61일째 자동 롤링 삭제
- 초기 월 운영비 약 **163만 원** 추정 (NCP 공개 단가 기준)

---

## 공공 IoT 서비스 클라우드 아키텍처 설계

### 한 줄 요약

10만 대 게이트웨이 확장을 목표로 한 공공 IoT 서비스 NCP 기반 고가용성 아키텍처 설계

### 기본 정보

| 항목 | 내용 |
|------|------|
| 클라우드 | Naver Cloud Platform (NCP) |
| 문서 | `docs/공공IoT서비스_클라우드_아키텍처_설계서_v1.pdf` |

### 설계 범위

- **네트워크**: VPC Public/Private Subnet, SSL VPN Gateway, Bastion Host
- **서버**: Web/API Server Cluster 4대 (Auto Scaling), LB 기반 트래픽 분산
- **데이터**: MySQL Cloud DB (Master+Slave, 1TB), Object Storage (펌웨어·로그)
- **OTA**: 게이트웨이 Pull 방식 펌웨어 업데이트, CDN 연계, 무결성 검증
- **보안**: Private Subnet 기반 서버 보호, RBAC 권한 모델, MFA 적용

### 설계 핵심 결정

- 서비스 영역(사용자·게이트웨이)과 운영 영역(관리자) 완전 분리
- 관리자 접근 경로: VPN → Bastion → 내부 서버 (공인 IP 최소화)
- DB Master+Slave 자동 페일오버, LB Active-Standby 이중화
