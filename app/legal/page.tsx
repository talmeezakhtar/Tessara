import type { Metadata } from "next";
import { PageHeader } from "@/components/site/page-header";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy and terms · Tessara", description: "How Tessara handles your details, and the terms for orders, delivery and exchanges." };

// Plain-language privacy policy and terms of sale. ponytail: written for launch, not by a
// lawyer; have one review it (UAE Federal Decree-Law 45 of 2021 on personal data applies).
const UPDATED = "11 November 2026";

const SECTIONS = [
  {
    id: "privacy",
    title: "Privacy",
    points: [
      "Tessara is an online clothing shop in the United Arab Emirates. For anything about your details, write to " + CONTACT_EMAIL + " or message us on WhatsApp.",
      "What we collect: your name, phone number, delivery address and, if you give it, your email. We collect it only when you place an order or contact us.",
      "Why: to confirm and deliver your order, arrange exchanges, and reply to you. If you ask for new-in alerts on WhatsApp, we also message you about new pieces until you reply STOP.",
      "Who sees it: our team, the courier who delivers your order (name, phone and address only), and, if you pay by card or Tabby, that payment provider. We never sell your details or share them for advertising.",
      "Your bag, saved pieces and a copy of your orders are stored in your own browser on your device, not on our servers. Clearing your browser data removes them.",
      "Orders and messages sent to us on WhatsApp or by email are kept for as long as we need them for the order, exchanges and our accounts, then deleted.",
      "This site uses no advertising or tracking cookies.",
      "You can ask to see, correct or delete the details we hold about you at any time. We reply within 30 days.",
    ],
  },
  {
    id: "terms",
    title: "Terms of sale",
    points: [
      "Placing an order on this site sends it to us on WhatsApp. The order is accepted when we confirm it in that chat.",
      "Prices are in UAE dirhams and include VAT. If a price on the site is wrong, we tell you before confirming and you can cancel.",
      "You can pay in cash on delivery, or by card or Tabby through a secure payment link we send in the chat. We never ask for card details on WhatsApp or on this site.",
      "Delivery times on the help page are estimates in working days from confirmation. We tell you on WhatsApp if an order will be late.",
      "You can cancel free of charge until the order leaves us. Message us on WhatsApp with your order number.",
      "Exchanges: within 14 days of delivery you can exchange an unworn piece, with its tags on, for another size, colour or piece. We collect it, and the first exchange on each order is free.",
      "If a piece arrives faulty or is not what you ordered, tell us within 14 days and we replace it or refund you in full, including delivery.",
      "Refunds go back the way you paid, within 14 days of us receiving the piece. Cash on delivery orders are refunded by bank transfer.",
      "These terms are governed by the laws of the United Arab Emirates.",
    ],
  },
];

export default function LegalPage() {
  return (
    <main className="mx-auto w-full max-w-[1280px] px-4 pb-16 md:px-8">
      <PageHeader title="Privacy and terms" intro="The short version, in plain words." />
      <p className="mb-10 text-sm text-muted-foreground">Last updated {UPDATED}</p>
      <div className="grid max-w-[64ch] gap-12">
        {SECTIONS.map((s) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="scroll-mt-24">
            <h2 id={`${s.id}-title`} className="text-3xl font-medium">{s.title}</h2>
            <ul className="mt-4 grid list-disc gap-3 pl-5 text-base leading-relaxed">
              {s.points.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
