'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

interface GalleryItem {
  type: 'image' | 'video'
  src: string
  alt: string
}

interface ProjectGalleryProps {
  items: GalleryItem[]
  projectName: string
  buttonLabel?: string
}

export default function ProjectGallery({ items, projectName, buttonLabel }: ProjectGalleryProps) {
  const t = useTranslations('gallery')
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const close = useCallback(() => setIsOpen(false), [])
  const prev = useCallback(() => setCurrentIndex((i) => (i - 1 + items.length) % items.length), [items.length])
  const next = useCallback(() => setCurrentIndex((i) => (i + 1) % items.length), [items.length])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, close, prev, next])

  const open = (index = 0) => {
    setCurrentIndex(index)
    setIsOpen(true)
  }

  const current = items[currentIndex]

  return (
    <>
      <button
        onClick={() => open(0)}
        className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
      >
        {buttonLabel ?? t('image_button', { count: items.length })}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center"
          onClick={close}
        >
          <div
            className="relative max-w-4xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={close}
              className="absolute -top-10 right-0 text-zinc-400 hover:text-white transition-colors text-2xl leading-none"
              aria-label={t('close')}
            >
              ✕
            </button>

            <div className="relative bg-zinc-950 rounded-xl overflow-hidden">
              {current.type === 'video' ? (
                <video
                  key={current.src}
                  src={current.src}
                  controls
                  className="w-full max-h-[70vh] object-contain"
                />
              ) : (
                <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                  <Image
                    key={current.src}
                    src={current.src}
                    alt={current.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 896px) 100vw, 896px"
                  />
                </div>
              )}

              {items.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
                    aria-label={t('prev')}
                  >
                    ‹
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
                    aria-label={t('next')}
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            <div className="mt-3 flex flex-col items-center gap-2">
              <p className="text-zinc-400 text-sm">{current.alt}</p>
              {items.length > 1 && (
                <div className="flex gap-1.5">
                  {items.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        i === currentIndex ? 'bg-indigo-400' : 'bg-zinc-600 hover:bg-zinc-400'
                      }`}
                      aria-label={t('dot_label', { index: i + 1 })}
                    />
                  ))}
                </div>
              )}
            </div>

            <p className="text-center text-zinc-500 text-xs mt-2">{projectName} — {currentIndex + 1} / {items.length}</p>
          </div>
        </div>
      )}
    </>
  )
}
