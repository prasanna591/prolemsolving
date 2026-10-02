import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import wdsBg from "@/app/images/bg-what-we-do.webp";
import buildProducts from "@/app/images/build_products.webp";
import solving from "@/app/images/Solving.webp";
import connect from "@/app/images/connect.webp";

const arrowIcon = (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M3.5 9h11M10.5 4.5 15 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const iconCube = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M10 2 17 5.8v8.4L10 18 3 14.2V5.8L10 2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M3 6l7 3.8L17 6M10 9.8V18" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

const iconBubble = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M3 3.5h14a2 2 0 0 1 2 2v7.2a2 2 0 0 1-2 2H9.4l-4.9 3.2v-3.2H3a2 2 0 0 1-2-2V5.5a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M6.5 8.5h0M10 8.5h0M13.5 8.5h0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const iconNet = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="5" cy="5" r="2.1" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="15" cy="5" r="2.1" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="5" cy="15" r="2.1" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="15" cy="15" r="2.1" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="10" cy="10" r="1.4" stroke="currentColor" strokeWidth="1.6" />
    <path d="M6.6 6.6l2.5 2.5M13.6 6.6 11 9.2M6.6 13.4l2.5-2.5M13.6 13.4 11 10.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

interface Feature {
  num: string;
  title: string;
  desc: string;
  /** one line that states the actual work, so the pinned panel is not a card with air in it */
  point: string;
  href: string;
  linkLabel: string;
  aria: string;
  icon: ReactNode;
  scene: ReactNode;
  violet?: boolean;
}

const FEATURES: Feature[] = [
  {
    num: "01",
    title: "Build Products",
    desc: "We create our own technology products designed to solve meaningful problems at scale.",
    point: "Five products in development, each one started from a failure we watched happen in a real process.",
    href: "/products",
    linkLabel: "Explore our products",
    aria: "Explore products we build",
    icon: iconCube,
    scene: (
      <Image
        src={buildProducts}
        alt=""
        aria-hidden="true"
        className="wds-scene wds-scene--img"
        sizes="(max-width: 1024px) 100vw, 46vw"
      />
    ),
  },
  {
    num: "02",
    title: "Solve Problems",
    desc: "We work with businesses to understand complex challenges and build practical solutions.",
    point: "Five business solutions, scoped from the process first — then the stack that fits it.",
    href: "/solutions",
    linkLabel: "See how we solve problems",
    aria: "See how we solve problems",
    icon: iconBubble,
    scene: (
      <Image
        src={solving}
        alt=""
        aria-hidden="true"
        className="wds-scene wds-scene--img"
        sizes="(max-width: 1024px) 100vw, 46vw"
      />
    ),
    violet: true,
  },
  {
    num: "03",
    title: "Connect Systems",
    desc: "We bring software, data, people and processes together into connected digital ecosystems.",
    point: "ERP, CRM and data connected into one flow, so the handoff between teams stops being the bottleneck.",
    href: "/work",
    linkLabel: "See how we connect systems",
    aria: "See how we connect systems",
    icon: iconNet,
    scene: (
      <Image
        src={connect}
        alt=""
        aria-hidden="true"
        className="wds-scene wds-scene--img"
        sizes="(max-width: 1024px) 100vw, 46vw"
      />
    ),
  },
];

/**
 * The three pillars, as a static horizontal row on desktop and a stacked
 * column on narrow screens. No scroll choreography: the cards are always
 * visible and reachable, each one in DOM order.
 */
export function WhatWeDo() {
  return (
    <section className="wds" aria-labelledby="wds-title">
      <div className="wds-bg" aria-hidden="true">
        <Image src={wdsBg} alt="" fill sizes="100vw" />
      </div>

      <div className="wds-pin">
        <div className="container-x wds-inner">
          <header className="wds-hdr">
            <p className="wds-eyebrow">
              <span className="wds-eyebrow-line" aria-hidden="true" />
              What we do
            </p>
            <h2 id="wds-title" className="wds-title">
              We Turn Problems <span className="wds-title-acc">Into Products.</span>
            </h2>
            <p className="wds-lede">
              From software products to intelligent business systems, PSM builds technology around real-world needs.
            </p>
          </header>

          <div className="wds-grid">
            {FEATURES.map((f) => (
              <article key={f.num} className={`wds-card${f.violet ? " wds-card--v" : ""}`}>
                <div className={`wds-visual${f.violet ? " wds-visual--v" : ""}`}>{f.scene}</div>
                <div className="wds-body">
                  <div className="wds-head">
                    <span className="wds-num">{f.num}</span>
                    <span className="wds-ic">{f.icon}</span>
                    <h3 className="wds-title-card">{f.title}</h3>
                    <Link href={f.href} className="wds-arrow" aria-label={f.aria}>
                      {arrowIcon}
                    </Link>
                  </div>
                  <p className="wds-desc">{f.desc}</p>
                  <p className="wds-point">{f.point}</p>
                  <Link href={f.href} className="wds-link">
                    {f.linkLabel}
                    <ArrowRightInline />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="wds-progress">
            <div className="wds-dotbar" aria-hidden="true">
              {FEATURES.map((f) => (
                <i key={f.num} />
              ))}
            </div>
            <span className="wds-progress-label" aria-hidden="true">
              Three things. That is the whole model.
            </span>
          </div>
        </div>
      </div>

      <span className="wds-chip wds-chip--a" aria-hidden="true">AI</span>
      <span className="wds-chip wds-chip--b" aria-hidden="true">SYSTEM</span>
      <span className="wds-chip wds-chip--c" aria-hidden="true">API</span>
      <span className="wds-chip wds-chip--d" aria-hidden="true">DATA</span>
      <span className="wds-dot wds-dot--a" aria-hidden="true" />
      <span className="wds-dot wds-dot--b" aria-hidden="true" />
    </section>
  );
}

function ArrowRightInline() {
  return (
    <svg width="15" height="15" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="wds-link-arrow">
      <path d="M3.5 9h11M10.5 4.5 15 9l-4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
