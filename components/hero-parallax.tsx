"use client";

import { useEffect, useRef } from "react";

export function HeroParallax({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const sec = ref.current;
    if (!sec) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const inner = sec.querySelector<HTMLElement>(".hero-inner");
    const cue = sec.querySelector<HTMLElement>(".hero-cue");
    if (!inner) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const d = window.scrollY;
        inner.style.transform = `translateY(${d * -0.18}px) scale(${Math.max(0.98, 1 - d / 6000)})`;
        inner.style.opacity = String(Math.max(0, 1 - d / 560));
        if (cue) cue.style.opacity = String(Math.max(0, 1 - d / 360));
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={ref} className={className}>
      {children}
    </section>
  );
}