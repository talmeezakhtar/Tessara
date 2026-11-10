import type { Metadata } from "next";
import { SizeFinder } from "@/components/home/size-finder";
import { SizeChart } from "@/components/info/size-chart";
import { PageHeader } from "@/components/site/page-header";

export const metadata: Metadata = { title: "Size guide · Tessara", description: "Body measurements for every Tessara size, and how to measure yourself." };

// ponytail: numbered steps instead of measuring diagrams until the illustrations exist.
const STEPS = [
  { title: "Bust", text: "Measure around the fullest part of your chest, keeping the tape level under your arms." },
  { title: "Waist", text: "Measure around the narrowest part of your waist, usually just above the belly button." },
  { title: "Hip", text: "Stand with your feet together and measure around the fullest part of your hips." },
];

// Structure p.17: chart with a cm / inches switch, numbered measuring steps, the size finder beside it.
export default function SizeGuidePage() {
  return (
    <main className="mx-auto w-full max-w-[1280px] px-4 pb-16 md:px-8">
      <PageHeader title="Size guide" intro="Find your size in a minute, or check the chart against your own measurements." />

      <div className="grid gap-12 md:grid-cols-12">
        <div className="min-w-0 md:col-span-7">
          <SizeChart />
        </div>
        <section aria-labelledby="measure-title" className="md:col-span-5">
          <h2 id="measure-title" className="text-2xl font-medium md:text-3xl">How to measure</h2>
          <ol className="mt-5 grid gap-5">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full bg-sand font-mono text-sm text-ink">{i + 1}</span>
                <div>
                  <p className="font-semibold">{s.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-muted-foreground">Use a soft tape, and keep it snug but not tight. Between two sizes? Take the larger one for a relaxed fit.</p>
        </section>
      </div>

      <div className="-mx-4 mt-6 md:-mx-8">
        <SizeFinder />
      </div>
    </main>
  );
}
