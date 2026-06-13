import { getTranslations } from 'next-intl/server'
import { HeroContainer, HeroItem, MagneticButton } from '@/components/HeroAnimations'

export default async function Hero() {
  const t = await getTranslations('hero')

  return (
    <section className="relative min-h-screen flex items-center px-6 pt-16 overflow-hidden">
      <HeroContainer>
        <HeroItem as="p" className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-6">
          {t('role')}
        </HeroItem>
        <HeroItem as="h1" className="text-7xl md:text-9xl font-bold text-white tracking-tight mb-8 leading-none">
          {t('name')}
        </HeroItem>
        {/* LCP 요소: 애니메이션 대상에서 제외하여 서버 렌더 즉시 표시 */}
        <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl leading-relaxed mb-12">
          {t('tagline')}
          <br />
          {t('tagline2')}
        </p>
        <HeroItem className="flex flex-wrap gap-4">
          <MagneticButton
            href="#projects"
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-medium transition-colors"
          >
            {t('cta_projects')}
          </MagneticButton>
          <MagneticButton
            href="https://github.com/wjjasd"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border border-white/20 hover:border-white/50 text-white rounded-full font-medium transition-colors"
          >
            GitHub
          </MagneticButton>
          <MagneticButton
            href="#contact"
            className="px-8 py-3 border border-white/20 hover:border-white/50 text-white rounded-full font-medium transition-colors"
          >
            {t('cta_contact')}
          </MagneticButton>
        </HeroItem>
      </HeroContainer>
    </section>
  )
}
