export interface Skill {
  name: string
  /** 실무 주력 — 굵게 표시 (ADR ⑦, 시안 기준. Preview에서 사장님 재확인) */
  core?: boolean
}

export interface SkillGroup {
  /** ls 디렉토리명. 터미널 경로라 번역하지 않는다 (ADR ④) */
  dir: string
  skills: Skill[]
}

const core = (name: string): Skill => ({ name, core: true })

export const skillGroups: SkillGroup[] = [
  {
    dir: 'android/',
    skills: [
      core('Kotlin'), { name: 'Java' }, core('Android Native'), core('AOSP Customization'),
      { name: 'MVVM' }, { name: 'RxKotlin' }, { name: 'Retrofit2' }, core('BLE'),
      { name: 'Firebase Analytics' }, { name: 'FCM' }, { name: 'JitPack' },
    ],
  },
  {
    dir: 'embedded/',
    skills: [
      core('Linux Driver Dev'), { name: 'SubG (Sub-GHz)' }, core('MQTT'), core('MODBUS'),
      { name: 'BLE Protocol' }, { name: 'PWM / GPIO' },
    ],
  },
  {
    dir: 'web/',
    skills: [
      { name: 'React' }, core('Next.js'), core('TypeScript'), { name: 'Tailwind CSS' },
      { name: 'React Server Components' }, { name: 'HTML / CSS / JS' }, { name: 'jQuery' }, { name: 'JSP' },
      { name: 'Web3Forms' },
    ],
  },
  {
    dir: 'backend-infra/',
    skills: [
      { name: 'Node.js' }, { name: 'Spring Framework' }, { name: 'MyBatis' }, { name: 'Apache Tomcat' },
      { name: 'REST API' }, { name: 'Docker' }, { name: 'Amazon EC2' }, { name: 'GCP Storage' },
      { name: 'NCP' }, { name: 'Kafka' }, { name: 'Redis' }, { name: 'Vercel' },
      { name: 'Cloudflare Pages' }, { name: 'MySQL' }, { name: 'SQLite' }, { name: 'Room' },
    ],
  },
  {
    dir: 'analytics-seo/',
    skills: [
      { name: 'Google Analytics 4' }, { name: 'Search Console' }, { name: 'Open Graph' }, { name: 'JSON-LD' },
    ],
  },
  {
    dir: 'automation/',
    skills: [
      core('Python'), core('MCP'), { name: 'Gitea REST API' }, { name: 'tkinter' },
      { name: 'winreg' }, { name: 'Git' }, { name: 'Confluence' }, { name: 'Slack' },
    ],
  },
]
