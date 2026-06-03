'use client'

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
  labels: {
    sectionLabel: string
    title: string
    total: string
    subtitle: string
    tooltipPrefix: string
  }
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

export default function ContributionCalendar({
  totalContributions,
  weeks,
  labels,
}: ContributionCalendarProps) {
  return (
    <FadeIn>
      <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-4">
        {labels.sectionLabel}
      </p>
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4 mb-4">
        <h2 className="text-4xl font-bold text-white">{labels.title}</h2>
        <span className="text-indigo-400 text-lg font-medium mt-1 sm:mt-0">
          {labels.total}
        </span>
      </div>
      <p className="text-zinc-400 text-sm mb-8">{labels.subtitle}</p>

      <div className="overflow-x-auto pb-2">
        <div className="flex gap-[3px] min-w-max">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.contributionDays.map((day) => (
                <DayCell
                  key={day.date}
                  day={day}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  )
}
