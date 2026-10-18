'use client'

import { useRef, type ReactNode } from 'react'
import Image from 'next/image'

interface ImageDialogProps {
  src: string
  alt: string
  width: number
  height: number
  caption: string
  closeLabel: string
  /** 트리거 버튼 접근성 이름. 없으면 children 텍스트 */
  triggerLabel?: string
  triggerClassName?: string
  dialogClassName?: string
  /** 트리거 내용 (서버에서 렌더된 썸네일·텍스트) */
  children: ReactNode
}

// 프로필·자격증 확대. <dialog>가 Esc·포커스 가두기·닫을 때 포커스 복귀를 처리한다
export default function ImageDialog({
  src,
  alt,
  width,
  height,
  caption,
  closeLabel,
  triggerLabel,
  triggerClassName,
  dialogClassName,
  children,
}: ImageDialogProps) {
  const ref = useRef<HTMLDialogElement>(null)

  return (
    <>
      <button
        type="button"
        className={triggerClassName}
        aria-label={triggerLabel}
        aria-haspopup="dialog"
        onClick={() => ref.current?.showModal()}
      >
        {children}
      </button>
      <dialog
        ref={ref}
        aria-label={caption}
        className={dialogClassName ? `term-dialog ${dialogClassName}` : 'term-dialog'}
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close()
        }}
      >
        <div className="m-head">
          <p className="m-caption">{caption}</p>
          <form method="dialog">
            <button type="submit" className="m-close" aria-label={closeLabel}>
              <span aria-hidden="true">esc ✕</span>
            </button>
          </form>
        </div>
        {/* 닫힌 dialog는 display:none이라 lazy 이미지는 처음 열 때 받는다 */}
        <Image src={src} alt={alt} width={width} height={height} className="m-image" />
      </dialog>
    </>
  )
}
