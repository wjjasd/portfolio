import Image from 'next/image'
import ProjectGallery from './ProjectGallery'

interface GalleryItem {
  type: 'image' | 'video'
  src: string
  alt: string
}

interface ProjectLink {
  label: string
  url: string
}

interface Project {
  id: string
  name: string
  oneLiner: string
  period: string
  org: string
  highlights: string[]
  techStack: string[]
  thumbnail: string | null
  gallery: GalleryItem[]
  links: ProjectLink[]
}

const projects: Project[] = [
  {
    id: 'gs25',
    name: 'IoT 통합 관제 시스템',
    oneLiner: 'GS편의점 60여 개 매장 실증 — AOSP 커스터마이징부터 Android 앱까지 단독 설계·구현',
    period: '2024.02 ~ 2026.06',
    org: '유타렉스',
    highlights: [
      'GS25 편의점 150대 / 60여 개 매장 실증 납품 (정부과제)',
      '데이터 누락률 4.0% → 0%, 에러→성공 복구율 37.1% → 100%',
      'AOSP Android 13 (RK3588) 커스터마이징 — IR·Relay 드라이버 개발',
    ],
    techStack: ['AOSP Android 13', 'Kotlin', 'BLE', 'MQTT', 'MODBUS', 'REST', 'RK3588'],
    thumbnail: '/projects/gs25/entire_system_architecture.png',
    gallery: [
      { type: 'image', src: '/projects/gs25/entire_system_architecture.png', alt: '전체 시스템 아키텍처' },
      { type: 'image', src: '/projects/gs25/android_architecture_20240520.png', alt: 'Android 앱 아키텍처' },
      { type: 'image', src: '/projects/gs25/aos_app_main.png.png', alt: '앱 메인 화면' },
      { type: 'image', src: '/projects/gs25/aos_app_settings.png', alt: '앱 설정 화면' },
      { type: 'image', src: '/projects/gs25/gs25.png', alt: 'GS25 편의점 설치 현장' },
      { type: 'image', src: '/projects/gs25/hw_spec.png', alt: '하드웨어 스펙' },
      { type: 'image', src: '/projects/gs25/mother_board.jpg', alt: '메인보드' },
      { type: 'image', src: '/projects/gs25/mother_board_uart.jpg', alt: '메인보드 UART' },
      { type: 'image', src: '/projects/gs25/pwm_signal_analyze.jpg', alt: 'PWM 신호 분석' },
      { type: 'image', src: '/projects/gs25/regular_report_before_fix.png', alt: '정기 리포트 (수정 전)' },
      { type: 'image', src: '/projects/gs25/regular_report_after_fix.png', alt: '정기 리포트 (수정 후)' },
      { type: 'image', src: '/projects/gs25/regular_report_debug_report_01.png', alt: '디버그 리포트 1' },
      { type: 'image', src: '/projects/gs25/regular_report_debug_report_02.png', alt: '디버그 리포트 2' },
      { type: 'image', src: '/projects/gs25/regular_report_debug_report_03.png', alt: '디버그 리포트 3' },
    ],
    links: [
      { label: 'SmartThings 연동 데모', url: 'https://youtube.com/shorts/9hzoaLreZBA?feature=share' },
      { label: 'Relay 제어 테스트', url: 'https://youtu.be/0JFZdDppL7Y' },
    ],
  },
  {
    id: 'myconnect',
    name: 'MyCONECT 호텔 서비스 플랫폼',
    oneLiner: 'Google Play 배포·유지보수 담당 — BLE·REST 기반 호텔 종합 솔루션',
    period: '2021.01 ~ 2023.04',
    org: '홀리츠',
    highlights: [
      'Google Play Store 출시 (체크인/아웃·룸서비스·결제 기능)',
      'BLE 기반 도어락·엘리베이터·객실 기기 원격 제어 구현',
      'BLE 개발 보조 도구 Bluetena 자체 제작',
    ],
    techStack: ['Android', 'Kotlin', 'Java', 'MVVM', 'RxKotlin', 'Retrofit2', 'BLE'],
    thumbnail: '/projects/myconnect/main_scene.png',
    gallery: [
      { type: 'image', src: '/projects/myconnect/main_scene.png', alt: 'MyCONECT 메인 화면' },
      { type: 'image', src: '/projects/myconnect/unlock_door.png', alt: '도어락 제어 화면' },
      { type: 'image', src: '/projects/myconnect/check_beacon_01.png', alt: '비콘 확인 화면 1' },
      { type: 'image', src: '/projects/myconnect/check_beacon_02.png', alt: '비콘 확인 화면 2' },
      { type: 'image', src: '/projects/myconnect/beacon_manager.png', alt: '비콘 관리 화면' },
      { type: 'image', src: '/projects/myconnect/bluetena01.webp', alt: 'Bluetena BLE 도구 1' },
      { type: 'image', src: '/projects/myconnect/bluetena02.webp', alt: 'Bluetena BLE 도구 2' },
      { type: 'image', src: '/projects/myconnect/bluetena03.jpg', alt: 'Bluetena BLE 도구 3' },
    ],
    links: [
      { label: '솔루션 소개', url: 'https://www.myconect.biz' },
    ],
  },
  {
    id: 'leak_detector',
    name: '누수 감지 시스템',
    oneLiner: 'SubG 무선 통신 기반 펌웨어 커스터마이징 + Android 앱 단독 설계·구현, 납품 완료',
    period: '2025.12 ~ 2026.01',
    org: '유타렉스',
    highlights: [
      'SubG(Sub-GHz) 무선 통신으로 장거리 저전력 실시간 감지',
      'Android 앱 단독 설계·구현 (감지 데이터 시각화·관리)',
      '납품 완료',
    ],
    techStack: ['Android', 'Kotlin', 'SubG (Sub-GHz)'],
    thumbnail: '/projects/leak_detector/aiot_exhibition.jpg',
    gallery: [
      { type: 'image', src: '/projects/leak_detector/aiot_exhibition.jpg', alt: 'AIoT 전시회 출품' },
      { type: 'video', src: '/projects/leak_detector/leak_detection_demo.mp4', alt: '누수 감지 데모 영상' },
    ],
    links: [],
  },
  {
    id: 'portfolio',
    name: '개인 포트폴리오 웹사이트',
    oneLiner: '기획·디자인·개발·배포 전 과정 단독 수행',
    period: '2026.04 ~ 2026.05',
    org: '개인 프로젝트',
    highlights: [
      'SSR/SSG 혼용 SEO 최적화·반응형 레이아웃 구현',
      'Framer Motion 애니메이션·Tistory RSS 연동 예정',
    ],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    thumbnail: null,
    gallery: [],
    links: [
      { label: 'GitHub', url: 'https://github.com/wjjasd/portfolio' }
    ],
  },
  {
    id: 'utarex_website',
    name: '회사 소개 웹사이트 (유타렉스)',
    oneLiner: '기획·디자인·개발·배포 전 과정 단독 수행 — 구글 검색 최상단 노출, 현재 운영 중',
    period: '2026.03 ~ 2026.04',
    org: '유타렉스',
    highlights: [
      '구글 검색 최상단 노출 달성',
      '초기 Node.js 백엔드 → Cloudflare Pages 정적 마이그레이션 주도',
      '기획·디자인·개발·배포 전 과정 단독 수행',
    ],
    techStack: ['HTML/CSS/JS', 'Cloudflare Pages', 'Node.js', 'SEO'],
    thumbnail: '/projects/utarex_website/website01.png',
    gallery: [
      { type: 'image', src: '/projects/utarex_website/website01.png', alt: '웹사이트 메인' },
      { type: 'image', src: '/projects/utarex_website/website02.png', alt: '웹사이트 서비스 섹션' },
      { type: 'image', src: '/projects/utarex_website/website03.png', alt: '웹사이트 하단' },
      { type: 'image', src: '/projects/utarex_website/utarex_web_seo.png', alt: '구글 검색 최상단 노출 결과' },
    ],
    links: [
      { label: '사이트 방문', url: 'https://utarex.com' },
    ],
  },
  {
    id: 'productivity_tools',
    name: '사내 생산성 툴',
    oneLiner: '동료들이 실제로 쓰는 메모 앱과 반복 집계 업무를 자동화한 Python 스크립트',
    period: '2026.04',
    org: '유타렉스',
    highlights: [
      'Daily Reporter: 일일 업무 일지 앱 (동료 실사용)',
      '제품 데이터 수집률 집계 자동화 (openpyxl)',
      'PyInstaller 단일 exe 배포, 시작프로그램 등록 지원',
    ],
    techStack: ['Python', 'tkinter', 'openpyxl', 'PyInstaller', 'winreg'],
    thumbnail: '/projects/productivity_tools/screenshot1.png',
    gallery: [
      { type: 'image', src: '/projects/productivity_tools/screenshot1.png', alt: 'Daily Reporter 화면 1' },
      { type: 'image', src: '/projects/productivity_tools/screenshot2.png', alt: 'Daily Reporter 화면 2' },
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/wjjasd/DailyReporter' },
    ],
  },
  {
    id: 'inout_count_bar',
    name: 'InOutCountBar',
    oneLiner: '사내 필요에서 출발해 JitPack 배포까지 — Android 오픈소스 커스텀 뷰 라이브러리',
    period: '2025.12',
    org: '유타렉스 → 오픈소스',
    highlights: [
      'IN·OUT·COUNT 세 지표를 단일 막대 그래프로 시각화',
      'JitPack 배포 완료 (com.github.wjjasd:InoutCountbar:1.0.1)',
      'XML 커스텀 속성·부드러운 애니메이션 지원',
    ],
    techStack: ['Kotlin', 'Android Custom View', 'JitPack'],
    thumbnail: '/projects/inout_count_bar/demo.gif',
    gallery: [
      { type: 'image', src: '/projects/inout_count_bar/demo.gif', alt: 'InOutCountBar 데모 GIF' },
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/wjjasd/InoutCountbar' },
      { label: 'JitPack', url: 'https://jitpack.io/#wjjasd/InoutCountbar' },
    ],
  },
]

