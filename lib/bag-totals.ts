// Pure bag maths, kept free of app imports so `npm test` can run it under plain Node.

export const FREE_DELIVERY_AED = 200;
// PLACEHOLDER: standard delivery under the free threshold. Confirm with the boutique.
export const STANDARD_DELIVERY_AED = 15;
// Express, next day, always charged (structure p.15).
export const EXPRESS_DELIVERY_AED = 25;

export type Line = { id: string; size: string; qty: number };

export function bagTotals(lines: Line[], priceOf: (id: string) => number) {
  const count = lines.reduce((n, l) => n + l.qty, 0);
  const subtotal = lines.reduce((sum, l) => sum + priceOf(l.id) * l.qty, 0);
  const free = subtotal >= FREE_DELIVERY_AED;
  const delivery = count === 0 || free ? 0 : STANDARD_DELIVERY_AED;
  return {
    count,
    subtotal,
    delivery,
    total: subtotal + delivery,
    /** AED still needed for free delivery; 0 once reached. */
    toFree: Math.max(0, FREE_DELIVERY_AED - subtotal),
    /** 0 to 1, for the progress bar. */
    progress: Math.min(1, subtotal / FREE_DELIVERY_AED),
  };
}
