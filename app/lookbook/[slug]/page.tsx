import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddLook } from "@/components/lookbook/add-look";
import { LookFigure } from "@/components/lookbook/look-figure";
import { ProductCard } from "@/components/product-card";
import { PageHeader } from "@/components/site/page-header";
import { productById } from "@/lib/bag";
import { LOOKS, lookBySlug } from "@/lib/looks";
import { formatPrice } from "@/lib/products";

export function generateStaticParams() {
  return LOOKS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata(props: PageProps<"/lookbook/[slug]">): Promise<Metadata> {
  const look = lookBySlug((await props.params).slug);
  return look ? { title: `${look.title} · Lookbook · Tessara`, description: look.line } : {};
}

// Reading params sits inside <Suspense> so navigations show the shell at once (Next 16).
export default function LookPage(props: PageProps<"/lookbook/[slug]">) {
  return (
    <Suspense fallback={<main className="mx-auto min-h-[80vh] w-full max-w-[1280px] px-4 md:px-8" />}>
      <LookDetail params={props.params} />
    </Suspense>
  );
}

const focus = "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

// Structure p.16: a large photo with a point on each piece, the pieces below, Add all to bag.
async function LookDetail({ params }: { params: PageProps<"/lookbook/[slug]">["params"] }) {
  const slug = (await params).slug;
  const look = lookBySlug(slug);
  if (!look) notFound();
  const i = LOOKS.indexOf(look);
  const pieces = look.spots.map((s) => productById(s.id));
  const total = pieces.reduce((n, p) => n + p.price, 0);
  const next = LOOKS[(i + 1) % LOOKS.length]!;

  return (
    <main className="mx-auto w-full max-w-[1280px] px-4 pb-16 md:px-8">
      <PageHeader title={look.title} intro={look.line} crumbs={[{ href: "/", label: "Home" }, { href: "/lookbook", label: "Lookbook" }]} />

      <div className="grid gap-10 md:grid-cols-12">
        <LookFigure look={look} className="aspect-[4/5] md:col-span-7" />

        <div className="md:col-span-5 md:pt-4">
          <p className="font-mono text-xs text-muted-foreground">Look {String(i + 1).padStart(2, "0")} / {String(LOOKS.length).padStart(2, "0")}</p>
          <p className="mt-2 text-2xl font-semibold">{formatPrice(total)} <span className="text-sm font-normal text-muted-foreground">for {pieces.length} pieces</span></p>
          <div className="mt-6"><AddLook ids={look.spots.map((s) => s.id)} /></div>

          <ul className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8">
            {pieces.map((p) => <li key={p.id}><ProductCard product={p} /></li>)}
          </ul>

          <Link href={`/lookbook/${next.slug}`} className={`mt-10 inline-block text-sm text-lagoon underline underline-offset-4 hover:no-underline ${focus}`}>
            Next look: {next.title} →
          </Link>
        </div>
      </div>
    </main>
  );
}
