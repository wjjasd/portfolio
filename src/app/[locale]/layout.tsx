import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import { NextIntlClientProvider, type AbstractIntlMessages } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import JsonLd from "@/components/JsonLd";
import TerminalRuntime from "@/components/terminal/TerminalRuntime";
import "../globals.css";

const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// 첫 페인트 전에 터미널 재생 여부 결정 (ADR ③-4). 속성이 없으면 정적 완성 화면
const TERM_BOOT = `(function(){try{var d=document.documentElement;if(!sessionStorage.getItem("kj-term")&&matchMedia("(prefers-reduced-motion: no-preference)").matches){sessionStorage.setItem("kj-term","1");d.setAttribute("data-term","play")}}catch(e){}})()`;

// GA4: dataLayer 명령은 즉시 쌓고 gtag.js는 첫 상호작용 또는 load 3초 뒤 idle에 받는다.
// lazyOnload보다 늦춰서 gtag 실행(긴 작업)이 초기 로딩 구간(TBT)에 끼지 않게 한다
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GA_BOOT = GA_ID
  ? `(function(){var id=${JSON.stringify(GA_ID)};var w=window;w.dataLayer=w.dataLayer||[];function gtag(){w.dataLayer.push(arguments)}w.gtag=gtag;gtag("js",new Date());gtag("config",id);var ev=["pointerdown","keydown","touchstart","scroll"],done=0;function load(){if(done)return;done=1;ev.forEach(function(e){w.removeEventListener(e,load,true)});var s=document.createElement("script");s.async=true;s.src="https://www.googletagmanager.com/gtag/js?id="+encodeURIComponent(id);document.head.appendChild(s)}ev.forEach(function(e){w.addEventListener(e,load,{capture:true,passive:true})});w.addEventListener("load",function(){setTimeout(function(){(w.requestIdleCallback||setTimeout)(load)},3000)})})()`
  : null;

function pick(messages: AbstractIntlMessages, ns: string, keys: readonly string[]): AbstractIntlMessages {
  const source = messages[ns];
  if (typeof source !== "object") return {};
  return Object.fromEntries(keys.filter((k) => k in source).map((k) => [k, source[k]]));
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isKo = locale === 'ko';

  const title = isKo
    ? "양기정 (kjyang) | Product Engineer · 개발자 포트폴리오"
    : "KiJeong Yang (kjyang) | Product Engineer · Developer Portfolio";
  const description = isKo
    ? "Android·AOSP·임베디드부터 웹 개발·배포·운영까지, 제품 전 과정을 직접 만드는 개발자 양기정의 포트폴리오입니다."
    : "Portfolio of KiJeong Yang, a product engineer who builds end-to-end from Android, AOSP, and embedded systems to web development and deployment.";

  return {
    metadataBase: new URL("https://kjyang.kro.kr"),
    title: { default: title, template: `%s | 양기정 (kjyang)` },
    description,
    alternates: {
      canonical: isKo ? `https://kjyang.kro.kr/` : `https://kjyang.kro.kr/${locale}`,
      languages: {
        'ko': 'https://kjyang.kro.kr/',
        'en': 'https://kjyang.kro.kr/en',
      },
    },
    openGraph: {
      type: "website",
      url: isKo ? `https://kjyang.kro.kr/` : `https://kjyang.kro.kr/${locale}`,
      title,
      description,
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "양기정 (kjyang) | Product Engineer" }],
      locale: isKo ? "ko_KR" : "en_US",
      siteName: isKo ? "양기정 포트폴리오" : "KiJeong Yang Portfolio",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as 'ko' | 'en')) notFound();
  // 없으면 next-intl이 headers()로 locale을 읽어 페이지 전체가 동적 렌더링된다
  setRequestLocale(locale);

  const messages = await getMessages();
  // 클라이언트에서 useTranslations를 쓰는 곳만 직렬화: Nav(nav), ProjectDialog·ProjectModalBody(projects 모달 키, terminal sr 라벨)
  const clientMessages: AbstractIntlMessages = {
    nav: pick(messages, "nav", ["label", "lang", "skip"]),
    projects: pick(messages, "projects", [
      "m_background", "m_roles", "m_results", "m_stack", "m_media", "m_links",
      "g_prev", "g_next", "m_loading", "m_error",
    ]),
    terminal: pick(messages, "terminal", ["status_done", "status_in_progress", "status_todo", "diff_before", "diff_after"]),
  };

  return (
    <html lang={locale} className={`${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: TERM_BOOT }} />
        {GA_BOOT && <script dangerouslySetInnerHTML={{ __html: GA_BOOT }} />}
      </head>
      <body className="min-h-full flex flex-col bg-bg text-fg font-mono">
        <NextIntlClientProvider messages={clientMessages}>
          <JsonLd locale={locale} />
          {children}
        </NextIntlClientProvider>
        <TerminalRuntime />
      </body>
    </html>
  );
}
