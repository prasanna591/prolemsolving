"use client";

import { motion, useReducedMotion, useScroll, useTransform, useSpring } from "framer-motion";
import type { ReactNode } from "react";
import bg from "@/app/images/home hero_background_image.png";

interface HeroSceneProps {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
  image?: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

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
        <img src={image ?? bg.src} alt="" width={1774} height={887} />
      </motion.div>
      <div className="hero-scene__glow" aria-hidden="true" />
      <div className="hero-scene__scrim" aria-hidden="true" />

      <div className="container-x hero-scene__content">
        <motion.div
          className="hero-scene__inner"
          variants={container}
          initial={reduce ? false : "hidden"}
          animate="show"
        >
          {eyebrow && (
            <motion.p variants={item} className="wds-eyebrow" style={{ marginBottom: "1.5rem" }}>
              <span className="wds-eyebrow-line" aria-hidden="true" />
              {eyebrow}
            </motion.p>
          )}
          <motion.h1 variants={item} className="hero-scene__h1">
            {title}
          </motion.h1>
          {lede && <motion.p variants={item} className="hero-scene__lede">{lede}</motion.p>}
          {children && <motion.div variants={item}>{children}</motion.div>}
        </motion.div>
      </div>
    </section>
  );
}