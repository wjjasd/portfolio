'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
}

export default function Hero() {
  const t = useTranslations('hero')

  return (
    <section className="min-h-screen flex items-center px-6 pt-16">
      <motion.div
        className="max-w-6xl mx-auto w-full py-24"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={item}
          className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-6"
        >
          {t('role')}
        </motion.p>
        <motion.h1
          variants={item}
          className="text-7xl md:text-9xl font-bold text-white tracking-tight mb-8 leading-none"
        >
          {t('name')}
        </motion.h1>
        <motion.p
          variants={item}
          className="text-xl md:text-2xl text-zinc-400 max-w-2xl leading-relaxed mb-12"
        >
          {t('tagline')}
          <br />
          {t('tagline2')}
        </motion.p>
        <motion.div variants={item} className="flex flex-wrap gap-4">
          <a
            href="#projects"
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-medium transition-colors"
          >
            {t('cta_projects')}
          </a>
          <a
            href="https://github.com/wjjasd"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border border-white/20 hover:border-white/50 text-white rounded-full font-medium transition-colors"
          >
            GitHub
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-white/20 hover:border-white/50 text-white rounded-full font-medium transition-colors"
          >
            {t('cta_contact')}
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
