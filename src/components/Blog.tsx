import { getTranslations } from 'next-intl/server'
import TerminalSection from '@/components/terminal/TerminalSection'
import { CMD } from '@/components/terminal/commands'

const BLOG_URL = 'https://dev-yangkj.tistory.com/'
const POST_COUNT = 5

interface BlogPost {
  title: string
  link: string
  /** YYYY-MM-DD (KST) */
  date: string
}

function extractTag(xml: string, tag: string): string {
  const m = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'))
  if (!m) return ''
  return m[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim()
}

// 서버 시간대와 무관하게 글 작성 기준(KST) 날짜로 표기
const kstDate = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit' })

function toDate(pubDate: string): string {
  const d = new Date(pubDate)
  return Number.isNaN(d.getTime()) ? '' : kstDate.format(d)
}

async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch('https://dev-yangkj.tistory.com/rss', {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []
    const xml = await res.text()

    const itemMatches = xml.match(/<item>([\s\S]*?)<\/item>/g) ?? []
    return itemMatches.slice(0, POST_COUNT).map((item) => ({
      title: extractTag(item, 'title'),
      link: extractTag(item, 'link'),
      date: toDate(extractTag(item, 'pubDate')),
    }))
  } catch {
    return []
  }
}

export default async function Blog() {
  const [posts, t] = await Promise.all([fetchBlogPosts(), getTranslations('blog')])

  return (
    <TerminalSection id="blog" cmd={CMD.blog} title={t('title')}>
      <div className="out">
        {posts.length > 0 ? (
          <ul className="feed">
            {posts.map((post) => (
              <li key={post.link}>
                <time dateTime={post.date}>{post.date}</time>
                <a href={post.link} target="_blank" rel="noopener noreferrer">
                  {post.title} <span className="arrow" aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-fg-muted">{t('empty')}</p>
        )}
        <p>
          <a className="link text-fg-muted" href={BLOG_URL} target="_blank" rel="noopener noreferrer">
            {t('view_all')} <span aria-hidden="true">↗</span>
          </a>
        </p>
      </div>
    </TerminalSection>
  )
}
