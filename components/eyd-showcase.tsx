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

/**
 * EYD — the showcase. A six-stage journey: Explore → Choose → Buy → Build →
 * Connect → Complete. Tap the stage controls (or let it auto-cycle). Autoplay
 * pauses on hover/focus and is disabled for reduced-motion users.
 */
export function EydShowcase() {
  const [stage, setStage] = useState<EydStage>("explore");
  const [paused, setPaused] = useState(false);
  const baseId = useId();
  const panelId = `${baseId}-panel`;
  const pausedRef = useRef(false);
  pausedRef.current = paused;

  const idx = STAGES.findIndex((x) => x.id === stage);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => {
      if (pausedRef.current) return;
      setStage((s) => STAGES[(STAGES.findIndex((x) => x.id === s) + 1) % STAGES.length].id);
    }, 4200);
    return () => window.clearInterval(t);
  }, []);

  const c = STAGE_COPY[stage];

  return (
    <div
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
        <div className="eyd-inner" key={stage} role="tabpanel" id={panelId} aria-labelledby={`${baseId}-tab-${stage}`}>
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
      <div className="eyd-controls" role="tablist" aria-label="EYD home journey stages">
        {STAGES.map((s, i) => (
          <button
            key={s.id}
            id={`${baseId}-tab-${s.id}`}
            role="tab"
            aria-selected={s.id === stage}
            aria-controls={panelId}
            className={`eyd-btn ${s.id === stage ? "is-on" : ""}`}
            onClick={() => setStage(s.id)}
          >
            <span className="eyd-btn-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}