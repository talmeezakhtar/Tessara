// Collection filtering and sorting (structure p.12). Pure, so `npm test` can run it under Node.
// Filter state lives in the URL (?size=M&colour=Sky&price=200-250&stock=1&sort=price-asc)
// so a filtered view can be shared as a link.
import type { Product, Size } from "./products";

export const SIZE_ORDER: Size[] = ["XS", "S", "M", "L", "XL"];
export const PRICE_BANDS = [
  { id: "0-200", label: "Under AED 200", min: 0, max: 199 },
  { id: "200-250", label: "AED 200 to 250", min: 200, max: 250 },
  { id: "251-300", label: "AED 251 to 300", min: 251, max: 300 },
  { id: "301-", label: "Over AED 300", min: 301, max: Infinity },
] as const;
export const SORTS = [
  { id: "newest", label: "Newest" },
  { id: "price-asc", label: "Price, low to high" },
  { id: "price-desc", label: "Price, high to low" },
] as const;
export type SortId = (typeof SORTS)[number]["id"];

export interface Filters {
  sizes: Size[];
  colours: string[];
  prices: string[];
  inStock: boolean;
  sort: SortId;
}

/** "Oxford shirt · Sky" → "Sky"; pieces without a colour in the name return null. */
export const colourOf = (p: Pick<Product, "name">) => p.name.split(" · ")[1] ?? null;

type Params = { getAll(k: string): string[]; get(k: string): string | null };

export function parseFilters(q: Params): Filters {
  const sort = q.get("sort");
  return {
    sizes: q.getAll("size").filter((s): s is Size => (SIZE_ORDER as string[]).includes(s)),
    colours: q.getAll("colour"),
    prices: q.getAll("price").filter((id) => PRICE_BANDS.some((b) => b.id === id)),
    inStock: q.get("stock") === "1",
    sort: SORTS.some((s) => s.id === sort) ? (sort as SortId) : "newest",
  };
}

export function toQuery(f: Filters): string {
  const q = new URLSearchParams();
  f.sizes.forEach((s) => q.append("size", s));
  f.colours.forEach((c) => q.append("colour", c));
  f.prices.forEach((p) => q.append("price", p));
  if (f.inStock) q.set("stock", "1");
  if (f.sort !== "newest") q.set("sort", f.sort);
  const s = q.toString();
  return s ? `?${s}` : "";
}

const available = (p: Product, s: Size) => p.sizes[s] !== undefined && p.sizes[s] !== "out";

export function applyFilters(products: Product[], f: Filters): Product[] {
  const out = products.filter((p) => {
    // A size filter means "available in one of these sizes".
    if (f.sizes.length && !f.sizes.some((s) => available(p, s))) return false;
    if (f.inStock && !SIZE_ORDER.some((s) => available(p, s))) return false;
    if (f.colours.length && !f.colours.includes(colourOf(p) ?? "")) return false;
    if (f.prices.length && !f.prices.some((id) => {
      const b = PRICE_BANDS.find((x) => x.id === id)!;
      return p.price >= b.min && p.price <= b.max;
    })) return false;
    return true;
  });
  // "Newest" keeps catalogue order, which is newest first.
  if (f.sort === "price-asc") out.sort((a, b) => a.price - b.price);
  if (f.sort === "price-desc") out.sort((a, b) => b.price - a.price);
  return out;
}

export const activeCount = (f: Filters) => f.sizes.length + f.colours.length + f.prices.length + (f.inStock ? 1 : 0);
