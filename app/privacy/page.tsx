import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/jsonld";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/structured";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Problem Solving Mind handles your data: what the contact form collects, the one third-party processor involved, cookies, retention and your rights.",
  path: "/privacy",
  noindex: true,
});

const LAST_UPDATED = "October 2026";

/**
 * The shape of the page is data, not markup, for one reason: `pageFaqs.privacy`
 * is emitted as FAQPage schema and as the on-page FAQ, so a legal paragraph
 * only has to be written once. Every claim below was checked against the code
 * rather than copied from a template — there is no analytics script, nothing
 * writes `document.cookie`, and the form posts to a single named processor.
 */
const sections: { h: string; body: ReactNode }[] = [
  {
    h: "Who we are",
    body: (
      <>
        <p>
          {site.full} (&ldquo;PSM&rdquo;, &ldquo;we&rdquo;) is a product-first software company based in{" "}
          {site.locality}, {site.region}, India. We run this website at{" "}
          <span className="whitespace-nowrap">{site.url.replace(/^https?:\/\//, "")}</span>. For the purposes
          of data protection law we are the controller: we decide what is collected and why.
        </p>
        <p>
          This policy covers this website only. It does not cover the software products we build or
          operate for clients, which are governed by the contract under which they were delivered.
        </p>
      </>
    ),
  },
  {
    h: "What we collect",
    body: (
      <>
        <p>
          <strong>Information you choose to give us.</strong> When you use the contact form we receive
          the fields you fill in: your name, your email address, your company (optional), which service
          you are asking about, and your message. If you call or message us on WhatsApp, we receive
          whatever you choose to send there.
        </p>
        <p>
          <strong>Information collected automatically.</strong> Our hosting provider records standard
          server logs — your IP address, the page you requested, and the time — for security and to
          keep the site running. This site sets no advertising or tracking cookies, and we run no
          analytics, advertising or social-tracking scripts.
        </p>
      </>
    ),
  },
  {
    h: "Cookies and local storage",
    body: (
      <>
        <p>
          This site sets <strong>no cookies</strong>. Nothing on this site writes or reads a browser
          cookie, so there is nothing to consent to and no cookie banner for a reason.
        </p>
        <p>
          We do use two browser storage features, neither of which identifies you to us or to anyone
          else:
        </p>
        <ul className="mt-4 pl-5 space-y-2">
          <li>
            A <strong>service worker</strong> caches static files on your device so pages load faster
            and keep working offline. It never caches form submissions.
          </li>
          <li>
            Your browser&rsquo;s own <strong>cache</strong>, which stores site files to speed up repeat
            visits.
          </li>
        </ul>
      </>
    ),
  },
  {
    h: "How we use your information",
    body: (
      <>
        <p>We use what you send us for one purpose: to reply to your enquiry and, where your project
          moves forward, to discuss it properly.</p>
        <p>
          Specifically, we use it to respond to you, to keep a record of the conversation so we do not
          ask you to repeat yourself, and to meet our legal and accounting obligations. We do not sell
          your personal data, rent it out, or share it for anyone else&rsquo;s marketing. We will not add
          you to a mailing list because you asked about a project.
        </p>
      </>
    ),
  },
  {
    h: "Who we share it with",
    body: (
      <>
        <p>We share your information with exactly one third party:</p>
        <ul className="mt-4 pl-5 space-y-2">
          <li>
            <strong>Web3Forms</strong>, the service that delivers our contact form submissions to our
            inbox. Your form data passes through their servers in order to reach us.{" "}
            <a
              href="https://web3forms.com"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="link-line"
              style={{ color: "var(--color-brand)", fontWeight: 700 }}
            >
              web3forms.com
            </a>
          </li>
          <li>
            Our <strong>hosting provider</strong>, which stores the site and its access logs.
          </li>
        </ul>
        <p>
          We do not share your enquiry details with advertisers, data brokers or social platforms. If
          we ever needed a processor beyond these, we would name it here before using it.
        </p>
      </>
    ),
  },
  {
    h: "Where your data is stored",
    body: (
      <>
        <p>
          We are based in {site.locality}, {site.region}, India. Our form provider and our hosting are
          outside India, so your information is transferred out of India to reach them — to the United
          States and, for hosting, to whichever region our provider serves you from. We rely on the
          safeguards those providers publish for international transfers.
        </p>
      </>
    ),
  },
  {
    h: "How long we keep it",
    body: (
      <>
        <p>
          Enquiries that do not become projects are deleted within{" "}
          <strong>12 months</strong> of our last exchange. Enquiries that do become projects are kept
          for as long as the commercial relationship lasts and for{" "}
          <strong>3 years</strong> afterwards, because tax and accounting rules require us to retain
          business records for that long. Server logs are rotated out by our host within{" "}
          <strong>90 days</strong>.
        </p>
        <p>
          You can ask us to delete your message sooner at any time — see below.
        </p>
      </>
    ),
  },
  {
    h: "Your rights",
    body: (
      <>
        <p>You can ask us to do any of the following, and we will do it:</p>
        <ul className="mt-4 pl-5 space-y-2">
          <li>
            <strong>Access</strong> — tell you what personal data we hold about you and give you a copy.
          </li>
          <li>
            <strong>Correct it</strong> — fix anything inaccurate or incomplete.
          </li>
          <li>
            <strong>Delete it</strong> — erase your enquiry from our inbox and our records, where we
            are not legally required to keep it.
          </li>
          <li>
            <strong>Object to or restrict processing</strong> — including asking us to stop using your
            details for a particular purpose.
          </li>
          <li>
            <strong>Withdraw consent</strong> — at any time, where our use of your data relies on it.
          </li>
          <li>
            <strong>Ask for a portable copy</strong> — get your data in a structured, machine-readable
            format.
          </li>
        </ul>
        <p>
          We respond within <strong>30 days</strong> and do not charge for this. You can also complain
          to your data protection authority — in India, the Data Protection Board; in the EU, your
          local supervisory authority; in the UK, the Information Commissioner&rsquo;s Office.
        </p>
      </>
    ),
  },
  {
    h: "How we protect it",
    body: (
      <>
        <p>
          All traffic to this site is encrypted with HTTPS. Access to our inbox is limited to the people
          who need it. We do not store passwords, card details or government identifiers for
          enquiries, and we will never ask you to send them.
        </p>
        <p>
          No system is perfect, and any method of transmission carries some risk. If an incident
          affects your data and we are legally required to tell you, we will.
        </p>
      </>
    ),
  },
  {
    h: "Children",
    body: (
      <p>
        This site is a business site and is not directed at anyone under 18. We do not knowingly
        collect information from children. If you believe a child has sent us information, contact us
        and we will delete it.
      </p>
    ),
  },
  {
    h: "Changes to this policy",
    body: (
      <p>
        We will update this page when our practices change and will change the &ldquo;last updated&rdquo;
        date above. If a change materially affects how we use information you have already sent us, we
        will contact you directly.
      </p>
    ),
  },
];

const faqs = [
  {
    q: "Does this website use cookies?",
    a: "No. This site sets no cookies at all — there is no tracking, advertising or analytics script, and nothing writes a browser cookie. The only browser storage used is a service worker cache that speeds up repeat visits and offline access.",
  },
  {
    q: "What happens to the contact form I submit?",
    a: `The form posts your name, email address, company, chosen service and message to Web3Forms, a third-party service that delivers the submission to our inbox. That is the only third party that receives your enquiry details, alongside our hosting provider.`,
  },
  {
    q: "Will you add me to a mailing list?",
    a: "No. We use your details only to reply to your enquiry and, if a project follows, to discuss it. We do not sell or rent your data and we do not use it for marketing you did not ask for.",
  },
  {
    q: "How do I get my data deleted?",
    a: `Email ${site.email} and ask us to delete your enquiry. We action access, correction, deletion, objection and portability requests within 30 days, free of charge. We keep enquiry records for up to 12 months, and project records for 3 years after a project ends, because accounting rules require it.`,
  },
  {
    q: "Where is my data stored?",
    a: `We are based in ${site.locality}, ${site.region}, India, but our form provider and hosting are outside India, so enquiry details are transferred abroad to reach them.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="page-shell privacy-page">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            webPageSchema({
              path: "/privacy",
              name: "Privacy Policy",
              description:
                "How Problem Solving Mind collects, uses, stores and shares personal data submitted through this website, and how to exercise your rights.",
            }),
            breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Privacy Policy", path: "/privacy" }]),
            faqSchema(faqs),
          ],
        }}
      />
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        lede="What we collect when you contact us, who sees it, how long we keep it, and how to get it back or deleted. Written in plain language — if anything here is unclear, ask and we will explain it."
      />

      <section className="sec sec--white" style={{ paddingTop: "1.5rem" }}>
        <div className="container-x" style={{ maxWidth: "780px" }}>
          <p className="text-sm" style={{ color: "var(--color-sub)" }}>
            Last updated: <strong>{LAST_UPDATED}</strong>
          </p>

          <Reveal delay={40}>
            <div
              className="mt-8 rounded-2xl p-6"
              style={{ background: "rgba(30,58,95,0.045)", border: "1px solid rgba(30,58,95,0.14)" }}
            >
              <h2 className="h3" style={{ fontSize: "1.15rem" }}>
                The short version
              </h2>
              <ul className="mt-4 space-y-2.5">
                {[
                  "We collect only what you type into the contact form: your name, email, company, service and message.",
                  "We set no cookies and run no trackers or analytics.",
                  "Your enquiry passes through one third party — Web3Forms — which delivers it to our inbox.",
                  "We never sell your data, and we never add you to a mailing list.",
                  "Ask us to delete it any time: we reply within 30 days, free of charge.",
                ].map((line) => (
                  <li key={line} className="flex gap-3" style={{ fontSize: "0.98rem", lineHeight: 1.65 }}>
                    <span aria-hidden="true" style={{ color: "var(--color-brand)", fontWeight: 800 }}>
                      &check;
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <div className="mt-12">
            {sections.map(({ h, body }, i) => (
              <Reveal key={h} delay={40}>
                <section className="mb-11">
                  <h2 className="h3">{h}</h2>
                  <div className="dek lead mt-3 space-y-4">{body}</div>
                </section>
              </Reveal>
            ))}
          </div>

          <Reveal delay={60}>
            <div
              className="rounded-2xl p-6 mt-4"
              style={{ background: "var(--color-soft)", border: "1px solid rgba(30,58,95,0.12)" }}
            >
              <h2 className="h3" style={{ fontSize: "1.15rem" }}>
                Contact us about your data
              </h2>
              <p className="dek lead mt-3" style={{ fontSize: "1rem" }}>
                Email{" "}
                <a
                  className="link-line font-bold"
                  style={{ color: "var(--color-brand)" }}
                  href={`mailto:${site.email}`}
                >
                  {site.email}
                </a>{" "}
                or call{" "}
                <a
                  className="link-line font-bold"
                  style={{ color: "var(--color-brand)" }}
                  href={site.phoneHref}
                >
                  {site.phoneDisplay}
                </a>
                . Mark it &ldquo;privacy request&rdquo; and it goes straight to us.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}