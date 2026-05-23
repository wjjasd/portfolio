'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import FadeIn from './FadeIn'

function ProfileImage() {
  const t = useTranslations('about')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen])

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-48 h-48 rounded-2xl overflow-hidden bg-zinc-800 border border-zinc-700 hover:border-indigo-500/60 transition-colors cursor-zoom-in group"
        aria-label={t('profile_zoom')}
      >
        <Image
          src="/profile.jpg"
          alt={t('profile_caption')}
          width={192}
          height={192}
          className="object-cover w-full h-full group-hover:brightness-110 transition-[filter] duration-300"
        />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative max-w-sm w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-10 right-0 text-zinc-400 hover:text-white transition-colors text-2xl leading-none"
              aria-label={t('close')}
            >
              ✕
            </button>
            <div className="relative w-full rounded-2xl overflow-hidden border border-zinc-800">
              <Image
                src="/profile.jpg"
                alt={t('profile_caption')}
                width={480}
                height={480}
                className="object-cover w-full"
              />
            </div>
            <p className="text-center text-zinc-400 text-sm mt-3">{t('profile_caption')}</p>
          </div>
        </div>
      )}
    </>
  )
}

export default function About() {
  const t = useTranslations('about')
  const tags = t.raw('tags') as string[]

  return (
    <section id="about" className="px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto w-full py-24">
        <FadeIn>
          <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-4">
            {t('section_label')}
          </p>
          <h2 className="text-4xl font-bold text-white mb-16">{t('title')}</h2>
        </FadeIn>

        <div className="grid md:grid-cols-[240px_1fr] gap-12 items-start">
          <FadeIn delay={0.1}>
            <div className="flex flex-col items-center md:items-start gap-4">
              <ProfileImage />
              <div className="text-center md:text-left">
                <p className="text-white font-semibold text-lg">{t('name')}</p>
                <p className="text-indigo-400 text-sm mt-0.5">{t('role')}</p>
                <p className="text-zinc-500 text-xs mt-0.5">{t('cert')}</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="space-y-6">
              <p className="text-zinc-300 text-lg leading-relaxed">{t('p1')}</p>
              <p className="text-zinc-300 text-lg leading-relaxed">{t('p2')}</p>
              <p className="text-zinc-300 text-lg leading-relaxed">{t('p3')}</p>
              <p className="text-zinc-300 text-lg leading-relaxed">{t('p4')}</p>

              <div className="flex flex-wrap gap-3 pt-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm bg-zinc-800 text-zinc-300 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
