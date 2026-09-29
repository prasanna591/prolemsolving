import { Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { contactSchema, breadcrumbSchema } from "@/lib/structured";
import { JsonLd } from "@/components/jsonld";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Tell PSM what you're trying to solve — we read every message and reply honestly within two working days, from Pune to the rest of the world.",
  path: "/contact",
});

const channels = [
  { icon: Mail, t: "Email", d: site.email },
  { icon: Phone, t: "Phone / WhatsApp", d: "+91 93005 38399" },
  { icon: MapPin, t: "Based in", d: "Pune, Maharashtra — working worldwide" },
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
              {channels.map(({ icon: Icon, t, d }) => (
                <div key={t} className="flex items-start gap-4">
                  <span className="card-icon card-icon--brand">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="h3" style={{ fontSize: "1.05rem" }}>{t}</p>
                    <p className="dek" style={{ fontSize: "0.98rem" }}>{d}</p>
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