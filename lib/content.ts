export interface ProblemCard {
  problem: string;
  desc: string;
  outcome: string;
}

export const problems: ProblemCard[] = [
  { problem: "Operations run on people's heads", desc: "Processes that only work because someone remembers them, chases them, or fixes them manually every single day.", outcome: "We build the backbone that runs it." },
  { problem: "Data lives in silos that don't talk", desc: "Orders here, stock there, customers somewhere else — and someone re-entering data between them by hand.", outcome: "We make the systems talk." },
  { problem: "Repetitive work is the bottleneck", desc: "Teams too busy with data entry, paperwork and follow-ups to do the work that actually grows the business.", outcome: "We automate the busywork." },
  { problem: "Hidden costs in manual steps", desc: "Errors, delays and exceptions that quietly leak money — invisible until someone counts them.", outcome: "We remove the steps, and the leaks." },
  { problem: "Growth outpacing the tools", desc: "The business grew, but the spreadsheets and inbox processes grew with it. Everything's flagging.", outcome: "We right-size the tech to the stage." },
  { problem: "Decisions made without ground truth", desc: "Leaders steering from instincts because the numbers they need are scattered and stale.", outcome: "We give you one source of truth." },
];

export interface Capability {
  id: string;
  eyebrow: string;
  eyebrowTone: "p" | "g" | "default";
  title: string;
  lede: string;
  points: { title: string; desc: string }[];
  visual: "dashboard" | "automation" | "integrate" | "mobile" | "transform";
}

export const capabilities: Capability[] = [
  {
    id: "business-software",
    eyebrow: "Business software",
    eyebrowTone: "p",
    title: "Custom software, built around how your business actually works",
    lede: "Off-the-shelf tools weren't built for your workflow — so they fight it. We build software that fits the way your operation really runs.",
    points: [
      { title: "Internal tools and dashboards", desc: "Replacing spreadsheets and guesswork." },
      { title: "Backoffice systems that scale", desc: "Sales, operations, inventory, finance." },
      { title: "Software the team actually wants to use", desc: "Designed for people, not just processes." },
    ],
    visual: "dashboard",
  },
  {
    id: "ai-automation",
    eyebrow: "AI & automation",
    eyebrowTone: "g",
    title: "Put the repetitive parts on autopilot",
    lede: "AI is only useful when it removes real work. We apply it to documents, data entry, classification and decision support — where it saves hours every day.",
    points: [
      { title: "Document and data extraction", desc: "From piles of paper to clean records." },
      { title: "Workflow automation", desc: "Orchestrating the steps nobody enjoys." },
      { title: "Intelligent decision support", desc: "Surfacing what needs a human eye." },
    ],
    visual: "automation",
  },
  {
    id: "erp-crm",
    eyebrow: "ERP & CRM integration",
    eyebrowTone: "p",
    title: "Make the systems you already own work together",
    lede: "Most businesses don't need a new system — they need the systems they have to stop fighting each other. We wire them up properly.",
    points: [
      { title: "ERP ↔ CRM sync", desc: "One record of truth, everywhere it's needed." },
      { title: "Connecting your tool stack", desc: "Email, spreadsheets, platforms, databases." },
      { title: "Data that stays in agreement", desc: "No more manual reconciliation." },
    ],
    visual: "integrate",
  },
  {
    id: "web-mobile",
    eyebrow: "Web & mobile applications",
    eyebrowTone: "g",
    title: "Products your customers actually use",
    lede: "Web and mobile apps that put your business in front of the people who buy from it — built like products, polished like software should be.",
    points: [
      { title: "Customer-facing web apps", desc: "Portals, storefronts, booking, self-service." },
      { title: "Mobile applications", desc: "Native-feeling experiences on every screen." },
      { title: "Fast, accessible, secure by default", desc: "Quality isn't optional." },
    ],
    visual: "mobile",
  },
  {
    id: "transformation",
    eyebrow: "Digital transformation",
    eyebrowTone: "p",
    title: "From paper-based to platform-driven",
    lede: "Stepping into digital operation isn't about buying software — it's about reworking how the business runs, step by step, with the people doing the work.",
    points: [
      { title: "Digitise what runs on paper", desc: "Forms, approvals, records, coordination." },
      { title: "Change that lands", desc: "Adoption handled, not just systems delivered." },
      { title: "Built to keep improving", desc: "You own a capability, not a one-time project." },
    ],
    visual: "transform",
  },
];

