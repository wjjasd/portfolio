'use client'

import { Fragment, useEffect, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

// 링크 라벨·경로는 터미널 디렉토리명이라 번역하지 않는다 (ADR ④)
const SECTIONS = [
  { id: 'about', dir: 'about' },
  { id: 'projects', dir: 'projects' },
  { id: 'skills', dir: 'skills' },
  { id: 'experience', dir: 'career' },
  { id: 'github', dir: 'github' },
  { id: 'blog', dir: 'blog' },
  { id: 'contact', dir: 'contact' },
] as const

type Section = (typeof SECTIONS)[number]

export default function Nav() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [current, setCurrent] = useState<Section | null>(null)

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          setCurrent(SECTIONS.find((s) => s.id === entry.target.id) ?? null)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    document.querySelectorAll('main > section[id]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  function switchLocale(next: (typeof routing.locales)[number]) {
    if (next === locale) return
    router.replace(pathname, { scroll: false, locale: next })
  }

  return (
    <>
      <a
        href="#main"
        className="absolute left-2 -top-12 z-[60] rounded-sm bg-accent px-2.5 py-1.5 text-sm font-bold text-accent-ink focus:top-2"
      >
        {t('skip')}
      </a>
      <header className="sticky top-0 z-40 border-b border-line bg-bg/88 backdrop-blur-[8px]">
        <div className="mx-auto flex h-[48px] max-w-[1040px] items-center gap-4 px-4 md:px-8">
          <p className="hidden shrink-0 whitespace-nowrap text-[0.8125rem] text-fg-dim sm:block" aria-hidden="true">
            <span className="text-fg-muted">kjyang@kjyang.kro.kr</span>:
            <span className="text-fg">{current ? `~/${current.dir}` : '~'}</span>
          </p>
          <nav
            aria-label={t('label')}
            className="-ml-2 flex min-w-0 flex-1 gap-0.5 overflow-x-auto [scrollbar-width:none] sm:ml-auto sm:flex-none [&::-webkit-scrollbar]:hidden"
          >
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                aria-current={current?.id === s.id ? 'location' : undefined}
                className="inline-flex min-h-9 shrink-0 items-center whitespace-nowrap rounded-sm px-2 text-[0.8125rem] text-fg-muted transition-colors hover:text-fg-strong [&[aria-current]]:bg-accent-soft [&[aria-current]]:text-fg-strong"
              >
                {s.dir}
              </a>
            ))}
          </nav>
          <div role="group" aria-label={t('lang')} className="flex shrink-0 items-center text-[0.8125rem] text-fg-dim">
            {routing.locales.map((l, i) => (
              <Fragment key={l}>
                {i > 0 && <span aria-hidden="true">/</span>}
                <button
                  type="button"
                  lang={l}
                  aria-current={l === locale ? 'true' : undefined}
                  onClick={() => switchLocale(l)}
                  className="min-h-9 px-1.5 transition-colors hover:text-fg-strong [&[aria-current]]:text-fg-strong"
                >
                  {l}
                </button>
              </Fragment>
            ))}
          </div>
        </div>
      </header>
    </>
  )
}
