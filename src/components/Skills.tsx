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

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-wrap gap-6 text-sm text-zinc-500">
          <span>🏅 정보처리기사 (2019.11)</span>
        </div>
      </div>
    </section>
  )
}
