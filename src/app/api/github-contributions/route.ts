import { NextResponse } from 'next/server'

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

export const revalidate = 86400

export async function GET() {
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
    if (!res.ok) {
      const errBody = await res.text()
      console.error('[github-contributions] GitHub API error', res.status, errBody)
      return NextResponse.json({ error: res.status, body: errBody }, { status: 502 })
    }
    const json = await res.json()
    const calendar = json?.data?.user?.contributionsCollection?.contributionCalendar
    if (!calendar) return NextResponse.json(null, { status: 502 })
    return NextResponse.json(calendar)
  } catch {
    return NextResponse.json(null, { status: 502 })
  }
}
