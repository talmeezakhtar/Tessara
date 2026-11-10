"use client";

import Link from "next/link";
import { Heart, X } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { PRODUCTS } from "@/lib/products";
import { setSaved, useSavedIds } from "@/lib/saved";

const focus = "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

// Structure p.16: saved items live on this device; each card keeps its size chips, and
// sold-out pieces stay with their chips crossed out.
export function SavedView() {
  const ids = useSavedIds();
  if (ids === null) return <div aria-busy className="min-h-[40vh]" />;

  const items = ids.map((id) => PRODUCTS.find((p) => p.id === id)).filter((p) => p !== undefined);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-[2px] bg-secondary p-8">
        <Heart className="size-6 text-muted-foreground" aria-hidden />
        <p className="font-heading text-2xl">Nothing saved yet</p>
        <p className="max-w-[44ch] text-sm text-muted-foreground">Tap the heart on any piece to keep it here for later.</p>
        <Link href="/new" className={`inline-flex min-h-11 items-center rounded-[2px] bg-primary px-6 text-sm font-medium text-primary-foreground hover:opacity-90 ${focus}`}>Shop new in</Link>
      </div>
    );
  }

  return (
    <>
      <p className="mb-6 text-sm text-muted-foreground">Kept on this device. Sign-in comes later.</p>
      <ul className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 md:gap-x-4 xl:grid-cols-4">
        {items.map((p) => (
          <li key={p.id} className="relative">
            <ProductCard product={p} />
            <button
              type="button"
              onClick={() => setSaved(p.id, false)}
              aria-label={`Remove ${p.name} from saved`}
              className={`absolute right-2 top-2 z-10 grid size-9 place-items-center rounded-full bg-background/90 shadow-sm hover:bg-background ${focus}`}
            >
              <X className="size-4" aria-hidden />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
