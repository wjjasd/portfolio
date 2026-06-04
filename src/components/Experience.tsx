'use client'

import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import FadeIn from './FadeIn'

interface ExperienceI18n {
  role: string
  tasks: string[]
}

interface YearMonth {
  year: number
  month: number
}

interface Experience {
  company: string
  ko: ExperienceI18n
  en: ExperienceI18n
  period: string
  current: boolean
  start: YearMonth
  end?: YearMonth
}

const experiences: Experience[] = [
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

function calcTotalMonths(exps: Experience[]): number {
  const now = new Date()
  return exps.reduce((sum, exp) => {
    const end = exp.current
      ? { year: now.getFullYear(), month: now.getMonth() + 1 }
      : exp.end!
    return sum + (end.year - exp.start.year) * 12 + (end.month - exp.start.month)
  }, 0)
}

export default function Experience() {
  const t = useTranslations('experience')
  const locale = useLocale()
  const lang = locale === 'ko' ? 'ko' : 'en'

  const totalMonths = calcTotalMonths(experiences)
  const totalYears = Math.floor(totalMonths / 12)
  const remainingMonths = totalMonths % 12

  return (
    <section id="experience" className="px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto w-full py-24">
        <FadeIn>
          <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-4">
            {t('section_label')}
          </p>
          <h2 className="text-4xl font-bold text-white mb-4">{t('title')}</h2>
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-12 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
            <span className="w-2 h-2 rounded-full bg-indigo-400 shrink-0" />
            <span className="text-indigo-300 text-sm font-medium">
              {t('total_label')}{' '}
              {totalYears > 0 && `${totalYears}${t('year')} `}
              {remainingMonths > 0 && `${remainingMonths}${t('month')}`}
            </span>
          </div>
        </FadeIn>

        <div className="relative">
          <div className="absolute left-3.5 top-2 bottom-4 w-px bg-white/10" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.65, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className="relative pl-12"
              >
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

                <div className="flex items-center gap-3 mb-1">
                  <p className="text-zinc-500 text-sm font-mono">{exp.period}</p>
                  {exp.current && (
                    <span className="px-2 py-0.5 text-xs bg-indigo-600/30 text-indigo-400 rounded-full border border-indigo-600/30">
                      {t('current_badge')}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-semibold text-white mb-1">{exp.company}</h3>
                <p className="text-zinc-400 text-sm mb-4">{exp[lang].role}</p>

                <ul className="space-y-2">
                  {exp[lang].tasks.map((task, j) => (
                    <li key={j} className="flex gap-3 text-zinc-400 text-sm leading-relaxed">
                      <span className="text-indigo-500 mt-1 shrink-0">▸</span>
                      {task}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
