import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/info/contact-form";
import { PageHeader } from "@/components/site/page-header";
import { CONTACT_EMAIL, whatsappHref } from "@/lib/site";

export const metadata: Metadata = { title: "Contact · Tessara", description: "Chat with Tessara on WhatsApp or send a message." };

const focus = "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

// Structure p.17: WhatsApp first; the form asks for a topic so the right person replies.
export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-[1280px] px-4 pb-16 md:px-8">
      <PageHeader title="Contact" intro="The fastest way to reach us is WhatsApp. A person replies, usually within the hour." />

      <div className="grid gap-12 md:grid-cols-12">
        <section aria-labelledby="wa-title" className="md:col-span-5">
          <div className="rounded-[2px] bg-secondary p-6 md:p-8">
            <h2 id="wa-title" className="text-2xl font-medium">Chat on WhatsApp</h2>
            <p className="mt-2 text-sm text-muted-foreground">Questions about sizes, an order, or an exchange.</p>
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className={`mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[2px] bg-lagoon px-6 text-sm font-medium text-pearl hover:opacity-90 ${focus}`}>
              <MessageCircle className="size-4" aria-hidden />Chat on WhatsApp
            </a>
          </div>
          <dl className="mt-8 grid gap-4 text-sm">
            <div>
              <dt className="text-muted-foreground">Hours</dt>
              <dd className="mt-1">Every day, 10 am to 10 pm (UAE time)</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Email</dt>
              <dd className="mt-1"><a href={`mailto:${CONTACT_EMAIL}`} className={`underline underline-offset-4 ${focus}`}>{CONTACT_EMAIL}</a></dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Delivery and exchanges</dt>
              <dd className="mt-1"><Link href="/help" className={`underline underline-offset-4 ${focus}`}>Read the help page</Link></dd>
            </div>
          </dl>
        </section>

        <section aria-labelledby="form-title" className="md:col-span-7">
          <h2 id="form-title" className="text-2xl font-medium">Send a message</h2>
          <div className="mt-5 max-w-xl"><ContactForm /></div>
        </section>
      </div>
    </main>
  );
}
