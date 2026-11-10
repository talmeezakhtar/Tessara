"use client";

import * as React from "react";
import Link from "next/link";
import { PRODUCTS, type Size } from "@/lib/products";
import { recommendSize, SIZES, type Fit } from "@/lib/size";

const FITS: { value: Fit; label: string }[] = [
  { value: "relaxed", label: "Relaxed" },
  { value: "true", label: "True to size" },
  { value: "fitted", label: "Fitted" },
];

const focus = "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-secondary";
const field = `h-12 w-full rounded-[2px] border border-input bg-background px-3 text-base ${focus}`;

// Section 9: three inputs, one answer, and a link straight to pieces in that size.
export function SizeFinder() {
  const [result, setResult] = React.useState<Size | null>(null);
  const inStock = result ? PRODUCTS.filter((p) => p.sizes[result] && p.sizes[result] !== "out").length : 0;

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setResult(recommendSize(Number(data.get("height")), data.get("usual") as Size, data.get("fit") as Fit));
  }

  return (
    <section aria-labelledby="size-title" className="mx-auto w-full max-w-[1280px] px-4 py-10 md:px-8 md:py-16">
      <div className="grid gap-8 rounded-[2px] bg-secondary p-6 md:grid-cols-12 md:gap-10 md:p-12">
        <div className="md:col-span-4">
          <h2 id="size-title" className="text-3xl font-medium md:text-4xl">Find your size in a minute</h2>
          <p className="mt-3 max-w-[36ch] text-sm text-muted-foreground">Tell us three things and we will suggest a size, then show you what is in stock in it.</p>
        </div>

        <form onSubmit={onSubmit} className="grid gap-5 md:col-span-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm font-medium">
              Height in cm
              <input name="height" type="number" inputMode="numeric" required min={140} max={200} defaultValue={165} className={field} />
            </label>
            <label className="grid gap-1.5 text-sm font-medium">
              Usual size
              <select name="usual" defaultValue="M" className={field}>
                {SIZES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </label>
          </div>

          <fieldset>
            <legend className="mb-1.5 text-sm font-medium">How do you like it to fit?</legend>
            <div className="grid grid-cols-3 gap-2">
              {FITS.map((f) => (
                <label key={f.value} className="relative">
                  <input type="radio" name="fit" value={f.value} defaultChecked={f.value === "true"} className="peer sr-only" />
                  <span className="grid min-h-11 cursor-pointer place-items-center rounded-full border border-input bg-background px-2 text-center text-sm peer-checked:border-foreground peer-checked:bg-foreground peer-checked:text-background peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-secondary">
                    {f.label}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <button type="submit" className={`inline-flex min-h-11 w-full items-center justify-center rounded-[2px] bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto ${focus}`}>
              Show my size
            </button>
            <Link href="/size-guide" className={`text-sm text-lagoon underline underline-offset-4 hover:no-underline ${focus}`}>Or open the size chart</Link>
          </div>
        </form>

        <div aria-live="polite" className="flex flex-col justify-center border-t border-foreground/10 pt-6 md:col-span-3 md:border-l md:border-t-0 md:pl-10 md:pt-0">
          {result ? (
            <>
              <p className="text-sm text-muted-foreground">We recommend</p>
              <p className="font-heading text-7xl font-medium leading-none">{result}</p>
              <Link href={`/shop?size=${result}`} className={`mt-4 text-sm text-lagoon underline underline-offset-4 hover:no-underline ${focus}`}>
                See {inStock} {inStock === 1 ? "piece" : "pieces"} in size {result}
              </Link>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Your size will show here.</p>
          )}
        </div>
      </div>
    </section>
  );
}
