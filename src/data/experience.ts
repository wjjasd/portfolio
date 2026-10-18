export interface ExperienceI18n {
  role: string
  tasks: string[]
}

export interface YearMonth {
  year: number
  month: number
}

export interface Experience {
  company: string
  ko: ExperienceI18n
  en: ExperienceI18n
  period: string
  current: boolean
  start: YearMonth
  end?: YearMonth
}

export const experiences: Experience[] = [
  {
    company: '유타렉스 (UTAREX)',
    ko: {
      role: 'Android 개발 / 임베디드 / 웹 프론트엔드 / 클라우드 설계',
      tasks: [
        'IoT 통합 관제 시스템 설계·구현 (GS25 편의점 실증, 정부과제 납품)',
        'AOSP Android 13 (RK3588) 커스터마이징 — 핀맵·IR·Relay 드라이버 개발',
        'SubG 기반 누수 감지 시스템 펌웨어 커스터마이징 및 Android 앱 개발',
        'NCP 기반 IoT 관제 서버 아키텍처 설계',
        'Android 오픈소스 라이브러리 InOutCountBar 개발·JitPack 배포',
        '회사 소개 웹사이트 기획·개발·배포 (Cloudflare Pages, 구글 검색 최상단 노출)',
        '사내 생산성 도구 개발 (Daily Reporter, Python 집계 자동화)',
      ],
    },
    en: {
      role: 'Android / Embedded / Web Frontend / Cloud Architecture',
      tasks: [
        'IoT integrated control system design and implementation (GS25 pilot, government-funded)',
        'AOSP Android 13 (RK3588) customization — pinmap, IR, Relay driver development',
        'SubG leak detection system firmware customization and Android app development',
        'NCP-based IoT monitoring server architecture design',
        'Android open-source library InOutCountBar development and JitPack release',
        'Company website planning, development, and deployment (Cloudflare Pages, #1 on Google)',
        'In-house productivity tools development (Daily Reporter, Python aggregation automation)',
      ],
    },
    period: '2024.02 ~ 현재',
    current: true,
    start: { year: 2024, month: 2 },
  },
  {
    company: '홀리츠 (Holich)',
    ko: {
      role: 'Android 개발',
      tasks: [
        '호텔 종합 솔루션 MyCONECT Android 앱 기능 개발·유지보수',
        'BLE 기반 도어락·엘리베이터·객실 기기 제어 구현 (서드파티 SDK 연동)',
        'MVVM + RxKotlin 아키텍처 적용, Google Play Store 배포',
        'BLE 개발 보조 도구 Bluetena 자체 제작',
      ],
    },
    en: {
      role: 'Android Development',
      tasks: [
        'Feature development and maintenance for hotel solution MyCONECT Android app',
        'BLE-based door lock, elevator, and room device control (third-party SDK integration)',
        'MVVM + RxKotlin architecture, Google Play Store deployment',
        'Built in-house BLE dev tool Bluetena',
      ],
    },
    period: '2021.01 ~ 2023.04',
    current: false,
    start: { year: 2021, month: 1 },
    end: { year: 2023, month: 4 },
  },
]

// 렌더 중 Date를 읽으므로 서버 컴포넌트에서 호출할 것 (ADR ③-7)
export function calcTotalMonths(exps: Experience[], now: Date = new Date()): number {
  return exps.reduce((sum, exp) => {
    const end = exp.current
      ? { year: now.getFullYear(), month: now.getMonth() + 1 }
      : exp.end!
    return sum + (end.year - exp.start.year) * 12 + (end.month - exp.start.month)
  }, 0)
}
