import type { Metadata } from "next";
import { site } from "./site";

interface PageSeo {
  /** Omit for the homepage — the root default title applies. */
  title?: string;
  description: string;
  /** Route path, e.g. "/products". */
  path: string;
  noindex?: boolean;
  /** Open Graph type — "website" by default, "article"/"profile" where it fits. */
  ogType?: "website" | "article" | "profile";
}

/**
 * Builds a complete, page-scoped Metadata block: canonical URL, Open Graph and
 * Twitter card — all rooted in the single source of truth in lib/site.tsx.
 * Titles still flow through the root layout's template ("%s — PSM"), so only
 * the human title goes here.
 *
 * Images are intentionally omitted: every route ships its own `opengraph-image`
 * file, and an explicit `openGraph.images` entry here would override them and
 * flatten every share back to a single card.
 *
 * `keywords` is deliberately not emitted — Google has ignored the meta keywords
 * tag since 2009, so the same terms belong in headings and body copy instead.
 */
export function pageMetadata({ title, description, path, noindex, ogType = "website" }: PageSeo): Metadata {
  const url = `${site.url}${path === "/" ? "/" : path}`;
  const ogTitle = title ? `${title} — ${site.name}` : `${site.full} — ${site.tagline}`;

  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName: site.full,
      locale: "en_US",
      type: ogType,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
