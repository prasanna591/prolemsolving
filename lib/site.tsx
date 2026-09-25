export const site = {
  name: "PSM",
  full: "Problem Solving Mind",
  tagline: "Building Products. Solving Problems.",
  url: "https://psm.build",
  email: "hello@psm.build",
  supportLine:
    "We turn real-world problems into practical technology — building products, AI-powered systems and intelligent platforms that make businesses actually work better.",
  heroH1: "We Build Technology That Solves Real Problems.",
  heroLede:
    "PSM builds practical software products, AI-powered solutions and intelligent business systems.",
};

import Image from "next/image";
import psmMark from "@/app/images/psm-mark.png";
import psmLockup from "@/app/images/psm-lockup.png";

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
    alt="PSM"
    width={280}
    height={93}
    style={{ height: "auto", width: "min(280px, 100%)" }}
  />
);