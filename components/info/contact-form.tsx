"use client";

import * as React from "react";
import { isEmailOrPhone } from "@/lib/site";

const TOPICS = ["An order I placed", "Sizing and fit", "Exchanges", "Something else"];
const focus = "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
const field = `w-full rounded-[2px] border border-input bg-background px-3 text-base ${focus}`;

/**
 * Asks for a topic so the right person replies (structure p.17 note 4).
 * ponytail: demo only, nothing is sent. Wire onSubmit to email or a server action.
 */
export function ContactForm() {
  const [sent, setSent] = React.useState(false);
  const [badContact, setBadContact] = React.useState(false);

  if (sent) return <p role="status" className="rounded-[2px] bg-secondary p-6 text-base">Thanks, we have your message and will reply within a working day.</p>;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        if (!isEmailOrPhone(String(data.get("contact") ?? ""))) { setBadContact(true); return; }
        setSent(true);
      }}
      className="grid gap-4"
    >
      <label className="grid gap-1.5 text-sm font-medium">Name
        <input name="name" required autoComplete="name" className={`${field} h-12`} />
      </label>
      <label className="grid gap-1.5 text-sm font-medium">Email or WhatsApp number
        <input
          name="contact"
          required
          autoComplete="email"
          aria-invalid={badContact}
          aria-describedby={badContact ? "contact-error" : undefined}
          onChange={() => setBadContact(false)}
          className={`${field} h-12 aria-invalid:border-destructive`}
        />
        {badContact && <span id="contact-error" className="text-sm font-normal text-destructive">Enter an email address or a phone number with at least 8 digits.</span>}
      </label>
      <label className="grid gap-1.5 text-sm font-medium">Topic
        <select name="topic" required defaultValue="" className={`${field} h-12`}>
          <option value="" disabled>Choose a topic</option>
          {TOPICS.map((t) => <option key={t}>{t}</option>)}
        </select>
      </label>
      <label className="grid gap-1.5 text-sm font-medium">Message
        <textarea name="message" required rows={5} className={`${field} py-3`} />
      </label>
      <div>
        <button type="submit" className={`inline-flex min-h-12 items-center rounded-[2px] border border-foreground px-6 text-sm font-medium hover:bg-foreground hover:text-background ${focus}`}>
          Send message
        </button>
      </div>
    </form>
  );
}
