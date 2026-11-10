import Link from "next/link";
import { LookFigure } from "@/components/lookbook/look-figure";
import { LOOKS } from "@/lib/looks";

const focus = "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

// Section 10: shop by outfit. The first three looks; each hotspot opens price and sizes.
export function LookbookStrip() {
  return (
    <section aria-labelledby="look-title" className="mx-auto w-full max-w-[1280px] py-10 md:px-8 md:py-16">
      <div className="flex items-baseline justify-between px-4 md:px-0">
        <h2 id="look-title" className="text-3xl font-medium md:text-4xl">Shop the look</h2>
        <Link href="/lookbook" className={`text-sm text-lagoon underline underline-offset-4 hover:no-underline ${focus}`}>Open lookbook</Link>
      </div>

      <ul className="mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-2 [scrollbar-width:none] md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 md:pb-0">
        {LOOKS.slice(0, 3).map((look) => (
          <li key={look.slug} className="w-[78%] shrink-0 snap-start md:w-auto">
            <LookFigure look={look} />
            <Link href={`/lookbook/${look.slug}`} className={`mt-3 inline-block text-sm ${focus}`}>{look.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
