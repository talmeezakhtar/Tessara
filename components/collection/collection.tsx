"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { PRICE_BANDS, SIZE_ORDER, SORTS, activeCount, applyFilters, colourOf, parseFilters, toQuery, type Filters } from "@/lib/collection";
import type { Product } from "@/lib/products";

const PAGE = 24;
const focus = "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
const toggle = <T,>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

function FilterControls({ f, set, colours }: { f: Filters; set: (f: Filters) => void; colours: string[] }) {
  const box = "size-4 accent-[var(--ink)]";
  return (
    <div className="grid gap-8">
      {/* Size first: it is how apparel is narrowed down (p.12 note 2). */}
      <fieldset>
        <legend className="mb-3 text-sm font-semibold">Size</legend>
        <div className="flex flex-wrap gap-2">
          {SIZE_ORDER.map((s) => (
            <button key={s} type="button" aria-pressed={f.sizes.includes(s)} onClick={() => set({ ...f, sizes: toggle(f.sizes, s) })} className={`grid h-11 min-w-12 place-items-center rounded-full border px-3 text-sm ${f.sizes.includes(s) ? "border-foreground bg-foreground text-background" : "border-foreground/30 hover:border-foreground"} ${focus}`}>
              {s}
            </button>
          ))}
        </div>
      </fieldset>
      <label className="flex min-h-11 cursor-pointer items-center gap-3 text-sm">
        <input type="checkbox" checked={f.inStock} onChange={() => set({ ...f, inStock: !f.inStock })} className={box} />In stock only
      </label>
      {colours.length > 0 && (
        <fieldset>
          <legend className="mb-2 text-sm font-semibold">Colour</legend>
          {colours.map((c) => (
            <label key={c} className="flex min-h-10 cursor-pointer items-center gap-3 text-sm">
              <input type="checkbox" checked={f.colours.includes(c)} onChange={() => set({ ...f, colours: toggle(f.colours, c) })} className={box} />{c}
            </label>
          ))}
        </fieldset>
      )}
      <fieldset>
        <legend className="mb-2 text-sm font-semibold">Price</legend>
        {PRICE_BANDS.map((b) => (
          <label key={b.id} className="flex min-h-10 cursor-pointer items-center gap-3 text-sm">
            <input type="checkbox" checked={f.prices.includes(b.id)} onChange={() => set({ ...f, prices: toggle(f.prices, b.id) })} className={box} />{b.label}
          </label>
        ))}
      </fieldset>
    </div>
  );
}

