import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { whatsappHref } from "@/lib/site";

// Section 12: three promises, each answering a real worry.
const PROMISES = [
  { title: "Delivery", worry: "When will it arrive?", text: "1 to 3 days anywhere in the UAE. Free over AED 200, and you can pay in cash at the door.", href: "/help#delivery", link: "Delivery by emirate" },
  { title: "Exchanges", worry: "What if it doesn't fit?", text: "Exchange for another size or piece within 14 days. Unworn, tags on, and we collect it.", href: "/help#returns", link: "How exchanges work" },
  { title: "Size help", worry: "Who can I ask?", text: "Send your height and usual size on WhatsApp and a person will reply with a size, usually within the hour.", href: "/size-guide", link: "Open the size guide" },
];

const focus = "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function ServicePromise() {
  return (
    <section aria-labelledby="promise-title" className="border-t">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-10 md:px-8 md:py-16">
        <h2 id="promise-title" className="text-3xl font-medium md:text-4xl">Shopping with us</h2>
        <ul className="mt-8 grid gap-8 md:grid-cols-3 md:gap-10">
          {PROMISES.map((p, i) => (
            <li key={p.title} className="border-t border-foreground/15 pt-5">
              <p className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 text-2xl font-medium">{p.title}</h3>
              <p className="mt-1 text-sm italic text-muted-foreground">{p.worry}</p>
              <p className="mt-3 max-w-[40ch] text-sm leading-relaxed">{p.text}</p>
              <Link href={p.href} className={`mt-3 inline-block text-sm text-lagoon underline underline-offset-4 hover:no-underline ${focus}`}>{p.link}</Link>
            </li>
          ))}
        </ul>
        <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className={`mt-10 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-[2px] bg-lagoon px-6 text-sm font-medium text-pearl transition-opacity hover:opacity-90 sm:w-auto ${focus}`}>
          <MessageCircle className="size-4" aria-hidden />
          Chat on WhatsApp
        </a>
      </div>
    </section>
  );
}
