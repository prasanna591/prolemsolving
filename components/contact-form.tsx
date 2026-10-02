"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { AlertCircle, ArrowRight, Check } from "lucide-react";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Web3Forms is a hosted form relay, so submissions POST straight from the
 * browser.
 *
 * The access key is a public identifier, NOT a secret — Web3Forms expects it in
 * client JS, and it can only be used to send mail *as this site*, which is the
 * same exposure every hosted contact form has. It is therefore committed as a
 * default rather than left to a build secret, so a deploy can never ship a
 * broken form because someone forgot to add the variable.
 *
 * `NEXT_PUBLIC_WEB3FORMS_KEY` overrides it, which is how you rotate the key
 * without touching code.
 */
const WEB3FORMS_KEY = "70718227-c3fe-4a64-bdb2-dc9c06215480";
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || WEB3FORMS_KEY;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  /** Set when the form remounts, so the effect below knows to move focus. */
  const wantFocus = useRef(false);

  /**
   * Focus follows state, not the click.
   *
   * Two paths previously lost focus entirely: the success panel replaced the
   * form in the DOM, so a handler reading `formRef.current` found `null` and
   * the "Send another message" button was about to be unmounted anyway; and a
   * failed send called `.focus()` on `<form>`, which is not focusable without
   * `tabIndex`, so the call was a no-op. Both now land on a real target, and
   * the form carries `tabIndex={-1}` so the error path has somewhere to send
   * focus when there is nothing more specific.
   */
  useEffect(() => {
    if (status === "success") {
      successRef.current?.focus();
      return;
    }
    if (status === "error" && wantFocus.current) {
      formRef.current?.focus();
      wantFocus.current = false;
    }
  }, [status]);

  function resetToForm() {
    wantFocus.current = true;
    setError("");
    setStatus("idle");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setError("");

    const name = String(data.name ?? "").trim();
    const email = String(data.email ?? "").trim();
    const message = String(data.message ?? "").trim();
    const service = String(data.service ?? "").trim();
    const company = String(data.company ?? "").trim();

    if (!name || !message || !EMAIL_RE.test(email)) {
      setError("Please fill in every required field with a valid email address.");
      wantFocus.current = true;
      setStatus("error");
      return;
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name,
          email,
          company,
          service,
          message,
          replyto: email,
          from_name: `${site.full} website`,
          subject: `New website enquiry — ${service}`,
          botcheck: "",
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string };
      if (!res.ok || json?.success === false) {
        throw new Error(json?.message || "Something went wrong.");
      }
      setStatus("success");
    } catch (err) {
      setError(
        err instanceof Error
          ? `${err.message} You can also email us directly at ${site.email}.`
          : `Something went wrong. You can also email us at ${site.email}.`,
      );
      wantFocus.current = true;
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div ref={successRef} tabIndex={-1} className="card card--raised" role="status">
        <span className="badge badge--accg">
          <Check size={15} aria-hidden="true" /> Message received
        </span>
        <h2 className="h2 mt-5">Thanks — we got it.</h2>
        <p className="dek mt-3">
          We read every message and reply within two working days. If your problem is urgent, leave a phone number and the
          reply stands by for it.
        </p>
        <button type="button" className="btn btn--ghost mt-6" onClick={resetToForm}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      tabIndex={-1}
      className="card card--raised"
      onSubmit={handleSubmit}
      aria-describedby="form-note"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="field">
          <label htmlFor="name">Your name</label>
          <input id="name" name="name" type="text" required autoComplete="name" placeholder="Jane Doe" />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="jane@company.com" />
        </div>
      </div>
      <div className="field mt-5">
        <label htmlFor="company">
          Company <span style={{ opacity: 0.6, fontWeight: 600 }}>(optional)</span>
        </label>
        <input id="company" name="company" type="text" autoComplete="organization" placeholder={'Company or "just me"'} />
      </div>
      <div className="field mt-5">
        <label htmlFor="service">What do you need?</label>
        <select id="service" name="service" defaultValue="" required>
          <option value="" disabled>
            Select a reason
          </option>
          <option>Product development</option>
          <option>Business Automation &amp; AI</option>
          <option>Software Development</option>
          <option>System Modernization</option>
          <option>Mobile Apps</option>
          <option>Data &amp; Reporting</option>
          <option>Something else</option>
        </select>
      </div>
      <div className="field mt-5">
        <label htmlFor="message">Tell us about the problem</label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          placeholder="What are you trying to solve? Why hasn't it been solved yet? Who does it affect?"
        />
      </div>

      {status === "error" && (
        <p
          className="mt-5 flex items-start gap-2 rounded-xl border border-[color:rgb(var(--color-danger-rgb)/0.28)] bg-[color:var(--color-danger-soft)] p-3 text-sm font-semibold text-[color:var(--color-danger-deep)]"
          role="alert"
        >
          <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}

      <button
        type="submit"
        className="btn btn--primary btn--lg btn--block mt-7"
        disabled={status === "sending"}
        aria-busy={status === "sending"}
      >
        {status === "sending" ? "Sending…" : "Send message"}
        <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
      </button>
      <p id="form-note" className="mt-4 text-center" style={{ fontSize: "0.85rem", color: "var(--color-faint)", fontWeight: 600 }}>
        We reply within two working days — and we never share your details. See our{" "}
        <Link href="/privacy" className="link-line font-bold" style={{ color: "var(--color-brand-deep)" }}>
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}