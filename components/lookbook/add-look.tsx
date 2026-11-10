"use client";

import * as React from "react";
import { addToBag, productById, setBagDrawer } from "@/lib/bag";
import { SIZES } from "@/lib/size";

/**
 * Adds every piece of a look, one size each (structure p.16 note 3).
 * ponytail: takes each piece's first size in stock; use the shopper's last chosen size once
 * that is remembered.
 */
export function AddLook({ ids }: { ids: string[] }) {
  const [note, setNote] = React.useState("");
  const add = () => {
    const skipped: string[] = [];
    let added = 0;
    for (const id of ids) {
      const p = productById(id);
      const size = SIZES.find((s) => p.sizes[s] && p.sizes[s] !== "out");
      if (size) { addToBag(id, size); added++; } else skipped.push(p.name);
    }
    setNote(skipped.length ? `${skipped.join(", ")} is sold out and was not added.` : "");
    if (added) setBagDrawer(true);
  };
  return (
    <div>
      <button type="button" onClick={add} className="inline-flex min-h-12 w-full items-center justify-center rounded-[2px] bg-primary px-6 text-sm font-medium text-primary-foreground outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto">
        Add all to bag
      </button>
      <p role="status" className="mt-2 min-h-5 text-sm text-muted-foreground">{note || "One of each piece, in the first size in stock. Change sizes in your bag."}</p>
    </div>
  );
}
