"use client";

import * as React from "react";
import { MessageCircle } from "lucide-react";
import SneakerProductHero, { type SneakerVariant } from "@/components/ui/sneaker-product-hero";
import { PayMark } from "@/components/site/pay-mark";
import { addToBag, productById, setBagDrawer } from "@/lib/bag";
import { colourOf } from "@/lib/collection";
import { formatPrice, type Product, type Size } from "@/lib/products";
import { setSaved, useSaved } from "@/lib/saved";
import { SIZES } from "@/lib/size";
import { whatsappHref } from "@/lib/site";

const focus = "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
const lagoonBtn = `inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-[2px] bg-lagoon px-4 text-sm font-medium text-pearl transition-opacity hover:opacity-90 ${focus}`;

// Structure p.13 on top of the product hero component: the piece floats over a wash of its
// own colour, Order on WhatsApp is the one filled button (piece, colour and size already in
// the message) and Add to bag is the outline. On phones both stay pinned to the bottom.
export function ProductHero({ product, rating, reviews }: { product: Product; rating: number; reviews: number }) {
  const saved = useSaved(product.id);
  const [size, setSize] = React.useState("");
  const [active, setActive] = React.useState(0);
  const drawerTimer = React.useRef(0);
  React.useEffect(() => () => window.clearTimeout(drawerTimer.current), []);

  // The piece's own colour first, then its other colourways (entries that hold their photos and stock).
  const entries = [product, ...(product.colourways ?? []).map(productById).filter(Boolean)];
  const colourName = (e: Product) => colourOf(e) ?? "Stripe";
  const baseName = product.colourways?.length ? product.name.split(" · ")[0]! : product.name;
  const current = entries[active] ?? product;
  const shownName = product.colourways?.length ? `${baseName} · ${colourName(current)}` : product.name;

  const variants: SneakerVariant[] = entries.map((e) => ({
    name: colourName(e),
    swatch: e.swatch,
    tint: e.swatch,
    src: e.image,
    // A size this colour doesn't come in, or has sold out of, can't be picked.
    soldOut: SIZES.filter((s) => !e.sizes[s] || e.sizes[s] === "out"),
    gallery: [
      { src: e.image, label: "Front" },
      { src: e.backImage, label: "Back" },
      ...(e.sideImage ? [{ src: e.sideImage, label: "Side" }] : []),
      ...(e.photos ?? []),
      { src: e.image, label: "Collar", focus: [0.5, 0.22], zoom: 2 },
      { src: e.image, label: "Hem", focus: [0.5, 0.82], zoom: 2 },
    ],
  }));
  const sizes = SIZES.filter((s) => entries.some((e) => e.sizes[s])).map((s) => ({ label: s }));

  const orderText = (s: string) => `Hi Tessara, I'd like to order: ${shownName}, size ${s} (${formatPrice(product.price)}).`;
  const notifyText = () => `Hi Tessara, please tell me when ${shownName} is back in stock.`;

  const add = (s: string, colourIndex: number) => {
    // The piece's own colour needs no tag; another colourway is stored by name.
    addToBag(product.id, s as Size, colourIndex > 0 ? colourName(entries[colourIndex]!) : undefined);
    // Let the button tick "Added" first, then open the bag drawer (p.14).
    window.clearTimeout(drawerTimer.current);
    drawerTimer.current = window.setTimeout(() => setBagDrawer(true), 700);
  };

  const onSizeChange = React.useCallback((s: string) => setSize(s), []);
  const onVariantChange = React.useCallback((i: number) => setActive(i), []);
  const allOut = SIZES.every((s) => !current.sizes[s] || current.sizes[s] === "out");

  return (
    <>
      <SneakerProductHero
        variants={variants}
        eyebrow={product.category}
        title={baseName}
        description={product.description}
        sizes={sizes}
        price={product.price}
        rating={rating}
        reviews={reviews}
        currency="AED "
        toast="Added to your bag"
        likeColor="var(--lagoon)"
        height="calc(100svh - 7rem)"
        liked={saved}
        onLikeChange={(next) => setSaved(product.id, next)}
        onAddToCart={({ size: s, variant }) => add(s, Math.max(0, variants.indexOf(variant)))}
        onSizeChange={onSizeChange}
        onVariantChange={onVariantChange}
        ctaVariant="outline"
        labels={{
          size: "Size",
          reviews: "Reviews",
          price: "Price",
          colour: "Colour",
          addToCart: "Add to bag",
          added: "Added",
          soldOut: "Sold out",
          saved: "Saved for later",
          unsaved: "Removed from saved",
          save: "Save for later",
        }}
        stockText={({ tone, size: s }) =>
          tone === "out"
            ? "Sold out in this colour. We can tell you when it is back."
            : current.sizes[s as Size] === "low"
              ? `Low stock in ${s}`
              : "In stock · delivery in 1 to 3 days"
        }
        extraAction={({ size: s, soldOut }) => (
          <div className="grid gap-2.5">
            <a href={whatsappHref(soldOut || !s ? notifyText() : orderText(s))} target="_blank" rel="noopener noreferrer" className={`${lagoonBtn} whitespace-nowrap`}>
              <MessageCircle className="size-4 shrink-0" aria-hidden />
              {soldOut || !s ? "Notify me when back" : "Order on WhatsApp"}
            </a>
            <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">or 4 payments of {formatPrice(Math.ceil(product.price / 4))} with <PayMark name="tabby" className="h-5" /></p>
          </div>
        )}
      />

      {/* Phones: buy buttons pinned to the bottom while the page scrolls (p.13 note 6). */}
      <div data-buy-bar className="fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t bg-background/95 p-3 backdrop-blur md:hidden">
        {allOut || !size ? (
          <a href={whatsappHref(notifyText())} target="_blank" rel="noopener noreferrer" className={lagoonBtn}>
            <MessageCircle className="size-4" aria-hidden />Notify me when back
          </a>
        ) : (
          <>
            <a href={whatsappHref(orderText(size))} target="_blank" rel="noopener noreferrer" className={`${lagoonBtn} flex-1`}>
              <MessageCircle className="size-4" aria-hidden />Order on WhatsApp · {size}
            </a>
            <button type="button" onClick={() => add(size, active)} className={`inline-flex min-h-11 items-center rounded-[2px] border border-foreground px-5 text-sm font-medium ${focus}`}>
              Add
            </button>
          </>
        )}
      </div>
    </>
  );
}
