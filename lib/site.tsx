export const site = {
  name: "PSM",
  full: "Problem Solving Mind",
  tagline: "Building Products. Solving Problems.",
  url: "https://psm.build",
  email: "hello@psm.build",
  phone: "+91-93005-38399",
  phoneDisplay: "+91 93005 38399",
  locality: "Pune",
  region: "Maharashtra",
  country: "IN",
  areaServed: "Worldwide",
  supportLine:
    "We turn real-world problems into practical technology — building products, AI-powered systems and intelligent platforms that make businesses actually work better.",
  shortDescription:
    "Problem Solving Mind (PSM) is a product-first software company based in Pune, India. We design and build practical software products, AI-powered systems and intelligent business platforms for organisations with manual, disconnected operations.",
  /**
   * External profiles that anchor the entity graph. LLM retrievers and search
   * engines resolve organisations and people through `sameAs`; empty arrays are
   * inert, wrong URLs are actively harmful, so fill these in as real profiles exist.
   */
  sameAs: [] as string[],
  founderSameAs: {
    "prasanna-venkatesan": [] as string[],
    maniyarasan: [] as string[],
  },
};

import Image from "next/image";
import psmMark from "@/app/images/psm-mark.webp";
import psmLockup from "@/app/images/psm-lockup.webp";

export const nav = [
  { label: "Products", href: "/products" },
  { label: "Solutions", href: "/solutions" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
];

export const brandMark = (
  <Image
    src={psmMark}
    alt=""
    aria-hidden="true"
    width={34}
    height={34}
    style={{ borderRadius: 9 }}
    priority
  />
);

export const brandLockup = (
  <Image
    src={psmLockup}
    alt="PSM — Problem Solving Mind"
    width={280}
    height={93}
    style={{ height: "auto", width: "min(280px, 100%)" }}
  />
);
