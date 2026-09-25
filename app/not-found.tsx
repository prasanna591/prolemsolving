import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/button";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="page-shell">
      <section className="sec sec--white" style={{ paddingTop: "8rem", minHeight: "70vh" }}>
        <div className="container-x" style={{ maxWidth: "34rem" }}>
          <Reveal delay={60}>
            <span className="display grad-text">404</span>
            <h1 className="h-hero mt-5">This page is missing.</h1>
            <p className="dek lead mt-5">
              The page you were looking for doesn&rsquo;t exist or has moved. Let&rsquo;s get you
              back on track.
            </p>
            <Button href="/" variant="primary" size="lg" className="mt-8">
              <ArrowLeft size={16} aria-hidden="true" /> Back to {site.name}
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}