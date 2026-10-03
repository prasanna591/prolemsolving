"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from "framer-motion";
import { Button } from "@/components/button";
import { site } from "@/lib/site";
import { allProducts } from "@/lib/products";
import bg from "@/app/images/optimized/home-hero-background.webp";

const STAGGER = [100, 200, 300, 400, 500];

/**
 * Every cell is a count, and every count is a claim the rest of the site
 * already makes — the product count and the team size are bound to
 * `allProducts` / `site.teamSize` so they cannot drift from the products page,
 * the schema, the llms.txt files and the careers copy.
 *
 * None of these say "in development". That was true when every product was in
 * development and stopped being true when EYD went to production and Boowa to
 * testing, so the row reports what is being built without pinning a stage.
 *
 * Location deliberately does not appear here. "Where we are" is a /contact
 * fact, not a reason to hire us, and putting it in the hero's proof row put a
 * text value ("India → Worldwide") next to three numbers, which broke the
 * baseline the row is read on. Local SEO is unaffected — the city is in this
 * page's title and description, the contact and about copy, and the schema.
 */
const PROOF_POINTS = [
  { label: "Products built by us", value: `${allProducts.length}` },
  { label: "Core capabilities", value: "5" },
  { label: "Problem-first process", value: "6-step" },
  { label: "People on the team", value: `${site.teamSize}+` },
];

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
          <path d="M0 300 C 130 240 260 270 380 370 C 460 430 520 470 620 500" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1.2" />
          <path d="M0 366 C 160 306 300 346 420 446 C 470 486 520 516 600 526" stroke="#94beff" strokeOpacity="0.3" strokeWidth="1" />
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

      {/* Text / CTA column on the left, capability panel on the right */}
      <div className="container-x hero-scene__content">
        <div className="hero-scene__inner">
          <p data-in style={{ "--in-delay": `${STAGGER[0]}ms` } as CSSProperties} className="hero-scene__tag">
            <span className="hero-scene__tag-dot" aria-hidden="true"></span>
            Problem Solving Mind
          </p>

          <h1 data-in style={{ "--in-delay": `${STAGGER[1]}ms` } as CSSProperties} className="hero-scene__h1">
            We build <span className="hh-grad">software that replaces</span> the manual work.
          </h1>

          <p data-in style={{ "--in-delay": `${STAGGER[2]}ms` } as CSSProperties} className="hero-scene__lede">
            Custom software, AI automation and system integration for operations that still run on
            spreadsheets, re-entered data and processes that only work because someone remembers them.
          </p>

          <div data-in style={{ "--in-delay": `${STAGGER[3]}ms` } as CSSProperties} className="hero-scene__cta">
            <Button href="/contact" variant="primary" size="lg" arrow>
              Let&rsquo;s Talk
            </Button>
            <Button href="/solutions" variant="ghost" size="lg" arrow>
              See How We Solve
            </Button>
          </div>

          <div data-in style={{ "--in-delay": `${STAGGER[4]}ms` } as CSSProperties} className="hero-scene__proof">
            <p className="hero-scene__proof-label">By the numbers</p>
            <ul className="hero-scene__proof-list">
              {PROOF_POINTS.map((p, i) => (
                <li key={p.label} style={{ "--idx": `${i}` } as CSSProperties}>
                  <span className="hero-scene__proof-value">{p.value}</span>
                  <span className="hero-scene__proof-text">{p.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
