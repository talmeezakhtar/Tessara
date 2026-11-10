import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/bag", "/checkout", "/order/", "/wishlist", "/search"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
