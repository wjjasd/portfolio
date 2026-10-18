'use client'

import { useState, type FormEvent, type ReactNode } from 'react'

type Status = 'idle' | 'sending' | 'success' | 'error'
type Result = Exclude<Status, 'idle'>

interface ContactFormProps {
  labelledBy: string
  /** 서버에서 렌더한 필드들 (비제어 input) */
  children: ReactNode
  /** 서버에서 렌더한 ⏺ Send(message) 로그 (aria-hidden) */
  log: Record<Result, ReactNode>
  messages: Record<Result, string> & { submit: string; hint: string }
}

// 개인정보는 Web3Forms로만 전송하고 저장하지 않는다
export default function ContactForm({ labelledBy, children, log, messages }: ContactFormProps) {
  const [status, setStatus] = useState<Status>('idle')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          name: data.get('name'),
          email: data.get('email'),
          message: data.get('message'),
        }),
      })
      const json: { success?: boolean } = await res.json()
      if (!json.success) throw new Error('web3forms')
      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const sending = status === 'sending'

  return (
    <form className="panel form" aria-labelledby={labelledBy} onSubmit={onSubmit}>
      {children}
      <div className="actions">
        <button type="submit" className="btn" disabled={sending}>
          {messages.submit} <span aria-hidden="true">↵</span>
        </button>
        <span className="text-[0.8125rem] text-fg-dim">{messages.hint}</span>
      </div>
      {status !== 'idle' && (
        <div className="send-log" aria-hidden="true">
          {log[status]}
          {!sending && <p className="body">{messages[status]}</p>}
        </div>
      )}
      <p className="sr-only" role="status">
        {status === 'idle' ? '' : messages[status]}
      </p>
    </form>
  )
}
