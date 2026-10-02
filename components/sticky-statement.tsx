"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AmbientParticles } from "@/components/ambient-particles";

gsap.registerPlugin(ScrollTrigger);

const LINES = [
  "PSM isn\u2019t a toolbox looking for problems to use itself on.",
  "We start with the pain \u2014 the process that breaks, the task that empties inboxes, the opportunity a business can\u2019t reach.",
  "What we are is a product company \u2014 measured by products that ship, systems that keep working, and problems that stop being problems.",
];

export function StickyStatement() {
  const secRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sec = secRef.current;
    if (!sec) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const lines = sec.querySelectorAll<HTMLElement>(".sticky-st__line");
      if (!lines.length) return;

      const ctx = gsap.context(() => {
        gsap.set(lines, { opacity: 0, y: 40 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sec,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });

        tl.fromTo(lines[0], { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 })
          .to(lines[0], { opacity: 0, y: -40, duration: 1 }, 1)
          .fromTo(lines[1], { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, 1)
          .to(lines[1], { opacity: 0, y: -40, duration: 1 }, 2)
          .fromTo(lines[2], { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, 2);
      }, sec);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={secRef} className="sticky-st">
      <div className="dotfield" aria-hidden="true" />
      <AmbientParticles variant="rise" tone="light" count={14} className="sticky-amb" />
      <div className="sticky-st__pin">
        <div className="container-x sticky-st__grid">
          <div>
            <span className="eyebrow eyebrow--light">What we are</span>
            <h2 className="sticky-st__title">
              We turn real-world problems into{" "}
              <em className="stmnt-em">
                practical technology
              </em>
              .
            </h2>
          </div>
          <div className="sticky-st__panel">
            {LINES.map((l) => (
              <p key={l} className="sticky-st__line">
                {l}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}