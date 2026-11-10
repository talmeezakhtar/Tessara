import type { MetadataRoute } from "next";
import { LOOKS } from "@/lib/looks";
import { PRODUCTS, SHOP_CATEGORIES } from "@/lib/products";
import { SITE_URL } from "@/lib/site";

// Pages a shopper would land on from search. Bag, checkout, orders, saved and search are
// personal or empty without input, so they stay out (and robots.ts disallows them).
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/", "/new", "/shop", "/lookbook", "/size-guide", "/help", "/about", "/contact", "/legal", "/ar",
    ...SHOP_CATEGORIES.map((c) => c.href),
    ...PRODUCTS.map((p) => `/p/${p.id}`),
    ...LOOKS.map((l) => `/lookbook/${l.slug}`),
  ];
  return paths.map((path) => ({ url: `${SITE_URL}${path === "/" ? "" : path}` }));
}
