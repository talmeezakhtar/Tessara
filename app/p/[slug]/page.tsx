import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Stars } from "@/components/home/reviews";
import { ProductCard } from "@/components/product-card";
import { ProductHero } from "@/components/product/product-hero";
import { PRODUCTS, formatPrice, type Product } from "@/lib/products";
import { EXAMPLE_REVIEWS, REVIEWS } from "@/lib/reviews";
import { SITE_URL } from "@/lib/site";

// Product data for search results: name, photos, price and whether any size is in stock.
// No rating yet: add aggregateRating here once real reviews are in lib/reviews.ts.
function ProductJsonLd({ product }: { product: Product }) {
  const inStock = Object.values(product.sizes).some((s) => s !== "out");
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: [product.image, product.backImage].map((src) => `${SITE_URL}${src}`),
    brand: { "@type": "Brand", name: "Tessara" },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/p/${product.id}`,
      priceCurrency: "AED",
      price: product.price,
      availability: inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.id }));
}

const find = (slug: string) => PRODUCTS.find((p) => p.id === slug);

export async function generateMetadata(props: PageProps<"/p/[slug]">): Promise<Metadata> {
  const product = find((await props.params).slug);
  if (!product) return {};
  return {
    title: `${product.name} · ${formatPrice(product.price)} · Tessara`,
    description: product.description,
    alternates: { canonical: `/p/${product.id}` },
    openGraph: { title: product.name, description: product.description, images: [{ url: product.image, alt: product.name }] },
  };
}

// General care for cotton and knits; give a piece its own text when its label differs.
const CARE = ["Machine wash cold, inside out", "Dry flat in the shade", "Cool iron on the reverse"];

const focus = "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
const summary = `flex min-h-14 cursor-pointer list-none items-center justify-between text-sm font-medium [&::-webkit-details-marker]:hidden ${focus}`;

// Reading params sits inside <Suspense> so navigations can show the shell at once
// (Next 16 instant navigation). Every slug is still prerendered by generateStaticParams.
export default function ProductPage(props: PageProps<"/p/[slug]">) {
  return (
    <Suspense fallback={<main aria-busy className="mx-auto min-h-[80vh] w-full max-w-[1280px] md:px-8 md:pt-6"><div className="aspect-[4/5] bg-secondary md:w-1/2" /></main>}>
      <ProductDetail params={props.params} />
    </Suspense>
  );
}

async function ProductDetail({ params }: { params: PageProps<"/p/[slug]">["params"] }) {
  const product = find((await params).slug);
  if (!product) notFound();

  const reviews = REVIEWS.filter((r) => r.productId === product.id);
  const rating = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;
  // Complete the look: pieces from other categories, so it suggests an outfit, not a duplicate.
  const look = PRODUCTS.filter((p) => p.category !== product.category).slice(0, 4);

  return (
    <main>
      <ProductJsonLd product={product} />
      <nav aria-label="Breadcrumb" className="mx-auto w-full max-w-[1280px] px-4 py-3 text-sm text-muted-foreground md:px-8">
        <ol className="flex gap-2">
          <li><Link href="/shop" className={`hover:text-foreground ${focus}`}>Shop</Link></li>
          <li aria-hidden>/</li>
          <li><Link href={`/shop/${product.category.toLowerCase()}`} className={`hover:text-foreground ${focus}`}>{product.category}</Link></li>
        </ol>
      </nav>

      <ProductHero product={product} rating={rating} reviews={reviews.length} />

      <div className="mx-auto w-full max-w-3xl px-4 pt-10 md:px-8">
            {/* Details fold away so the buy area stays short (p.13 note 5). */}
            <div className="mt-8 divide-y border-y">
              <details className="group" open>
                <summary className={summary}>Details and fabric<span aria-hidden className="text-lg transition-transform group-open:rotate-45 motion-reduce:transition-none">+</span></summary>
                <div className="pb-5 text-sm leading-relaxed">
                  <p className="text-muted-foreground">{product.description}</p>
                  <ul className="mt-3 list-disc pl-5">{product.details.map((d) => <li key={d}>{d}</li>)}</ul>
                </div>
              </details>
              <details className="group">
                <summary className={summary}>Care<span aria-hidden className="text-lg transition-transform group-open:rotate-45 motion-reduce:transition-none">+</span></summary>
                <ul className="list-disc pb-5 pl-5 text-sm leading-relaxed">{CARE.map((c) => <li key={c}>{c}</li>)}</ul>
              </details>
              <details id="reviews" className="group scroll-mt-20" open={reviews.length > 0 || undefined}>
                <summary className={summary}>
                  <span>Reviews with fit notes <span className="text-muted-foreground">{reviews.length}</span></span>
                  <span aria-hidden className="text-lg transition-transform group-open:rotate-45 motion-reduce:transition-none">+</span>
                </summary>
                <div className="pb-5">
                  {reviews.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No reviews yet.</p>
                  ) : (
                    <ul className="grid gap-5">
                      {reviews.map((r) => (
                        <li key={r.author} className="text-sm">
                          <Stars value={r.rating} />
                          <p className="mt-1 font-semibold">{r.fit} · bought {r.bought} · {r.heightCm} cm</p>
                          <p className="mt-1 leading-relaxed text-muted-foreground">{r.text}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{r.author}, {r.city}{EXAMPLE_REVIEWS && " · example review"}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </details>
            </div>
      </div>

      <section aria-labelledby="look-title" className="mx-auto w-full max-w-[1280px] px-4 py-10 md:px-8 md:py-16">
        <h2 id="look-title" className="text-3xl font-medium md:text-4xl">Complete the look</h2>
        <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-4">
          {look.map((p) => <li key={p.id}><ProductCard product={p} /></li>)}
        </ul>
      </section>
    </main>
  );
}
