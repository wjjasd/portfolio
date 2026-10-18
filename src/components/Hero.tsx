import type { ReactNode } from 'react'
import { getTranslations } from 'next-intl/server'
import Glyph from '@/components/terminal/Glyph'
import PromptLine from '@/components/terminal/PromptLine'
import Spinner from '@/components/terminal/Spinner'
import MenuHotkeys from '@/components/terminal/MenuHotkeys'
import { reveal } from '@/components/terminal/OutputBlock'
import { CMD, SPIN_LABEL } from '@/components/terminal/commands'
import { experiences, calcTotalMonths } from '@/data/experience'

const FACTS = ['now', 'career', 'proof', 'impact', 'ops'] as const

const richTags = {
  b: (chunks: ReactNode) => <b>{chunks}</b>,
  muted: (chunks: ReactNode) => <span className="text-fg-muted">{chunks}</span>,
  ok: (chunks: ReactNode) => <b className="text-success">{chunks}</b>,
}

export default async function Hero() {
  const t = await getTranslations('hero')
  const tTerm = await getTranslations('terminal')

  const totalMonths = calcTotalMonths(experiences)
  const career = { years: Math.floor(totalMonths / 12), months: totalMonths % 12 }

  const menu = [
    { href: '#projects', label: t('cta_projects'), external: false },
    { href: 'https://github.com/wjjasd', label: 'GitHub', external: true },
    { href: '#contact', label: t('cta_contact'), external: false },
  ]

  return (
    <section id="top" aria-labelledby="hero-name" className="pt-8 pb-12 md:pt-12 md:pb-[72px]">
      <div className="mx-auto max-w-[1040px] px-4 md:px-8">
        {/* LCP 앵커 (ADR ③-2): 애니메이션 대상 아님, 첫 페인트부터 opacity 1 */}
        <div className="rounded-lg border border-accent-line bg-surface px-5 py-6 md:p-8">
          <p className="text-sm text-fg-muted">
            <span className="text-accent">
              <Glyph name="spin-4" />
            </span>{' '}
            {tTerm('welcome')}
          </p>
          <h1 id="hero-name" className="mt-4 leading-[1.1]">
            <span className="block text-[clamp(2.5rem,10vw,4.5rem)] font-bold tracking-[-0.02em] text-fg-strong">
              {t('name')}
            </span>
            <span className="mt-3 block text-base font-semibold tracking-[0.02em] text-accent">{t('role')}</span>
          </h1>
          <p className="mt-4 max-w-[34ch] text-lg leading-[1.6] text-fg md:max-w-none md:text-[1.375rem]">
            {t('tagline')}
          </p>
          <p className="mt-4 text-sm text-fg-dim">Android · AOSP · IoT · Web</p>
        </div>

        <div className="mt-8">
          <PromptLine cmd={CMD.hero} variant="hero" />
          <div className="facts">
            <Spinner label={SPIN_LABEL.thinking} elapsed="(1s)" start={600} cycle={600} iterations={1} intro />
            {FACTS.map((key, i) => (
              <p key={key} className="row" {...reveal(i)}>
                <span className="k">{t(`facts.${key}_k`)}</span>
                <span>{t.rich(`facts.${key}_v`, { ...richTags, ...career })}</span>
              </p>
            ))}
          </div>

          <nav className="menu" aria-label={t('menu_label')} {...reveal(FACTS.length)}>
            <p className="menu-q">{t('menu_q')}</p>
            <ol>
              {menu.map((item, i) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    data-key={i + 1}
                    {...(item.external && { target: '_blank', rel: 'noopener noreferrer' })}
                  >
                    <span className="ptr" aria-hidden="true">
                      <Glyph name="prompt" />
                    </span>
                    <span className="num" aria-hidden="true">
                      {i + 1}.
                    </span>
                    {item.label}
                    {item.external && (
                      <>
                        <span aria-hidden="true"> ↗</span>
                        <span className="sr-only"> {t('new_tab')}</span>
                      </>
                    )}
                  </a>
                </li>
              ))}
            </ol>
            <p className="menu-hint" aria-hidden="true">
              {t('menu_hint')}
            </p>
          </nav>
          <MenuHotkeys />
        </div>
      </div>
    </section>
  )
}
