import { site } from "./site";
import type { Product } from "./products";
import type { CaseStudy } from "./caseStudies";
import type { Capability } from "./content";

/* ---------------------------------------------------------- *
   Structured data (JSON-LD) builders — one schema per page,
   emitted by <JsonLd> in each server component.
 * ---------------------------------------------------------- */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.full,
    alternateName: site.name,
    url: site.url,
    email: site.email,
    logo: `${site.url}/icon.png`,
    slogan: site.tagline,
    description: site.supportLine,
    foundingLocation: { "@type": "Place", name: "Pune, Maharashtra, India" },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    alternateName: site.full,
    url: site.url,
    description: site.supportLine,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: site.full,
      url: site.url,
      logo: `${site.url}/icon.png`,
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path}`,
    })),
  };
}

export function collectionSchema(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    url: `${site.url}${path}`,
    isPartOf: websiteSchema() as unknown,
    inLanguage: "en",
  };
}

export function productsSchema(products: Product[]) {
  return {
    ...collectionSchema("Products — PSM", "/products"),
    name: "Products — PSM",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: productSchema(p),
      })),
    },
  };
}

export function productSchema(p: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    category: p.category,
    url: `${site.url}/products/${p.id}`,
    brand: { "@type": "Brand", name: site.full },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/PreOrder",
      url: `${site.url}/products/${p.id}`,
    },
  };
}

export function servicesSchema(capabilities: Capability[]) {
  return {
    ...collectionSchema("Solutions — PSM", "/solutions"),
    name: "Solutions — PSM",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: capabilities.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Service",
          name: c.title,
          description: c.lede,
          serviceType: c.eyebrow,
          areaServed: "Worldwide",
          provider: organizationSchema() as unknown,
          url: `${site.url}/solutions#${c.id}`,
        },
      })),
    },
  };
}

export function workSchema(caseStudies: CaseStudy[]) {
  return {
    ...collectionSchema("Work — PSM", "/work"),
    name: "Work — PSM",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: caseStudies.map((cs, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Article",
          headline: cs.title,
          description: cs.subtitle,
          keywords: cs.tags.join(", "),
          url: `${site.url}/work#${cs.id}`,
          author: { "@type": "Organization", name: site.full, url: site.url },
          publisher: {
            "@type": "Organization",
            name: site.full,
            url: site.url,
            logo: `${site.url}/icon.png`,
          },
        },
      })),
    },
  };
}

export function aboutSchema(founders: { name: string; jobTitle: string }[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(),
      {
        "@type": "AboutPage",
        name: "About PSM",
        url: `${site.url}/about`,
        isPartOf: websiteSchema() as unknown,
        about: {
          "@type": "Organization",
          name: site.full,
          url: site.url,
        },
      },
      ...founders.map((f) => ({
        "@type": "Person",
        name: f.name,
        jobTitle: f.jobTitle,
        worksFor: {
          "@type": "Organization",
          name: site.full,
          url: site.url,
        },
      })),
    ],
  };
}

export function contactSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact PSM",
    url: `${site.url}/contact`,
    isPartOf: websiteSchema() as unknown,
    mainEntity: {
      "@type": "Organization",
      name: site.full,
      url: site.url,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: site.email,
        telephone: "+91-93005-38399",
        availableLanguage: "English",
        areaServed: "Worldwide",
      },
    },
  };
}

export function founderSchema(name: string, jobTitle: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `${name} — ${site.full}`,
    url: `${site.url}/about/founders`,
    mainEntity: {
      "@type": "Person",
      name,
      jobTitle,
      worksFor: {
        "@type": "Organization",
        name: site.full,
        url: site.url,
        logo: `${site.url}/icon.png`,
      },
    },
  };
}

export function motivesSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Why PSM exists",
    url: `${site.url}/about/motives`,
    isPartOf: websiteSchema() as unknown,
    mainEntity: {
      "@type": "Organization",
      name: site.full,
      url: site.url,
      email: site.email,
      slogan: site.tagline,
      description: site.supportLine,
    },
  };
}