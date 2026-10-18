import { getTranslations } from 'next-intl/server'
import Glyph from '@/components/terminal/Glyph'

export default async function Footer() {
  const t = await getTranslations('hero')

  return (
    <footer className="site-foot">
      <div className="mx-auto max-w-[1040px] px-4 md:px-8">
        <p className="live" aria-hidden="true">
          <span className="ps1">
            <Glyph name="prompt" />
          </span>{' '}
          <span className="block-cursor" />
        </p>
        <p className="foot-meta">
          © 2026 {t('name')} · Next.js + Vercel ·{' '}
          <a className="link" href="https://github.com/wjjasd/portfolio" target="_blank" rel="noopener noreferrer">
            source <span aria-hidden="true">↗</span>
          </a>
        </p>
      </div>
    </footer>
  )
}
