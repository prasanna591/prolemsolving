/**
 * Official social profiles, in one place: the visible footer links and the
 * schema.org `sameAs` graph are both derived from this array, so the two can
 * never drift apart.
 *
 * These are cleaned canonical forms — tracking/session query strings such as
 * Instagram's `?stkn=…` are stripped, because a `sameAs` value must be a
 * stable identity, and a URL that changes per visit splits the entity.
 */
const SOCIALS: { label: string; href: string }[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/problem-solving-minds/" },
  { label: "Instagram", href: "https://www.instagram.com/problemsolvingmind" },
];

export const site = {
  name: "PSM",
  full: "Problem Solving Mind",
  tagline: "Building Products. Solving Problems.",
  url: "https://www.problemsolvingmind.com",
  /**
   * Absolute URL for a route, in the exact form the static build emits.
   *
   * `trailingSlash: true` (required by GitHub Pages) makes Next write
   * canonicals, `og:url` and internal links with a trailing slash. Anything we
   * generate by hand — sitemap `<loc>`, the llms.txt link lists — has to match,
   * or GitHub Pages answers the sitemap's URL with a 301 and the two disagree
   * on which form is canonical.
   */
  routeUrl(path: string): string {
    const clean = path.replace(/\/+$/, "");
    return `${this.url}${clean}/`;
  },
  email: "hello@problemsolvingmind.com",
  phone: "+91-93602-07861",
  phoneDisplay: "+91 93602 07861",
  /**
   * E.164 form for `tel:` hrefs. RFC 3966 allows only a leading `+` followed
   * by digits — no spaces or dashes — and some mobile clients silently fail to
   * dial a malformed number, so this is derived rather than hand-written.
   */
  phoneHref: "+919360207861",
  /** All public inboxes, in the order they should be shown on the contact page. */
  emails: [
    { label: "General", address: "hello@problemsolvingmind.com" },
    { label: "Founder", address: "founder@problemsolving.com" },
    { label: "CEO", address: "ceo@problemsolving.com" },
    { label: "Contact desk", address: "contact@problemsolvingmind.com" },
  ] as { label: string; address: string }[],
  locality: "Pondicherry",
  region: "Tamil Nadu",
  country: "India",
  areaServed: "Worldwide",
  /**
   * Team size, as a floor rather than a point value. "20+" is the claim we can
   * actually stand behind on any given day, and keeping it here stops the
   * schema, the visible copy and the llms.txt files drifting into three
   * different numbers. Schema.org has no "at least" scalar, so consumers emit
   * this as a `minValue`.
   */
  teamSize: 20,
  /**
   * Places PSM actually serves, in schema.org and local-SEO copy. Kept separate
   * from `areaServed` because that one is read as prose in the llms.txt routes.
   * "Puducherry" is the official spelling of the same city; both are indexed.
   */
  serviceAreas: ["Pondicherry", "Puducherry", "Tamil Nadu", "India", "Worldwide"],
  /**
   * Headline service categories, in priority order. These drive the schema.org
   * service catalog, the `knowsAbout` list, internal anchor text and the
   * keyword section of the llms.txt routes.
   *
   * Deliberately *not* emitted as a `<meta name="keywords">` tag: Google has
   * ignored that tag since 2009 and Bing disregards it, so the same terms earn
   * their place in schema, headings and body copy instead.
   */
  serviceKeywords: [
    "Custom software development",
    "AI automation for business",
    "Business workflow automation",
    "ERP and CRM integration",
    "Web application development",
    "Mobile app development",
    "SaaS and MVP product development",
  ],
  /** One-line positioning used in metadata, schema and the llms.txt files. */
  positioning:
    "Problem-first software company in Pondicherry building custom business software, practical AI and workflow automation for clients across India and worldwide.",
  supportLine:
    "We turn real-world problems into practical technology — building products, AI-powered systems and intelligent platforms that make businesses actually work better.",
  shortDescription:
    "Problem Solving Mind (PSM) is a product-first software company based in Pondicherry, India. We design and build practical software products, AI-powered systems and intelligent business platforms for organisations with manual, disconnected operations.",
  /**
   * Official social profiles. Single source of truth for both the visible
   * footer links and the schema.org `sameAs` graph below, so the two can never
   * drift apart.
   */
  socials: SOCIALS,
  /**
   * External profiles that anchor the entity graph. LLM retrievers and search
   * engines resolve organisations and people through `sameAs`; wrong URLs are
   * actively harmful, so this is derived from `socials` rather than hand-typed.
   */
  sameAs: SOCIALS.map((s) => s.href),
  founderSameAs: {
    /**
     * Schema-only. These are intentionally NOT rendered as visible links — a
     * personal profile URL belongs in the entity graph (which search engines
     * and LLM retrievers read) rather than on the page.
     */
    "prasanna-venkatesan": ["https://www.linkedin.com/in/prasanna-venkatesan-r-580583287"],
    maniyarasan: [],
  },
  /**
   * Internal compensation reference — NOT rendered anywhere on the site.
   * Used only for structured data / llms.txt consumers that may need it.
   * Approximate entry-level annual CTC in INR lakhs.
   */
  _internal: {
    entryLevelCTCLpa: 3.6,
  },
};

import Image from "next/image";
import logo from "@/app/images/optimized/logo_updated.webp";
import favicon from "@/app/images/optimized/favicon.webp";

export const nav = [
  { label: "Products", href: "/products" },
  { label: "Solutions", href: "/solutions" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
];

export const brandMark = (
  <Image
    src={logo}
    alt=""
    aria-hidden="true"
    width={64}
    height={64}
    style={{ borderRadius: 12 }}
    priority
  />
);

export const brandFavicon = (
  <Image
    src={favicon}
    alt=""
    aria-hidden="true"
    width={40}
    height={40}
    style={{ borderRadius: 8 }}
    priority
  />
);

export const brandLockup = (
  <Image
    src={logo}
    alt="PSM — Problem Solving Mind"
    width={320}
    height={107}
    style={{ height: "auto", width: "min(320px, 100%)" }}
  />
);
