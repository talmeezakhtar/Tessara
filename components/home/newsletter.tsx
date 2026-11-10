"use client";

import * as React from "react";
import { isEmailOrPhone } from "@/lib/site";

// Section 13: dark band, one field, one filled button. Takes email or a WhatsApp number.
// ponytail: demo only, nothing is sent or stored. Wire `onSubmit` to the mailing list
// (or a server action) when the store has one.
export function Newsletter() {
  const [state, setState] = React.useState<"idle" | "invalid" | "done">("idle");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = String(new FormData(e.currentTarget).get("contact") ?? "");
    setState(isEmailOrPhone(value) ? "done" : "invalid");
  }

  return (
    <section aria-labelledby="news-title" className="dark bg-background text-foreground">
      <div className="mx-auto grid w-full max-w-[1280px] gap-6 px-4 py-12 md:grid-cols-2 md:items-end md:px-8 md:py-20">
        <div>
          <h2 id="news-title" className="text-4xl font-medium md:text-5xl">New pieces, first</h2>
          <p className="mt-3 max-w-[40ch] text-sm text-muted-foreground">One message when a new drop lands. Email or WhatsApp, whichever you read.</p>
        </div>

        {state === "done" ? (
          <p role="status" className="text-base">You are on the list. We will be in touch when the next pieces land.</p>
        ) : (
          <form onSubmit={onSubmit} noValidate className="w-full">
            <label htmlFor="news-contact" className="mb-1.5 block text-sm font-medium">Email or WhatsApp number</label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="news-contact"
                name="contact"
                type="text"
                inputMode="email"
                autoComplete="email"
                aria-invalid={state === "invalid"}
                aria-describedby={state === "invalid" ? "news-error" : undefined}
                onChange={() => state === "invalid" && setState("idle")}
                className="h-12 min-w-0 flex-1 rounded-[2px] border border-input bg-transparent px-3 text-base outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring aria-invalid:border-destructive"
                placeholder="you@example.com or +971 50 123 4567"
              />
              <button type="submit" className="inline-flex h-12 items-center justify-center rounded-[2px] bg-foreground px-8 text-sm font-medium text-background outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                Join
              </button>
            </div>
            {state === "invalid" && (
              <p id="news-error" className="mt-2 text-sm text-destructive">Enter an email address or a phone number with at least 8 digits.</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
