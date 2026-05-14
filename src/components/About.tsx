'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import FadeIn from './FadeIn'

function ProfileImage() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen])

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-48 h-48 rounded-2xl overflow-hidden bg-zinc-800 border border-zinc-700 hover:border-indigo-500/60 transition-colors cursor-zoom-in group"
        aria-label="프로필 사진 크게 보기"
      >
        <Image
          src="/profile.jpg"
          alt="양기정 프로필 사진"
          width={192}
          height={192}
          className="object-cover w-full h-full group-hover:brightness-110 transition-[filter] duration-300"
        />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative max-w-sm w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-10 right-0 text-zinc-400 hover:text-white transition-colors text-2xl leading-none"
              aria-label="닫기"
            >
              ✕
            </button>
            <div className="relative w-full rounded-2xl overflow-hidden border border-zinc-800">
              <Image
                src="/profile.jpg"
                alt="양기정 프로필 사진"
                width={480}
                height={480}
                className="object-cover w-full"
              />
            </div>
            <p className="text-center text-zinc-400 text-sm mt-3">양기정 · Product Engineer</p>
          </div>
        </div>
      )}
    </>
  )
}

export default function About() {
  return (
    <section id="about" className="px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto w-full py-24">
        <FadeIn>
          <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-4">
            About
          </p>
          <h2 className="text-4xl font-bold text-white mb-16">자기소개</h2>
        </FadeIn>

        <div className="grid md:grid-cols-[240px_1fr] gap-12 items-start">
          <FadeIn delay={0.1}>
            <div className="flex flex-col items-center md:items-start gap-4">
              <ProfileImage />
              <div className="text-center md:text-left">
                <p className="text-white font-semibold text-lg">양기정</p>
                <p className="text-indigo-400 text-sm mt-0.5">Product Engineer</p>
                <p className="text-zinc-500 text-xs mt-0.5">정보처리기사</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="space-y-6">
              <p className="text-zinc-300 text-lg leading-relaxed">
                아이디어를 실제 제품으로 바꾸는 일을 합니다.
              </p>
              <p className="text-zinc-300 text-lg leading-relaxed">
                2017년 서빙 업무 중 주문 기록 앱을 만든 것을 시작으로, Android, AOSP, 임베디드, 웹, 서버, 배포와 운영까지 제품 개발의 전 과정을 경험해왔습니다.
              </p>
              <p className="text-zinc-300 text-lg leading-relaxed">
                단순히 기능을 구현하는 것을 넘어, 사용자의 문제를 실제 환경에서 안정적으로 해결하는 데 집중합니다.
              </p>
              <p className="text-zinc-300 text-lg leading-relaxed">
                현재는 AIoT 솔루션 기업에서 RK3588 기반 Android·Linux 게이트웨이 개발부터 Modbus·BLE·Sub-G 센서 연동, 클라우드 관제 플랫폼 연계까지 IoT 제품 개발 전반을 담당하고 있습니다.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                {['Android / 모바일', '임베디드 / 하드웨어', '웹 프론트엔드', '백엔드 / 인프라', '분석 / SEO', '자동화 / 협업'].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm bg-zinc-800 text-zinc-300 rounded-full"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
