import type { Metadata, Viewport } from "next";
import { Manrope, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { site } from "@/lib/site";

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
};

export const viewport: Viewport = {
  themeColor: "#fbfcfe",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" className={`${manrope.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}>
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
        <MotionConfig reducedMotion="user">
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </MotionConfig>
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}