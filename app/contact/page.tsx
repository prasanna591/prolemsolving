import { Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { contactSchema, breadcrumbSchema } from "@/lib/structured";
import { JsonLd } from "@/components/jsonld";

export const metadata = pageMetadata({
  title: "Contact & Get a Quote",
  description:
    "Talk to PSM about custom software, AI automation or ERP/CRM integration. Call +91 93602 07861 or email hello@problemsolvingmind.com — Pondicherry, Tamil Nadu.",
  path: "/contact",
});

const channels = [
  ...site.emails.map(({ label, address }) => ({
    icon: Mail,
    t: label === "General" ? "General enquiries" : `Email — ${label}`,
    d: address,
    href: `mailto:${address}`,
  })),
  {
    icon: Phone,
    t: "Phone / WhatsApp",
    d: site.phoneDisplay,
    href: `tel:${site.phoneHref}`,
  },
  { icon: MapPin, t: "Based in", d: `${site.locality}, ${site.region} — working worldwide`, href: null },
];

export default function ContactPage() {
  return (
    <div className="page-shell">
      <JsonLd data={contactSchema()} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
      <PageHeader
        eyebrow="Contact"
        eyebrowTone="g"
        title={<>Let&rsquo;s talk about <em className="grad-text">your problem.</em></>}
        lede="Send us a note about what you're trying to solve. We'll read it properly, reply honestly, and tell you whether we can actually help."
      />

      <section className="sec sec--white" style={{ paddingTop: "1.5rem" }}>
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          {/* info column */}
          <Reveal>
            <div className="flex flex-col gap-6">
              {channels.map(({ icon: Icon, t, d, href }) => (
                <div key={t} className="flex items-start gap-4">
                  <span className="card-icon card-icon--brand">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="h3" style={{ fontSize: "1.05rem" }}>{t}</p>
                    {href ? (
                      <a href={href} className="dek link-line" style={{ fontSize: "0.98rem", color: "var(--color-brand)" }}>
                        {d}
                      </a>
                    ) : (
                      <p className="dek" style={{ fontSize: "0.98rem" }}>{d}</p>
                    )}
                  </div>
                </div>
              ))}
              <div className="card card--flat mt-2">
                <p className="dek" style={{ fontSize: "0.96rem" }}>
                  Prefer instant conversation? It depends on when you&rsquo;ll get a reply. So ask:{" "}
                  <strong>how fast do you need this solved, and how much is it costing you not to solve it?</strong> We&rsquo;ll
                  work from there.
                </p>
              </div>
            </div>
          </Reveal>

          {/* form column */}
          <Reveal delay={100}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </div>
  );
}