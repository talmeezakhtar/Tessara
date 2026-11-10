import type { Metadata } from "next";
import { BagView } from "@/components/bag/bag-view";

export const metadata: Metadata = { title: "Your bag · Tessara" };

export default function BagPage() {
  return (
    <main className="mx-auto w-full max-w-[1280px] md:px-8">
      <BagView />
    </main>
  );
}
