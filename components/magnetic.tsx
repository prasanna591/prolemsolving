"use client";

import { useEffect, useRef, type ReactNode, type MouseEvent } from "react";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** max pull in px */
  strength?: number;
}

/**
 * Trailing magnet: the element eases toward the cursor and releases with a
 * soft spring. rAF-lerped (no layout thrash) and the loop sleeps when the
 * element settles at rest — zero idle cost. Disabled for coarse pointers
 * and reduced-motion users.
 */
export function Magnetic({ children, className = "", strength = 6 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const active = useRef(false);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (coarse || reduce) return;
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const loop = () => {
    const k = active.current ? 0.16 : 0.1;
    current.current.x += (target.current.x - current.current.x) * k;
    current.current.y += (target.current.y - current.current.y) * k;
    const settled =
      !active.current &&
      Math.abs(current.current.x) < 0.05 &&
      Math.abs(current.current.y) < 0.05;
    if (settled) {
      current.current.x = 0;
      current.current.y = 0;
      raf.current = 0;
      const el = ref.current;
      if (el) el.style.transform = "";
      return;
    }
    const el = ref.current;
    if (el) el.style.transform = `translate3d(${current.current.x.toFixed(2)}px, ${current.current.y.toFixed(2)}px, 0)`;
    raf.current = requestAnimationFrame(loop);
  };

  const start = () => {
    if (raf.current) return;
    raf.current = requestAnimationFrame(loop);
  };

  const move = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    active.current = true;
    target.current = { x: dx * strength, y: dy * strength };
    start();
  };

  const leave = () => {
    active.current = false;
    target.current = { x: 0, y: 0 };
  };

  return (
    <div
      ref={ref}
      className={`magnetic ${className}`}
      style={{ willChange: "transform" }}
      onMouseMove={move}
      onMouseLeave={leave}
    >
      {children}
    </div>
  );
}
