import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { allProducts } from "@/lib/products";
import { founders } from "@/lib/founders";

export const dynamic = "force-static";

type ChangeFrequency = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: { path: string; changeFrequency: ChangeFrequency; priority: number }[] = [
    { path: "", changeFrequency: "weekly", priority: 1 },
    { path: "/products", changeFrequency: "weekly", priority: 0.9 },
    { path: "/solutions", changeFrequency: "monthly", priority: 0.8 },
    { path: "/work", changeFrequency: "monthly", priority: 0.8 },
    { path: "/about", changeFrequency: "monthly", priority: 0.8 },
    { path: "/about/motives", changeFrequency: "monthly", priority: 0.7 },
    { path: "/about/founders", changeFrequency: "monthly", priority: 0.7 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
  ];

  const productPages: typeof routes[number][] = allProducts.map((p) => ({
    path: `/products/${p.id}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const founderPages: typeof routes[number][] = founders.map((f) => ({
    path: `/about/founders/${f.slug}`,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...routes, ...productPages, ...founderPages].map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}