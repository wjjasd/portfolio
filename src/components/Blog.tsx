import BlogCards from './BlogCards'

export interface BlogPost {
  title: string
  link: string
  pubDate: string
  thumbnail: string | null
}

function extractTag(xml: string, tag: string): string {
  const m = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'))
  if (!m) return ''
  return m[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim()
}

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
}

function extractFirstImageSrc(html: string): string | null {
  const decoded = decodeHtmlEntities(html)
  const m = decoded.match(/<img[^>]+?src=["']([^"']+)["']/i)
  return m ? m[1] : null
}

async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch('https://dev-yangkj.tistory.com/rss', {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []
    const xml = await res.text()

    const itemMatches = xml.match(/<item>([\s\S]*?)<\/item>/g) ?? []
    return itemMatches.slice(0, 3).map((item) => ({
      title: extractTag(item, 'title'),
      link: extractTag(item, 'link'),
      pubDate: extractTag(item, 'pubDate'),
      thumbnail: extractFirstImageSrc(extractTag(item, 'description')),
    }))
  } catch {
    return []
  }
}

export default async function Blog() {
  const posts = await fetchBlogPosts()
  if (posts.length === 0) return null
  return (
    <section id="blog" className="px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto w-full py-24">
        <BlogCards posts={posts} />
      </div>
    </section>
  )
}
