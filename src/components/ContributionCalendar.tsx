'use client'

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

interface ContributionCalendarProps {
  totalContributions: number
  weeks: ContributionWeek[]
}

function DayCell({ day, tooltip }: { day: ContributionDay; tooltip: string }) {
  const isEmpty = day.contributionCount === 0 || day.color === '#ebedf0'
  return (
    <div
      title={tooltip}
      className={`w-[10px] h-[10px] rounded-sm cursor-default ${isEmpty ? 'bg-zinc-800' : ''}`}
      style={isEmpty ? undefined : { backgroundColor: day.color }}
    />
  )
}

export default function ContributionCalendar({
  totalContributions,
  weeks,
}: ContributionCalendarProps) {
  const t = useTranslations('github')

  return (
    <FadeIn>
      <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-4">
        {t('section_label')}
      </p>
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4 mb-4">
        <h2 className="text-4xl font-bold text-white">{t('title')}</h2>
        <span className="text-indigo-400 text-lg font-medium mt-1 sm:mt-0">
          {t('total', { count: totalContributions })}
        </span>
      </div>
      <p className="text-zinc-400 text-sm mb-8">{t('subtitle')}</p>

      <div className="overflow-x-auto pb-2">
        <div className="flex gap-[3px] min-w-max">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.contributionDays.map((day) => (
                <DayCell
                  key={day.date}
                  day={day}
                  tooltip={t('tooltip', { date: day.date, count: day.contributionCount })}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  )
}
