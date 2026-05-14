'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, type Variants } from 'framer-motion'
import FadeIn from './FadeIn'

const skillGroups = [
  {
    label: 'Android / 모바일',
    skills: [
      'Kotlin', 'Java', 'Android Native', 'AOSP 커스터마이징',
      'MVVM', 'RxKotlin', 'Retrofit2', 'BLE',
      'Firebase Analytics', 'FCM', 'JitPack',
    ],
  },
  {
    label: '임베디드 / 하드웨어',
    skills: [
      'Linux 드라이버 개발', 'SubG (Sub-GHz)', 'MQTT', 'MODBUS',
      'BLE 프로토콜', 'PWM / GPIO',
    ],
  },
  {
    label: '웹 프론트엔드',
    skills: [
      'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion',
      'HTML / CSS / JS', 'jQuery', 'JSP', 'Web3Forms',
    ],
  },
  {
    label: '백엔드 / 인프라',
    skills: [
      'Node.js', 'Spring Framework', 'MyBatis', 'Apache Tomcat', 'REST API',
      'Docker', 'Amazon EC2', 'GCP Storage', 'NCP', 'Kafka', 'Redis', 'Vercel', 'Cloudflare Pages',
      'MySQL', 'SQLite', 'Room',
    ],
  },
  {
    label: '분석 / SEO',
    skills: [
      'Google Analytics 4', 'Google Search Console',
      'Open Graph', 'JSON-LD / Schema.org',
    ],
  },
  {
    label: '자동화 / 협업',
    skills: ['Python', 'tkinter', 'winreg', 'Git', 'Confluence', 'Slack'],
  },
]

const tagContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
}

const tagVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 8 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
}

function CertImage({ src, alt, label }: { src: string; alt: string; label: string }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen])

  return (
    <>
      <div className="flex flex-col gap-3">
        <button
          onClick={() => setIsOpen(true)}
          className="relative w-64 rounded-lg overflow-hidden border border-zinc-800 hover:border-zinc-600 transition-colors cursor-zoom-in"
        >
          <Image
            src={src}
            alt={alt}
            width={256}
            height={180}
            className="object-cover w-full"
          />
        </button>
        <span className="text-sm text-zinc-400">📜 {label}</span>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative max-w-2xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-10 right-0 text-zinc-400 hover:text-white transition-colors text-2xl leading-none"
              aria-label="닫기"
            >
              ✕
            </button>
            <div className="relative w-full rounded-xl overflow-hidden border border-zinc-800">
              <Image
                src={src}
                alt={alt}
                width={800}
                height={560}
                className="object-contain w-full"
              />
            </div>
            <p className="text-center text-zinc-400 text-sm mt-3">📜 {label}</p>
          </div>
        </div>
      )}
    </>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto w-full py-24">
        <FadeIn>
          <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-4">
            Skills
          </p>
          <h2 className="text-4xl font-bold text-white mb-16">기술 스택</h2>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: gi * 0.07, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            >
              <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
                {group.label}
              </h3>
              <motion.div
                className="flex flex-wrap gap-2"
                variants={tagContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {group.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={tagVariants}
                    className="px-3 py-1.5 text-sm bg-zinc-800/80 text-zinc-300 rounded-lg border border-zinc-700/50 hover:border-indigo-500/50 hover:text-white transition-colors"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/5">
          <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-6">자격증</h3>
          <div className="flex flex-wrap gap-6 items-start">
            <CertImage src="/license.jpg" alt="정보처리기사 자격증" label="정보처리기사 (2019.11)" />
          </div>
        </div>
      </div>
    </section>
  )
}
