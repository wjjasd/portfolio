import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "양기정 (kjyang) | Product Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "linear-gradient(135deg, #09090b 0%, #18181b 60%, #27272a 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 100px",
          fontFamily: "sans-serif",
        }}
      >
        {/* 포인트 라인 */}
        <div
          style={{
            width: "60px",
            height: "4px",
            background: "#6366f1",
            marginBottom: "40px",
            borderRadius: "2px",
          }}
        />

        {/* 이름 */}
        <div
          style={{
            fontSize: "80px",
            fontWeight: 700,
            color: "#f4f4f5",
            lineHeight: 1.1,
            marginBottom: "16px",
            letterSpacing: "-2px",
          }}
        >
          양기정
        </div>

        {/* 영문명 + 직함 */}
        <div
          style={{
            fontSize: "36px",
            fontWeight: 400,
            color: "#a1a1aa",
            marginBottom: "48px",
            letterSpacing: "1px",
          }}
        >
          kjyang · Product Engineer
        </div>

        {/* 설명 */}
        <div
          style={{
            fontSize: "24px",
            color: "#71717a",
            lineHeight: 1.6,
            maxWidth: "800px",
          }}
        >
          Android · AOSP · 임베디드 · 웹 개발 · 배포 · 운영
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            right: "100px",
            fontSize: "22px",
            color: "#52525b",
          }}
        >
          kjyang.kro.kr
        </div>
      </div>
    ),
    { ...size }
  );
}
