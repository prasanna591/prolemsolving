export type Tone = "brand" | "accp" | "accg" | "navy";

export interface CaseBlock {
  label: "Problem" | "Approach" | "Technology" | "Solution";
  body: string;
  tech?: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  eyebrow: string;
  tags: string[];
  tone: Tone;
  blocks: CaseBlock[];
  outcome: string;
  quote: string;
  quoteSource: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "cennzo",
    title: "Cennzo — Humanoid robotics company website",
    subtitle:
      "A technical marketing website for a humanoid robotics startup — communicating complex robotics capabilities to investors, partners, and talent.",
    eyebrow: "Technical website",
    tags: ["Robotics", "Technical marketing", "Investor communications", "Talent acquisition"],
    tone: "brand",
    blocks: [
      {
        label: "Problem",
        body: "Cennzo needed a website that could explain their humanoid robotics technology to non-technical stakeholders — investors, partners, potential hires — without dumbing it down. Their existing site didn't reflect the depth of their control systems, simulation stack, or hardware work.",
      },
      {
        label: "Approach",
        body: "We built a technical marketing site that translates robotics complexity into clear narratives. Interactive 3D visualizations show the robot and control architecture. Technical deep-dives satisfy engineers; executive summaries serve investors. CMS-driven so their team can update milestones.",
      },
      {
        label: "Technology",
        body: "A performant, visually rich site with interactive technical content.",
        tech: ["Next.js 15 + React 19", "Three.js / React Three Fiber for 3D", "GSAP scroll animations", "MDX for technical content", "Headless CMS (Sanity)", "Vercel deployment"],
      },
      {
        label: "Solution",
        body: "Cennzo website: a technical marketing platform where 3D robot visualizations, control architecture diagrams, and milestone updates communicate the full stack — from whole-body MPC to sim-to-real transfer — to every audience.",
      },
    ],
    outcome:
      "Site launched on schedule. Investor and hiring feedback: 'finally a robotics site that shows the engineering.' Internal team now publishes updates without engineering support.",
    quote: "Finally a robotics site that shows the engineering.",
    quoteSource: "Investor feedback",
  },
  {
    id: "nmr-research-global",
    title: "NMR Research Global — Research company website & custom application (in progress)",
    subtitle:
      "A research-focused website for an NMR spectroscopy and materials science company, with a custom research data application currently in development.",
    eyebrow: "Research website + custom app",
    tags: ["NMR spectroscopy", "Materials science", "Research website", "Custom application (building)"],
    tone: "accp",
    blocks: [
      {
        label: "Problem",
        body: "NMR Research Global needed a web presence that reflects their scientific credibility — publishing research, attracting collaborators, recruiting PhDs — while a custom research data platform is being built in parallel for experiment management, spectral analysis, and team collaboration.",
      },
      {
        label: "Approach",
        body: "We delivered a clean, research-oriented website first — publications, team, capabilities, contact. In parallel, we're building a custom application for their internal workflows: experiment tracking, spectral data management, and collaborative annotations. The site and app share design system and auth.",
      },
      {
        label: "Technology",
        body: "Website live; custom application in active development.",
        tech: ["Website: Next.js 15, MDX, Sanity CMS, Vercel", "Custom app (building): Next.js, React, Python/FastAPI, PostgreSQL, NMR format parsers (nmrglue), spectral viewer, experiment versioning"],
      },
      {
        label: "Solution",
        body: "NMR Research Global website (live) + custom research platform (in development): a unified digital presence where the public site showcases their science and the private application will manage their research workflows end-to-end.",
      },
    ],
    outcome:
      "Website live and serving publications, team, and recruiting. Custom application in active development — experiment tracking, spectral management, and collaboration modules being built with the research team.",
    quote: "Website live. Custom platform building with the team.",
    quoteSource: "Current status",
  },
  {
    id: "clarion",
    title: "Turning months of paperwork into structured data",
    subtitle:
      "An AI pipeline that reads documents with understanding — not just optical recognition — so records become data any system can use.",
    eyebrow: "AI system",
    tags: ["Document intelligence", "LLM-based understanding"],
    tone: "accg",
    blocks: [
      {
        label: "Problem",
        body: "Businesses sat on archives of paper and PDFs — contracts, invoices, forms — that were effectively unusable. Finding one fact meant opening months of files, by hand.",
      },
      {
        label: "Approach",
        body: "We set a standard that shaped everything: the system shouldn't just read text, it should answer like a careful assistant. That meant understanding layout, context and intent — not extracting bare strings.",
      },
      {
        label: "Technology",
        body: "The pipeline pieces that turned a document pile into dependable structured records.",
        tech: ["Document parsing pipeline", "Layout-aware reading", "LLM-based understanding", "Confidence scoring", "Human review rotation"],
      },
      {
        label: "Solution",
        body: "Clarion: an AI document intelligence pipeline that ingests documents, extracts what matters, and outputs structured records with confidence scores — routed for review only when it isn't sure.",
      },
    ],
    outcome:
      "Archives went from dead paper to searchable, queryable data — retrieval that once took days now happens in seconds, and downstream systems finally have records clean enough to act on.",
    quote: "The standard wasn't 'read the text' — it was 'answer like a careful assistant'.",
    quoteSource: "Design principle for Clarion",
  },
];

export interface BenchPattern {
  icon: "transform" | "implement" | "system" | "ai" | "launch" | "decision";
  title: string;
  desc: string;
}

export const benchPatterns: BenchPattern[] = [
  { icon: "transform", title: "Business transformations", desc: "Full reworks of how a business operates — processes digitised, workflows rebuilt, people trained on the new way." },
  { icon: "implement", title: "Product implementations", desc: "Taking product thinking into a business — deploying platforms, wiring them into daily use, running them to real outcomes." },
  { icon: "system", title: "Technology systems", desc: "Backbone infrastructure and internal systems — data, integrations and tooling engineered to be reliable and unexciting." },
  { icon: "ai", title: "AI into real workflows", desc: "AI applied where it removes actual work — classification, extraction, drafting, triage. Never demo magic in a slide deck." },
  { icon: "launch", title: "Web & mobile launches", desc: "Customer-facing products shipped properly — fast, accessible and designed around the people using them daily." },
  { icon: "decision", title: "Decision layers", desc: "Monitoring and reporting that give leaders one trustworthy view — instead of ten spreadsheets that disagree." },
];

export const resultsSummary = [
  { badge: "Cennzo", tone: "brand" as Tone, title: "Humanoid robotics website launched", desc: "Technical marketing site with 3D visualizations, CMS-driven updates. Investor and hiring feedback positive." },
  { badge: "NMR Research", tone: "accp" as Tone, title: "Research website live; custom app building", desc: "Public site live for publications and recruiting. Custom research platform in active development with the team." },
  { badge: "Clarion", tone: "accg" as Tone, title: "Months of archives made searchable as data", desc: "Paper and PDF records converted to structured, queryable information — retrieval down from manual searches to seconds." },
  { badge: "Principle", tone: "navy" as Tone, title: "Every build feeds a product", desc: "Work for one business becomes capability for many. The bench grows with every engagement — that's the compounding effect." },
];