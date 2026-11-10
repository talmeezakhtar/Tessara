import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchView } from "@/components/search/search-view";
import { PageHeader } from "@/components/site/page-header";

export const metadata: Metadata = { title: "Search · Tessara", robots: { index: false } };

export default function SearchPage() {
  return (
    <main className="mx-auto w-full max-w-[1280px] px-4 pb-16 md:px-8">
      <PageHeader title="Search" />
      {/* The query lives in the URL (?q=), so the results sit in Suspense. */}
      <Suspense fallback={<div className="min-h-[40vh]" />}>
        <SearchView />
      </Suspense>
    </main>
  );
}
