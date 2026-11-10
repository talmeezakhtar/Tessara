import type { Metadata } from "next";
import { Bestsellers } from "@/components/home/bestsellers";
import { Categories } from "@/components/home/categories";
import { Hero } from "@/components/home/hero";
import { LookbookStrip } from "@/components/home/lookbook-strip";
import { NewArrivals } from "@/components/home/new-arrivals";
import { Newsletter } from "@/components/home/newsletter";
import { Reviews } from "@/components/home/reviews";
import { ServicePromise } from "@/components/home/service-promise";
import { SizeFinder } from "@/components/home/size-finder";
import { TheEdit } from "@/components/home/the-edit";
import { TrustStrip } from "@/components/home/trust-strip";

// The Arabic page is the home page's other language, so search shows the right one.
export const metadata: Metadata = { alternates: { canonical: "/", languages: { en: "/", ar: "/ar" } } };

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustStrip />
      <Categories />
      <NewArrivals />
      <TheEdit />
      <Bestsellers />
      <SizeFinder />
      <LookbookStrip />
      <Reviews />
      <ServicePromise />
      <Newsletter />
    </main>
  );
}
