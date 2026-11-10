"use client";

import * as React from "react";
import Link from "next/link";
import ClothingRailHero from "@/components/ui/product-rail-gallery";
import { PRODUCTS, formatPrice } from "@/lib/products";

// Pieces left off the rail; they still show everywhere else in the shop.
const OFF_RAIL = new Set(["striped-shirt-rose"]);
const NEW_IN = PRODUCTS.filter((p) => !OFF_RAIL.has(p.id)).map((p) => ({ ...p, tag: formatPrice(p.price) }));

export function Hero() {
  // Last piece the shopper turned to the front. Kept when the pointer leaves the
  // rail so the button doesn't vanish on the way to it.
  const [picked, setPicked] = React.useState<number | null>(null);
  const onActiveChange = React.useCallback((i: number | null) => { if (i !== null) setPicked(i); }, []);
  const piece = picked === null ? null : NEW_IN[picked];

  return (
    // The rail sits on the dark Ink band (structure p.6–7); the `dark` scope swaps the tokens.
    <div className="dark">
      <ClothingRailHero
        items={NEW_IN}
        hanger="none"
        heading="Ten pieces for the new season"
        caption="Hover or tap a piece to see it"
        onActiveChange={onActiveChange}
        action={
          <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-6">
            {piece ? (
              <>
                <Link href={`/p/${piece.id}`} className="inline-flex min-h-11 w-full items-center justify-center rounded-[2px] bg-foreground px-6 text-sm font-medium text-background outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto">
                  Shop the {piece.short}
                </Link>
                <Link href="/new" className="min-h-11 content-center text-sm text-muted-foreground underline-offset-4 outline-none hover:text-foreground hover:underline focus-visible:ring-2 focus-visible:ring-ring">
                  Shop all new in
                </Link>
              </>
            ) : (
              <Link href="/new" className="inline-flex min-h-11 w-full items-center justify-center rounded-[2px] bg-foreground px-6 text-sm font-medium text-background outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto">
                Shop all new in
              </Link>
            )}
          </div>
        }
      />
    </div>
  );
}
