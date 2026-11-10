"use client";

import * as React from "react";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { PRODUCTS } from "@/lib/products";

// Tabs come from the categories in stock, so they become Dresses / Sets / Tops
// on their own once the real catalogue replaces the demo one.
const TABS = ["All", ...new Set(PRODUCTS.map((p) => p.category))];
const SHOWN = 5; // Five cards, not eight: fewer cards, bigger photos (structure p.8).

const focus = "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function NewArrivals() {
  const [tab, setTab] = React.useState("All");
  const items = PRODUCTS.filter((p) => tab === "All" || p.category === tab).slice(0, SHOWN);

  return (
    <section aria-labelledby="new-title" className="mx-auto w-full max-w-[1280px] py-10 md:px-8 md:py-16">
      <div className="flex items-baseline justify-between px-4 md:px-0">
        <h2 id="new-title" className="text-3xl font-medium md:text-4xl">New arrivals</h2>
        <Link href="/new" className={`text-sm text-lagoon underline underline-offset-4 hover:no-underline ${focus}`}>Shop all new in</Link>
      </div>

      <div role="group" aria-label="Filter new arrivals" className="mt-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:px-0">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={tab === t}
            onClick={() => setTab(t)}
            className={`min-h-11 shrink-0 rounded-full border px-4 text-sm transition-colors motion-reduce:transition-none ${tab === t ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground/40"} ${focus}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Phones scroll sideways with the next card peeking; md+ is one row of five. */}
      <ul className="mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-2 [scrollbar-width:none] md:grid md:grid-cols-5 md:gap-4 md:overflow-visible md:px-0 md:pb-0">
        {items.map((p) => (
          <li key={p.id} className="w-[44%] shrink-0 snap-start md:w-auto">
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </section>
  );
}
