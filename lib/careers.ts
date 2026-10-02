import { site } from "./site";

/**
 * Careers data.
 *
 * `openRoles` is intentionally empty. PSM is actively hiring, but hiring is not
 * the same as having a live, signed vacancy to advertise — publishing invented
 * roles would put fictional jobs in front of real applicants, and `JobPosting`
 * schema on a fake listing is worse than no schema at all.
 *
 * So the page runs an open-application state instead: we say plainly that we are
 * hiring, name the disciplines, and read every application. `openRoles` stays
 * empty until there is something real to apply to.
 *
 * To post a role, add an entry to `openRoles`. The page, the schema, the OG
 * copy and the per-role `mailto:` links are all derived from this array, so
 * nothing else needs editing.
 */

export type RoleType = "Full-time" | "Part-time" | "Internship" | "Freelance / Contract";

export interface Role {
  slug: string;
  title: string;
  type: RoleType;
  /** Free text, because "Pondicherry or remote, IST overlap" is a real answer and a city name is not. */
  location: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  /** ISO `YYYY-MM-DD`. Google treats `JobPosting` without `datePosted` as invalid. */
  datePosted?: string;
  /** ISO `YYYY-MM-DD` the posting should be withdrawn. Omit for open-ended. */
  validThrough?: string;
}

/** Live openings. Empty until there is something real to apply to. */
export const openRoles: Role[] = [];

export const hasOpenRoles = openRoles.length > 0;

/** Where applications go. Not a new inbox — the one already published on the contact page. */
export const careersEmail = site.email;

/**
 * A `mailto:` that opens in the visitor's own mail client with the role
 * prefilled in the subject and a skeleton in the body.
 *
 * Built here rather than hand-written per role so the query string is encoded
 * once — an unencoded `&` or space in a role title silently truncates the mail.
 */
export function applyHref(role?: Pick<Role, "title">): string {
  const subject = role ? `Application — ${role.title} at ${site.full}` : `Open application — ${site.full}`;
  const body = [
    `Hi ${site.name},`,
    "",
    role ? `I'd like to apply for the ${role.title} role.` : "I'd like to apply to work with you.",
    "",
    `What I want to build:`,
    "",
    `Links (portfolio, GitHub, anything you've shipped):`,
    "",
    `Where I'm based, and my timezone:`,
    "",
    `A problem I'd like to solve:`,
    "",
  ].join("\n");
  return `mailto:${careersEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * The disciplines PSM actually hires for, derived from the service lines and
 * product portfolio on the rest of the site. These are interest areas, not
 * vacancies — an application here is an open application, and the page says so.
 */
export const disciplines: { title: string; detail: string }[] = [
  {
    title: "Product and full-stack engineering",
    detail:
      "Owning a system end to end — schema, APIs, background jobs and the interface people actually use in it.",
  },
  {
    title: "AI and workflow automation",
    detail:
      "Document intelligence, automation and the unglamorous plumbing that makes any of it reliable on real data.",
  },
  {
    title: "Product design and design engineering",
    detail:
      "Interfaces for operational software: dense, fast and legible for people who live in them all day.",
  },
  {
    title: "Client-side problem solving",
    detail:
      "Sitting with a business, understanding how the work really happens, and turning it into requirements that survive contact with reality.",
  },
  {
    title: "Internships and apprenticeships",
    detail:
      "Structured, with real work and real review, for people early in their careers in or near Pondicherry.",
  },
];

/**
 * The honest version of "what we're looking for". Every entry is a real
 * expectation of working here, stated up front, which is both better filtering
 * and better recruiting than a list of vague virtues.
 *
 * Weighted toward how someone thinks: PSM hires for reasoning and problem
 * solving first, because the tools change and the thinking does not.
 */
export const traits: { title: string; detail: string; accent: string }[] = [
  {
    title: "You want to finish things",
    detail:
      "Twenty-plus people means work outlives your attention span. Owning something means seeing it through to shipped and actually used — not handing it on half-done.",
    accent: "var(--color-brand)",
  },
  {
    title: "You think before you build",
    detail:
      "We would rather hear the wrong question early than review the wrong code late. Reasoning out loud is a habit here, not a performance for the interview panel.",
    accent: "var(--color-electric)",
  },
  {
    title: "You like problems nobody has written down",
    detail:
      "A lot of our work starts in discovery. The specification usually does not exist yet when you are asked to help write it.",
    accent: "var(--color-cyan)",
  },
  {
    title: "You would rather be useful than correct",
    detail:
      "Client work means talking to people, being wrong in front of them, and changing your mind without defensiveness.",
    accent: "var(--color-teal)",
  },
  {
    title: "You can work without supervision",
    detail:
      "We are not looking for someone to be managed. We are looking for someone who does not need to be.",
    accent: "var(--color-accp)",
  },
  {
    title: "Distributed works, but hours have to overlap",
    detail:
      "We serve clients across India and worldwide and are used to working that way. Expect some overlap with IST — not 24/7.",
    accent: "var(--color-accg)",
  },
];

export const benefits: { title: string; detail: string }[] = [
  {
    title: "Work you can point at",
    detail: "Things that ship and get used. EYD, Lecom, Boowa and Aura are ours, not a client's.",
  },
  {
    title: "A short line to the decision",
    detail: "You talk to the people deciding the work, not through three layers to find out who they are.",
  },
  {
    title: "Hard problems, no enterprise politics",
    detail: "Ambiguity and scale problems without a committee to navigate before you can start.",
  },
  {
    title: "A real say in scope",
    detail: "Say what should not be built as often as what should. That is cheaper than the alternative.",
  },
];

/** Six steps — matches the fixed six-column `.tl` timeline used elsewhere. */
export const process: { n: string; title: string; detail: string }[] = [
  { n: "01", title: "Send an email", detail: "Tell us what you want to build. Links beat cover letters." },
  { n: "02", title: "A real conversation", detail: "Half an hour with a founder. Bring questions." },
  { n: "03", title: "A problem, not a test", detail: "We give you a genuine problem and watch how you think about it." },
  { n: "04", title: "A short piece of work", detail: "Scoped small. If it turns out to be real work, it gets paid." },
  { n: "05", title: "A clear answer", detail: "Either way you hear from us. We do not leave people waiting." },
  { n: "06", title: "Build it together", detail: "The reliable way to know is to build something together." },
];