import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import JsonLd from "@/components/JsonLd";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "Android·AOSP·임베디드부터 웹 개발·배포·운영까지, 제품 전 과정을 직접 만드는 개발자 양기정의 포트폴리오입니다.";

export const metadata: Metadata = {
  metadataBase: new URL("https://kjyang.kro.kr"),
  title: {
    default: "양기정 (kjyang) | Product Engineer · 개발자 포트폴리오",
    template: "%s | 양기정 (kjyang)",
  },
  description,
  keywords: [
    "양기정",
    "kjyang",
    "개발자",
    "포트폴리오",
    "Product Engineer",
    "Android 개발자",
    "AOSP",
    "임베디드 개발자",
    "웹 개발자",
    "풀스택 개발자",
  ],
  alternates: {
    canonical: "https://kjyang.kro.kr",
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://kjyang.kro.kr",
    title: "양기정 (kjyang) | Product Engineer · 개발자 포트폴리오",
    description,
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "양기정 (kjyang) | Product Engineer" }],
    locale: "ko_KR",
    siteName: "양기정 포트폴리오",
  },
  twitter: {
    card: "summary_large_image",
    title: "양기정 (kjyang) | Product Engineer · 개발자 포트폴리오",
    description,
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100">
        <JsonLd />
        {children}
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
    </html>
  );
}
