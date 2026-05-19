'use client'

import { motion } from 'framer-motion'
import FadeIn from './FadeIn'
import type { BlogPost } from './Blog'

export default function BlogCards({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null

  return (
    <>
      <FadeIn>
        <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-4">
          Blog
        </p>
        <h2 className="text-4xl font-bold text-white mb-16">블로그</h2>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {posts.map((post, i) => (
          <motion.a
            key={post.link}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="group flex flex-col rounded-xl border border-white/10 hover:border-indigo-500/30 bg-zinc-900/50 overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500/5"
          >
            <div className="aspect-video w-full overflow-hidden bg-zinc-800">
              {post.thumbnail ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-indigo-900/40 to-zinc-800 flex items-center justify-center">
                  <span className="text-indigo-400/40 text-4xl font-bold">Y</span>
                </div>
              )}
            </div>

            <div className="flex flex-col flex-1 p-5 gap-2">
              <p className="text-zinc-500 text-xs font-mono">
                {post.pubDate
                  ? new Date(post.pubDate).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : ''}
              </p>
              <h3 className="text-white text-sm font-semibold leading-snug line-clamp-2 group-hover:text-indigo-300 transition-colors">
                {post.title}
              </h3>
            </div>
          </motion.a>
        ))}
      </div>

      <div className="flex justify-center">
        <a
          href="https://dev-yangkj.tistory.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:border-indigo-500/40 text-sm transition-all duration-200"
        >
          블로그 전체 보기
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </>
  )
}
