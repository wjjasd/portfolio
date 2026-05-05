'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

const skillGroups = [
  {
    label: 'Android / 모바일',
    skills: [
      'Kotlin', 'Java', 'Android Native', 'AOSP 커스터마이징',
      'MVVM', 'RxKotlin', 'Retrofit2', 'BLE', 'Room',
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
      'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion',
      'HTML / CSS / JS', 'jQuery', 'JSP', 'RSS 파싱',
    ],
  },
  {
    label: '백엔드 / 인프라',
    skills: [
      'Node.js', 'Spring Framework', 'MyBatis', 'REST API',
      'Docker', 'Amazon EC2', 'NCP', 'Kafka', 'Redis',
      'Vercel', 'Cloudflare Pages',
    ],
  },
  {
    label: '데이터베이스',
    skills: ['MySQL', 'SQLite', 'Room'],
  },
  {
    label: '자동화 / 협업',
    skills: ['Python', 'Git', 'Confluence', 'Slack'],
  },
]

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
        <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-4">
          Skills
        </p>
        <h2 className="text-4xl font-bold text-white mb-16">기술 스택</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm bg-zinc-800/80 text-zinc-300 rounded-lg border border-zinc-700/50 hover:border-indigo-500/50 hover:text-white transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
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
