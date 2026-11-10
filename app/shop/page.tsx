import type { Metadata } from "next";
import { CollectionPage } from "@/components/collection/collection-page";

export const metadata: Metadata = { title: "Shop · Tessara" };

export default function ShopPage() {
  return <CollectionPage title="Shop all" crumbs={[{ href: "/", label: "Home" }]} />;
}
