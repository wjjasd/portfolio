'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import FadeIn from './FadeIn'

interface ContributionDay {
  contributionCount: number
  date: string
  color: string
}

interface ContributionWeek {
  contributionDays: ContributionDay[]
}

interface GitHubCalendarData {
  totalContributions: number
  weeks: ContributionWeek[]
}

function DayCell({ day }: { day: ContributionDay }) {
  const isEmpty = day.contributionCount === 0 || day.color === '#ebedf0'
  return (
    <div
      title={`${day.date}: ${day.contributionCount}`}
      className={`w-[10px] h-[10px] rounded-sm cursor-default ${isEmpty ? 'bg-zinc-800' : ''}`}
      style={isEmpty ? undefined : { backgroundColor: day.color }}
    />
  )
}

export default function GitHubContributions() {
  const t = useTranslations('github')
  const [data, setData] = useState<GitHubCalendarData | null>(null)

  useEffect(() => {
    fetch('/api/github-contributions')
      .then((r) => r.ok ? r.json() : null)
      .then((json) => setData(json))
      .catch(() => null)
  }, [])

  if (!data) return null

  return (
    <section id="github" className="px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto w-full py-24">
        <FadeIn>
          <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-4">
            {t('section_label')}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4 mb-4">
            <h2 className="text-4xl font-bold text-white">{t('title')}</h2>
            <span className="text-indigo-400 text-lg font-medium mt-1 sm:mt-0">
              {t('total', { count: data.totalContributions })}
            </span>
          </div>
          <p className="text-zinc-400 text-sm mb-8">{t('subtitle')}</p>
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-[3px] min-w-max">
              {data.weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.contributionDays.map((day) => (
                    <DayCell key={day.date} day={day} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
