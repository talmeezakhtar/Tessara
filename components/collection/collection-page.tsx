import Link from "next/link";
import { Suspense } from "react";
import { PRODUCTS, SHOP_CATEGORIES, type Product } from "@/lib/products";
import { Collection } from "./collection";

// Category pages: one per category in stock (SHOP_CATEGORIES), so every menu link has pieces.
export const CATEGORIES: Record<string, { title: string; match: (p: Product) => boolean }> = Object.fromEntries(
  SHOP_CATEGORIES.map((cat) => [cat.slug, { title: cat.label, match: (p: Product) => p.category === cat.label }]),
);

const focus = "outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function CollectionPage({ title, crumbs, products = PRODUCTS }: { title: string; crumbs: { href: string; label: string }[]; products?: Product[] }) {
  return (
    <main className="mx-auto w-full max-w-[1280px] px-4 pb-16 md:px-8">
      <nav aria-label="Breadcrumb" className="py-4 text-sm text-muted-foreground">
        <ol className="flex flex-wrap gap-2">
          {crumbs.map((c) => (
            <li key={c.href} className="flex gap-2">
              <Link href={c.href} className={`hover:text-foreground ${focus}`}>{c.label}</Link><span aria-hidden>/</span>
            </li>
          ))}
          <li aria-current="page" className="text-foreground">{title}</li>
        </ol>
      </nav>
      {/* Filters read the URL, so the grid sits in Suspense; the fallback keeps the title in place. */}
      <Suspense fallback={<h1 className="text-4xl font-medium md:text-5xl">{title}</h1>}>
        <Collection title={title} products={products} />
      </Suspense>
    </main>
  );
}
