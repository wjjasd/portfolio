'use client'

import { useEffect, useRef, type ReactNode } from 'react'

interface ProjectDialogProps {
  /** 모달 h3 id */
  labelledBy: string
  trigger: ReactNode
  triggerClassName?: string
  /** 서버에서 렌더한 헤더(⏺ Read + 닫기 버튼)와 본문 */
  head: ReactNode
  children: ReactNode
}

// 프로젝트 상세 모달. 카드 아무 곳(링크·버튼·텍스트 선택 제외) 클릭으로도 연다.
// 열기 전에 트리거로 포커스를 옮겨 두면 <dialog>가 닫을 때 그 버튼으로 포커스를 돌려준다.
export default function ProjectDialog({ labelledBy, trigger, triggerClassName, head, children }: ProjectDialogProps) {
  const btnRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const btn = btnRef.current
    const card = btn?.closest('article')
    if (!btn || !card) return
    const onClick = (e: MouseEvent) => {
      if (!(e.target instanceof Element) || e.target.closest('a, button, dialog')) return
      if (String(window.getSelection() ?? '')) return
      btn.focus({ preventScroll: true })
      dialogRef.current?.showModal()
    }
    card.addEventListener('click', onClick)
    return () => card.removeEventListener('click', onClick)
  }, [])

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        className={triggerClassName}
        aria-haspopup="dialog"
        onClick={() => dialogRef.current?.showModal()}
      >
        {trigger}
      </button>
      <dialog
        ref={dialogRef}
        aria-labelledby={labelledBy}
        className="term-dialog"
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close()
        }}
      >
        {head}
        {children}
      </dialog>
    </>
  )
}
