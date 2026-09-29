"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from "framer-motion";
import type { ReactNode } from "react";
import bg from "@/app/images/home hero_background_image.webp";

interface HeroSceneProps {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
  image?: StaticImageData;
}

/**
 * Parallax is scroll-driven, so it carries no `initial` state and stays out
 * of the SSR payload. The staggered entrance is pure CSS (`[data-in]`),
 * which keeps the H1 readable in the server-rendered HTML.
 */
const STAGGER = [120, 230, 340];

export function HeroScene({ eyebrow, title, lede, children, image }: HeroSceneProps) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const parallax = useSpring(useTransform(scrollY, [0, 1100], [0, 90]), {
    stiffness: 110,
    damping: 26,
    mass: 0.4,
  });

  return (
    <section className="hero-scene" aria-label="Introduction">
      <motion.div className="hero-scene__bg" aria-hidden="true" style={{ y: reduce ? undefined : parallax }}>
        <Image src={image ?? bg} alt="" fill sizes="100vw" priority quality={72} />
      </motion.div>
      <div className="hero-scene__glow" aria-hidden="true" />
      <div className="hero-scene__scrim" aria-hidden="true" />

      <div className="container-x hero-scene__content">
        <div className="hero-scene__inner">
          {eyebrow && (
            <p
              data-in
              style={{ "--in-delay": `${STAGGER[0]}ms`, marginBottom: "1.5rem" } as React.CSSProperties}
              className="wds-eyebrow"
            >
              <span className="wds-eyebrow-line" aria-hidden="true" />
              {eyebrow}
            </p>
          )}
          <h1
            data-in
            style={{ "--in-delay": `${STAGGER[eyebrow ? 1 : 0]}ms` } as React.CSSProperties}
            className="hero-scene__h1"
          >
            {title}
          </h1>
          {lede && (
            <p
              data-in
              style={{ "--in-delay": `${STAGGER[eyebrow ? 2 : 1]}ms` } as React.CSSProperties}
              className="hero-scene__lede"
            >
              {lede}
            </p>
          )}
          {children && (
            <div
              data-in
              style={{ "--in-delay": `${STAGGER[eyebrow ? 2 : 1]}ms` } as React.CSSProperties}
            >
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
