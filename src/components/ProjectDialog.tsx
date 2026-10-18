'use client'

import { useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react'
import { useTranslations } from 'next-intl'

type Body = ComponentType<{ slug: string }>

// 본문 청크는 모든 모달이 공유한다. 번들러 런타임이 실패한 청크 로드를 캐시하므로 재시도 대신 새로고침 안내
let bodyChunk: Promise<Body> | null = null
function loadBody() {
  bodyChunk ??= import('./ProjectModalBody').then((m) => m.default)
  return bodyChunk
}

interface ProjectDialogProps {
  slug: string
  /** 모달 h3 id */
  labelledBy: string
  trigger: ReactNode
  triggerClassName?: string
  /** 서버에서 렌더한 헤더(⏺ Read + 닫기 버튼) */
  head: ReactNode
  /** 서버에서 렌더한 제목(h3)·메타 줄. 본문 로딩 중에도 aria-labelledby가 가리킬 대상 */
  title: ReactNode
}

// 프로젝트 상세 모달. 카드 아무 곳(링크·버튼·텍스트 선택 제외) 클릭으로도 연다.
// 열기 전에 트리거로 포커스를 옮겨 두면 <dialog>가 닫을 때 그 버튼으로 포커스를 돌려준다.
export default function ProjectDialog({ slug, labelledBy, trigger, triggerClassName, head, title }: ProjectDialogProps) {
  const t = useTranslations('projects')
  const btnRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [loaded, setLoaded] = useState<{ Component: Body } | null>(null)
  const [failed, setFailed] = useState(false)

  function open() {
    dialogRef.current?.showModal()
    if (loaded) return
    loadBody().then(
      (Component) => setLoaded({ Component }),
      () => setFailed(true),
    )
  }

  useEffect(() => {
    const btn = btnRef.current
    const card = btn?.closest('article')
    if (!btn || !card) return
    const prefetch = () => void loadBody().catch(() => {})
    const onClick = (e: MouseEvent) => {
      if (!(e.target instanceof Element) || e.target.closest('a, button, dialog')) return
      if (String(window.getSelection() ?? '')) return
      btn.focus({ preventScroll: true })
      btn.click()
    }
    card.addEventListener('click', onClick)
    card.addEventListener('pointerenter', prefetch, { once: true })
    card.addEventListener('focusin', prefetch, { once: true })
    return () => {
      card.removeEventListener('click', onClick)
      card.removeEventListener('pointerenter', prefetch)
      card.removeEventListener('focusin', prefetch)
    }
  }, [])

  const state = loaded ? 'ok' : failed ? 'fail' : 'pending'

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        className={triggerClassName}
        aria-haspopup="dialog"
        onClick={open}
      >
        {trigger}
      </button>
      <dialog
        ref={dialogRef}
        aria-labelledby={labelledBy}
        aria-busy={state === 'pending'}
        className="term-dialog"
        data-state={state}
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close()
        }}
      >
        {head}
        <div className="m-body">
          {title}
          {loaded ? (
            <loaded.Component slug={slug} />
          ) : (
            <p className="m-pending" role="status">
              {failed ? t('m_error') : <span className="shimmer">{t('m_loading')}</span>}
            </p>
          )}
        </div>
      </dialog>
    </>
  )
}
