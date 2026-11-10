// Product search for /search. Pure, so `npm test` can run it under Node.
import type { Product } from "./products";

const norm = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "");

/**
 * Pieces matching every word of the query, in name, category, colour, description or
 * details. Name matches rank first. A blank query matches nothing.
 */
export function searchProducts(products: Product[], query: string): Product[] {
  const words = norm(query).split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  const hay = (p: Product) => norm([p.name, p.category, p.description, ...p.details].join(" "));
  return products
    .filter((p) => words.every((w) => hay(p).includes(w)))
    .sort((a, b) => Number(words.every((w) => norm(b.name).includes(w))) - Number(words.every((w) => norm(a.name).includes(w))));
}
