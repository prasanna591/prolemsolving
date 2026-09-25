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
    id: "relay",
    title: "Why we built Relay instead of selling one-off automations",
    subtitle:
      "Every bespoke automation we delivered was the same solution, rebuilt for a different client. Relay is the answer to that recurring pattern.",
    eyebrow: "Product build",
    tags: ["Operations automation", "B2B software"],
    tone: "brand",
    blocks: [
      {
        label: "Problem",
        body: "Businesses kept asking for the same automation: orders, invoices, follow-ups and records that moved between systems and people by hand. Each build solved it once, for one company, and taught us nothing new the second time.",
      },
      {
        label: "Approach",
        body: "We stopped counting hours and started counting problem families. Instead of delivering the tenth one-off automation, we isolated the reusable core — the triggers, the steps, the handoffs — and started building it as a platform.",
      },
      {
        label: "Technology",
        body: "The platform stack we chose to make workflows repeatable, safe and observable.",
        tech: ["Event-driven workflow engine", "System connectors", "Human-in-the-loop steps", "Audit logging", "Visual automation builder"],
      },
      {
        label: "Solution",
        body: "Relay: an operations automation platform where workflows are built once — visually, with audit trails and safe human approvals — and reused across the businesses that need them.",
      },
    ],
    outcome:
      "Repetitive processing no longer lands on teams as a daily chore. The same automation that once required a bespoke build now comes off the platform — and every improvement to Relay improves every workflow running on it. Client deployments are detailed on request.",
    quote: "We stopped counting hours and started counting problem families.",
    quoteSource: "The reason Relay exists",
  },
  {
    id: "clarion",
    title: "Turning months of paperwork into structured data",
    subtitle:
      "An AI pipeline that reads documents with understanding — not just optical recognition — so records become data any system can use.",
    eyebrow: "AI system",
    tags: ["Document intelligence", "LLM-based understanding"],
    tone: "accp",
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
  {
    id: "bridge",
    title: "When two systems don't speak, data drifts",
    subtitle:
      "Orders, stock and customer records lived in different worlds — reconciled manually, forever. A symptom of a design problem, not a missing plugin.",
    eyebrow: "Integration",
    tags: ["ERP & CRM", "System architecture"],
    tone: "accg",
    blocks: [
      {
        label: "Problem",
        body: "An ERP holding the books and a CRM holding the customers — with the same data entered twice, updating at different times, and drifting apart. Every week, someone reconciled the difference by hand.",
      },
      {
        label: "Approach",
        body: "We treated integration as a strategy, not a connector. The goal wasn't a sync script — it was a shared definition of truth, one source for each piece of data, and clear rules for who owns it.",
      },
      {
        label: "Technology",
        body: "The integration architecture that keeps two systems from ever silently disagreeing again.",
        tech: ["API-first integration layer", "Event-driven sync", "Conflict resolution rules", "Reconciliation dashboard", "Role-based data ownership"],
      },
      {
        label: "Solution",
        body: "Bridge: an integration platform that keeps ERP, CRM and the surrounding tool stack in agreement — event-driven, auditable, and explicit about which system owns each record.",
      },
    ],
    outcome:
      "The weekly manual reconciliation no longer exists. Both systems now run from one agreed version of the data — and when the business adds the next tool, connecting it is a configuration, not a project.",
    quote: "Integration isn't a connector. It's a strategy.",
    quoteSource: "The thinking behind Bridge",
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
  { badge: "Relay", tone: "brand" as Tone, title: "Manual processing steps removed from recurring workflows", desc: "Operational steps that consumed regular team time now run automatically — under approval where it matters, with a full audit trail." },
  { badge: "Clarion", tone: "accp" as Tone, title: "Months of archives made searchable as data", desc: "Paper and PDF records converted to structured, queryable information — retrieval down from manual searches to seconds." },
  { badge: "Bridge", tone: "accg" as Tone, title: "A manual reconciliation process retired", desc: "Two systems now agree without the weekly by-hand cleanup that used to keep them aligned." },
  { badge: "Principle", tone: "navy" as Tone, title: "Every build feeds a product", desc: "Work for one business becomes capability for many. The bench grows with every engagement — that's the compounding effect." },
];