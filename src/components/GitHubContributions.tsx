import { getTranslations } from 'next-intl/server'
import ContributionCalendar from './ContributionCalendar'

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

const query = `{
  user(login: "wjjasd") {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
            color
          }
        }
      }
    }
  }
}`

async function fetchContributions(): Promise<GitHubCalendarData | null> {
  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 86400 },
    })
    if (!res.ok) return null
    const json = await res.json()
    const calendar = json?.data?.user?.contributionsCollection?.contributionCalendar
    if (!calendar) return null
    return calendar as GitHubCalendarData
  } catch {
    return null
  }
}

export default async function GitHubContributions() {
  const [data, t] = await Promise.all([
    fetchContributions(),
    getTranslations('github'),
  ])
  if (!data) return null

  const labels = {
    sectionLabel: t('section_label'),
    title: t('title'),
    total: t('total', { count: data.totalContributions }),
    subtitle: t('subtitle'),
    tooltipPrefix: '',
  }

  return (
    <section id="github" className="px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto w-full py-24">
        <ContributionCalendar
          totalContributions={data.totalContributions}
          weeks={data.weeks}
          labels={labels}
        />
      </div>
    </section>
  )
}
