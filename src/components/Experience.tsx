'use client'

import { useEffect, useRef } from 'react'

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
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-4')
            entry.target.classList.add('opacity-100', 'translate-y-0')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    refs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="experience" className="px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto w-full py-24">
        <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-4">
          Experience
        </p>
        <h2 className="text-4xl font-bold text-white mb-16">경력</h2>

        <div className="relative">
          {/* 세로 타임라인 선 */}
          <div className="absolute left-3.5 top-2 bottom-4 w-px bg-white/10" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <div
                key={exp.company}
                ref={(el) => { refs.current[i] = el }}
                className="relative pl-12 opacity-0 translate-y-4 transition-all duration-700 ease-out"
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* 점 마커 */}
                <div
                  className={`absolute left-0 top-1 w-7 h-7 rounded-full bg-zinc-900 border-2 flex items-center justify-center ${
                    exp.current
                      ? 'border-indigo-500 ring-2 ring-indigo-500/20'
                      : 'border-zinc-600'
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      exp.current ? 'bg-indigo-500' : 'bg-zinc-600'
                    }`}
                  />
                </div>

                {/* 기간 + 재직 배지 */}
                <div className="flex items-center gap-3 mb-1">
                  <p className="text-zinc-500 text-sm font-mono">{exp.period}</p>
                  {exp.current && (
                    <span className="px-2 py-0.5 text-xs bg-indigo-600/30 text-indigo-400 rounded-full border border-indigo-600/30">
                      재직 중
                    </span>
                  )}
                </div>

                {/* 회사명 + 역할 */}
                <h3 className="text-xl font-semibold text-white mb-1">{exp.company}</h3>
                <p className="text-zinc-400 text-sm mb-4">{exp.role}</p>

                {/* 업무 목록 */}
                <ul className="space-y-2">
                  {exp.tasks.map((task, j) => (
                    <li key={j} className="flex gap-3 text-zinc-400 text-sm leading-relaxed">
                      <span className="text-indigo-500 mt-1 shrink-0">▸</span>
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
