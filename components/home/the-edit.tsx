import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { PRODUCTS } from "@/lib/products";

// Section 7: a story with three shoppable pieces that breaks the grid rhythm.
// EDIT.image is the panel background; leave it undefined and the panel is a Sand colour block.
const EDIT = {
  title: "The knit edit",
  line: "Soft layers for cool evenings by the water.",
  href: "/shop/knitwear",
  image: "/editorial/knit-edit.webp" as string | undefined,
  pieces: ["knit-cardigan-olive", "crewneck-lilac", "breton-long-sleeve"],
};

const pieces = EDIT.pieces.map((id) => PRODUCTS.find((p) => p.id === id)!).filter(Boolean);

export function TheEdit() {
  return (
    <section aria-labelledby="edit-title" className="mx-auto grid w-full max-w-[1280px] gap-6 py-10 md:grid-cols-12 md:gap-8 md:px-8 md:py-16">
      <div className={`relative mx-4 flex min-h-[22rem] flex-col ${EDIT.image ? "justify-start" : "justify-end"} overflow-hidden rounded-[2px] bg-sand p-6 text-ink md:col-span-5 md:mx-0 md:min-h-[34rem] md:p-10`}>
        {EDIT.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={EDIT.image} alt="" className="absolute inset-0 size-full object-cover" />
        )}
        {/* Photo: text sits on the water at the top, over a fade, leaving the knit clear. */}
        {EDIT.image && <span aria-hidden className="absolute inset-x-0 top-0 h-3/5 bg-gradient-to-b from-ink/70 via-ink/35 to-transparent" />}
        <div className={`relative ${EDIT.image ? "text-pearl" : ""}`}>
          <h2 id="edit-title" className="text-4xl font-medium leading-none md:text-6xl">{EDIT.title}</h2>
          <p className="mt-3 max-w-[30ch] text-base">{EDIT.line}</p>
          <Link href={EDIT.href} className={`mt-6 inline-flex min-h-11 items-center rounded-[2px] px-6 text-sm font-medium outline-none ${EDIT.image ? "bg-pearl text-ink" : "bg-ink text-pearl"} transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-sand`}>
            Shop the edit
          </Link>
        </div>
      </div>

      {/* Pieces sit low against the panel on desktop; on phones they scroll sideways. */}
      <ul className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-2 [scrollbar-width:none] md:col-span-7 md:grid md:grid-cols-3 md:content-end md:gap-4 md:overflow-visible md:px-0 md:pb-0">
        {pieces.map((p) => (
          <li key={p.id} className="w-[44%] shrink-0 snap-start md:w-auto">
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </section>
  );
}
