import { MessageCircle } from "lucide-react";
import { whatsappHref } from "@/lib/site";

// Section 13: dark band, one action. New-in alerts go out on WhatsApp, where UAE shoppers
// already are: the button sends the store a join request it can add to a broadcast list.
// ponytail: no email list; add one (and a form) when the store starts sending email.
export function Newsletter() {
  return (
    <section aria-labelledby="news-title" className="dark bg-background text-foreground">
      <div className="mx-auto grid w-full max-w-[1280px] gap-6 px-4 py-12 md:grid-cols-2 md:items-end md:px-8 md:py-20">
        <div>
          <h2 id="news-title" className="text-4xl font-medium md:text-5xl">New pieces, first</h2>
          <p className="mt-3 max-w-[40ch] text-sm text-muted-foreground">One WhatsApp message when a new drop lands. Reply STOP at any time.</p>
        </div>
        <div className="md:justify-self-end">
          <a
            href={whatsappHref("Hi Tessara, please add me to your new-in updates.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-[2px] bg-foreground px-8 text-sm font-medium text-background outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <MessageCircle className="size-4" aria-hidden />Get new-in alerts on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
