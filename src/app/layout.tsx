import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "양기정 | Product Engineer",
  description,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://kjyang.kro.kr",
    title: "양기정 | Product Engineer",
    description,
    images: [{ url: "/profile.jpg", width: 192, height: 192, alt: "양기정 프로필" }],
    locale: "ko_KR",
    siteName: "양기정 포트폴리오",
  },
  twitter: {
    card: "summary",
    title: "양기정 | Product Engineer",
    description,
    images: ["/profile.jpg"],
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
        {children}
      </body>
    </html>
  );
}
