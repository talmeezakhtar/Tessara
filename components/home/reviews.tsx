import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import { REVIEWS } from "@/lib/reviews";

// Section 11: fit notes from buyers, not stars alone. Hidden until lib/reviews.ts has real ones.
const average = REVIEWS.length ? REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length : 0;
const name = (id: string) => PRODUCTS.find((p) => p.id === id)?.name ?? "";

export function Stars({ value }: { value: number }) {
  return (
    <span aria-label={`${value} out of 5`} className="tracking-[0.15em] text-foreground">
      <span aria-hidden>{"★".repeat(value)}</span>
      <span aria-hidden className="text-foreground/20">{"★".repeat(5 - value)}</span>
    </span>
  );
}

export function Reviews() {
  if (!REVIEWS.length) return null;
  return (
    <section aria-labelledby="reviews-title" className="mx-auto w-full max-w-[1280px] px-4 py-10 md:px-8 md:py-16">
      <div className="grid gap-8 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-4">
          <h2 id="reviews-title" className="text-3xl font-medium md:text-4xl">Reviews</h2>
          <p className="mt-6 font-heading text-6xl font-medium leading-none">{average.toFixed(1)}</p>
          <p className="mt-2 text-sm text-muted-foreground">Average from {REVIEWS.length} reviews</p>
        </div>

        <ul className="grid gap-4 md:col-span-8 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <li key={r.author} className="flex flex-col rounded-[2px] border p-5">
              <Stars value={r.rating} />
              <p className="mt-3 text-sm font-semibold">{r.fit} · bought {r.bought} · {r.heightCm} cm</p>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
              <p className="mt-4 text-xs text-muted-foreground">{r.author}, {r.city}</p>
              <Link href={`/p/${r.productId}#reviews`} className="mt-1 text-xs text-lagoon underline underline-offset-4 outline-none hover:no-underline focus-visible:ring-2 focus-visible:ring-ring">
                {name(r.productId)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
