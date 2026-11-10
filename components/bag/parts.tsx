"use client";

import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import { lineColour, lineImage, lineName, productById, removeLine, setQty, totalsFor, type BagLine } from "@/lib/bag";
import { FREE_DELIVERY_AED } from "@/lib/bag-totals";
import { formatPrice } from "@/lib/products";

export const focus = "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
export const primaryBtn = `inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[2px] bg-lagoon px-6 text-sm font-medium text-pearl transition-opacity hover:opacity-90 ${focus}`;
export const outlineBtn = `inline-flex min-h-12 w-full items-center justify-center rounded-[2px] border border-foreground px-6 text-sm font-medium transition-colors hover:bg-foreground hover:text-background ${focus}`;

/** One bag line: photo, name, size and colour, price, quantity stepper, remove. */
export function BagLineRow({ line, onNavigate }: { line: BagLine; onNavigate?: () => void }) {
  const p = productById(line.id);
  const colour = lineColour(line);
  const name = lineName(line);
  const label = `${name}, size ${line.size}`;
  return (
    <li className="flex gap-4 py-4">
      <Link href={`/p/${p.id}`} onClick={onNavigate} tabIndex={-1} aria-hidden className="w-20 shrink-0 rounded-[2px] bg-secondary">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={lineImage(line)} alt="" className="aspect-[4/5] w-full object-contain p-1.5" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex justify-between gap-3">
          <Link href={`/p/${p.id}`} onClick={onNavigate} className={`text-sm leading-snug hover:underline ${focus}`}>{name}</Link>
          <p className="shrink-0 text-sm font-semibold">{formatPrice(p.price * line.qty)}</p>
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">{line.size}{colour && ` · ${colour}`}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <div role="group" aria-label={`Quantity, ${label}`} className="inline-flex items-center rounded-full border">
            <button type="button" onClick={() => setQty(line, line.qty - 1)} aria-label={line.qty === 1 ? `Remove ${label}` : "One less"} className={`grid size-9 place-items-center rounded-full ${focus}`}>
              <Minus className="size-3.5" aria-hidden />
            </button>
            <span aria-live="polite" className="w-6 text-center text-sm tabular-nums">{line.qty}</span>
            <button type="button" onClick={() => setQty(line, line.qty + 1)} disabled={line.qty >= 9} aria-label="One more" className={`grid size-9 place-items-center rounded-full disabled:opacity-30 ${focus}`}>
              <Plus className="size-3.5" aria-hidden />
            </button>
          </div>
          <button type="button" onClick={() => removeLine(line)} aria-label={`Remove ${label}`} className={`min-h-9 text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground ${focus}`}>
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}

/** Free-delivery progress, so the threshold is never a surprise (structure p.14–15). */
export function FreeDelivery({ lines }: { lines: BagLine[] }) {
  const t = totalsFor(lines);
  return (
    <div>
      <p className="text-sm">
        {t.toFree > 0 ? <>Free delivery: <span className="font-semibold">{formatPrice(t.toFree)}</span> to go</> : <span className="font-semibold">You have free delivery</span>}
      </p>
      <div role="progressbar" aria-label={`Progress to free delivery over ${formatPrice(FREE_DELIVERY_AED)}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(t.progress * 100)} className="mt-2 h-1 overflow-hidden rounded-full bg-secondary">
        <div className="h-full bg-lagoon transition-[width] duration-300 motion-reduce:transition-none" style={{ width: `${t.progress * 100}%` }} />
      </div>
    </div>
  );
}

export function Totals({ lines }: { lines: BagLine[] }) {
  const t = totalsFor(lines);
  return (
    <dl className="grid grid-cols-[1fr_auto] gap-y-1.5 text-sm">
      <dt className="text-muted-foreground">Subtotal</dt><dd>{formatPrice(t.subtotal)}</dd>
      <dt className="text-muted-foreground">Delivery</dt><dd>{t.delivery ? formatPrice(t.delivery) : "Free"}</dd>
      <dt className="mt-2 font-semibold">Total</dt><dd className="mt-2 font-semibold">{formatPrice(t.total)}</dd>
    </dl>
  );
}
