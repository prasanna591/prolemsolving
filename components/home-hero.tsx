"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from "framer-motion";
import { Button } from "@/components/button";
import bg from "@/app/images/optimized/home-hero-background.webp";

/**
 * Parallax is scroll-driven, so it carries no `initial` state and stays out
 * of the SSR payload. The staggered entrance below is pure CSS (`[data-in]`),
 * which keeps the H1 readable in the server-rendered HTML.
 */
const STAGGER = [150, 270, 390, 510, 630];

export function HomeHero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const bgY = useSpring(useTransform(scrollY, [0, 1100], [0, 120]), {
    stiffness: 110,
    damping: 26,
    mass: 0.4,
  });

  return (
    <section className="hero-scene" aria-label="Introduction">
      <motion.div className="hero-scene__bg" aria-hidden="true" style={{ y: reduce ? undefined : bgY }}>
        <Image src={bg} alt="" fill sizes="100vw" priority quality={72} />
      </motion.div>

      <div className="hero-scene__glow" aria-hidden="true" />
      <div className="hero-scene__scrim" aria-hidden="true" />

      {/* Subtle SVG brand overlay — left side only, behind the UI */}
      <div className="hero-scene__deco" aria-hidden="true">
        <svg className="deco deco--top" viewBox="0 0 640 640" fill="none">
          <defs>
            <linearGradient id="hgA" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0.34" />
              <stop offset="0.55" stopColor="#dce8ff" stopOpacity="0.14" />
              <stop offset="1" stopColor="#dce8ff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="hgB" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0.26" />
              <stop offset="0.6" stopColor="#dfd6ff" stopOpacity="0.12" />
              <stop offset="1" stopColor="#dfd6ff" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path d="M0 100 C 150 40 330 70 445 200 C 540 310 610 430 640 560 L 640 0 L 0 0 Z" fill="url(#hgA)" />
          <path
            d="M0 300 C 130 240 260 270 380 370 C 460 430 520 470 620 500"
            stroke="#ffffff"
            strokeOpacity="0.4"
            strokeWidth="1.2"
          />
          <path
            d="M0 366 C 160 306 300 346 420 446 C 470 486 520 516 600 526"
            stroke="#94beff"
            strokeOpacity="0.3"
            strokeWidth="1"
          />
          <ellipse cx="300" cy="330" rx="230" ry="96" stroke="#bcd4ff" strokeOpacity="0.16" transform="rotate(-12 300 330)" />
          <path d="M110 126 A 150 150 0 0 1 410 246" stroke="#94beff" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="2 6" />
          <path d="M168 196 A 120 120 0 0 1 360 286" stroke="#ffffff" strokeOpacity="0.36" strokeWidth="1" />
          <circle cx="500" cy="120" r="2.2" fill="#bcd4ff" strokeOpacity="0.55" />
          <circle cx="560" cy="200" r="1.5" fill="#ffffff" fillOpacity="0.7" />
          <circle cx="430" cy="300" r="1.6" fill="#c9a7ff" fillOpacity="0.5" />
          <circle cx="520" cy="380" r="2" fill="#9ec7ff" fillOpacity="0.5" />
          <circle cx="590" cy="300" r="1.2" fill="#ffffff" fillOpacity="0.65" />
        </svg>

        <svg className="deco deco--mid" viewBox="0 0 420 420" fill="none">
          <path d="M0 92 C 130 72 250 62 392 22" stroke="#ffffff" strokeOpacity="0.38" strokeWidth="1.2" />
          <path d="M0 132 C 150 112 270 100 420 60" stroke="#bcd4ff" strokeOpacity="0.3" strokeWidth="1" />
          <path d="M36 150 A 200 200 0 0 1 420 210" stroke="#c9a7ff" strokeOpacity="0.14" strokeWidth="1" />
          <circle cx="150" cy="180" r="2" fill="#c9a7ff" fillOpacity="0.4" />
          <circle cx="252" cy="138" r="1.4" fill="#ffffff" fillOpacity="0.6" />
        </svg>

        <svg className="deco deco--bottom" viewBox="0 0 640 560" fill="none">
          <path d="M0 560 C 120 380 260 320 420 360 C 560 395 600 460 640 560 Z" fill="url(#hgB)" />
          <path d="M0 466 C 140 406 300 436 430 506" stroke="#dfd6ff" strokeOpacity="0.34" strokeWidth="1.2" />
          <path d="M88 522 A 60 60 0 0 1 224 532" stroke="#ffffff" strokeOpacity="0.34" strokeWidth="1" />
          <circle cx="320" cy="420" r="2" fill="#bcd4ff" fillOpacity="0.45" />
          <circle cx="420" cy="470" r="1.4" fill="#ffffff" fillOpacity="0.6" />
          <circle cx="500" cy="500" r="1.8" fill="#9ec7ff" fillOpacity="0.45" />
        </svg>
      </div>

      {/* Text / logo / CTA UI */}
      <div className="container-x hero-scene__content">
        <div className="hero-scene__inner">
          <p data-in style={{ "--in-delay": `${STAGGER[0]}ms` } as React.CSSProperties} className="hero-scene__tag">
            Building Products. Solving Problems.
          </p>

          <h1 data-in style={{ "--in-delay": `${STAGGER[1]}ms` } as React.CSSProperties} className="hero-scene__h1">
            We build technology that solves{" "}
            <em className="hh-grad">real problems.</em>
          </h1>

          <p data-in style={{ "--in-delay": `${STAGGER[2]}ms` } as React.CSSProperties} className="hero-scene__lede">
            PSM builds custom software, AI automation and connected systems for industries — and simple
            products for everyday people.
          </p>

          <div data-in style={{ "--in-delay": `${STAGGER[3]}ms` } as React.CSSProperties} className="hero-scene__cta">
            <Button href="/contact" variant="primary" size="lg" arrow>
              Let&rsquo;s Talk
            </Button>
            <Button href="/products" variant="ghost" size="lg" arrow>
              Explore Our Products
            </Button>
          </div>

          <ul data-in style={{ "--in-delay": `${STAGGER[4]}ms` } as React.CSSProperties} className="hero-scene__stats">
            <li>
              <span className="hero-scene__stat-v">5</span>
              <span className="hero-scene__stat-s">Products In Development</span>
            </li>
            <li>
              <span className="hero-scene__stat-v">5</span>
              <span className="hero-scene__stat-s">Core Capabilities</span>
            </li>
            <li>
              <span className="hero-scene__stat-v">6-step</span>
              <span className="hero-scene__stat-s">Problem-First Process</span>
            </li>
            <li>
              <span className="hero-scene__stat-v">Pondicherry</span>
              <span className="hero-scene__stat-s">Tamil Nadu — Working Worldwide</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
