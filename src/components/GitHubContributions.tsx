import { getTranslations } from 'next-intl/server'
import TerminalSection from '@/components/terminal/TerminalSection'
import { CMD } from '@/components/terminal/commands'

const LEVEL = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
} as const

type ContributionLevel = keyof typeof LEVEL

interface Calendar {
  totalContributions: number
  weeks: { contributionDays: { weekday: number; contributionLevel: ContributionLevel }[] }[]
}

const QUERY = `{
  user(login: "wjjasd") {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { weekday contributionLevel } }
      }
    }
  }
}`

async function fetchCalendar(): Promise<Calendar | null> {
  const token = process.env.GITHUB_TOKEN
  if (!token) return null
  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: QUERY }),
      next: { revalidate: 86400 },
    })
    if (!res.ok) return null
    const json: { data?: { user?: { contributionsCollection?: { contributionCalendar?: Calendar } } }; errors?: unknown } =
      await res.json()
    // GraphQL은 에러가 있어도 200을 준다
    if (json.errors) return null
    return json.data?.user?.contributionsCollection?.contributionCalendar ?? null
  } catch {
    return null
  }
}

const CELL = 10

// 단계별 <path> 하나로 그린다(셀마다 노드를 만들지 않음 → DOM 364개 절약).
// 8×8 사각형 + 같은 색 2px 둥근 stroke = 모서리가 둥근 10×10 셀
function Heatmap({ weeks, gap, className }: { weeks: Calendar['weeks']; gap: number; className: string }) {
  const pitch = CELL + gap
  const paths: string[] = ['', '', '', '', '']
  weeks.forEach((week, w) => {
    for (const day of week.contributionDays) {
      paths[LEVEL[day.contributionLevel] ?? 0] += `M${w * pitch + 1} ${day.weekday * pitch + 1}h8v8h-8z`
    }
  })
  const width = weeks.length * pitch - gap
  const height = 7 * pitch - gap

  return (
    <svg className={className} width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
      {paths.map((d, level) => (d ? <path key={level} d={d} className={`lvl-${level}`} /> : null))}
    </svg>
  )
}

export default async function GitHubContributions() {
  const [data, t] = await Promise.all([fetchCalendar(), getTranslations('github')])

  return (
    <TerminalSection id="github" cmd={CMD.github} title={t('title')}>
      <div className="out">
        {data ? (
          <>
            <p>{t.rich('summary', { count: data.totalContributions, b: (c) => <b className="text-fg-strong">{c}</b> })}</p>
            <div className="heat" role="img" aria-label={t('heat_label', { count: data.totalContributions })}>
              <Heatmap weeks={data.weeks.slice(-26)} gap={2} className="sm:hidden" />
              <Heatmap weeks={data.weeks} gap={3} className="hidden sm:block" />
            </div>
            <p className="heat-legend" aria-hidden="true">
              less <i className="lvl-0" /> <i className="lvl-1" /> <i className="lvl-2" /> <i className="lvl-3" />{' '}
              <i className="lvl-4" /> more
            </p>
          </>
        ) : (
          <p className="text-fg-muted">{t('unavailable')}</p>
        )}
        <p>
          <a className="link text-fg-muted" href="https://github.com/wjjasd" target="_blank" rel="noopener noreferrer">
            github.com/wjjasd <span aria-hidden="true">↗</span>
          </a>
        </p>
      </div>
    </TerminalSection>
  )
}
