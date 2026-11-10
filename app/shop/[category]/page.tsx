import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CATEGORIES, CollectionPage } from "@/components/collection/collection-page";
import { PRODUCTS } from "@/lib/products";

export function generateStaticParams() {
  return Object.keys(CATEGORIES).map((category) => ({ category }));
}

export async function generateMetadata(props: PageProps<"/shop/[category]">): Promise<Metadata> {
  const cat = CATEGORIES[(await props.params).category];
  return cat ? { title: `${cat.title} · Tessara` } : {};
}

export default function CategoryPage(props: PageProps<"/shop/[category]">) {
  return (
    <Suspense fallback={<main className="mx-auto min-h-[80vh] w-full max-w-[1280px] px-4 md:px-8" />}>
      <Category params={props.params} />
    </Suspense>
  );
}

async function Category({ params }: { params: PageProps<"/shop/[category]">["params"] }) {
  const cat = CATEGORIES[(await params).category];
  if (!cat) notFound();
  return (
    <CollectionPage
      title={cat.title}
      crumbs={[{ href: "/", label: "Home" }, { href: "/shop", label: "Shop" }]}
      products={PRODUCTS.filter(cat.match)}
    />
  );
}
