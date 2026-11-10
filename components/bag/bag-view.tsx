"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { bagMessage, lineKey, useBag } from "@/lib/bag";
import { whatsappHref } from "@/lib/site";
import { BagLineRow, FreeDelivery, Totals, focus, outlineBtn, primaryBtn } from "./parts";

// /bag (structure p.15): lines with size and colour, quantity stepper, totals.
// WhatsApp is the filled button; Checkout is the outline. Phones pin WhatsApp to the bottom.
export function BagView() {
  const lines = useBag();

  // Unknown until the bag is read from this device: keep the space, show nothing yet.
  if (lines === null) return <div aria-busy className="min-h-[60vh]" />;

  if (lines.length === 0) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 py-16 text-center">
        <h1 className="text-4xl font-medium md:text-5xl">Your bag is empty</h1>
        <p className="max-w-[36ch] text-sm text-muted-foreground">Anything you add stays here on this device until you order.</p>
        <Link href="/new" className={`mt-2 inline-flex min-h-12 items-center justify-center rounded-[2px] bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 ${focus}`}>Shop new in</Link>
      </div>
    );
  }

  const count = lines.reduce((n, l) => n + l.qty, 0);
  const order = whatsappHref(bagMessage(lines));

  return (
    <div className="grid gap-8 px-4 py-6 md:grid-cols-12 md:gap-12 md:px-0 md:py-10">
      <div className="md:col-span-7">
        <h1 className="text-4xl font-medium md:text-5xl">Your bag ({count})</h1>
        <ul className="mt-6 divide-y border-y">
          {lines.map((l) => <BagLineRow key={lineKey(l)} line={l} />)}
        </ul>
      </div>

      <aside aria-label="Order summary" className="md:col-span-5">
        <div className="grid gap-5 rounded-[2px] bg-secondary p-5 md:sticky md:top-20 md:p-8">
          <FreeDelivery lines={lines} />
          <Totals lines={lines} />
          <div className="hidden gap-3 md:grid">
            <a href={order} target="_blank" rel="noopener noreferrer" className={primaryBtn}>
              <MessageCircle className="size-4" aria-hidden />Order on WhatsApp
            </a>
            <Link href="/checkout" className={outlineBtn}>Checkout</Link>
          </div>
          <Link href="/checkout" className={`${outlineBtn} md:hidden`}>Checkout</Link>
          <p className="text-xs text-muted-foreground">Delivery in 1 to 3 days · Cash on delivery · 14-day exchange</p>
        </div>
      </aside>

      <div data-buy-bar className="fixed inset-x-0 bottom-0 z-30 border-t bg-background/95 p-3 backdrop-blur md:hidden">
        <a href={order} target="_blank" rel="noopener noreferrer" className={primaryBtn}>
          <MessageCircle className="size-4" aria-hidden />Order on WhatsApp
        </a>
      </div>
    </div>
  );
}
