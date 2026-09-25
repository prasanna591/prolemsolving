"use client";

import { useRef, useState, type FormEvent } from "react";
import { AlertCircle, ArrowRight, Check } from "lucide-react";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(json?.error || "Something went wrong.");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
      formRef.current?.focus();
    }
  }

  if (status === "success") {
    return (
      <div className="card card--raised" role="status">
        <span className="badge badge--accg">
          <Check size={15} aria-hidden="true" /> Message received
        </span>
        <h2 className="h2 mt-5">Thanks — we got it.</h2>
        <p className="dek mt-3">
          We read every message and reply within two working days. If your problem is urgent, leave a phone number and the
          reply stands by for it.
        </p>
        <button
          type="button"
          className="btn btn--ghost mt-6"
          onClick={() => {
            setStatus("idle");
            formRef.current?.querySelector<HTMLInputElement>('input[name="name"]')?.focus();
          }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} className="card card--raised" onSubmit={handleSubmit} aria-describedby="form-note">
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
        <p className="mt-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700" role="alert">
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
        We reply within two working days — and we never share your details. See our privacy policy.
      </p>
    </form>
  );
}