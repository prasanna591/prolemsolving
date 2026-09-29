"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

type Variant = "rise" | "fade" | "mask" | "words";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** stagger delay in ms */
  delay?: number;
  as?: keyof HTMLElementTagNameMap;
  style?: CSSProperties;
  /**
   * rise  — translate up + fade (default, lists/cards)
   * fade  — opacity only (dense text, already-positioned blocks)
   * mask  — line masked slide-up (section headings)
   * words — per-word cascade; children should be a plain string
   */
  variant?: Variant;
  /** lift the element up on hover (cards, tiles) */
  hover?: boolean;
}

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, margin: "0px 0px -70px 0px" } as const;
const delayS = (d: number) => d / 1000;

/**
 * Scroll-triggered reveal.
 *
 * The hidden start state lives in CSS (`[data-reveal]` in globals.css,
 * gated behind `@media (scripting: enabled)`) rather than in a Framer
 * Motion `initial` prop. Framer serialises `initial` into the
 * server-rendered HTML, which would ship every heading and paragraph as
 * `opacity:0` — leaving crawlers, LLM retrievers and no-JS clients with a
 * blank page. `initial={false}` keeps Framer out of the SSR payload; it
 * writes the end state inline once the element scrolls into view, where
 * the inline style overrides the CSS rule.
 *
 * Reduced-motion users get plain, always-visible markup.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
  style,
  variant = "rise",
  hover = false,
}: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = as as any;
  const MotionTag = motion[as] as typeof motion.div;

  if (reduce) {
    return (
      <Tag className={className} style={style}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      style={style}
      data-reveal={variant}
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      whileHover={hover ? { y: -5, transition: { type: "spring", stiffness: 320, damping: 22 } } : undefined}
      transition={{ duration: 0.75, ease: EASE, delay: delayS(delay) }}
    >
      {children}
    </MotionTag>
  );
}
