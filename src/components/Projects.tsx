'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import ProjectGallery from './ProjectGallery'
import FadeIn from './FadeIn'

interface GalleryItem {
  type: 'image' | 'video'
  src: string
  alt: { ko: string; en: string }
}

interface ProjectLink {
  label: { ko: string; en: string }
  url: string
}

interface ProjectI18n {
  name: string
  oneLiner: string
  org: string
  highlights: string[]
}

interface Project {
  id: string
  ko: ProjectI18n
  en: ProjectI18n
  period: string
  techStack: string[]
  thumbnail: string | null
  gallery: GalleryItem[]
  links: ProjectLink[]
}

const projects: Project[] = [
  {
    id: 'gs25',
    ko: {
      name: 'IoT 통합 관제 시스템',
      oneLiner: 'GS편의점 60여 개 매장 실증 — AOSP 커스터마이징부터 Android 앱까지 단독 설계·구현',
      org: '유타렉스',
      highlights: [
        'GS25 편의점 150대 / 60여 개 매장 실증 납품 (정부과제)',
        '데이터 누락률 4.0% → 0%, 에러→성공 복구율 37.1% → 100%',
        'AOSP Android 13 (RK3588) 커스터마이징 — IR·Relay 드라이버 개발',
      ],
    },
    en: {
      name: 'IoT Integrated Control System',
      oneLiner: 'GS25 Convenience Store Pilot (60+ stores) — Solo design and implementation from AOSP customization to Android app',
      org: 'UTAREX',
      highlights: [
        'GS25 pilot: 150 devices across 60+ stores (government-funded project)',
        'Data loss rate: 4.0% → 0%, error-to-success recovery: 37.1% → 100%',
        'AOSP Android 13 (RK3588) customization — IR/Relay driver development',
      ],
    },
    period: '2024.02 ~ 2026.06',
    techStack: ['AOSP Android 13', 'Kotlin', 'BLE', 'MQTT', 'MODBUS', 'REST', 'RK3588'],
    thumbnail: '/projects/gs25/entire_system_architecture.png',
    gallery: [
      { type: 'image', src: '/projects/gs25/entire_system_architecture.png', alt: { ko: '전체 시스템 아키텍처', en: 'Full System Architecture' } },
      { type: 'image', src: '/projects/gs25/android_architecture_20240520.png', alt: { ko: 'Android 앱 아키텍처', en: 'Android App Architecture' } },
      { type: 'image', src: '/projects/gs25/aos_app_main.png.png', alt: { ko: '앱 메인 화면', en: 'App Main Screen' } },
      { type: 'image', src: '/projects/gs25/aos_app_settings.png', alt: { ko: '앱 설정 화면', en: 'App Settings Screen' } },
      { type: 'image', src: '/projects/gs25/gs25.png', alt: { ko: 'GS25 편의점 설치 현장', en: 'GS25 Store Installation' } },
      { type: 'image', src: '/projects/gs25/hw_spec.png', alt: { ko: '하드웨어 스펙', en: 'Hardware Specifications' } },
      { type: 'image', src: '/projects/gs25/mother_board.jpg', alt: { ko: '메인보드', en: 'Motherboard' } },
      { type: 'image', src: '/projects/gs25/mother_board_uart.jpg', alt: { ko: '메인보드 UART', en: 'Motherboard UART' } },
      { type: 'image', src: '/projects/gs25/pwm_signal_analyze.jpg', alt: { ko: 'PWM 신호 분석', en: 'PWM Signal Analysis' } },
      { type: 'image', src: '/projects/gs25/regular_report_before_fix.png', alt: { ko: '정기 리포트 (수정 전)', en: 'Regular Report (Before Fix)' } },
      { type: 'image', src: '/projects/gs25/regular_report_after_fix.png', alt: { ko: '정기 리포트 (수정 후)', en: 'Regular Report (After Fix)' } },
      { type: 'image', src: '/projects/gs25/regular_report_debug_report_01.png', alt: { ko: '디버그 리포트 1', en: 'Debug Report 1' } },
      { type: 'image', src: '/projects/gs25/regular_report_debug_report_02.png', alt: { ko: '디버그 리포트 2', en: 'Debug Report 2' } },
      { type: 'image', src: '/projects/gs25/regular_report_debug_report_03.png', alt: { ko: '디버그 리포트 3', en: 'Debug Report 3' } },
    ],
    links: [
      { label: { ko: 'SmartThings 연동 데모', en: 'SmartThings Integration Demo' }, url: 'https://youtube.com/shorts/9hzoaLreZBA?feature=share' },
      { label: { ko: 'Relay 제어 테스트', en: 'Relay Control Test' }, url: 'https://youtu.be/0JFZdDppL7Y' },
    ],
  },
  {
    id: 'myconnect',
    ko: {
      name: 'MyCONECT 호텔 서비스 플랫폼',
      oneLiner: 'Google Play 배포·유지보수 담당 — BLE·REST 기반 호텔 종합 솔루션',
      org: '홀리츠',
      highlights: [
        'Google Play Store 출시 (체크인/아웃·룸서비스·결제 기능)',
        'BLE 기반 도어락·엘리베이터·객실 기기 원격 제어 구현',
        'BLE 개발 보조 도구 Bluetena 자체 제작',
      ],
    },
    en: {
      name: 'MyCONECT Hotel Service Platform',
      oneLiner: 'Google Play deployment and maintenance — BLE/REST-based comprehensive hotel solution',
      org: 'Holich',
      highlights: [
        'Released on Google Play Store (check-in/out, room service, payment)',
        'BLE-based door lock, elevator, and room device remote control',
        'Built in-house BLE dev tool Bluetena',
      ],
    },
    period: '2021.01 ~ 2023.04',
    techStack: ['Android', 'Kotlin', 'Java', 'MVVM', 'RxKotlin', 'Retrofit2', 'BLE'],
    thumbnail: '/projects/myconnect/main_scene.png',
    gallery: [
      { type: 'image', src: '/projects/myconnect/main_scene.png', alt: { ko: 'MyCONECT 메인 화면', en: 'MyCONECT Main Screen' } },
      { type: 'image', src: '/projects/myconnect/unlock_door.png', alt: { ko: '도어락 제어 화면', en: 'Door Lock Control Screen' } },
      { type: 'image', src: '/projects/myconnect/check_beacon_01.png', alt: { ko: '비콘 확인 화면 1', en: 'Beacon Check Screen 1' } },
      { type: 'image', src: '/projects/myconnect/check_beacon_02.png', alt: { ko: '비콘 확인 화면 2', en: 'Beacon Check Screen 2' } },
      { type: 'image', src: '/projects/myconnect/beacon_manager.png', alt: { ko: '비콘 관리 화면', en: 'Beacon Management Screen' } },
      { type: 'image', src: '/projects/myconnect/bluetena01.webp', alt: { ko: 'Bluetena BLE 도구 1', en: 'Bluetena BLE Tool 1' } },
      { type: 'image', src: '/projects/myconnect/bluetena02.webp', alt: { ko: 'Bluetena BLE 도구 2', en: 'Bluetena BLE Tool 2' } },
      { type: 'image', src: '/projects/myconnect/bluetena03.jpg', alt: { ko: 'Bluetena BLE 도구 3', en: 'Bluetena BLE Tool 3' } },
    ],
    links: [
      { label: { ko: '솔루션 소개', en: 'Solution Overview' }, url: 'https://www.myconect.biz' },
    ],
  },
  {
    id: 'leak_detector',
    ko: {
      name: '누수 감지 시스템',
      oneLiner: 'SubG 무선 통신 기반 펌웨어 커스터마이징 + Android 앱 단독 설계·구현, 납품 완료',
      org: '유타렉스',
      highlights: [
        'SubG(Sub-GHz) 무선 통신으로 장거리 저전력 실시간 감지',
        'Android 앱 단독 설계·구현 (감지 데이터 시각화·관리)',
        '납품 완료',
      ],
    },
    en: {
      name: 'Leak Detection System',
      oneLiner: 'SubG wireless firmware customization + Android app solo design and implementation, delivered',
      org: 'UTAREX',
      highlights: [
        'Sub-GHz wireless communication for long-range, low-power real-time detection',
        'Android app solo design and implementation (detection data visualization and management)',
        'Delivered to client',
      ],
    },
    period: '2025.12 ~ 2026.01',
    techStack: ['Android', 'Kotlin', 'SubG (Sub-GHz)'],
    thumbnail: '/projects/leak_detector/aiot_exhibition.jpg',
    gallery: [
      { type: 'image', src: '/projects/leak_detector/aiot_exhibition.jpg', alt: { ko: 'AIoT 전시회 출품', en: 'AIoT Exhibition' } },
      { type: 'video', src: '/projects/leak_detector/leak_detection_demo.mp4', alt: { ko: '누수 감지 데모 영상', en: 'Leak Detection Demo Video' } },
    ],
    links: [],
  },
  {
    id: 'portfolio',
    ko: {
      name: '개인 포트폴리오 웹사이트',
      oneLiner: '기획·디자인·개발·배포 전 과정 단독 수행',
      org: '개인 프로젝트',
      highlights: [
        'SSR/SSG 혼용 SEO 최적화·반응형 레이아웃 구현',
        'Framer Motion 애니메이션 적용',
      ],
    },
    en: {
      name: 'Personal Portfolio Website',
      oneLiner: 'Solo end-to-end: planning, design, development, and deployment',
      org: 'Personal Project',
      highlights: [
        'SEO optimization with SSR/SSG mix and responsive layout',
        'Framer Motion animations throughout',
      ],
    },
    period: '2026.04 ~ 2026.05',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    thumbnail: null,
    gallery: [],
    links: [
      { label: { ko: 'GitHub', en: 'GitHub' }, url: 'https://github.com/wjjasd/portfolio' }
    ],
  },
  {
    id: 'utarex_website',
    ko: {
      name: '회사 소개 웹사이트 (유타렉스)',
      oneLiner: '기획·디자인·개발·배포 전 과정 단독 수행 — 구글 검색 최상단 노출, 현재 운영 중',
      org: '유타렉스',
      highlights: [
        '구글 검색 최상단 노출 달성',
        '초기 Node.js 백엔드 → Cloudflare Pages 정적 마이그레이션 주도',
        '기획·디자인·개발·배포 전 과정 단독 수행',
      ],
    },
    en: {
      name: 'Company Website (UTAREX)',
      oneLiner: 'Solo end-to-end — ranked #1 on Google Search, currently live',
      org: 'UTAREX',
      highlights: [
        'Achieved #1 ranking on Google Search',
        'Led migration from Node.js backend to Cloudflare Pages static site',
        'Solo end-to-end: planning, design, development, and deployment',
      ],
    },
    period: '2026.03 ~ 2026.04',
    techStack: ['HTML/CSS/JS', 'Cloudflare Pages', 'Node.js', 'SEO'],
    thumbnail: '/projects/utarex_website/website01.png',
    gallery: [
      { type: 'image', src: '/projects/utarex_website/website01.png', alt: { ko: '웹사이트 메인', en: 'Website Main' } },
      { type: 'image', src: '/projects/utarex_website/website02.png', alt: { ko: '웹사이트 서비스 섹션', en: 'Website Services Section' } },
      { type: 'image', src: '/projects/utarex_website/website03.png', alt: { ko: '웹사이트 하단', en: 'Website Footer' } },
      { type: 'image', src: '/projects/utarex_website/utarex_web_seo.png', alt: { ko: '구글 검색 최상단 노출 결과', en: 'Google Search #1 Ranking Result' } },
    ],
    links: [
      { label: { ko: '사이트 방문', en: 'Visit Site' }, url: 'https://utarex.com' },
    ],
  },
  {
    id: 'productivity_tools',
    ko: {
      name: '사내 생산성 툴',
      oneLiner: '동료들이 실제로 쓰는 메모 앱과 반복 집계 업무를 자동화한 Python 스크립트',
      org: '유타렉스',
      highlights: [
        'Daily Reporter: 일일 업무 일지 앱 (동료 실사용)',
        '제품 데이터 수집률 집계 자동화 (openpyxl)',
        'PyInstaller 단일 exe 배포, 시작프로그램 등록 지원',
      ],
    },
    en: {
      name: 'In-house Productivity Tools',
      oneLiner: 'Memo app colleagues actually use and Python scripts automating repetitive data collection',
      org: 'UTAREX',
      highlights: [
        'Daily Reporter: daily work log app (used by teammates)',
        'Automated product data collection rate aggregation (openpyxl)',
        'Single-exe PyInstaller distribution with startup registration',
      ],
    },
    period: '2026.04',
    techStack: ['Python', 'tkinter', 'openpyxl', 'PyInstaller', 'winreg'],
    thumbnail: '/projects/productivity_tools/screenshot1.png',
    gallery: [
      { type: 'image', src: '/projects/productivity_tools/screenshot1.png', alt: { ko: 'Daily Reporter 화면 1', en: 'Daily Reporter Screen 1' } },
      { type: 'image', src: '/projects/productivity_tools/screenshot2.png', alt: { ko: 'Daily Reporter 화면 2', en: 'Daily Reporter Screen 2' } },
    ],
    links: [
      { label: { ko: 'GitHub', en: 'GitHub' }, url: 'https://github.com/wjjasd/DailyReporter' },
    ],
  },
  {
    id: 'inout_count_bar',
    ko: {
      name: 'InOutCountBar',
      oneLiner: '사내 필요에서 출발해 JitPack 배포까지 — Android 오픈소스 커스텀 뷰 라이브러리',
      org: '유타렉스 → 오픈소스',
      highlights: [
        'IN·OUT·COUNT 세 지표를 단일 막대 그래프로 시각화',
        'JitPack 배포 완료 (com.github.wjjasd:InoutCountbar:1.0.1)',
        'XML 커스텀 속성·부드러운 애니메이션 지원',
      ],
    },
    en: {
      name: 'InOutCountBar',
      oneLiner: 'From internal need to JitPack release — Android open-source custom view library',
      org: 'UTAREX → Open Source',
      highlights: [
        'Visualizes IN, OUT, and COUNT metrics in a single bar chart',
        'Released on JitPack (com.github.wjjasd:InoutCountbar:1.0.1)',
        'XML custom attributes and smooth animation support',
      ],
    },
    period: '2025.12',
    techStack: ['Kotlin', 'Android Custom View', 'JitPack'],
    thumbnail: '/projects/inout_count_bar/demo.gif',
    gallery: [
      { type: 'image', src: '/projects/inout_count_bar/demo.gif', alt: { ko: 'InOutCountBar 데모 GIF', en: 'InOutCountBar Demo GIF' } },
    ],
    links: [
      { label: { ko: 'GitHub', en: 'GitHub' }, url: 'https://github.com/wjjasd/InoutCountbar' },
      { label: { ko: 'JitPack', en: 'JitPack' }, url: 'https://jitpack.io/#wjjasd/InoutCountbar' },
    ],
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
}

function ProjectCard({ project, index, locale }: { project: Project; index: number; locale: string }) {
  const t = useTranslations('projects')
  const lang = locale === 'ko' ? 'ko' : 'en'
  const data = project[lang]

  const localizedGallery = project.gallery.map((g) => ({
    ...g,
    alt: g.alt[lang],
  }))
  const imageItems = localizedGallery.filter((g) => g.type === 'image')
  const videoItems = localizedGallery.filter((g) => g.type === 'video')

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover={{ y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
      viewport={{ once: true, amount: 0.1 }}
      className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-600 hover:shadow-xl hover:shadow-black/30 transition-colors flex flex-col"
    >
      {project.thumbnail ? (
        <div className="relative w-full aspect-video bg-zinc-800">
          <Image
            src={project.thumbnail}
            alt={`${data.name} ${t('thumbnail_alt')}`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      ) : (
        <div className="w-full aspect-video bg-gradient-to-br from-indigo-900/30 to-zinc-900 flex items-center justify-center">
          <p className="text-indigo-400 text-sm font-medium text-center px-4">{t('live_demo')}</p>
        </div>
      )}

      <div className="p-6 flex flex-col gap-4 flex-1">
        <div>
          <h3 className="text-lg font-bold text-white mb-1">{data.name}</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">{data.oneLiner}</p>
        </div>

        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-zinc-500 font-mono">
          <span>{project.period}</span>
          <span>·</span>
          <span>{data.org}</span>
        </div>

        <ul className="space-y-1.5">
          {data.highlights.map((h, i) => (
            <li key={i} className="flex gap-2 text-zinc-400 text-sm leading-relaxed">
              <span className="text-indigo-500 shrink-0 mt-0.5">▸</span>
              {h}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs bg-zinc-800 text-zinc-300 rounded-md border border-zinc-700/50"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 items-center mt-auto pt-2 border-t border-zinc-800">
          {imageItems.length > 0 && (
            <ProjectGallery
              items={imageItems}
              projectName={data.name}
              buttonLabel={t('image_button', { count: imageItems.length })}
            />
          )}
          {videoItems.length > 0 && (
            <ProjectGallery items={videoItems} projectName={data.name} buttonLabel={t('demo_video')} />
          )}
          {project.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              {link.label[lang]} ↗
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const t = useTranslations('projects')
  const locale = useLocale()

  return (
    <section id="projects" className="px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto w-full py-24">
        <FadeIn>
          <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-4">
            {t('section_label')}
          </p>
          <h2 className="text-4xl font-bold text-white mb-16">{t('title')}</h2>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  )
}
