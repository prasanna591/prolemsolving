import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { allProducts } from "@/lib/products";
import { founders } from "@/lib/founders";

export const dynamic = "force-static";

type ChangeFrequency = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

interface Route {
  path: string;
  changeFrequency: ChangeFrequency;
  priority: number;
  /** ISO date of the last meaningful content change. */
  lastModified: string;
}

/**
 * Per-route modification dates. Google only acts on `lastmod` when it is
 * truthful and differs between URLs — a build-time `new Date()` stamps every
 * page identically and the signal is discarded. Update the entry when that
 * page's copy or data actually changes.
 */
const EDITED = "2026-09-29";

const routes: Route[] = [
  { path: "", changeFrequency: "weekly", priority: 1, lastModified: EDITED },
  { path: "/products", changeFrequency: "weekly", priority: 0.9, lastModified: EDITED },
  { path: "/solutions", changeFrequency: "monthly", priority: 0.9, lastModified: EDITED },
  { path: "/work", changeFrequency: "monthly", priority: 0.8, lastModified: EDITED },
  { path: "/about", changeFrequency: "monthly", priority: 0.8, lastModified: EDITED },
  { path: "/about/motives", changeFrequency: "monthly", priority: 0.7, lastModified: EDITED },
  { path: "/about/founders", changeFrequency: "monthly", priority: 0.7, lastModified: EDITED },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6, lastModified: EDITED },
];

const productRoutes: Route[] = allProducts.map((p) => ({
  path: `/products/${p.id}`,
  changeFrequency: "monthly",
  priority: 0.7,
  lastModified: EDITED,
}));

const founderRoutes: Route[] = founders.map((f) => ({
  path: `/about/founders/${f.slug}`,
  changeFrequency: "yearly",
  priority: 0.6,
  lastModified: EDITED,
}));

const url = (path: string) => `${site.url}${path === "/" ? "/" : path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  return [...routes, ...productRoutes, ...founderRoutes].map((r) => ({
    url: url(r.path),
    lastModified: new Date(r.lastModified),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
