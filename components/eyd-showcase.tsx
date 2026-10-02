"use client";

import { useEffect, useId, useRef, useState } from "react";

export type EydStage = "explore" | "choose" | "buy" | "build" | "connect" | "complete";

const STAGES: { id: EydStage; label: string }[] = [
  { id: "explore", label: "Explore" },
  { id: "choose", label: "Choose" },
  { id: "buy", label: "Buy" },
  { id: "build", label: "Build" },
  { id: "connect", label: "Connect" },
  { id: "complete", label: "Complete" },
];

const STAGE_COPY: Record<EydStage, { kick: string; title: { pre: string; em: string; post: string }; items: string[] }> = {
  explore: {
    kick: "See it first",
    title: { pre: "Walk through any home", em: "in 3D", post: "— before you visit it." },
    items: ["Full 3D walkthroughs", "Compare homes side by side", "Shortlist what speaks to you"],
  },
  choose: {
    kick: "Fit your reality",
    title: { pre: "Find the place that", em: "fits", post: "how you actually live." },
    items: ["Own or rent — compared honestly", "Budget scenarios, no spin", "A clear pick, in three steps"],
  },
  buy: {
    kick: "Own the decision",
    title: { pre: "Paperwork, financing,", em: "keys", post: "— handled end to end." },
    items: ["Verified listings only", "Guided paperwork", "Secure transfer, on time"],
  },
  build: {
    kick: "Shape it your way",
    title: { pre: "Plans, materials, and builders", em: "in one loop", post: "." },
    items: ["Plans that stay clear", "Materials ordered on track", "Build progress, visible"],
  },
  connect: {
    kick: "Bring the right people in",
    title: { pre: "Architects, contractors, interiors —", em: "on your job", post: "." },
    items: ["Verified professionals", "Direct scheduling", "Scope that stays scope"],
  },
  complete: {
    kick: "Key in hand",
    title: { pre: "After all six, the key is", em: "in your hand", post: "." },
    items: ["Handover checklist", "Move-in ready walkthrough", "Your name on the door"],
  },
};

const INTERVAL = 4200;

/**
 * EYD — the showcase. A six-stage journey: Explore → Choose → Buy → Build →
 * Connect → Complete.
 *
 * Implemented as a real ARIA tablist: one tab stop, arrow/Home/End to move
 * between stages, and a panel that is itself focusable because it holds no
 * focusable children — without `tabIndex` a keyboard user tabbed past all six
 * stage descriptions without ever landing on them.
 *
 * Autoplay is only ever a convenience, so it is stoppable by a control that
 * persists (WCAG 2.2.2), pauses on hover/focus, and does not run at all while
 * the tab is hidden or the section is off screen.
 */
export function EydShowcase() {
  const [stage, setStage] = useState<EydStage>("explore");
  const [paused, setPaused] = useState(false);
  const baseId = useId();
  const panelId = `${baseId}-panel`;
  const pausedRef = useRef(false);
  const hostRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  pausedRef.current = paused;

  const idx = STAGES.findIndex((x) => x.id === stage);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let t = 0;

    const stop = () => {
      if (t) window.clearInterval(t);
      t = 0;
    };
    const start = () => {
      if (t) return;
      t = window.setInterval(() => {
        if (pausedRef.current) return;
        setStage((s) => STAGES[(STAGES.findIndex((x) => x.id === s) + 1) % STAGES.length].id);
      }, INTERVAL);
    };

    // A backgrounded tab or a scrolled-past section should not be accruing
    // state updates on a timer nobody is watching.
    const onVisibility = () => (document.hidden ? stop() : start());
    const io = new IntersectionObserver(
      (entries) => (entries[0]?.isIntersecting ? start() : stop()),
      { threshold: 0.2 },
    );
    if (hostRef.current) io.observe(hostRef.current);
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const select = (id: EydStage, focus = false) => {
    setStage(id);
    if (focus) {
      const i = STAGES.findIndex((x) => x.id === id);
      tabRefs.current[i]?.focus();
    }
  };

  const onTabKeys = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const last = STAGES.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = idx === last ? 0 : idx + 1;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = idx === 0 ? last : idx - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    select(STAGES[next].id, true);
  };

  const c = STAGE_COPY[stage];

  return (
    <div
      ref={hostRef}
      className="eyd-showcase"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="eyd-stage">
        <div className="eyd-stage-head">
          <span className="eyd-kicker">{c.kick.toUpperCase()}</span>
          <span className="eyd-ix" aria-hidden="true">{String(idx + 1).padStart(2, "0")}</span>
        </div>
        <div
          className="eyd-inner"
          key={stage}
          role="tabpanel"
          id={panelId}
          aria-labelledby={`${baseId}-tab-${stage}`}
          tabIndex={0}
        >
          <p className="eyd-title">
            {c.title.pre} <em>{c.title.em}</em> {c.title.post}
          </p>
          <ol className="eyd-items">
            {c.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
        <div className="eyd-progress" aria-hidden="true">
          {STAGES.map((s, i) => (
            <i key={s.id} className={i === idx ? "is-on" : ""} />
          ))}
        </div>
      </div>
      <div className="eyd-controls-row">
        <div className="eyd-controls" role="tablist" aria-label="EYD home journey stages" onKeyDown={onTabKeys}>
          {STAGES.map((s, i) => (
            <button
              key={s.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`${baseId}-tab-${s.id}`}
              type="button"
              role="tab"
              aria-selected={s.id === stage}
              aria-controls={panelId}
              tabIndex={s.id === stage ? 0 : -1}
              className={`eyd-btn ${s.id === stage ? "is-on" : ""}`}
              onClick={() => select(s.id)}
            >
              <span className="eyd-btn-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              {s.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="eyd-pause"
          aria-pressed={paused}
          onClick={() => setPaused((v) => !v)}
        >
          {paused ? <PlayIcon /> : <PauseIcon />}
          <span className="sr-only">{paused ? "Resume automatic stage tour" : "Pause automatic stage tour"}</span>
          <span aria-hidden="true" className="eyd-pause-txt">
            {paused ? "Play" : "Pause"}
          </span>
        </button>
      </div>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M3 2l7 4-7 4V2Z" fill="currentColor" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M3 2h2.2v8H3V2Zm3.8 0H9v8H6.8V2Z" fill="currentColor" />
    </svg>
  );
}