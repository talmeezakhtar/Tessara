import type { Metadata } from "next";
import { PageHeader } from "@/components/site/page-header";
import { SavedView } from "@/components/wishlist/saved-view";

export const metadata: Metadata = { title: "Saved · Tessara", robots: { index: false } };

export default function WishlistPage() {
  return (
    <main className="mx-auto w-full max-w-[1280px] px-4 pb-16 md:px-8">
      <PageHeader title="Saved" />
      <SavedView />
    </main>
  );
}
