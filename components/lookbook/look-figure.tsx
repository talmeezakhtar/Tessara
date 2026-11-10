"use client";

import * as React from "react";
import Link from "next/link";
import { productById } from "@/lib/bag";
import type { Look } from "@/lib/looks";
import { formatPrice, type Product } from "@/lib/products";
import { SIZES } from "@/lib/size";

const focus = "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/**
 * A layer the photo's shape that covers the frame like object-cover, but when the frame
 * is wider than the photo it keeps the upper body in view (FOCUS_Y of the photo sits at
 * the frame's middle) rather than the centre, so faces aren't cropped off.
 */
const FOCUS_Y = 0.32;
function coverLayer(ratio: number): React.CSSProperties {
  const h = `max(${100 / ratio}cqw, 100cqh)`;
  return { aspectRatio: ratio, width: `max(100cqw, ${ratio * 100}cqh)`, top: `clamp(100cqh - ${h}, 50cqh - ${h} * ${FOCUS_Y}, 0px)` };
}

function SpotCard({ product, id }: { product: Product; id: string }) {
  return (
    <div id={id} role="group" aria-label={product.name} className="absolute inset-x-3 bottom-3 z-20 rounded-[2px] bg-background p-4 shadow-lg">
      <p className="text-sm">{product.name}</p>
      <p className="mt-0.5 text-sm font-semibold">{formatPrice(product.price)}</p>
      <ul aria-label="Sizes" className="mt-2 flex flex-wrap gap-1.5">
        {SIZES.filter((s) => product.sizes[s]).map((s) => {
          const out = product.sizes[s] === "out";
          return (
            <li key={s} className={`grid h-7 min-w-8 place-items-center rounded-full border px-2 text-[11px] ${out ? "text-muted-foreground line-through" : "border-foreground/25"}`}>
              {s}{out && <span className="sr-only">, sold out</span>}
            </li>
          );
        })}
      </ul>
      <Link href={`/p/${product.id}`} className={`mt-3 inline-block text-sm text-lagoon underline underline-offset-4 hover:no-underline ${focus}`}>View piece</Link>
    </div>
  );
}

/**
 * One look with a "+" hotspot on each piece; a hotspot opens a small card with price and
 * sizes (structure p.9 note 3, p.16 note 2). Escape or a tap outside closes it.
 */
export function LookFigure({ look, className = "aspect-[4/5]" }: { look: Look; className?: string }) {
  const [open, setOpen] = React.useState<string | null>(null);
  const ref = React.useRef<HTMLDivElement>(null);
  const uid = React.useId().replace(/:/g, "");

  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(null); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(null); };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <div ref={ref} className={`relative overflow-hidden rounded-[2px] bg-secondary [container-type:size] ${className}`}>
      {/* With a photo, the photo and its spots share one layer sized like object-cover, so a
          spot stays on its piece whatever shape the frame is. */}
      <div
        className={look.photo ? "absolute left-1/2 -translate-x-1/2" : "absolute inset-0"}
        style={look.photo ? coverLayer(look.photo.ratio) : undefined}
      >
        {look.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={look.photo.src} alt="" loading="lazy" className="absolute inset-0 size-full object-cover" />
        ) : (
          look.spots.map((s, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={s.id} src={productById(s.id).image} alt="" loading="lazy" className={`absolute top-[8%] h-[84%] w-[62%] object-contain ${i === 0 ? "left-[2%]" : "right-[2%]"}`} />
          ))
        )}
        {look.spots.map((s) => {
          const p = productById(s.id);
          const isOpen = open === s.id;
          return (
            <button
              key={s.id}
              type="button"
              aria-expanded={isOpen}
              aria-controls={isOpen ? `${uid}-${s.id}` : undefined}
              aria-label={`${p.name}, ${formatPrice(p.price)}`}
              onClick={() => setOpen(isOpen ? null : s.id)}
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
              className={`absolute z-10 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full ${focus}`}
            >
              <span aria-hidden className={`grid size-7 place-items-center rounded-full border border-ink/20 text-base leading-none shadow-md transition-transform motion-reduce:transition-none ${isOpen ? "rotate-45 bg-ink text-pearl" : "bg-pearl text-ink"}`}>+</span>
            </button>
          );
        })}
      </div>
      {open && <SpotCard product={productById(open)} id={`${uid}-${open}`} />}
    </div>
  );
}
