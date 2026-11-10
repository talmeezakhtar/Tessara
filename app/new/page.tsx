import type { Metadata } from "next";
import { CollectionPage } from "@/components/collection/collection-page";

export const metadata: Metadata = { title: "New in · Tessara" };

// ponytail: the demo catalogue is one new season, so New in shows every piece, newest first.
export default function NewPage() {
  return <CollectionPage title="New in" crumbs={[{ href: "/", label: "Home" }]} />;
}
