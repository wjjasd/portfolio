export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "양기정",
    alternateName: "kjyang",
    url: "https://kjyang.kro.kr",
    image: "https://kjyang.kro.kr/profile.jpg",
    jobTitle: "Product Engineer",
    description:
      "Android·AOSP·임베디드부터 웹 개발·배포·운영까지, 제품 전 과정을 직접 만드는 개발자",
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
