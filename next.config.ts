import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const isDev = process.env.NODE_ENV === "development";

// 외부 출처 근거
// - GA4 (layout.tsx GA_BOOT): gtag.js 로드 + 수집 요청 (Google 공식 CSP 가이드 기준)
// - Web3Forms (ContactForm.tsx): 브라우저에서 직접 POST
// Tistory RSS·GitHub GraphQL은 서버 fetch라 CSP 대상 아님. 폰트는 next/font로 self-host
const GA_SCRIPT = "https://*.googletagmanager.com";
const GA_CONNECT = "https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.g.doubleclick.net https://*.google.com";
const GA_IMG = "https://*.google-analytics.com https://*.googletagmanager.com";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} ${GA_SCRIPT}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' blob: data: ${GA_IMG}`,
  "font-src 'self'",
  `connect-src 'self' https://api.web3forms.com ${GA_CONNECT}`,
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
          { key: "Content-Security-Policy", value: csp },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
