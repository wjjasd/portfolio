export default function JsonLd({ locale }: { locale: string }) {
  const description = locale === 'ko'
    ? "Android·AOSP·임베디드부터 웹 개발·배포·운영까지, 제품 전 과정을 직접 만드는 개발자"
    : "A product engineer who builds end-to-end from Android, AOSP, and embedded systems to web development and deployment.";

  const name = locale === 'ko' ? '양기정' : 'KiJeong Yang'

  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    alternateName: "kjyang",
    url: "https://kjyang.kro.kr",
    image: "https://kjyang.kro.kr/profile.jpg",
    jobTitle: "Product Engineer",
    description,
    knowsAbout: [
      "Android 개발",
      "AOSP",
      "임베디드 시스템",
      "웹 개발",
      "Next.js",
      "TypeScript",
    ],
    sameAs: [
      "https://github.com/wjjasd",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
