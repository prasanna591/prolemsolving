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
  /**
   * One-line summary for the homepage capability grid, where the full `title`
   * and `lede` above are far too long to sit on a card. Optional so adding a
   * capability doesn't break the homepage — but every entry has one.
   */
  short?: string;
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
    short: "Platforms, internal tools and enterprise systems.",
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
    short: "Automate workflows, data and decisions.",
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
    short: "Connect your existing tools into one ecosystem.",
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
    short: "Web and mobile apps for teams and customers.",
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
    short: "From manual processes to structured digital workflows.",
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

/**
 * Homepage "why PSM" grid. Deliberately separate from `values` above: those are
 * the company principles on /about, written for the team reading them. These
 * four are the buyer's objections — why choose us over another vendor — so they
 * share a structure but not a wording. Changing one must not silently rewrite
 * the other.
 */
export const whyPsm = [
  { title: "Problem-first", desc: "We find the real bottleneck before we build anything. The technology comes after." },
  { title: "Practical technology", desc: "Chosen for what you actually need — not for what's trending this quarter." },
  { title: "End-to-end", desc: "One team from the first idea through to a working system in daily use." },
  { title: "Built to grow", desc: "Solutions that scale with your organisation, not solutions that cap out." },
];

/**
 * Vision and mission, quoted from the company brief. Kept here rather than in
 * a component so the same wording can feed structured data later.
 *
 * `visionMission` pairs each statement with its card label so the About page
 * can render both cards from one list. The About page used to retype the two
 * statements inline, which meant editing the strings below silently left that
 * card saying something different from the homepage band. Read them from here
 * instead — but keep this to the statement only; the cards are deliberately
 * short, and padding them out with extra paragraphs was not wanted.
 */
export const vision =
  "A global company that solves problems and creates livelihoods through innovation.";

export const mission =
  "Turn real-world problems into technology that creates opportunity.";

export const visionMission = [
  { key: "vision" as const, label: "Our Vision", statement: vision },
  { key: "mission" as const, label: "Our Mission", statement: mission },
];

/**
 * Forward-looking statement. Public-facing for now — the brief flags this as
 * optional, so removing this export and its band is the only edit needed to
 * take hardware off the site.
 */
export const lookingAhead = {
  title: "Software today. More tomorrow.",
  desc: "We start with software and AI, and we plan to grow into hardware products. The focus stays the same: solve real problems and create opportunity.",
};

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

export interface PageFaqs {
  home: Faq[];
  solutions: Faq[];
  work: Faq[];
  products: Faq[];
  contact: Faq[];
  about: Faq[];
}

/**
 * Page-specific FAQs. Each page gets 4-6 questions tailored to what
 * that page's visitors actually ask. Answers are 30-50 words, start
 * with the direct answer, and use "we" or "PSM" consistently.
 * FAQPage schema is rendered from the same data so text and markup
 * never drift apart.
 */
