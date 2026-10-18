'use client'

import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import FadeIn from './FadeIn'
import { experiences, calcTotalMonths } from '@/data/experience'

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