function ProjectCard({ project }: { project: Project }) {
  const imageItems = project.gallery.filter((g) => g.type === 'image')
  const videoItems = project.gallery.filter((g) => g.type === 'video')

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-colors flex flex-col">
      {project.thumbnail ? (
        <div className="relative w-full aspect-video bg-zinc-800">
          <Image
            src={project.thumbnail}
            alt={`${project.name} 썸네일`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      ) : (
        <div className="w-full aspect-video bg-gradient-to-br from-indigo-900/30 to-zinc-900 flex items-center justify-center">
          <p className="text-indigo-400 text-sm font-medium text-center px-4">현재 보고 계시는 웹사이트가 라이브 데모입니다</p>
        </div>
      )}

      <div className="p-6 flex flex-col gap-4 flex-1">
        <div>
          <h3 className="text-lg font-bold text-white mb-1">{project.name}</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">{project.oneLiner}</p>
        </div>

        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-zinc-500 font-mono">
          <span>{project.period}</span>
          <span>·</span>
          <span>{project.org}</span>
        </div>

        <ul className="space-y-1.5">
          {project.highlights.map((h, i) => (
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
            <ProjectGallery items={imageItems} projectName={project.name} />
          )}
          {videoItems.length > 0 && (
            <ProjectGallery items={videoItems} projectName={project.name} buttonLabel="데모 영상" />
          )}
          {project.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto w-full py-24">
        <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-4">
          Projects
        </p>
        <h2 className="text-4xl font-bold text-white mb-16">프로젝트</h2>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
