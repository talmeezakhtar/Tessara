import type { Metadata } from "next";
import { PageHeader } from "@/components/site/page-header";

export const metadata: Metadata = { title: "Privacy and terms · Tessara" };

// PLACEHOLDER: plain-language outline for the demo. Have the boutique's lawyer write the
// real policy before launch (UAE data protection law applies).
const SECTIONS = [
  {
    id: "privacy",
    title: "Privacy",
    points: [
      "We collect only what an order needs: your name, phone, email if you give it, and delivery address.",
      "Your bag and saved items are kept in your own browser, not on our servers.",
      "We use your details to deliver your order and reply to you. We never sell them.",
      "Message us on WhatsApp to see, correct or delete what we hold about you.",
    ],
  },
  {
    id: "terms",
    title: "Terms of sale",
    points: [
      "Prices are in UAE dirhams and include VAT.",
      "An order is confirmed when we message you to confirm it.",
      "You can exchange unworn pieces with tags within 14 days of delivery.",
      "If a piece arrives faulty, we replace it or refund you in full.",
    ],
  },
];

export default function LegalPage() {
  return (
    <main className="mx-auto w-full max-w-[1280px] px-4 pb-16 md:px-8">
      <PageHeader title="Privacy and terms" intro="The short version, in plain words." />
      <p className="mb-10 inline-block rounded-[2px] bg-sand px-2 py-1 text-xs text-ink">Demo store: placeholder text, not a legal document</p>
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
