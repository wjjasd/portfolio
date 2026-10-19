import { setRequestLocale } from "next-intl/server";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import GitHubContributions from "@/components/GitHubContributions";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // layout과 page는 병렬 렌더링되므로 page에서도 호출해야 정적 렌더링이 유지된다
  setRequestLocale(locale);

  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <GitHubContributions />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
