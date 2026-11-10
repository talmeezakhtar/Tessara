import Link from "next/link";
import { PRODUCTS, SHOP_CATEGORIES } from "@/lib/products";

type Tile = { href: string; label: string; count: number; image: string };

// Cover photos in /public/categories, brand labels removed. A new category without one
// falls back to its first piece's photo until a cover is added here.
const PHOTOS: Record<string, string> = {
  tees: "/categories/tees.webp",
  knitwear: "/categories/knitwear.webp",
  shirts: "/categories/shirts.webp",
  hoodies: "/categories/hoodies.webp",
};

// Built from the catalogue (SHOP_CATEGORIES), so the tiles always match what is in stock.
// Biggest category first (it gets the large tile).
const TILES: Tile[] = SHOP_CATEGORIES.map((c) => ({ href: c.href, label: c.label, count: c.count, image: PHOTOS[c.slug] ?? c.cover.image }));
TILES.push({ href: "/shop", label: "All pieces", count: PRODUCTS.length, image: "/categories/all.webp" });

const focus = "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function Categories() {
  return (
    <section aria-labelledby="categories-title" className="mx-auto w-full max-w-[1280px] py-10 md:px-8 md:py-16">
      <div className="mb-6 flex items-baseline justify-between px-4 md:px-0">
        <h2 id="categories-title" className="text-3xl font-medium md:text-4xl">Shop by category</h2>
        <Link href="/shop" className={`text-sm text-lagoon underline underline-offset-4 hover:no-underline ${focus}`}>Shop all</Link>
      </div>

      {/* Phones: one row that scrolls sideways, next tile partly visible. md+: one large tile and a 2×2 block. */}
      <ul className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-2 [scrollbar-width:none] md:grid md:grid-cols-4 md:gap-4 md:overflow-visible md:px-0 md:pb-0">
        {TILES.map((tile, i) => (
          <li key={tile.href} className={`shrink-0 snap-start ${i === 0 ? "w-[62%] md:col-span-2 md:row-span-2" : "w-[42%]"} md:w-auto`}>
            <Link href={tile.href} className={`group relative block aspect-[4/5] h-full w-full ${i === 0 ? "md:aspect-auto" : ""} overflow-hidden rounded-[2px] bg-sand ${focus}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tile.image}
                alt=""
                loading="lazy"
                className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none"
              />
              {/* Scrim so the label reads on any photo. */}
              <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/75 via-ink/30 to-transparent" />
              <span className="absolute bottom-3 left-3 text-pearl md:bottom-5 md:left-5">
                <span className={`block font-heading font-medium leading-none ${i === 0 ? "text-3xl md:text-5xl" : "text-xl md:text-2xl"}`}>
                  {tile.label}
                  <span aria-hidden className="ml-2 inline-block font-sans text-base transition-transform group-hover:translate-x-1 motion-reduce:transition-none">→</span>
                </span>
                <span className="mt-1.5 block text-xs text-pearl/80">
                  {tile.count} {tile.count === 1 ? "piece" : "pieces"}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
