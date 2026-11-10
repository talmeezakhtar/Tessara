import Link from "next/link";
import { formatPrice, type Product, type Size } from "@/lib/products";

const ORDER: Size[] = ["XS", "S", "M", "L", "XL"];

// One product tile: 4:5 image (back photo on hover), badge, name, AED price, size chips
// that always show stock (sold out is crossed out, structure p.3).
export function ProductCard({ product, className = "" }: { product: Product; className?: string }) {
  const sizes = ORDER.filter((s) => product.sizes[s]);
  return (
    <article className={`group relative ${className}`}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-secondary">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.image} alt="" loading="lazy" className="absolute inset-0 size-full object-contain p-[8%] transition-opacity duration-300 group-hover:opacity-0 motion-reduce:transition-none" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.backImage} alt="" loading="lazy" className="absolute inset-0 size-full object-contain p-[8%] opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none" />
        {product.badge && (
          <span className="absolute left-2 top-2 rounded-[2px] bg-sand px-2 py-0.5 text-[11px] font-medium text-ink">{product.badge}</span>
        )}
      </div>
      <h3 className="mt-3 font-sans text-sm leading-snug">
        {/* The whole card is clickable through this link's stretched overlay. */}
        <Link href={`/p/${product.id}`} className="outline-none after:absolute after:inset-0 after:rounded-[2px] focus-visible:after:ring-2 focus-visible:after:ring-ring focus-visible:after:ring-offset-4 focus-visible:after:ring-offset-background">
          {product.name}
        </Link>
      </h3>
      <p className="mt-1 text-sm font-semibold">{formatPrice(product.price)}</p>
      <ul aria-label="Sizes" className="mt-2 flex flex-wrap gap-1.5">
        {sizes.map((s) => {
          const out = product.sizes[s] === "out";
          return (
            <li key={s} className={`grid h-7 min-w-8 place-items-center rounded-full border px-2 text-[11px] ${out ? "border-border text-muted-foreground line-through" : "border-foreground/25"}`}>
              {s}
              {out && <span className="sr-only">, sold out</span>}
              {product.sizes[s] === "low" && <span className="sr-only">, low stock</span>}
            </li>
          );
        })}
      </ul>
    </article>
  );
}
