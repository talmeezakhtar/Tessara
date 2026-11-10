import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/site/page-header";

export const metadata: Metadata = { title: "About · Tessara", description: "Why Tessara exists: everyday clothes for women and men that fit, delivered across the UAE." };

const focus = "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

// Structure p.17: one real photo, a short story and one link out.
export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-[1280px] px-4 pb-16 md:px-8">
      <PageHeader title="Why Tessara exists" />

      <div className="grid gap-10 md:grid-cols-12 md:gap-16">
        <figure className="md:col-span-5">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[2px] bg-sand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/about/founder.webp" alt="Tessara's founder laughing on a studio chair, in jeans and a dark shirt" className="absolute inset-0 size-full object-cover object-[40%_60%]" />
          </div>
          <figcaption className="mt-3 text-sm text-muted-foreground">Our founder, who still measures every piece herself.</figcaption>
        </figure>

        <div className="max-w-[60ch] md:col-span-7 md:pt-6">
          <div className="grid gap-5 text-base leading-relaxed">
            <p>
              Tessara started with a simple frustration: clothes that looked right online and fit wrong at home. So we keep the range small, measure every piece ourselves and say plainly how it fits.
            </p>
            <p>
              Everything, for women and men, is chosen for everyday life in the UAE: breathable fabrics for the hot months, soft layers for cool evenings, and colours that work together so a few pieces go a long way.
            </p>
            <p>
              We deliver across all seven emirates, take cash at the door, and answer on WhatsApp. If something doesn&apos;t fit, you have 14 days to exchange it and we collect it.
            </p>
          </div>
          <Link href="/new" className={`mt-8 inline-flex min-h-12 items-center rounded-[2px] bg-primary px-6 text-sm font-medium text-primary-foreground hover:opacity-90 ${focus}`}>
            Shop the collection
          </Link>
        </div>
      </div>
    </main>
  );
}
