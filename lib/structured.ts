import { site } from "./site";
import type { Product } from "./products";
import type { CaseStudy } from "./caseStudies";
import type { Capability, Faq } from "./content";
import productEyd from "@/app/images/eyd.webp";
import productLecom from "@/app/images/lecom.webp";
import productBoowa from "@/app/images/boowa.webp";
import productAura from "@/app/images/aura.webp";
import productFounder from "@/app/images/founder_OS.webp";

/* ---------------------------------------------------------- *
   Structured data (JSON-LD) builders — one schema per page,
   emitted by <JsonLd> in each server component.

   Nodes are linked with stable `@id` values so the graph can be
   traversed: WebPage -> breadcrumb, WebPage -> mainEntity,
   Person -> worksFor -> Organization. Search engines and LLM
   retrievers resolve entities through these edges plus `sameAs`,
   so external profile URLs belong in lib/site.tsx.
 * ---------------------------------------------------------- */

const ORG_ID = `${site.url}/#organization`;
const SITE_ID = `${site.url}/#website`;

const productImage: Record<Product["visual"], string> = {
  eyd: productEyd.src,
  lecom: productLecom.src,
  boowa: productBoowa.src,
  aura: productAura.src,
  founder: productFounder.src,
};

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.full,
    alternateName: site.name,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    logo: {
      "@type": "ImageObject",
      url: `${site.url}/icon.png`,
      width: 512,
      height: 512,
    },
    image: `${site.url}/icon.png`,
    slogan: site.tagline,
    description: site.supportLine,
    foundingLocation: { "@type": "Place", name: `${site.locality}, ${site.region}, ${site.country}` },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.locality,
      addressRegion: site.region,
      addressCountry: site.country,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: site.email,
        telephone: site.phone,
        availableLanguage: "English",
        areaServed: site.areaServed,
      },
    ],
    areaServed: site.areaServed,
    numberOfEmployees: { "@type": "QuantitativeValue", value: 2 },
    knowsAbout: [
      "Custom business software",
      "Artificial intelligence",
      "Workflow automation",
      "ERP and CRM integration",
      "Web and mobile application development",
      "Digital transformation",
      "Document intelligence",
      "Product management",
    ],
    ...(site.sameAs.length ? { sameAs: site.sameAs } : {}),
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    name: site.name,
    alternateName: site.full,
    url: site.url,
    description: site.supportLine,
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
  };
}

export function personSchema(p: {
  name: string;
  slug: string;
  role: string;
  photo?: { src: string };
  sameAs?: string[];
}) {
  return {
    "@type": "Person",
    "@id": `${site.url}/about/founders/${p.slug}#person`,
    name: p.name,
    jobTitle: p.role,
    url: `${site.url}/about/founders/${p.slug}`,
    ...(p.photo ? { image: p.photo.src } : {}),
    worksFor: { "@id": ORG_ID },
    ...(p.sameAs?.length ? { sameAs: p.sameAs } : {}),
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

/**
 * Wraps a page-specific `mainEntity` in a WebPage node so every route
 * declares its own type, canonical URL and language — rather than only
 * the bespoke CollectionPage/AboutPage nodes some routes were using.
 */
export function webPageSchema({
  path,
  name,
  description,
  type = "WebPage",
  mainEntity,
  breadcrumb,
  dateModified,
}: {
  path: string;
  name: string;
  description: string;
  type?: string;
  mainEntity?: Record<string, unknown>;
  breadcrumb?: { name: string; path: string }[];
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${site.url}${path === "/" ? "/" : path}#webpage`,
    url: `${site.url}${path === "/" ? "/" : path}`,
    name,
    description,
    inLanguage: "en",
    isPartOf: { "@id": SITE_ID },
    about: { "@id": ORG_ID },
    ...(breadcrumb?.length ? { breadcrumb: { "@id": `${site.url}${path}#breadcrumb` } } : {}),
    ...(mainEntity ? { mainEntity } : {}),
    ...(dateModified ? { dateModified } : {}),
  };
}

export function collectionSchema(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${site.url}${path}#collection`,
    name,
    url: `${site.url}${path}`,
    isPartOf: { "@id": SITE_ID },
    about: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${site.url}/#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function productsSchema(products: Product[]) {
  return {
    ...collectionSchema("Products — PSM", "/products"),
    name: "Products — PSM",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: { "@id": `${site.url}/products/${p.id}#product` },
      })),
    },
  };
}

export function productSchema(p: Product) {
  const url = `${site.url}/products/${p.id}`;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: p.name,
    description: p.description,
    category: p.category,
    url,
    image: [productImage[p.visual]],
    brand: { "@type": "Brand", name: site.full },
    manufacturer: { "@id": ORG_ID },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Status", value: p.status },
      { "@type": "PropertyValue", name: "Focus areas", value: p.focus.join(", ") },
    ],
    isRelatedTo: { "@id": ORG_ID },
  };
}

export function servicesSchema(capabilities: Capability[]) {
  return {
    ...collectionSchema("Solutions — PSM", "/solutions"),
    name: "Solutions — PSM",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: capabilities.length,
      itemListElement: capabilities.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Service",
          name: c.title,
          description: c.lede,
          serviceType: c.eyebrow,
          areaServed: site.areaServed,
          provider: { "@id": ORG_ID },
          url: `${site.url}/solutions#${c.id}`,
        },
      })),
    },
  };
}

export function workSchema(caseStudies: CaseStudy[], updated?: string) {
  return {
    ...collectionSchema("Work — PSM", "/work"),
    name: "Work — PSM",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: caseStudies.length,
      itemListElement: caseStudies.map((cs, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Article",
          headline: cs.title,
          description: cs.subtitle,
          articleSection: cs.eyebrow,
          keywords: cs.tags.join(", "),
          url: `${site.url}/work#${cs.id}`,
          ...(updated ? { dateModified: updated } : {}),
          author: { "@id": ORG_ID },
          publisher: { "@id": ORG_ID },
        },
      })),
    },
  };
}

export function aboutSchema(founders: { name: string; slug: string; role: string; photo?: { src: string }; sameAs?: string[] }[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(),
      websiteSchema(),
      {
        "@type": "AboutPage",
        "@id": `${site.url}/about#webpage`,
        url: `${site.url}/about`,
        name: "About PSM",
        isPartOf: { "@id": SITE_ID },
        about: { "@id": ORG_ID },
        mainEntity: { "@id": ORG_ID },
      },
      ...founders.map((f) => personSchema(f)),
    ],
  };
}

export function contactSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${site.url}/contact#webpage`,
    name: "Contact PSM",
    url: `${site.url}/contact`,
    isPartOf: { "@id": SITE_ID },
    mainEntity: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: site.full,
      url: site.url,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: site.email,
        telephone: site.phone,
        availableLanguage: "English",
        areaServed: site.areaServed,
      },
    },
  };
}

export function founderSchema(p: {
  name: string;
  slug: string;
  role: string;
  summary: string;
  photo?: { src: string };
  sameAs?: string[];
}) {
  const url = `${site.url}/about/founders/${p.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${url}#webpage`,
    name: `${p.name} — ${site.full}`,
    url,
    isPartOf: { "@id": SITE_ID },
    mainEntity: {
      ...personSchema(p),
      description: p.summary,
    },
  };
}

export function motivesSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${site.url}/about/motives#webpage`,
    name: "Why PSM exists",
    url: `${site.url}/about/motives`,
    isPartOf: { "@id": SITE_ID },
    mainEntity: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: site.full,
      url: site.url,
      email: site.email,
      slogan: site.tagline,
      description: site.supportLine,
    },
  };
}
