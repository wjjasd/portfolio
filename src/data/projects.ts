export type ProjectStatus = 'live' | 'internal' | 'delivered' | 'released' | 'ended' | 'here'

export interface L10n {
  ko: string
  en: string
}

export interface GalleryItem {
  type: 'image' | 'video'
  src: string
  alt: L10n
}

export interface ProjectLink {
  label: L10n
  url: string
}

export interface Kpi {
  value: string
  label: string
}

export interface DiffMetric {
  label: string
  /** 카드용 짧은 라벨. 없으면 label */
  short?: string
  before: string
  after: string
}

export interface RoleItem {
  status: 'done' | 'doing' | 'todo'
  text: string
}

export interface ProjectI18n {
  name: string
  oneLiner?: string
  org: string
  /** 메타 줄 꼬리 (예: 정부과제) */
  tag?: string
  kpis?: Kpi[]
  /** 카드에는 앞 2개만 한 줄로 합쳐서, 모달에는 전부 */
  diff?: DiffMetric[]
  highlights: string[]
  background: string
  roles: RoleItem[]
  /** 모달 기술 스택 키-값 */
  stack: [string, string][]
}

export interface Project {
  /** 디렉토리명(`slug/`)·앵커(`#p-slug`)·모달 헤더(`Read(slug.md)`) */
  slug: string
  status: ProjectStatus
  period: string
  contribution: number
  ko: ProjectI18n
  en: ProjectI18n
  techStack: string[]
  gallery: GalleryItem[]
  links: ProjectLink[]
}

