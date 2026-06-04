'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import FadeIn from './FadeIn'

interface ContactItem {
  labelKey: string
  display: string
  displayKey?: string
  href: string
  icon: React.ReactNode
}

function EnvelopeIcon() {
  return (
    <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg className="w-8 h-8 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg className="w-8 h-8 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 23.2 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function PenIcon() {
  return (
    <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>
  )
}

const contactItems: ContactItem[] = [
  { labelKey: 'email_label', display: 'wjjasd@gmail.com', href: 'mailto:wjjasd@gmail.com', icon: <EnvelopeIcon /> },
  { labelKey: 'github', display: 'github.com/wjjasd', href: 'https://github.com/wjjasd', icon: <GitHubIcon /> },
  { labelKey: 'linkedin_label', displayKey: 'linkedin_display', display: '', href: 'https://www.linkedin.com/in/kjyang1994', icon: <LinkedInIcon /> },
  { labelKey: 'blog_label', display: 'dev-yangkj.tistory.com', href: 'https://dev-yangkj.tistory.com/', icon: <PenIcon /> },
]

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
}

function ContactCard({ item, index }: { item: ContactItem; index: number }) {
  const t = useTranslations('contact')
  const isEmail = item.href.startsWith('mailto:')
  const label = item.labelKey === 'github' ? 'GitHub' : t(item.labelKey as Parameters<typeof t>[0])
  const display = item.displayKey ? t(item.displayKey as Parameters<typeof t>[0]) : item.display

  return (
    <motion.a
      href={item.href}
      target={isEmail ? undefined : '_blank'}
      rel={isEmail ? undefined : 'noopener noreferrer'}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover={{ y: -4 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.2 }}
      className="group relative bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-600 hover:bg-zinc-800/50 transition-colors flex flex-col"
    >
      {item.icon}
      <p className="text-sm font-semibold text-white mt-4 mb-1">{label}</p>
      <p className="text-sm text-zinc-400">{display}</p>
      <span className="absolute top-4 right-4 text-zinc-600 group-hover:text-indigo-400 transition-colors text-lg leading-none">
        ↗
      </span>
    </motion.a>
  )
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

function ContactForm() {
  const t = useTranslations('contact')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          name,
          email,
          message,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setName('')
        setEmail('')
        setMessage('')
        setTimeout(() => setStatus('idle'), 4000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 4000)
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <FadeIn delay={0.1}>
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col gap-5"
      >
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-400 font-medium" htmlFor="cf-name">
              {t('form_name')}
            </label>
            <input
              id="cf-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('form_name_placeholder')}
              className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-400 font-medium" htmlFor="cf-email">
              {t('form_email')}
            </label>
            <input
              id="cf-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-zinc-400 font-medium" htmlFor="cf-message">
            {t('form_message')}
          </label>
          <textarea
            id="cf-message"
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t('form_message_placeholder')}
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-full transition-colors"
          >
            {status === 'submitting' ? t('form_submitting') : t('form_submit')}
          </button>

          {status === 'success' && (
            <motion.p
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm text-emerald-400"
            >
              {t('form_success')}
            </motion.p>
          )}
          {status === 'error' && (
            <motion.p
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm text-red-400"
            >
              {t('form_error')}
            </motion.p>
          )}
        </div>
      </form>
    </FadeIn>
  )
}

export default function Contact() {
  const t = useTranslations('contact')

  return (
    <section id="contact" className="px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto w-full py-24">
        <FadeIn>
          <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-4">{t('section_label')}</p>
          <h2 className="text-4xl font-bold text-white mb-4">{t('title')}</h2>
          <p className="text-zinc-400 text-lg mb-12">{t('subtitle')}</p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {contactItems.map((item, i) => (
            <ContactCard key={item.labelKey} item={item} index={i} />
          ))}
        </div>

        <ContactForm />
      </div>
    </section>
  )
}
