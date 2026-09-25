export type ProductStatus = "brand" | "accp" | "accg" | "neutral";

import building from "@/app/images/building.png";
import eydReferance from "@/app/images/EYD_referance.png";

export interface Product {
  id: string;
  name: string;
  category: string;
  status: string;
  statusTone: ProductStatus;
  tagline: string;
  description: string;
  tone: string;
  visual: "lecom" | "eyd" | "boowa" | "aura" | "founder";
  focus: string[];
  /** landscape photos shown in the feature strip on the product page */
  media?: { src: string; alt: string }[];
}

export const featured: Product[] = [
  {
    id: "eyd",
    name: "EYD",
    category: "Real estate · 3D · Construction",
    status: "In Development",
    statusTone: "brand",
    tagline: "Explore Your Dreams.",
    description:
      "A complete digital ecosystem for discovering, buying, building, and selling homes — immersive 3D property experiences with the full home-building journey in one connected platform.",
    tone: "product-visual__tone--brand",
    visual: "eyd",
    focus: ["3D Property Viewing", "Buy & Sell", "Construction", "Materials", "Professionals"],
    media: [
      { src: building.src, alt: "EYD — building the homes of tomorrow" },
      { src: eydReferance.src, alt: "EYD — design reference" },
    ],
  },
  {
    id: "lecom",
    name: "LECOM",
    category: "Communication · Learning · Personal Development",
    status: "In Development",
    statusTone: "accp",
    tagline: "Communication. Learning. Growth.",
    description:
      "A communication and learning platform designed to help people communicate better, learn effectively, and continuously improve — bringing communication, learning experiences, and personal development into one connected platform.",
    tone: "product-visual__tone--accp",
    visual: "lecom",
    focus: ["Communication", "Learning", "Personal Development"],
  },
  {
    id: "boowa",
    name: "BOOWA",
    category: "Hyperlocal commerce · Scheduled delivery · Local businesses",
    status: "In Development",
    statusTone: "accg",
    tagline: "Local Delivery, On Your Schedule.",
    description:
      "A hyperlocal scheduled-delivery platform connecting customers, local businesses, and delivery operations through a more organized, predictable delivery experience. Boowa is built around planned local delivery — what you need, when you need it.",
    tone: "product-visual__tone--accg",
    visual: "boowa",
    focus: ["Hyperlocal Commerce", "Scheduled Delivery", "Local Businesses"],
  },
];

export const inDevelopment: Product[] = [
  {
    id: "aura",
    name: "Aura",
    category: "Health awareness · Intelligent assistance · Preventive care",
    status: "In Development",
    statusTone: "brand",
    tagline: "Your Proactive Health Companion.",
    description:
      "A proactive healthcare assistant designed to help people become more aware of their health and take action before problems become bigger — continuous assistance, intelligent insights, and a more proactive approach to personal health management.",
    tone: "product-visual__tone--brand",
    visual: "aura",
    focus: ["Health Awareness", "Intelligent Assistance", "Preventive Care"],
  },
  {
    id: "founder-os",
    name: "Founder OS",
    category: "Founder productivity · Organization · Time · Business management",
    status: "In Development",
    statusTone: "neutral",
    tagline: "Run Your Company. Protect Your Time.",
    description:
      "A mobile platform for founders and entrepreneurs to organize their work, manage priorities, improve productivity, and protect the quality of their personal and professional time. A better-organized founder can build a better company.",
    tone: "product-visual__tone--accp",
    visual: "founder",
    focus: ["Founder Productivity", "Organization", "Time", "Business Management"],
  },
];

export const allProducts = [...featured, ...inDevelopment];