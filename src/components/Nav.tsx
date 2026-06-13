'use client'

import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'

const navHrefs = [
  { key: 'about', href: '#about' },
  { key: 'projects', href: '#projects' },
  { key: 'skills', href: '#skills' },
  { key: 'experience', href: '#experience' },
  { key: 'blog', href: '#blog' },
  { key: 'contact', href: '#contact' },
] as const

export default function Nav() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function switchLocale() {
    // localePrefix: 'as-needed' → 기본 locale(ko)은 prefix 없음
    const next = locale === 'ko' ? 'en' : 'ko'
    const basePath = pathname.replace(/^\/(ko|en)(?=\/|$)/, '') || '/'
    const newPath = next === 'ko' ? basePath : `/en${basePath === '/' ? '' : basePath}`
    router.replace(newPath, { scroll: false })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${
        scrolled
          ? 'bg-zinc-950/90 border-white/10 shadow-lg shadow-black/20'
          : 'bg-zinc-950/80 border-white/5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-white font-bold text-xl tracking-tight">
          YKJ
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navHrefs.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                {t(item.key)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={switchLocale}
            className="px-3 py-1 text-xs border border-zinc-600 hover:border-indigo-400 text-zinc-400 hover:text-white rounded-full transition-colors"
          >
            {locale === 'ko' ? 'EN' : 'KO'}
          </button>

          <button
            className="md:hidden text-zinc-400 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={t('menu_open')}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-zinc-950/95 backdrop-blur-md border-b border-white/10">
          <ul className="flex flex-col px-6 py-4 gap-4">
            {navHrefs.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm text-zinc-300 hover:text-white transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {t(item.key)}
                </a>
              </li>
            ))}
          </ul>
          <div className="px-6 pb-4">
            <button
              onClick={() => { switchLocale(); setMenuOpen(false) }}
              className="px-3 py-1 text-xs border border-zinc-600 hover:border-indigo-400 text-zinc-400 hover:text-white rounded-full transition-colors"
            >
              {locale === 'ko' ? 'EN' : 'KO'}
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
