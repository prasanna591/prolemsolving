import { NextResponse } from "next/server";

const WEBHOOK = process.env.CONTACT_WEBHOOK_URL;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, service, message } = body ?? {};

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ ok: false, error: "Please fill in the required fields." }, { status: 400 });
    }
    if (!EMAIL_RE.test(email.trim())) {
      return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
    }

    const payload = {
      name: name.trim(),
      email: email.trim(),
      company: company?.trim() ?? "",
      service: service ?? "",
      message: message.trim(),
      sentAt: new Date().toISOString(),
    };

    if (WEBHOOK) {
      const res = await fetch(WEBHOOK, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`webhook responded ${res.status}`);
    } else {
      console.log("[contact]", JSON.stringify(payload));
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "We couldn't send your message. Please try again." }, { status: 500 });
  }
}