export const projects: Project[] = [
  {
    slug: 'utarex-brain',
    status: 'live',
    period: '2026.07 – 2026.08',
    contribution: 100,
    ko: {
      name: 'Utarex Brain — 사내 AI 비서 MCP 서버',
      oneLiner: '사내 지식베이스를 Claude에 연동하는 MCP 서버 단독 설계·구현, 실사용 중',
      org: '유타렉스',
      kpis: [
        { value: '26', label: 'tools' },
        { value: '166', label: '세션' },
        { value: '28.6M', label: '토큰 누적' },
      ],
      highlights: [
        'PERSONA.md 단일 소스 라이브 로드로 재배포 없이 규칙 갱신',
        'OWNERS.md 권한 매트릭스 + SHA-guarded 쓰기로 안전한 협업',
        '.mcpb 자립 번들로 Python 미설치 PC에도 원클릭 배포',
      ],
      background:
        '유타렉스 팀의 프로젝트 현황·의사결정·작업 로그가 Gitea 저장소(plain markdown)에 흩어져 있어, 팀원이 매번 문서를 직접 찾아 읽어야 했습니다. Claude 안에서 대화만으로 팀 지식베이스를 조회·기록할 수 있는 MCP 서버가 필요했습니다.',
      roles: [
        { status: 'done', text: 'MCP 서버 단독 설계·구현 — 26개 tool (읽기/쓰기) 정의' },
        { status: 'done', text: 'PERSONA.md 단일 소스를 매 세션 라이브 로드 → 재배포 없이 규칙 갱신' },
        { status: 'done', text: 'OWNERS.md 권한 매트릭스 — success / requires_confirmation / denied 3-상태 판정' },
        { status: 'done', text: 'SHA-guarded 쓰기로 409 동시수정 충돌 감지' },
        { status: 'done', text: 'Python 3.13 임베더블 런타임 포함 .mcpb 자립 번들 배포' },
        { status: 'doing', text: '실사용 운영 중 — 세션 166회 · 누적 토큰 28.6M · 활성일 46/121일' },
      ],
      stack: [
        ['서버', 'Python 3.13, MCP (stdio)'],
        ['연동', 'Gitea REST API (base64/sha/409)'],
        ['배포', '.mcpb 자립 번들'],
        ['클라이언트', 'Claude Desktop, Claude Code'],
      ],
    },
    en: {
      name: 'Utarex Brain — In-house AI Assistant MCP Server',
      oneLiner: 'Solo-designed MCP server connecting the company knowledge base to Claude, in active use',
      org: 'UTAREX',
      kpis: [
        { value: '26', label: 'tools' },
        { value: '166', label: 'sessions' },
        { value: '28.6M', label: 'tokens' },
      ],
      highlights: [
        'Single-source PERSONA.md live-loaded every session — rules change without redeploy',
        'OWNERS.md permission matrix + SHA-guarded writes for safe collaboration',
        'Self-contained .mcpb bundle for one-click install on PCs without Python',
      ],
      background:
        "UTAREX's project status, decisions, and work logs were scattered across a Gitea repository (plain markdown), so teammates had to find and read documents by hand every time. The team needed an MCP server that lets them look up and update the knowledge base just by chatting inside Claude.",
      roles: [
        { status: 'done', text: 'Solo design and implementation of the MCP server — 26 tools (read/write)' },
        { status: 'done', text: 'Single-source PERSONA.md live-loaded every session → rules update without redeploy' },
        { status: 'done', text: 'OWNERS.md permission matrix — success / requires_confirmation / denied decisions' },
        { status: 'done', text: 'SHA-guarded writes detect 409 concurrent-edit conflicts' },
        { status: 'done', text: 'Self-contained .mcpb bundle with an embedded Python 3.13 runtime' },
        { status: 'doing', text: 'In production use — 166 sessions · 28.6M tokens · active 46 of 121 days' },
      ],
      stack: [
        ['Server', 'Python 3.13, MCP (stdio)'],
        ['Integration', 'Gitea REST API (base64/sha/409)'],
        ['Distribution', '.mcpb self-contained bundle'],
        ['Clients', 'Claude Desktop, Claude Code'],
      ],
    },
    techStack: ['Python', 'MCP (Model Context Protocol)', 'Gitea REST API', 'Claude Desktop', 'Claude Code'],
    gallery: [
      { type: 'image', src: '/projects/utarex_brain/claude_demo.png', alt: { ko: 'Claude Code 실사용 데모', en: 'Claude Code Live Demo' } },
      { type: 'image', src: '/projects/utarex_brain/gitea_repo.png', alt: { ko: 'Gitea MCP 서버 소스 레포', en: 'Gitea MCP Server Source Repo' } },
      { type: 'image', src: '/projects/utarex_brain/persona_doc.png', alt: { ko: 'PERSONA.md 운영 매뉴얼 문서', en: 'PERSONA.md Operations Manual' } },
      { type: 'image', src: '/projects/utarex_brain/usage_stats.png', alt: { ko: '사용량 통계 (세션·토큰)', en: 'Usage Stats (Sessions/Tokens)' } },
    ],
    links: [],
  },
  {
    slug: 'iot-control',
    status: 'delivered',
    period: '2024.02 – 2026.06',
    contribution: 98,
    ko: {
      name: 'IoT 통합 관제 시스템',
      org: '유타렉스',
      tag: '정부과제',
      kpis: [
        { value: '150', label: '대 납품' },
        { value: '60+', label: 'GS25 매장 실증' },
      ],
      diff: [
        { label: '데이터 누락률', before: '4.0%', after: '0%' },
        { label: '에러→성공 복구율', short: '복구율', before: '37.1%', after: '100%' },
        { label: '1일 평균 누락', before: '11.5건', after: '0건' },
      ],
      highlights: [
        'AOSP Android 13 (RK3588) 커스터마이징 — IR·Relay 드라이버 개발',
        'BLE / MQTT / REST / MODBUS 주변기기·외부 서버 연동',
      ],
      background:
        '상업시설 에너지 절감을 위한 자율 운전 시스템에서 매장 내 시스템 에어컨·환경센서·조명·간판·전력량계 등 주변 기기의 통합 모니터링과 제어를 담당했습니다. 외부 플랫폼과 현장 기기 사이의 연결 다리 역할을 하는 하드웨어와 그 위의 소프트웨어가 필요했습니다.',
      roles: [
        { status: 'done', text: 'AOSP Android 13 (RK3588) 커스터마이징 — 핀맵, IR·Relay 드라이버' },
        { status: 'done', text: 'Android 앱 핵심 로직 설계·구현 (기여도 98%)' },
        { status: 'done', text: 'BLE / MQTT / REST / MODBUS 주변기기·외부 서버 연동' },
        { status: 'done', text: '실증지 운영 — 유지보수, 버그 대응, 데이터 수집률 관리' },
      ],
      stack: [
        ['OS', 'AOSP Android 13 (RK3588)'],
        ['앱', 'Android Native / Kotlin'],
        ['통신', 'BLE / MQTT / REST / MODBUS / PWM / GPIO'],
        ['협업', 'Gitea / SourceTree / Confluence'],
      ],
    },
    en: {
      name: 'IoT Integrated Control System',
      org: 'UTAREX',
      tag: 'Government-funded',
      kpis: [
        { value: '150', label: 'devices delivered' },
        { value: '60+', label: 'GS25 pilot stores' },
      ],
      diff: [
        { label: 'Data loss rate', before: '4.0%', after: '0%' },
        { label: 'Error-to-success recovery', short: 'recovery', before: '37.1%', after: '100%' },
        { label: 'Avg. daily misses', before: '11.5', after: '0' },
      ],
      highlights: [
        'AOSP Android 13 (RK3588) customization — IR/Relay driver development',
        'Peripheral and external server integration over BLE / MQTT / REST / MODBUS',
      ],
      background:
        'In an autonomous energy-saving system for commercial buildings, UTAREX handled integrated monitoring and control of in-store devices such as system air conditioners, environmental sensors, lighting, signage, and power meters. The project needed hardware that bridges external platforms and on-site devices, plus the software running on it.',
      roles: [
        { status: 'done', text: 'AOSP Android 13 (RK3588) customization — pin map, IR and Relay drivers' },
        { status: 'done', text: 'Designed and implemented the core Android app logic (98% contribution)' },
        { status: 'done', text: 'Peripheral and external server integration over BLE / MQTT / REST / MODBUS' },
        { status: 'done', text: 'Pilot site operations — maintenance, bug response, data collection rate management' },
      ],
      stack: [
        ['OS', 'AOSP Android 13 (RK3588)'],
        ['App', 'Android Native / Kotlin'],
        ['Comms', 'BLE / MQTT / REST / MODBUS / PWM / GPIO'],
        ['Collaboration', 'Gitea / SourceTree / Confluence'],
      ],
    },
    techStack: ['AOSP Android 13', 'Kotlin', 'BLE', 'MQTT', 'MODBUS', 'REST', 'RK3588'],
    gallery: [
      { type: 'image', src: '/projects/gs25/entire_system_architecture.png', alt: { ko: '전체 시스템 아키텍처', en: 'Full System Architecture' } },
      { type: 'image', src: '/projects/gs25/android_architecture_20240520.png', alt: { ko: 'Android 앱 아키텍처', en: 'Android App Architecture' } },
      { type: 'image', src: '/projects/gs25/aos_app_main.png.png', alt: { ko: '앱 메인 화면', en: 'App Main Screen' } },
      { type: 'image', src: '/projects/gs25/aos_app_settings.png', alt: { ko: '앱 설정 화면', en: 'App Settings Screen' } },
      { type: 'image', src: '/projects/gs25/gs25.png', alt: { ko: 'GS25 편의점 설치 현장', en: 'GS25 Store Installation' } },
      { type: 'image', src: '/projects/gs25/hw_spec.png', alt: { ko: '하드웨어 스펙', en: 'Hardware Specifications' } },
      { type: 'image', src: '/projects/gs25/mother_board.jpg', alt: { ko: '메인보드', en: 'Motherboard' } },
      { type: 'image', src: '/projects/gs25/mother_board_uart.jpg', alt: { ko: '메인보드 UART', en: 'Motherboard UART' } },
      { type: 'image', src: '/projects/gs25/pwm_signal_analyze.jpg', alt: { ko: 'PWM 신호 분석', en: 'PWM Signal Analysis' } },
      { type: 'image', src: '/projects/gs25/regular_report_before_fix.png', alt: { ko: '정기 리포트 (수정 전)', en: 'Regular Report (Before Fix)' } },
      { type: 'image', src: '/projects/gs25/regular_report_after_fix.png', alt: { ko: '정기 리포트 (수정 후)', en: 'Regular Report (After Fix)' } },
      { type: 'image', src: '/projects/gs25/regular_report_debug_report_01.png', alt: { ko: '디버그 리포트 1', en: 'Debug Report 1' } },
      { type: 'image', src: '/projects/gs25/regular_report_debug_report_02.png', alt: { ko: '디버그 리포트 2', en: 'Debug Report 2' } },
      { type: 'image', src: '/projects/gs25/regular_report_debug_report_03.png', alt: { ko: '디버그 리포트 3', en: 'Debug Report 3' } },
    ],
    links: [
      { label: { ko: 'SmartThings 연동 데모', en: 'SmartThings Integration Demo' }, url: 'https://youtube.com/shorts/9hzoaLreZBA?feature=share' },
      { label: { ko: 'Relay 제어 테스트', en: 'Relay Control Test' }, url: 'https://youtu.be/0JFZdDppL7Y' },
    ],
  },
  {
    slug: 'myconect',
    status: 'ended',
    period: '2021.01 – 2023.04',
    contribution: 98,
    ko: {
      name: 'MyCONECT 호텔 서비스 플랫폼',
      oneLiner: 'Google Play 배포·유지보수 담당 — BLE·REST 기반 호텔 종합 솔루션',
      org: '홀리츠',
      kpis: [
        { value: '3', label: '앱 (Guest·Staff·Valet)' },
        { value: 'Play', label: '스토어 출시' },
      ],
      highlights: [
        'BLE 기반 도어락·엘리베이터·객실 기기 원격 제어 구현',
        'BLE 개발 보조 도구 Bluetena 자체 제작',
      ],
      background:
        '호텔 투숙객이 프런트를 거치지 않고 스마트폰으로 체크인/아웃, 룸서비스, 도어락 제어 등을 직접 처리하는 솔루션. BLE 기반 물리 기기 제어와 REST API 기반 호텔 업무 처리를 제공합니다.',
      roles: [
        { status: 'done', text: '기능 개발, 디자인 리뉴얼, Google Play 배포, 성능 최적화, 유지보수' },
        { status: 'done', text: 'REST API 호텔 업무 로직 (검색·예약·체크인/아웃·룸서비스·결제·발렛)' },
        { status: 'done', text: 'BLE 도어락·엘리베이터·객실 기기 원격 제어 (서드파티 SDK)' },
        { status: 'done', text: 'MVVM + RxKotlin 아키텍처 적용' },
        { status: 'done', text: 'BLE 개발 도구 Bluetena 별도 제작' },
      ],
      stack: [
        ['플랫폼', 'Android / Kotlin, Java'],
        ['아키텍처', 'MVVM · RxKotlin'],
        ['네트워크', 'Retrofit2 (REST)'],
        ['하드웨어', 'Android BLE (서드파티 SDK)'],
      ],
    },
    en: {
      name: 'MyCONECT Hotel Service Platform',
      oneLiner: 'Google Play deployment and maintenance — BLE/REST-based comprehensive hotel solution',
      org: 'Holich',
      kpis: [
        { value: '3', label: 'apps (Guest·Staff·Valet)' },
        { value: 'Play', label: 'Store release' },
      ],
      highlights: [
        'BLE-based remote control of door locks, elevators, and room devices',
        'Built an in-house BLE dev tool, Bluetena',
      ],
      background:
        'A solution that lets hotel guests check in/out, order room service, and unlock doors from their smartphone without visiting the front desk. It provides BLE-based physical device control and REST API-based hotel operations.',
      roles: [
        { status: 'done', text: 'Feature development, design renewal, Google Play release, performance optimization, maintenance' },
        { status: 'done', text: 'REST API hotel workflows (search, booking, check-in/out, room service, payment, valet)' },
        { status: 'done', text: 'BLE remote control of door locks, elevators, and room devices (third-party SDK)' },
        { status: 'done', text: 'Applied the MVVM + RxKotlin architecture' },
        { status: 'done', text: 'Built a separate BLE dev tool, Bluetena' },
      ],
      stack: [
        ['Platform', 'Android / Kotlin, Java'],
        ['Architecture', 'MVVM · RxKotlin'],
        ['Network', 'Retrofit2 (REST)'],
        ['Hardware', 'Android BLE (third-party SDK)'],
      ],
    },
    techStack: ['Android', 'Kotlin', 'Java', 'MVVM', 'RxKotlin', 'Retrofit2', 'BLE'],
    gallery: [
      { type: 'image', src: '/projects/myconnect/main_scene.png', alt: { ko: 'MyCONECT 메인 화면', en: 'MyCONECT Main Screen' } },
      { type: 'image', src: '/projects/myconnect/unlock_door.png', alt: { ko: '도어락 제어 화면', en: 'Door Lock Control Screen' } },
      { type: 'image', src: '/projects/myconnect/check_beacon_01.png', alt: { ko: '비콘 확인 화면 1', en: 'Beacon Check Screen 1' } },
      { type: 'image', src: '/projects/myconnect/check_beacon_02.png', alt: { ko: '비콘 확인 화면 2', en: 'Beacon Check Screen 2' } },
      { type: 'image', src: '/projects/myconnect/beacon_manager.png', alt: { ko: '비콘 관리 화면', en: 'Beacon Management Screen' } },
      { type: 'image', src: '/projects/myconnect/bluetena01.webp', alt: { ko: 'Bluetena BLE 도구 1', en: 'Bluetena BLE Tool 1' } },
      { type: 'image', src: '/projects/myconnect/bluetena02.webp', alt: { ko: 'Bluetena BLE 도구 2', en: 'Bluetena BLE Tool 2' } },
      { type: 'image', src: '/projects/myconnect/bluetena03.jpg', alt: { ko: 'Bluetena BLE 도구 3', en: 'Bluetena BLE Tool 3' } },
    ],
    links: [
      { label: { ko: '솔루션 소개', en: 'Solution Overview' }, url: 'https://www.myconect.biz' },
    ],
  },
  {
    slug: 'leak-detector',
    status: 'delivered',
    period: '2025.12 – 2026.01',
    contribution: 80,
    ko: {
      name: '누수 감지 시스템',
      oneLiner: 'SubG 무선 통신 기반 펌웨어 커스터마이징 + Android 앱 단독 설계·구현, 납품 완료',
      org: '유타렉스',
      highlights: [
        'SubG(Sub-GHz) 무선 통신으로 장거리 저전력 실시간 감지',
        'Android 앱 단독 설계·구현 (감지 데이터 시각화·관리)',
        'AIoT 전시회 출품',
      ],
      background:
        '현장에서 누수를 실시간으로 감지하고 관리자에게 알리는 시스템이 필요했습니다. SubG 무선 통신으로 장거리 저전력 통신을 확보하고, Android 앱으로 감지 데이터를 시각화·관리합니다.',
      roles: [
        { status: 'done', text: 'SubG 펌웨어 샘플 소스 기반 커스터마이징' },
        { status: 'done', text: 'Android 앱 설계·구현 (단독)' },
        { status: 'todo', text: '동료 분담: 빌드 환경 세팅, 리피터 기능 추가 납품' },
      ],
      stack: [
        ['펌웨어', 'SubG (Sub-GHz)'],
        ['앱', 'Android Native / Kotlin'],
      ],
    },
    en: {
      name: 'Leak Detection System',
      oneLiner: 'SubG wireless firmware customization + Android app solo design and implementation, delivered',
      org: 'UTAREX',
      highlights: [
        'Sub-GHz wireless communication for long-range, low-power real-time detection',
        'Android app solo design and implementation (detection data visualization and management)',
        'Exhibited at an AIoT expo',
      ],
      background:
        'The client needed a system that detects leaks on site in real time and alerts administrators. Sub-GHz wireless provides long-range, low-power communication, and an Android app visualizes and manages the detection data.',
      roles: [
        { status: 'done', text: 'Customized SubG firmware based on the vendor sample source' },
        { status: 'done', text: 'Designed and built the Android app (solo)' },
        { status: 'todo', text: 'Handled by teammates: build environment setup, repeater feature delivery' },
      ],
      stack: [
        ['Firmware', 'SubG (Sub-GHz)'],
        ['App', 'Android Native / Kotlin'],
      ],
    },
    techStack: ['Android', 'Kotlin', 'SubG (Sub-GHz)'],
    gallery: [
      { type: 'image', src: '/projects/leak_detector/aiot_exhibition.jpg', alt: { ko: 'AIoT 전시회 출품', en: 'AIoT Exhibition' } },
      { type: 'video', src: '/projects/leak_detector/leak_detection_demo.mp4', alt: { ko: '누수 감지 데모 영상', en: 'Leak Detection Demo Video' } },
    ],
    links: [],
  },
  {
    slug: 'portfolio',
    status: 'here',
    period: '2026.04 – 2026.05',
    contribution: 100,
    ko: {
      name: '개인 포트폴리오 웹사이트',
      oneLiner: '기획·디자인·개발·배포 전 과정 단독 수행 — 지금 보고 계신 이 사이트가 라이브 데모입니다',
      org: '개인 프로젝트',
      highlights: [
        'SSR/SSG 혼용 SEO 최적화 · 한/영 다국어 · 반응형',
        'Tistory RSS·GitHub 기여 그래프 자동 연동',
      ],
      background:
        '이직·브랜딩을 위한 중앙 허브. 코드 작성 능력뿐 아니라 문제 정의→설계→구현→배포 전 사이클과 비즈니스 임팩트를 직접 보여주는 것이 목표입니다.',
      roles: [
        { status: 'done', text: '기획·디자인·개발·배포 전 과정 단독 수행' },
        { status: 'done', text: 'SSR/SSG 혼용 SEO 최적화, 한/영 다국어 (next-intl)' },
        { status: 'done', text: 'Tistory RSS 연동, Web3Forms 문의 폼' },
        { status: 'doing', text: '터미널 컨셉 리디자인' },
      ],
      stack: [
        ['프레임워크', 'Next.js (App Router) / TypeScript'],
        ['스타일', 'Tailwind CSS'],
        ['배포', 'Vercel (Free)'],
      ],
    },
    en: {
      name: 'Personal Portfolio Website',
      oneLiner: 'Solo end-to-end: planning, design, development, and deployment — the site you are viewing is the live demo',
      org: 'Personal Project',
      highlights: [
        'SEO with mixed SSR/SSG · Korean/English i18n · responsive layout',
        'Automatic Tistory RSS and GitHub contribution graph integration',
      ],
      background:
        'A central hub for career moves and personal branding. The goal is to show not only coding skills but the full cycle — problem definition → design → implementation → deployment — and its business impact.',
      roles: [
        { status: 'done', text: 'Solo planning, design, development, and deployment' },
        { status: 'done', text: 'Mixed SSR/SSG SEO optimization, Korean/English i18n (next-intl)' },
        { status: 'done', text: 'Tistory RSS integration, Web3Forms contact form' },
        { status: 'doing', text: 'Terminal-themed redesign' },
      ],
      stack: [
        ['Framework', 'Next.js (App Router) / TypeScript'],
        ['Styling', 'Tailwind CSS'],
        ['Deploy', 'Vercel (Free)'],
      ],
    },
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    gallery: [],
    links: [
      { label: { ko: 'GitHub', en: 'GitHub' }, url: 'https://github.com/wjjasd/portfolio' },
    ],
  },
  {
    slug: 'utarex-web',
    status: 'live',
    period: '2026.03 – 2026.04',
    contribution: 100,
    ko: {
      name: '회사 소개 웹사이트 (유타렉스)',
      org: '유타렉스',
      kpis: [{ value: '#1', label: '구글 검색 최상단' }],
      highlights: [
        '초기 Node.js 백엔드 → Cloudflare Pages 정적 마이그레이션 주도',
        '기획·디자인·개발·배포 전 과정 단독 수행',
      ],
      background:
        '회사의 온라인 소개 채널. 초기에는 SmartThings OAuth 토큰 관리 백엔드(Node.js)를 포함했고, 이후 운영 환경 변화에 따라 프론트엔드를 분리해 Cloudflare Pages로 마이그레이션했습니다.',
      roles: [
        { status: 'done', text: '기획·디자인·개발 전 과정 단독 수행' },
        { status: 'done', text: 'SmartThings OAuth 포함 초기 Node.js 백엔드 설계·구현' },
        { status: 'done', text: '정적 사이트 분리 + Cloudflare Pages 배포' },
        { status: 'done', text: 'SEO 최적화 — 구글 검색 최상단 노출' },
      ],
      stack: [
        ['프론트엔드', 'HTML / CSS / JavaScript'],
        ['배포', 'Cloudflare Pages'],
        ['초기 백엔드', 'Node.js'],
      ],
    },
    en: {
      name: 'Company Website (UTAREX)',
      org: 'UTAREX',
      kpis: [{ value: '#1', label: 'on Google Search' }],
      highlights: [
        'Led migration from a Node.js backend to a Cloudflare Pages static site',
        'Solo end-to-end: planning, design, development, and deployment',
      ],
      background:
        "The company's online introduction channel. It initially included a Node.js backend managing SmartThings OAuth tokens; as the operating environment changed, I split out the frontend and migrated it to Cloudflare Pages.",
      roles: [
        { status: 'done', text: 'Solo planning, design, and development' },
        { status: 'done', text: 'Designed and built the initial Node.js backend, including SmartThings OAuth' },
        { status: 'done', text: 'Split into a static site and deployed on Cloudflare Pages' },
        { status: 'done', text: 'SEO optimization — top of Google search results' },
      ],
      stack: [
        ['Frontend', 'HTML / CSS / JavaScript'],
        ['Deploy', 'Cloudflare Pages'],
        ['Initial backend', 'Node.js'],
      ],
    },
    techStack: ['HTML/CSS/JS', 'Cloudflare Pages', 'Node.js', 'SEO'],
    gallery: [
      { type: 'image', src: '/projects/utarex_website/website01.png', alt: { ko: '웹사이트 메인', en: 'Website Main' } },
      { type: 'image', src: '/projects/utarex_website/website02.png', alt: { ko: '웹사이트 서비스 섹션', en: 'Website Services Section' } },
      { type: 'image', src: '/projects/utarex_website/website03.png', alt: { ko: '웹사이트 하단', en: 'Website Footer' } },
      { type: 'image', src: '/projects/utarex_website/utarex_web_seo.png', alt: { ko: '구글 검색 최상단 노출 결과', en: 'Google Search #1 Ranking Result' } },
    ],
    links: [
      { label: { ko: '사이트 방문', en: 'Visit Site' }, url: 'https://utarex.com' },
    ],
  },
  {
    slug: 'productivity',
    status: 'internal',
    period: '2026.04',
    contribution: 100,
    ko: {
      name: '사내 생산성 툴',
      oneLiner: '동료들이 실제로 쓰는 메모 앱과 반복 집계 업무를 자동화한 Python 스크립트',
      org: '유타렉스',
      highlights: [
        'Daily Reporter: 일일 업무 일지 앱 (동료 실사용)',
        '제품 데이터 수집률 집계 자동화 (openpyxl)',
        'PyInstaller 단일 exe 배포, 시작프로그램 등록 지원',
      ],
      background:
        '업무 메모·공유가 불편해 동료들이 직접 쓰는 메모 앱(Daily Reporter)을 만들었고, 수작업으로 반복되던 제품 데이터 수집률 집계를 Python 스크립트로 자동화했습니다.',
      roles: [
        { status: 'done', text: '출근·퇴근 기록, 매 정시 업무 입력 팝업 (미입력 4회 시 자동 퇴근)' },
        { status: 'done', text: '레지스트리 기반 시작프로그램 등록/해제' },
        { status: 'done', text: 'PyInstaller 단일 exe 배포' },
        { status: 'done', text: '수집률 집계 자동화 (openpyxl)' },
      ],
      stack: [
        ['메모 앱', 'Python / tkinter / winreg / threading'],
        ['자동화', 'Python / openpyxl'],
      ],
    },
    en: {
      name: 'In-house Productivity Tools',
      oneLiner: 'Memo app colleagues actually use and Python scripts automating repetitive data collection',
      org: 'UTAREX',
      highlights: [
        'Daily Reporter: daily work log app (used by teammates)',
        'Automated product data collection rate aggregation (openpyxl)',
        'Single-exe PyInstaller distribution with startup registration',
      ],
      background:
        'Taking and sharing work notes was inconvenient, so I built a memo app (Daily Reporter) that colleagues actually use, and automated the manual, repetitive product data collection rate aggregation with Python scripts.',
      roles: [
        { status: 'done', text: 'Clock-in/out log with an hourly work-entry popup (auto clock-out after 4 missed entries)' },
        { status: 'done', text: 'Registry-based startup registration/removal' },
        { status: 'done', text: 'Single-exe PyInstaller distribution' },
        { status: 'done', text: 'Automated collection rate aggregation (openpyxl)' },
      ],
      stack: [
        ['Memo app', 'Python / tkinter / winreg / threading'],
        ['Automation', 'Python / openpyxl'],
      ],
    },
    techStack: ['Python', 'tkinter', 'openpyxl', 'PyInstaller', 'winreg'],
    gallery: [
      { type: 'image', src: '/projects/productivity_tools/screenshot1.png', alt: { ko: 'Daily Reporter 화면 1', en: 'Daily Reporter Screen 1' } },
      { type: 'image', src: '/projects/productivity_tools/screenshot2.png', alt: { ko: 'Daily Reporter 화면 2', en: 'Daily Reporter Screen 2' } },
    ],
    links: [
      { label: { ko: 'GitHub', en: 'GitHub' }, url: 'https://github.com/wjjasd/DailyReporter' },
    ],
  },
  {
    slug: 'inout-count-bar',
    status: 'released',
    period: '2025.12',
    contribution: 100,
    ko: {
      name: 'InOutCountBar',
      oneLiner: '사내 필요에서 출발해 JitPack 배포까지 — Android 오픈소스 커스텀 뷰 라이브러리',
      org: '유타렉스 → 오픈소스',
      kpis: [{ value: 'v1.0.1', label: 'JitPack 배포' }],
      highlights: [
        'IN·OUT·COUNT 세 지표를 단일 막대 그래프로 시각화',
        'XML 커스텀 속성·부드러운 애니메이션 지원',
      ],
      background:
        'IoT 관제 시스템 개발 중 입장·퇴장·현재 인원 세 가지 데이터를 하나의 UI 컴포넌트로 표현해야 했습니다. 적합한 라이브러리가 없어 직접 만들고, 재사용을 고려해 오픈소스로 배포했습니다.',
      roles: [
        { status: 'done', text: '커스텀 뷰 설계·구현 단독 수행' },
        { status: 'done', text: 'XML 속성(색상·텍스트 크기 등) 커스터마이징' },
        { status: 'done', text: 'JitPack 배포 · README · 데모 GIF' },
      ],
      stack: [
        ['언어', 'Kotlin'],
        ['플랫폼', 'Android Custom View'],
        ['배포', 'JitPack 1.0.1'],
      ],
    },
    en: {
      name: 'InOutCountBar',
      oneLiner: 'From internal need to JitPack release — Android open-source custom view library',
      org: 'UTAREX → Open Source',
      kpis: [{ value: 'v1.0.1', label: 'on JitPack' }],
      highlights: [
        'Visualizes IN, OUT, and COUNT metrics in a single bar chart',
        'XML custom attributes and smooth animation support',
      ],
      background:
        'While building the IoT control system, I needed one UI component to show entries, exits, and current headcount. No suitable library existed, so I built it myself and released it as open source for reuse.',
      roles: [
        { status: 'done', text: 'Solo design and implementation of the custom view' },
        { status: 'done', text: 'XML attribute customization (colors, text size, etc.)' },
        { status: 'done', text: 'JitPack release · README · demo GIF' },
      ],
      stack: [
        ['Language', 'Kotlin'],
        ['Platform', 'Android Custom View'],
        ['Distribution', 'JitPack 1.0.1'],
      ],
    },
    techStack: ['Kotlin', 'Android Custom View', 'JitPack'],
    gallery: [
      { type: 'image', src: '/projects/inout_count_bar/demo.gif', alt: { ko: 'InOutCountBar 데모 GIF', en: 'InOutCountBar Demo GIF' } },
    ],
    links: [
      { label: { ko: 'GitHub', en: 'GitHub' }, url: 'https://github.com/wjjasd/InoutCountbar' },
      { label: { ko: 'JitPack', en: 'JitPack' }, url: 'https://jitpack.io/#wjjasd/InoutCountbar' },
    ],
  },
]
