"use client";

import * as React from "react";
import Link from "next/link";
import { MessageCircle, X } from "lucide-react";
import { bagMessage, lineKey, setBagDrawer, useBag, useBagDrawer } from "@/lib/bag";
import { whatsappHref } from "@/lib/site";
import { BagLineRow, FreeDelivery, Totals, focus, outlineBtn, primaryBtn } from "./parts";

// Cart drawer (structure p.14): opens after Add to bag and keeps the shopper on the page.
// Native <dialog> gives Escape, focus trapping and the backdrop; a tap outside closes it too.
export function BagDrawer() {
  const open = useBagDrawer();
  const lines = useBag() ?? [];
  const ref = React.useRef<HTMLDialogElement>(null);
  const count = lines.reduce((n, l) => n + l.qty, 0);

  React.useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const close = () => setBagDrawer(false);

  return (
    <dialog
      ref={ref}
      aria-labelledby="drawer-title"
      onClose={close}
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      className="m-0 ml-auto h-dvh max-h-none w-full max-w-md bg-background p-0 text-foreground shadow-2xl backdrop:bg-ink/40 open:animate-in open:slide-in-from-right open:duration-300 motion-reduce:open:animate-none rtl:mr-auto rtl:ml-0"
    >
      <div className="flex h-full flex-col">
        <div className="flex h-16 shrink-0 items-center justify-between border-b px-5">
          <h2 id="drawer-title" className="text-2xl font-medium">Bag ({count})</h2>
          <button type="button" autoFocus onClick={close} className={`-mr-2 inline-flex min-h-11 items-center gap-2 rounded-[2px] px-2 text-sm ${focus}`}>
            Close<X className="size-4" aria-hidden />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-5 text-center">
            <p className="font-heading text-2xl">Your bag is empty</p>
            <Link href="/new" onClick={close} className={`${outlineBtn} w-auto`}>Shop new in</Link>
          </div>
        ) : (
          <>
            <div className="border-b px-5 py-4"><FreeDelivery lines={lines} /></div>
            <ul className="flex-1 divide-y overflow-y-auto px-5">
              {lines.map((l) => <BagLineRow key={lineKey(l)} line={l} onNavigate={close} />)}
            </ul>
            <div className="grid gap-3 border-t px-5 py-4">
              <Totals lines={lines} />
              <a href={whatsappHref(bagMessage(lines))} target="_blank" rel="noopener noreferrer" className={`${primaryBtn} mt-2`}>
                <MessageCircle className="size-4" aria-hidden />Order on WhatsApp
              </a>
              <Link href="/bag" onClick={close} className={`text-center text-sm underline underline-offset-4 hover:no-underline ${focus}`}>View bag</Link>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}
