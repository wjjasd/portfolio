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
  const token = process.env.GITHUB_TOKEN
  if (!token) {
    console.error('[github-contributions] GITHUB_TOKEN not set')
    return NextResponse.json({ error: 'token_missing' }, { status: 502 })
  }

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 86400 },
    })
    const json = await res.json()

    // GitHub GraphQL은 에러가 있어도 HTTP 200 반환 — errors 필드 체크 필수
    if (json?.errors) {
      console.error('[github-contributions] GraphQL errors', JSON.stringify(json.errors))
      return NextResponse.json({ error: 'graphql_error', details: json.errors }, { status: 502 })
    }

    const calendar = json?.data?.user?.contributionsCollection?.contributionCalendar
    if (!calendar) {
      console.error('[github-contributions] No calendar data', JSON.stringify(json))
      return NextResponse.json({ error: 'no_data', raw: json }, { status: 502 })
    }

    return NextResponse.json(calendar)
  } catch (e) {
    console.error('[github-contributions] fetch error', e)
    return NextResponse.json({ error: 'fetch_failed', message: String(e) }, { status: 502 })
  }
}