// Structure p.12: filters as chips above the grid on every screen; a filter column on desktop;
// a full-screen sheet on phones whose one filled button shows the result count.
export function Collection({ title, products }: { title: string; products: Product[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const f = parseFilters(params);
  const results = applyFilters(products, f);
  const [shown, setShown] = React.useState(PAGE);
  const sheet = React.useRef<HTMLDialogElement>(null);
  const colours = [...new Set(products.map(colourOf).filter((c): c is string => !!c))];

  const set = (next: Filters) => { setShown(PAGE); router.replace(`${pathname}${toQuery(next)}`, { scroll: false }); };
  const clear = () => set({ sizes: [], colours: [], prices: [], inStock: false, sort: f.sort });

  const chips = [
    ...f.sizes.map((s) => ({ key: `size-${s}`, label: `Size ${s}`, remove: () => set({ ...f, sizes: f.sizes.filter((x) => x !== s) }) })),
    ...(f.inStock ? [{ key: "stock", label: "In stock", remove: () => set({ ...f, inStock: false }) }] : []),
    ...f.colours.map((c) => ({ key: `c-${c}`, label: c, remove: () => set({ ...f, colours: f.colours.filter((x) => x !== c) }) })),
    ...f.prices.map((id) => ({ key: `p-${id}`, label: PRICE_BANDS.find((b) => b.id === id)!.label, remove: () => set({ ...f, prices: f.prices.filter((x) => x !== id) }) })),
  ];
  const pieces = (n: number) => `${n} ${n === 1 ? "piece" : "pieces"}`;

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-4xl font-medium md:text-5xl">
          {title} <span className="font-sans text-base font-normal text-muted-foreground" aria-live="polite">· {pieces(results.length)}</span>
        </h1>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => sheet.current?.showModal()} className={`inline-flex min-h-11 items-center gap-2 rounded-full border border-foreground/30 px-4 text-sm lg:hidden ${focus}`}>
            <SlidersHorizontal className="size-4" aria-hidden />Filters{activeCount(f) > 0 && <span className="grid size-5 place-items-center rounded-full bg-foreground text-[11px] text-background">{activeCount(f)}</span>}
          </button>
          <label className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Sort</span>
            <select value={f.sort} onChange={(e) => set({ ...f, sort: e.target.value as Filters["sort"] })} className={`h-11 rounded-full border border-foreground/30 bg-background px-3 text-sm ${focus}`}>
              {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
          </label>
        </div>
      </div>

      {/* Active filters stay visible so each can be removed in one tap. */}
      {chips.length > 0 && (
        <ul aria-label="Active filters" className="mt-4 flex flex-wrap items-center gap-2">
          {chips.map((c) => (
            <li key={c.key}>
              <button type="button" onClick={c.remove} aria-label={`Remove filter: ${c.label}`} className={`inline-flex min-h-9 items-center gap-1.5 rounded-full bg-secondary px-3 text-sm hover:bg-stone ${focus}`}>
                {c.label}<X className="size-3.5" aria-hidden />
              </button>
            </li>
          ))}
          <li><button type="button" onClick={clear} className={`min-h-9 px-2 text-sm underline underline-offset-4 ${focus}`}>Clear all</button></li>
        </ul>
      )}

      <div className="mt-6 grid gap-10 lg:grid-cols-[13rem_1fr]">
        <aside aria-label="Filters" className="hidden lg:block">
          <FilterControls f={f} set={set} colours={colours} />
        </aside>

        <div>
          {results.length === 0 ? (
            <div className="flex flex-col items-start gap-3 rounded-[2px] bg-secondary p-8">
              <p className="font-heading text-2xl">{products.length === 0 ? "Nothing here yet" : "No pieces match these filters"}</p>
              {products.length === 0
                ? <Link href="/new" className={`text-sm text-lagoon underline underline-offset-4 ${focus}`}>See what is new in</Link>
                : <button type="button" onClick={clear} className={`text-sm text-lagoon underline underline-offset-4 ${focus}`}>Clear all filters</button>}
            </div>
          ) : (
            <>
              <ul className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 md:gap-x-4 xl:grid-cols-4">
                {results.slice(0, shown).map((p) => <li key={p.id}><ProductCard product={p} /></li>)}
              </ul>
              {results.length > shown && (
                <div className="mt-10 flex justify-center">
                  <button type="button" onClick={() => setShown(shown + PAGE)} className={`inline-flex min-h-12 items-center rounded-[2px] border border-foreground px-8 text-sm font-medium hover:bg-foreground hover:text-background ${focus}`}>
                    Show {Math.min(PAGE, results.length - shown)} more
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <dialog
        ref={sheet}
        aria-labelledby="sheet-title"
        onClick={(e) => { if (e.target === e.currentTarget) e.currentTarget.close(); }}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-background p-0 text-foreground backdrop:bg-ink/40"
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 shrink-0 items-center justify-between border-b px-5">
            <h2 id="sheet-title" className="text-2xl font-medium">Filters</h2>
            <button type="button" autoFocus onClick={() => sheet.current?.close()} className={`-mr-2 inline-flex min-h-11 items-center gap-2 px-2 text-sm ${focus}`}>Close<X className="size-4" aria-hidden /></button>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-6"><FilterControls f={f} set={set} colours={colours} /></div>
          <div className="grid grid-cols-[auto_1fr] gap-3 border-t p-4">
            <button type="button" onClick={clear} className={`min-h-12 px-3 text-sm underline underline-offset-4 ${focus}`}>Clear all</button>
            <button type="button" onClick={() => sheet.current?.close()} className={`min-h-12 rounded-[2px] bg-primary px-6 text-sm font-medium text-primary-foreground ${focus}`}>
              Show {pieces(results.length)}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
