"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode, CSSProperties } from "react";

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
 * Scroll-triggered reveal powered by Framer Motion (spring/inline styles).
 * Reduced-motion & failing-JS users get plain, always-visible markup.
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

  const plain = (
    <Tag className={className} style={style}>
      {children}
    </Tag>
  );

  if (variant === "words" && typeof children === "string") {
    const words = children.trim().split(/\s+/);
    return (
      <MotionTag
        className={className}
        style={style}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.055, delayChildren: delayS(delay) } } }}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
      >
        {words.map((w, i) => (
          <span key={`${w}-${i}`} className="w-mask">
            <motion.span
              className="w"
              variants={{ hidden: { y: "115%" }, show: { y: "0%" } }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              {w}
            </motion.span>
          </span>
        ))}
      </MotionTag>
    );
  }

  if (reduce) return plain;

  if (variant === "mask") {
    return (
      <MotionTag
        className={className}
        style={{ ...style, overflow: "hidden" }}
      >
        <motion.div
          initial={{ y: "112%" }}
          whileInView={{ y: "0%" }}
          viewport={VIEWPORT}
          transition={{ duration: 0.9, ease: EASE, delay: delayS(delay) }}
        >
          {children}
        </motion.div>
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, y: variant === "fade" ? 0 : 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      whileHover={hover ? { y: -5, transition: { type: "spring", stiffness: 320, damping: 22 } } : undefined}
      transition={{ duration: 0.75, ease: EASE, delay: delayS(delay) }}
    >
      {children}
    </MotionTag>
  );
}
