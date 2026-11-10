import type { Metadata } from "next";
import Link from "next/link";
import { LookFigure } from "@/components/lookbook/look-figure";
import { PageHeader } from "@/components/site/page-header";
import { LOOKS } from "@/lib/looks";

export const metadata: Metadata = { title: "Lookbook · Tessara", description: "Six ways to wear the new season, shoppable piece by piece." };

const focus = "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

// Structure p.16: the lookbook is story, so no filters, and the tiles vary in size on purpose.
// On md+ every third look takes a tall tile beside two shorter ones.
export default function LookbookPage() {
  return (
    <main className="mx-auto w-full max-w-[1280px] px-4 pb-16 md:px-8">
      <PageHeader title="Lookbook" intro="Six ways to wear the new season. Tap the + on any piece for its price and sizes." />

      <ul className="grid gap-x-4 gap-y-10 md:grid-cols-3 md:grid-flow-dense">
        {LOOKS.map((look, i) => {
          const tall = i % 3 === 0;
          return (
            <li key={look.slug} className={tall ? "md:col-span-2 md:row-span-2" : ""}>
              <LookFigure look={look} className={tall ? "aspect-[4/5] md:aspect-[5/4]" : "aspect-[4/5]"} />
              <div className="mt-3 flex items-baseline justify-between gap-4">
                <div>
                  <p className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</p>
                  <h2 className={`mt-1 font-medium ${tall ? "text-3xl" : "text-xl"}`}>{look.title}</h2>
                  <p className="mt-1 max-w-[48ch] text-sm text-muted-foreground">{look.line}</p>
                </div>
                <Link href={`/lookbook/${look.slug}`} className={`shrink-0 text-sm text-lagoon underline underline-offset-4 hover:no-underline ${focus}`}>
                  Shop this look
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