export const pageFaqs: PageFaqs = {
  home: [
    {
      q: "What does Problem Solving Mind do?",
      a: "PSM builds custom software, AI automation and connected systems for industries, and develops simple products for everyday people. We start with the business problem first and choose the technology after.",
    },
    {
      q: "Who does PSM work with?",
      a: "We serve larger-scale industries, including manufacturing and operations-heavy businesses, through our services. Everyday customers use our products. If you have a complex process or disconnected systems, we can help.",
    },
    {
      q: "What products is PSM building?",
      a: "We build five products. EYD (home construction and real estate) is in production, BOOWA (scheduled local delivery) is in testing, and LECOM (communication and learning), Aura (proactive health companion) and Founder OS (founder productivity) are in development.",
    },
    {
      q: "Where is PSM based, and do you work outside India?",
      a: "We are based in Pondicherry, Tamil Nadu, and work with clients worldwide. Most collaboration happens remotely, with visits arranged when a project needs them.",
    },
    {
      q: "How do I get started?",
      a: "Send us a short description of the problem through the contact form or email hello@problemsolvingmind.com. We reply within two working days and tell you honestly whether technology can solve it.",
    },
  ],
  solutions: [
    {
      q: "What business problems can PSM solve?",
      a: "We solve manual, repetitive and disconnected processes: data entry, systems that don't talk to each other, scattered reporting and tools that no longer fit the business. We scope the process first and the technology second.",
    },
    {
      q: "Can you connect our existing ERP, CRM and other tools?",
      a: "Yes. We integrate your current systems so data stays consistent and no one re-enters it. Most businesses don't need a new platform, just their existing tools working together.",
    },
    {
      q: "How does AI automation work in a real business?",
      a: "We apply AI to tasks like document reading, data extraction, classification and decision support, with human review where accuracy matters. We start with one workflow that costs you time and expand from there.",
    },
    {
      q: "How does a project run from start to finish?",
      a: "Six steps: problem, understand, design, build, integrate and scale. You get a clear scope after the first discovery conversation, and we keep you involved throughout.",
    },
    {
      q: "How much does a project cost, and how long does it take?",
      a: "It depends on scope, systems involved and complexity, so we don't quote blindly. After a discovery call we share an estimate and timeline in writing before any build starts.",
    },
    {
      q: "Do we own the software you build?",
      a: "Ownership terms are agreed in the project contract before work begins, including source code, documentation and handover, so you know what you receive.",
    },
  ],
  work: [
    {
      q: "Are Relay, Clarion and Bridge available to businesses?",
      a: "They are platforms born from client work. Relay automates operations, Clarion reads documents with AI and Bridge keeps ERP and CRM data in agreement. Deployments and demos are available on request.",
    },
    {
      q: "Why don't you publish client names or numbers?",
      a: "We publish only what clients approve. Where figures are confidential, we describe the problem, approach and outcome plainly rather than inflate results. We can share verifiable details during a discussion.",
    },
    {
      q: "Can I see a demo or speak to a past client?",
      a: "Share your problem and we'll show the closest relevant build. References are available once we've understood your needs and the client agrees.",
    },
    {
      q: "Do your projects become products?",
      a: "Often yes. Reusable parts of client work feed our own platforms, so every improvement benefits future solutions, while client data and confidential logic stay separate.",
    },
  ],
  products: [
    {
      q: "What is the status of your products?",
      a: "EYD is in production, BOOWA is in testing, and LECOM, Aura and Founder OS are in development. We share updates as each one moves forward.",
    },
    {
      q: "Can I get early access or join a waitlist?",
      a: "Yes. Contact us with the product name and we'll add you to the early-access list for updates.",
    },
    {
      q: "Can a business partner with PSM on a product?",
      a: "We welcome partnerships and pilots for products that fit your sector. Contact us with a short note on your goal.",
    },
    {
      q: "Will PSM build hardware products too?",
      a: "Our focus today is software and AI. We plan to grow into hardware over time and will announce anything concrete when it's ready.",
    },
  ],
  contact: [
    {
      q: "How quickly will I get a reply?",
      a: "We reply within two working days. Mention how urgent the problem is, and we'll prioritise accordingly.",
    },
    {
      q: "What should I include in my message?",
      a: "Describe the problem, how urgently you need it solved and what it costs you now. Add your company, tools in use and any budget range if you have one.",
    },
    {
      q: "Is my information kept private?",
      a: "Yes. We never share your details, and we can sign an NDA before you share sensitive information. See our privacy policy.",
    },
    {
      q: "Can I call or WhatsApp?",
      a: "Yes. Call or WhatsApp +91 93602 07861, or email hello@problemsolvingmind.com.",
    },
  ],
  about: [
    {
      q: "Who founded Problem Solving Mind?",
      a: "PSM was founded by Prasanna Venkatesan R. (Founder & Managing Director) and Maniyarasan S. (Co-founder & CEO). Prasanna leads product strategy and long-term execution; Maniyarasan leads the company as CEO and focuses on product design, practical execution and engineering delivery.",
    },
    {
      q: "What is PSM's goal as a company?",
      a: "To build technology products that begin with real problems, prove their value in the real world, and eventually reach people and businesses at scale. We measure success by whether problems stop being problems.",
    },
    {
      q: "How does PSM differ from a typical agency?",
      a: "PSM is a product company with a solutions practice. Products are the primary identity; client work feeds reusable capability that becomes part of shipped products. We don't bill hours — we build outcomes.",
    },
    {
      q: "Where is the team based?",
      a: "The team is based in Pondicherry, Tamil Nadu, India. We work with clients worldwide and collaborate remotely, with visits arranged when a project needs them.",
    },
    {
      q: "What industries does PSM work in?",
      a: "Our products span real estate, communication, local commerce, healthcare and founder productivity. Client work starts from operational problems, not sectors — we work wherever manual, disconnected processes exist.",
    },
    {
      q: "How can I join the team?",
      a: "We read every application sent through the careers page. We hire for how people think and reason about problems, not for a list of technologies. Open applications are always welcome.",
    },
  ],
};
