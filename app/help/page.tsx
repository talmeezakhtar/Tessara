import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { EXPRESS_DELIVERY_AED, FREE_DELIVERY_AED, STANDARD_DELIVERY_AED } from "@/lib/bag-totals";
import { formatPrice } from "@/lib/products";
import { whatsappHref } from "@/lib/site";

export const metadata: Metadata = { title: "Help · Tessara", description: "Delivery by emirate, exchanges and answers to common questions." };

// PLACEHOLDER delivery times by emirate: demo values, not promises (structure p.17 note 5).
const EMIRATES = [
  { name: "Dubai", standard: "1 to 2 days", express: true },
  { name: "Sharjah", standard: "1 to 2 days", express: true },
  { name: "Ajman", standard: "1 to 2 days", express: true },
  { name: "Abu Dhabi", standard: "1 to 3 days", express: true },
  { name: "Umm Al Quwain", standard: "2 to 3 days", express: false },
  { name: "Ras Al Khaimah", standard: "2 to 3 days", express: false },
  { name: "Fujairah", standard: "2 to 3 days", express: false },
];

const FAQ = [
  { q: "Can I pay when my order arrives?", a: "Yes. Cash on delivery is available across the UAE. You can also pay by card or split the price into 4 payments with Tabby." },
  { q: "How do I order on WhatsApp?", a: "Tap Order on WhatsApp on any piece. The message already names the piece, colour and size; send it and we confirm the order in the chat." },
  { q: "Do the sizes run true?", a: "Most pieces fit true to size. Each product page says if a piece runs small or large, and reviews include the buyer's height and size." },
  { q: "Can I change my order after placing it?", a: "Message us on WhatsApp before it ships and we will change the size, colour or address." },
];

const SECTIONS = [
  { id: "delivery", label: "Delivery" },
  { id: "returns", label: "Exchanges" },
  { id: "faq", label: "FAQ" },
];

const focus = "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

// Structure p.17: shipping, returns and FAQ share one page and one side menu.
export default function HelpPage() {
  return (
    <main className="mx-auto w-full max-w-[1280px] px-4 pb-16 md:px-8">
      <PageHeader title="Help" intro="Delivery, exchanges and quick answers. Still stuck? We reply on WhatsApp." />

      <div className="grid gap-10 md:grid-cols-[12rem_1fr] md:gap-16">
        <nav aria-label="Help topics" className="min-w-0 md:sticky md:top-20 md:self-start">
          <ul className="flex gap-2 overflow-x-auto md:flex-col md:gap-1">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className={`inline-flex min-h-11 items-center whitespace-nowrap rounded-full border px-4 text-sm hover:border-foreground md:w-full md:rounded-[2px] md:border-0 md:px-0 md:hover:underline ${focus}`}>{s.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* min-w-0 lets the wide tables scroll inside their box instead of widening the page. */}
        <div className="grid min-w-0 gap-14 [&>*]:min-w-0">
          <section id="delivery" aria-labelledby="delivery-title" className="scroll-mt-24">
            <h2 id="delivery-title" className="text-3xl font-medium">Delivery by emirate</h2>
            <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-muted-foreground">
              Standard delivery is free over {formatPrice(FREE_DELIVERY_AED)}, otherwise {formatPrice(STANDARD_DELIVERY_AED)}. Express is {formatPrice(EXPRESS_DELIVERY_AED)} and arrives the next working day where it is offered.
            </p>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[26rem] border-collapse text-left text-sm">
                <caption className="sr-only">Delivery time and options by emirate</caption>
                <thead>
                  <tr className="border-b text-muted-foreground">
                    <th scope="col" className="py-3 pr-4 font-medium">Emirate</th>
                    <th scope="col" className="py-3 pr-4 font-medium">Standard</th>
                    <th scope="col" className="py-3 font-medium">Express, next day</th>
                  </tr>
                </thead>
                <tbody>
                  {EMIRATES.map((e) => (
                    <tr key={e.name} className="border-b">
                      <th scope="row" className="py-3 pr-4 font-semibold">{e.name}</th>
                      <td className="py-3 pr-4">{e.standard}</td>
                      <td className="py-3">{e.express ? formatPrice(EXPRESS_DELIVERY_AED) : <span className="text-muted-foreground">Not available</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Sample times for the demo.</p>
          </section>

          <section id="returns" aria-labelledby="returns-title" className="scroll-mt-24">
            <h2 id="returns-title" className="text-3xl font-medium">Exchanges</h2>
            <ol className="mt-5 grid max-w-[60ch] gap-4 text-sm leading-relaxed">
              <li><span className="font-semibold">Within 14 days.</span> Exchange any piece for another size, colour or piece. Unworn, with the tags on.</li>
              <li><span className="font-semibold">Tell us on WhatsApp.</span> Send your order number and what you would like instead.</li>
              <li><span className="font-semibold">We collect it.</span> A courier picks up the piece and brings the new one. The first exchange is free.</li>
            </ol>
          </section>

          <section id="faq" aria-labelledby="faq-title" className="scroll-mt-24">
            <h2 id="faq-title" className="text-3xl font-medium">Questions</h2>
            <div className="mt-5 max-w-[60ch] divide-y border-y">
              {FAQ.map((f) => (
                <details key={f.q} className="group">
                  <summary className={`flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium [&::-webkit-details-marker]:hidden ${focus}`}>
                    {f.q}
                    <span aria-hidden className="text-lg transition-transform group-open:rotate-45 motion-reduce:transition-none">+</span>
                  </summary>
                  <p className="pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          <div className="flex flex-wrap items-center gap-4 rounded-[2px] bg-secondary p-6">
            <p className="flex-1 text-sm">Not answered here? A person replies on WhatsApp.</p>
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className={`inline-flex min-h-11 items-center gap-2 rounded-[2px] bg-lagoon px-5 text-sm font-medium text-pearl hover:opacity-90 ${focus}`}>
              <MessageCircle className="size-4" aria-hidden />Chat on WhatsApp
            </a>
            <Link href="/contact" className={`text-sm underline underline-offset-4 ${focus}`}>Other ways to reach us</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
