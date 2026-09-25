import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/jsonld";
import { breadcrumbSchema } from "@/lib/structured";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How PSM handles the data you share through our contact form — what we collect, how we use it, and where it's stored.",
  path: "/privacy",
  noindex: true,
});

const headings: { h: string; p: string }[] = [
  {
    h: "What we collect",
    p: "When you use the contact form, we receive only what you choose to share: your name, email address and the message you write.",
  },
  {
    h: "How we use it",
    p: "We use that information solely to reply to your enquiry. We do not sell, rent or trade your personal data, and we never use it for marketing you didn't ask for.",
  },
  {
    h: "Where it is stored",
    p: "Messages are delivered to our team's inbox and are kept only as long as needed to resolve your enquiry. If you would like us to delete a message you have sent, contact us and we'll take care of it promptly.",
  },
  {
    h: "Website analytics",
    p: "We do not run third-party trackers or advertising cookies on this site. Any analytics we use are privacy-respecting and aggregate-only.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="page-shell">
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Privacy Policy", path: "/privacy" }])} />
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        lede="How PSM handles the data you share through our contact form."
      />

      <section className="sec sec--white" style={{ paddingTop: "1.5rem" }}>
        <div className="container-x" style={{ maxWidth: "760px" }}>
          {headings.map(({ h, p }) => (
            <Reveal key={h} delay={60}>
              <div className="mb-10">
                <h2 className="h3">{h}</h2>
                <p className="dek lead mt-3">{p}</p>
              </div>
            </Reveal>
          ))}

          <Reveal delay={80}>
            <p className="dek lead">
              Questions about your data?{" "}
              <a
                className="link-line font-bold"
                style={{ color: "var(--color-brand)" }}
                href={`mailto:${site.email}`}
              >
                {site.email}
              </a>
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}