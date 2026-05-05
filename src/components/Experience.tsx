const experiences = [
  {
    company: '유타렉스 (UTAREX)',
    role: 'Android 개발 / 임베디드 / 웹 프론트엔드 / 클라우드 설계',
    period: '2024.02 ~ 현재',
    current: true,
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
  {
    company: '홀리츠 (Holits)',
    role: 'Android 개발',
    period: '2021.01 ~ 2023.04',
    current: false,
    tasks: [
      '호텔 종합 솔루션 MyCONECT Android 앱 기능 개발·유지보수',
      'BLE 기반 도어락·엘리베이터·객실 기기 제어 구현 (서드파티 SDK 연동)',
      'MVVM + RxKotlin 아키텍처 적용, Google Play Store 배포',
      'BLE 개발 보조 도구 Bluetena 자체 제작',
    ],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto w-full py-24">
        <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-4">
          Experience
        </p>
        <h2 className="text-4xl font-bold text-white mb-16">경력</h2>

        <div className="space-y-12">
          {experiences.map((exp) => (
            <div key={exp.company} className="grid md:grid-cols-[220px_1fr] gap-6 md:gap-12">
              <div>
                <p className="text-zinc-500 text-sm font-mono">{exp.period}</p>
                {exp.current && (
                  <span className="inline-block mt-2 px-2 py-0.5 text-xs bg-indigo-600/30 text-indigo-400 rounded-full border border-indigo-600/30">
                    재직 중
                  </span>
                )}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">{exp.company}</h3>
                <p className="text-zinc-400 text-sm mb-4">{exp.role}</p>
                <ul className="space-y-2">
                  {exp.tasks.map((task, i) => (
                    <li key={i} className="flex gap-3 text-zinc-400 text-sm leading-relaxed">
                      <span className="text-indigo-500 mt-1 shrink-0">▸</span>
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
