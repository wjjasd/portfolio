'use client'

import { useState } from 'react'
import Image from 'next/image'

interface GalleryItem {
  type: 'image' | 'video'
  src: string
  alt: string
}

interface ProjectGalleryProps {
  items: GalleryItem[]
  labels: { prev: string; next: string }
}

// 모달 안 미디어 뷰어. 한 장씩만 렌더하고 전환은 CSS fade
export default function ProjectGallery({ items, labels }: ProjectGalleryProps) {
  const [index, setIndex] = useState(0)
  const current = items[index]
  const many = items.length > 1
  const go = (step: number) => setIndex((i) => (i + step + items.length) % items.length)

  return (
    <figure
      className="viewer"
      onKeyDown={(e) => {
        if (!many) return
        if (e.key === 'ArrowLeft') go(-1)
        if (e.key === 'ArrowRight') go(1)
      }}
    >
      <div className="v-frame" key={current.src}>
        {current.type === 'video' ? (
          <video src={current.src} controls preload="none" aria-label={current.alt} />
        ) : (
          // 닫힌 dialog는 display:none이라 lazy 이미지는 모달을 열 때 받는다
          <Image src={current.src} alt={current.alt} fill sizes="(max-width: 760px) 100vw, 720px" />
        )}
      </div>
      <figcaption className="v-bar">
        {many && (
          <button type="button" className="m-close" onClick={() => go(-1)} aria-label={labels.prev}>
            <span aria-hidden="true">←</span>
          </button>
        )}
        <span className="v-cap">
          <span className="text-fg-dim" aria-hidden={!many}>
            {index + 1}/{items.length}
          </span>{' '}
          {current.alt}
        </span>
        {many && (
          <button type="button" className="m-close" onClick={() => go(1)} aria-label={labels.next}>
            <span aria-hidden="true">→</span>
          </button>
        )}
      </figcaption>
    </figure>
  )
}
