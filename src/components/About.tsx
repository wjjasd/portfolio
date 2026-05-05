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
              비전공자로, 2017년 서빙 아르바이트 중 메모장과 볼펜이 불편해서
              직접 주문 앱을 만든 것이 시작이었습니다.
            </p>
            <p className="text-zinc-300 text-lg leading-relaxed">
              &ldquo;필요하면 직접 만든다&rdquo;는 그 태도가 지금까지 이어져,
              AOSP 커스터마이징·Android 앱·웹 프론트엔드·배포·운영까지
              제품의 전 사이클을 경험해왔습니다.
            </p>
            <p className="text-zinc-300 text-lg leading-relaxed">
              새로운 기술에 대한 거부감이 낮고, 항상 사용자와 제품을 기준으로
              판단하기 때문에 필요한 기술이라면 빠르게 학습하고 적용합니다.
              지금은 단순 구현을 넘어, 설계와 프로젝트 관리 역량을 더해 팀과
              제품 모두에 기여하는 방향으로 성장하고 있습니다.
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
