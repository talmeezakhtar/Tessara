import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { PRODUCTS } from "@/lib/products";

// Section 8. Badges carry real stock state ("Back in stock" convinces more than "Bestseller").
// ponytail: hand-picked order until there is sales data to rank by.
const IDS = ["hoodie-heather", "breton-long-sleeve", "oxford-shirt-sky", "pique-polo-forest"];
const items = IDS.map((id) => PRODUCTS.find((p) => p.id === id)!).filter(Boolean);

export function Bestsellers() {
  return (
    <section aria-labelledby="best-title" className="mx-auto w-full max-w-[1280px] px-4 py-10 md:px-8 md:py-16">
      <div className="flex items-baseline justify-between">
        <h2 id="best-title" className="text-3xl font-medium md:text-4xl">Bestsellers</h2>
        <Link href="/shop?sort=bestselling" className="text-sm text-lagoon underline underline-offset-4 outline-none hover:no-underline focus-visible:ring-2 focus-visible:ring-ring">
          Shop bestsellers
        </Link>
      </div>
      <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-4">
        {items.map((p) => (
          <li key={p.id}>
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </section>
  );
}
