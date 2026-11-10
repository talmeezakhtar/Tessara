"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { PRODUCTS, SHOP_CATEGORIES } from "@/lib/products";
import { searchProducts } from "@/lib/search";

const focus = "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
// Suggested before any typing, so an empty field is still useful (structure p.14 note 2).
const POPULAR = [...SHOP_CATEGORIES.map((c) => c.label), "Black", "Olive", "Stripe"];

export function SearchView() {
  const router = useRouter();
  const pathname = usePathname();
  const q = useSearchParams().get("q") ?? "";
  const [value, setValue] = React.useState(q);
  const results = searchProducts(PRODUCTS, q);

  const go = (term: string) => router.replace(term.trim() ? `${pathname}?q=${encodeURIComponent(term.trim())}` : pathname, { scroll: false });

  return (
    <>
      <form
        role="search"
        onSubmit={(e) => { e.preventDefault(); go(value); }}
        className="flex max-w-2xl items-center gap-2 border-b-2 border-foreground pb-2"
      >
        <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden />
        <label htmlFor="search-q" className="sr-only">Search the shop</label>
        <input
          id="search-q"
          type="search"
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Tees, knitwear, olive…"
          className="h-12 min-w-0 flex-1 bg-transparent text-xl outline-none placeholder:text-muted-foreground md:text-2xl"
        />
        <button type="submit" className={`min-h-11 rounded-[2px] px-4 text-sm font-medium hover:bg-secondary ${focus}`}>Search</button>
      </form>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted-foreground">Popular:</span>
        {POPULAR.map((t) => (
          <button key={t} type="button" onClick={() => { setValue(t); go(t); }} className={`min-h-9 rounded-full border px-3 text-sm hover:border-foreground ${focus}`}>
            {t}
          </button>
        ))}
      </div>

      <section aria-live="polite" className="mt-10">
        {!q ? (
          <>
            <h2 className="text-2xl font-medium">New in</h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-4">
              {PRODUCTS.slice(0, 4).map((p) => <li key={p.id}><ProductCard product={p} /></li>)}
            </ul>
          </>
        ) : results.length ? (
          <>
            <h2 className="text-2xl font-medium">{results.length} {results.length === 1 ? "piece" : "pieces"} for “{q}”</h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-4">
              {results.map((p) => <li key={p.id}><ProductCard product={p} /></li>)}
            </ul>
          </>
        ) : (
          <div className="rounded-[2px] bg-secondary p-8">
            <p className="font-heading text-2xl">Nothing found for “{q}”</p>
            <p className="mt-2 text-sm text-muted-foreground">Try one of the popular searches above, or browse everything.</p>
            <Link href="/shop" className={`mt-4 inline-block text-sm text-lagoon underline underline-offset-4 ${focus}`}>Shop all pieces</Link>
          </div>
        )}
      </section>
    </>
  );
}
