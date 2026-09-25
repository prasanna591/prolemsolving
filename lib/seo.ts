import type { Metadata } from "next";
import { site } from "./site";

interface PageSeo {
  /** Omit for the homepage — the root default title applies. */
  title?: string;
  description: string;
  /** Route path, e.g. "/products". */
  path: string;
  keywords?: string[];
  noindex?: boolean;
}

/**
 * Builds a complete, page-scoped Metadata block: canonical URL, Open Graph,
 * Twitter card and keywords — all rooted in the single source of truth in
 * lib/site.tsx. Titles still flow through the root layout's template
 * ("%s — PSM"), so only the human title goes here.
 */
export function pageMetadata({ title, description, path, keywords, noindex }: PageSeo): Metadata {
  const url = `${site.url}${path === "/" ? "/" : path}`;
  const ogTitle = title ? `${title} — ${site.name}` : `${site.tagline} | ${site.name}`;

  return {
    ...(title ? { title } : {}),
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName: site.name,
      locale: "en_US",
      type: "website",
      images: [
        { url: `${site.url}/opengraph-image`, width: 1200, height: 630, alt: site.tagline },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [`${site.url}/opengraph-image`],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}