export const values = [
  { title: "Product-first, always", desc: "Products are the primary identity. Services exist to sharpen the way we build them — not the other way around." },
  { title: "Engineers who think", desc: "We reason from first principles. Technology is a tool we choose for the problem — never the starting point." },
  { title: "Built around outcomes", desc: "We measure success by whether a real problem got solved — for our products, and for the businesses we work with." },
  { title: "Thinking beyond projects", desc: "Every build feeds into reusable products and platforms. One day, products used around the world." },
];

export const journey = [
  { n: "01", title: "Problems", desc: "We begin with the pain — a process that breaks, a task nobody wants, an opportunity the business can't reach." },
  { n: "02", title: "Understand", desc: "We reason from first principles. What is actually happening, and what technology would genuinely change it?" },
  { n: "03", title: "Design", desc: "We shape the smallest true solution — the simplest thing that removes the pain, designed for the people who'll use it." },
  { n: "04", title: "Build", desc: "We ship real software — products and systems, engineered properly and meant to be used every working day." },
  { n: "05", title: "Integrate", desc: "We connect the new system to the ones already standing, so nothing important lives isolated in a silo." },
  { n: "06", title: "Scale", desc: "We watch how it performs in real use, then make it repeatable — so the solution outlives the project." },
];
export interface Faq {
  q: string;
  a: string;
}

/**
 * Question-and-answer pairs. Generative engines preferentially quote
 * self-contained Q→A passages, and FAQPage markup makes the answers
 * machine-extractable for AI Overviews and assistants. Answers are drawn
 * from the same claims made elsewhere on the site — nothing here should
 * assert a fact the rest of the content does not support.
 */
export const faqs: Faq[] = [
  {
    q: "What is Problem Solving Mind (PSM)?",
    a: "Problem Solving Mind, usually shortened to PSM, is a product-first technology company based in Pondicherry, Tamil Nadu, India. It builds its own software products and also builds software systems for businesses with operational problems that off-the-shelf tools cannot solve. Its tagline is \"Building Products. Solving Problems.\"",
  },
  {
    q: "Where is PSM based and does it work with clients outside India?",
    a: `PSM is based in Pondicherry, Tamil Nadu, India, and works with clients worldwide. Enquiries can reach the team at hello@problemsolvingmind.com or on +91 93602 07861, and messages are answered within two working days.`,
  },
  {
    q: "Who founded PSM?",
    a: "PSM was founded by Prasanna Venkatesan R., who leads product direction and long-term execution, together with co-founder Maniyarasan S., who focuses on product design, practical execution and engineering delivery.",
  },
  {
    q: "What products is PSM building?",
    a: "PSM has five products in development across different domains. EYD is a real estate ecosystem covering 3D property viewing, buying, selling and construction. LECOM is a communication and learning platform. BOOWA is a hyperlocal scheduled-delivery platform. Aura is a proactive health companion focused on awareness and preventive care. Founder OS is a productivity and organisation app for founders and entrepreneurs.",
  },
  {
    q: "Is PSM a software product company or an agency?",
    a: "PSM describes itself as a product company with a solutions practice. Products are its primary identity; client work exists to sharpen how it builds and to turn every engagement into reusable capability that becomes part of a shipped product.",
  },
  {
    q: "What services does PSM offer to businesses?",
    a: "PSM offers custom business software and internal tools, AI and workflow automation, ERP and CRM integration, web and mobile application development, and digital transformation. It also handles broader build categories including operations automation, AI document intelligence, decision and reporting layers, and system integration.",
  },
  {
    q: "Which industries does PSM work in?",
    a: "PSM's own products span real estate and construction, communication and personal development, hyperlocal commerce and delivery, healthcare, and entrepreneurship. Its client work is not restricted by industry — it starts from the operational problem rather than the sector.",
  },
  {
    q: "How does PSM decide what to build?",
    a: "PSM works problem-first. It looks for real problems observed in the world rather than for uses for a technology. The stated sequence is: understand the problem, design the smallest true solution, build it, integrate it with existing systems, and scale it once it performs in real use.",
  },
  {
    q: "How do I contact PSM about a project?",
    a: "Use the contact form at problemsolvingmind.com/contact, email hello@problemsolvingmind.com, or call +91 93602 07861. PSM asks clients to describe the problem, how urgently it needs solving, and what it is currently costing not to solve it, then responds honestly about whether technology can help.",
  },
  {
    q: "Does PSM publish client names and performance metrics?",
    a: "No. PSM states that it does not publish client names without permission and does not publish metrics a client has not approved. Case studies on its work page describe the problem, the approach, the technology and the outcome in general terms rather than attaching confidential figures.",
  },
];
