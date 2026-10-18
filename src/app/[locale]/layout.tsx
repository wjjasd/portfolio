import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import JsonLd from "@/components/JsonLd";
import TerminalRuntime from "@/components/terminal/TerminalRuntime";
import "../globals.css";

const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// 첫 페인트 전에 터미널 재생 여부 결정 (ADR ③-4). 속성이 없으면 정적 완성 화면
const TERM_BOOT = `(function(){try{var d=document.documentElement;if(!sessionStorage.getItem("kj-term")&&matchMedia("(prefers-reduced-motion: no-preference)").matches){sessionStorage.setItem("kj-term","1");d.setAttribute("data-term","play")}}catch(e){}})()`;

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

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: TERM_BOOT }} />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-fg font-mono">
        <NextIntlClientProvider messages={messages}>
          <JsonLd locale={locale} />
          {children}
        </NextIntlClientProvider>
        <TerminalRuntime />
      </body>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        strategy="lazyOnload"
      />
      <Script id="ga-init" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
        `}
      </Script>
    </html>
  );
}
