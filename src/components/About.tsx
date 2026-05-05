import Image from 'next/image'

export default function About() {
  return (
    <section id="about" className="px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto w-full py-24">
        <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-4">
          About
        </p>
        <h2 className="text-4xl font-bold text-white mb-16">자기소개</h2>

        <div className="grid md:grid-cols-[240px_1fr] gap-12 items-start">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="w-48 h-48 rounded-2xl overflow-hidden bg-zinc-800 flex items-center justify-center">
              <Image
                src="/profile.jpg"
                alt="양기정 프로필 사진"
                width={192}
                height={192}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="text-center md:text-left">
              <p className="text-white font-semibold text-lg">양기정</p>
              <p className="text-indigo-400 text-sm mt-0.5">Product Engineer</p>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-zinc-300 text-lg leading-relaxed">
              불편함을 발견하면 직접 만드는 개발자입니다.
            </p>
            <p className="text-zinc-300 text-lg leading-relaxed">
              2017년 서빙 업무 중 주문 기록 앱을 만든 것을 시작으로 Android, AOSP, 임베디드, 웹, 배포와 운영까지 다양한 제품 개발의 전 과정을 경험해왔습니다.
            </p>
            <p className="text-zinc-300 text-lg leading-relaxed">
              사용자와 제품을 기준으로 판단하며, 단순 구현을 넘어 문제의 원인을 분석하고 지속 가능한 방식으로 해결하는 데 집중하고 있습니다.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              {['Android', 'AOSP', 'Kotlin', 'Next.js', 'TypeScript', 'IoT', '임베디드'].map(
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
        </div>
      </div>
    </section>
  )
}
