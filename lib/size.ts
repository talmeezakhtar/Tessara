import type { Size } from "./products";

export const SIZES: Size[] = ["XS", "S", "M", "L", "XL"];
export type Fit = "relaxed" | "true" | "fitted";

const FIT_SHIFT: Record<Fit, number> = { relaxed: 1, true: 0, fitted: -1 };
export const TALL_CM = 178;

/**
 * Size to buy, from the shopper's usual size, how they like things to fit, and height.
 * ponytail: naive heuristic (fit shifts one size, tall adds one for length unless they want
 * it fitted). Replace with per-garment measurements from the size chart when those exist.
 */
export function recommendSize(heightCm: number, usual: Size, fit: Fit): Size {
  let i = SIZES.indexOf(usual) + FIT_SHIFT[fit];
  if (heightCm >= TALL_CM && fit !== "fitted") i += 1;
  return SIZES[Math.max(0, Math.min(SIZES.length - 1, i))]!;
}
