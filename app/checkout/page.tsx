import type { Metadata } from "next";
import { Checkout } from "@/components/checkout/checkout";

export const metadata: Metadata = { title: "Checkout · Tessara", robots: { index: false } };

export default function CheckoutPage() {
  return (
    <main className="mx-auto w-full max-w-[1280px] md:px-8">
      <Checkout />
    </main>
  );
}
