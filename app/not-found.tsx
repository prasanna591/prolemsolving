import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/button";
import { Reveal } from "@/components/reveal";
import { nav, site } from "@/lib/site";

/**
 * `noindex` keeps dead URLs out of the index, but `follow` is deliberate: GitHub
 * Pages serves this one file for *every* missing path, so letting a crawler walk
 * the links below is the only chance it gets to recover from the 404.
 */
export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

const destinations = [...nav, { label: "Contact", href: "/contact" }];

export default function NotFound() {
  return (
    <div className="page-shell not-found-page">
      <section className="sec sec--white" style={{ paddingTop: "8rem", minHeight: "70vh" }}>
        <div className="container-x" style={{ maxWidth: "38rem" }}>
          <Reveal delay={60}>
            <span className="display grad-text">404</span>
            <h1 className="h-hero mt-5">This page is missing.</h1>
            <p className="dek lead mt-5">
              The page you were looking for doesn&rsquo;t exist or has moved. Rather than leave you
              on a dead end, here&rsquo;s where most people were heading.
            </p>

            <div className="mt-8">
              <Button href="/" variant="primary" size="lg">
                <ArrowLeft size={16} aria-hidden="true" /> Back to {site.name}
              </Button>
            </div>

            <nav aria-label="Site sections" className="mt-10">
              <h2 className="eyebrow">All sections</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {destinations.map((d) => (
                  <li key={d.href}>
                    <Button href={d.href} variant="ghost" size="sm" arrow>
                      {d.label}
                    </Button>
                  </li>
                ))}
              </ul>
            </nav>

            <p className="dek mt-10">
              Still stuck? Write to{" "}
              <a href={`mailto:${site.email}`} className="link-line">
                {site.email}
              </a>{" "}
              or call{" "}
              <a href={`tel:${site.phoneHref}`} className="link-line">
                {site.phoneDisplay}
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
