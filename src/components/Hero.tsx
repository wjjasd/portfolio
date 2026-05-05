export default function Hero() {
  return (
    <section className="min-h-screen flex items-center px-6 pt-16">
      <div className="max-w-6xl mx-auto w-full py-24">
        <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-6">
          Product Engineer
        </p>
        <h1 className="text-7xl md:text-9xl font-bold text-white tracking-tight mb-8 leading-none">
          양기정
        </h1>
        <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl leading-relaxed mb-12">
          기획·설계부터 배포·운영까지,
          <br />
          제품 전 사이클을 직접 이끄는 프로덕트 엔지니어
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="#projects"
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-medium transition-colors"
          >
            프로젝트 보기
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
            연락하기
          </a>
        </div>
      </div>
    </section>
  )
}
