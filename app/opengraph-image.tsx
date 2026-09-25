import { ImageResponse } from "next/og";

export const alt = "PSM — Building Products. Solving Problems.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#07162B",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          {/* brand mark */}
          <svg width="56" height="56" viewBox="0 0 34 34" fill="none">
            <rect width="34" height="34" rx="9" fill="#ffffff" />
            <circle cx="13" cy="17" r="3" fill="#07162B" />
            <circle cx="23.2" cy="11.2" r="2.4" fill="#5EA0FC" />
            <circle cx="23.2" cy="22.8" r="2.4" fill="#0D6EFD" />
            <path d="M15.6 15.6l5-2.6M15.6 18.4l5 2.6" stroke="#07162B" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <div style={{ display: "flex", fontSize: "44px", fontWeight: 800, letterSpacing: "-0.02em" }}>PSM</div>
        </div>

        <div style={{ display: "flex", fontSize: "84px", lineHeight: 1.05, letterSpacing: "-0.035em", fontWeight: 800, textWrap: "balance" }}>
          Building Products.
          <br />
          Solving Problems.
        </div>
      </div>
    ),
    size
  );
}