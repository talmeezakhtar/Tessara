"use client";

import * as React from "react";

// Body measurements in cm. Check against the pieces when new stock arrives.
const ROWS = [
  { size: "XS", bust: [80, 84], waist: [62, 66], hip: [86, 90] },
  { size: "S", bust: [84, 88], waist: [66, 70], hip: [90, 94] },
  { size: "M", bust: [88, 92], waist: [70, 74], hip: [94, 98] },
  { size: "L", bust: [92, 98], waist: [74, 80], hip: [98, 104] },
  { size: "XL", bust: [98, 104], waist: [80, 86], hip: [104, 110] },
] as const;

const focus = "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/** Body measurements table with a cm / inches switch (structure p.17 note 2). */
export function SizeChart() {
  const [unit, setUnit] = React.useState<"cm" | "in">("cm");
  const fmt = ([a, b]: readonly [number, number]) =>
    unit === "cm" ? `${a}–${b}` : `${(Math.round((a / 2.54) * 2) / 2).toFixed(1)}–${(Math.round((b / 2.54) * 2) / 2).toFixed(1)}`;

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-medium md:text-3xl">Size chart</h2>
        <div role="group" aria-label="Units" className="inline-flex rounded-full border p-1">
          {(["cm", "in"] as const).map((u) => (
            <button
              key={u}
              type="button"
              aria-pressed={unit === u}
              onClick={() => setUnit(u)}
              className={`min-h-9 min-w-12 rounded-full px-3 text-sm ${unit === u ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"} ${focus}`}
            >
              {u}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[28rem] border-collapse text-left text-sm tabular-nums">
          <caption className="sr-only">Body measurements in {unit === "cm" ? "centimetres" : "inches"}</caption>
          <thead>
            <tr className="border-b text-muted-foreground">
              <th scope="col" className="py-3 pr-4 font-medium">Size</th>
              <th scope="col" className="py-3 pr-4 font-medium">Bust</th>
              <th scope="col" className="py-3 pr-4 font-medium">Waist</th>
              <th scope="col" className="py-3 font-medium">Hip</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.size} className="border-b">
                <th scope="row" className="py-3 pr-4 font-semibold">{r.size}</th>
                <td className="py-3 pr-4">{fmt(r.bust)}</td>
                <td className="py-3 pr-4">{fmt(r.waist)}</td>
                <td className="py-3">{fmt(r.hip)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">Body measurements, not garment measurements. Each product page says if a piece runs small or large.</p>
    </div>
  );
}
