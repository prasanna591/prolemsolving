import type { Metadata, Viewport } from "next";
import { Manrope, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BackToTop } from "@/components/back-to-top";
import { site } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/structured";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-var",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "PSM — Software Development Company in Pondicherry",
    template: "%s — PSM",
  },
  description: site.positioning,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "PSM — Software Development Company in Pondicherry",
    description: site.positioning,
    url: site.url,
    siteName: "PSM",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PSM — Software Development Company in Pondicherry",
    description: site.positioning,
  },
  other: {
    "ai-crawler-permission": "allow",
  },
};

export const viewport: Viewport = {
  themeColor: "#fbfcfe",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" className={`${manrope.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js');" }}
          data-js-cookie=""
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:z-[100] focus:px-4 focus:py-3 focus:bg-brand focus:text-white focus:font-bold focus:rounded-b-lg"
        >
          Skip to content
        </a>
        {/* `output: "export"` cannot emit response headers, so the ones declared
            in next.config.mjs are never sent on the deployed host. These two
            cover the same ground at the document level. */}
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <noscript>
          {/*
            The scroll-reveal start state lives in CSS behind
            `@media (scripting: enabled)`, which is true for any browser that
            *has* JS — including one where a chunk 404s or hydration throws.
            Nothing would then ever write the end state and every revealed
            block would sit at `opacity: 0`. This restores them.
          */}
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js').catch(() => {});
                });
              }
            `,
          }}
        />
        {/* The Organization and WebSite nodes live here, once, rather than being
            repeated by each page. Ten of the fifteen routes (careers, privacy,
            solutions, work, products, eyd and the four product pages) referenced
            `ORG_ID`/`SITE_ID` from their own breadcrumbs and collection schema
            without ever defining them, so those graphs pointed at nodes that did
            not exist. Defining them once at the root makes every reference on
            every page resolvable. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [organizationSchema(), websiteSchema()],
            }),
          }}
        />
        <MotionConfig reducedMotion="user">
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <BackToTop />
        </MotionConfig>
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}