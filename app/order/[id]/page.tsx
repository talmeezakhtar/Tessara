import type { Metadata } from "next";
import { Suspense } from "react";
import { OrderView } from "@/components/checkout/order-view";

export const metadata: Metadata = { title: "Your order · Tessara", robots: { index: false } };

// The order copy lives on the shopper's device, so the client reads the id and the order.
export default function OrderPage() {
  return (
    <main className="w-full">
      <Suspense fallback={<div aria-busy className="min-h-[60vh]" />}>
        <OrderView />
      </Suspense>
    </main>
  );
}
