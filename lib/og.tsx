import { ImageResponse } from "next/og";
import type { ReactNode } from "react";
import { site } from "./site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

interface OgOptions {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

/**
 * Shared Open Graph card. Per-segment `opengraph-image.tsx` files call this so
 * every route gets a distinct social card instead of inheriting the root one —
 * identical cards across pages flatten engagement on LinkedIn and X, and give
 * LLM-backed link previews nothing to differentiate the pages.
 */
export function renderOg({ eyebrow, title, subtitle }: OgOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #07162B 0%, #0A2142 55%, #0B1635 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* top row: mark + wordmark */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <svg width="54" height="54" viewBox="0 0 34 34" fill="none">
              <rect width="34" height="34" rx="9" fill="#ffffff" />
              <circle cx="13" cy="17" r="3" fill="#07162B" />
              <circle cx="23.2" cy="11.2" r="2.4" fill="#5EA0FC" />
              <circle cx="23.2" cy="22.8" r="2.4" fill="#0D6EFD" />
              <path d="M15.6 15.6l5-2.6M15.6 18.4l5 2.6" stroke="#07162B" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <div style={{ display: "flex", fontSize: 40, fontWeight: 800, letterSpacing: "-0.02em" }}>
              {site.full}
            </div>
          </div>
          {eyebrow ? (
            <div
              style={{
                display: "flex",
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#9CC0FF",
                border: "1px solid rgba(156,192,255,0.4)",
                borderRadius: 999,
                padding: "10px 22px",
              }}
            >
              {eyebrow}
            </div>
          ) : null}
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 52 ? 62 : 74,
              lineHeight: 1.08,
              letterSpacing: "-0.035em",
              fontWeight: 800,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div style={{ display: "flex", fontSize: 29, lineHeight: 1.4, color: "rgba(255,255,255,0.72)" }}>
              {subtitle.slice(0, 150)}
            </div>
          ) : null}
        </div>

        {/* footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 22,
            color: "rgba(255,255,255,0.55)",
          }}
        >
          <span>{site.tagline}</span>
          <span>{site.url.replace(/^https?:\/\//, "")}</span>
        </div>
      </div>
    ),
    ogSize,
  );
}

export function ogAlt(title: string, subtitle?: string): string {
  return [title, subtitle].filter(Boolean).join(" — ");
}

export type { ReactNode };
