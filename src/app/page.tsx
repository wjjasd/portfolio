import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <section id="projects" className="px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto w-full py-24">
            <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-4">Projects</p>
            <h2 className="text-4xl font-bold text-white mb-8">프로젝트</h2>
            <p className="text-zinc-400 text-lg leading-relaxed">준비 중</p>
          </div>
        </section>
        <Skills />
        <Experience />
        <section id="contact" className="px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto w-full py-24">
            <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-4">Contact</p>
            <h2 className="text-4xl font-bold text-white mb-8">연락하기</h2>
            <p className="text-zinc-400 text-lg leading-relaxed">준비 중</p>
          </div>
        </section>
      </main>
    </>
  );
}
