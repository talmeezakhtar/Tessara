"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Check, MessageCircle } from "lucide-react";
import { lineImage, lineKey, lineName, productById } from "@/lib/bag";
import { useOrder, type Payment } from "@/lib/orders";
import { formatPrice } from "@/lib/products";
import { whatsappHref } from "@/lib/site";

const focus = "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
const PAY: Record<Payment, string> = { cod: "Cash on delivery", tabby: "Tabby", card: "Card" };

// Structure p.15: says what happens next in plain steps and offers tracking on WhatsApp.
export function OrderView() {
  const { id } = useParams<{ id: string }>();
  const order = useOrder(id);

  if (order === undefined) return <div aria-busy className="min-h-[60vh]" />;
  if (order === null) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 py-16 text-center">
        <h1 className="text-4xl font-medium">We can&apos;t find that order</h1>
        <p className="max-w-[40ch] text-sm text-muted-foreground">Demo orders are kept on the device they were placed on. Ask us on WhatsApp if you need help.</p>
        <Link href="/" className={`text-sm text-lagoon underline underline-offset-4 ${focus}`}>Go to the shop</Link>
      </div>
    );
  }

  const express = order.delivery.speed === "express";
  const next = [
    "We confirm your order on WhatsApp, usually within the hour.",
    `It arrives at ${order.delivery.area}, ${order.delivery.emirate} ${express ? "tomorrow" : "in 1 to 3 days"}.`,
    order.payment === "cod" ? `You pay ${formatPrice(order.totals.total)} in cash at the door.` : "Exchanges are free for 14 days if anything doesn't fit.",
  ];

  return (
    <div className="mx-auto grid max-w-2xl gap-8 px-4 py-10 md:py-16">
      <div className="text-center">
        <span aria-hidden className="mx-auto grid size-14 place-items-center rounded-full bg-lagoon text-pearl"><Check className="size-6" /></span>
        <h1 className="mt-5 text-4xl font-medium md:text-5xl">Order received</h1>
        <p className="mt-2 text-sm text-muted-foreground">Order <span className="font-mono font-semibold text-foreground">{order.id}</span> · Demo only, no payment was taken</p>
      </div>

      <section aria-labelledby="next-title" className="rounded-[2px] bg-secondary p-5 md:p-8">
        <h2 id="next-title" className="text-2xl font-medium">What happens next</h2>
        <ol className="mt-4 grid gap-3">
          {next.map((t, i) => (
            <li key={t} className="flex gap-3 text-sm">
              <span aria-hidden className="grid size-6 shrink-0 place-items-center rounded-full bg-background font-mono text-xs">{i + 1}</span>
              <span className="pt-0.5">{t}</span>
            </li>
          ))}
        </ol>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <a href={whatsappHref(`Hi Tessara, can I track order ${order.id}?`)} target="_blank" rel="noopener noreferrer" className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-[2px] bg-lagoon px-6 text-sm font-medium text-pearl transition-opacity hover:opacity-90 ${focus}`}>
            <MessageCircle className="size-4" aria-hidden />Track on WhatsApp
          </a>
          <Link href="/new" className={`inline-flex min-h-12 items-center justify-center rounded-[2px] border border-foreground px-6 text-sm font-medium transition-colors hover:bg-foreground hover:text-background ${focus}`}>
            Keep shopping
          </Link>
        </div>
      </section>

      <section aria-labelledby="summary-title">
        <h2 id="summary-title" className="font-sans text-sm font-semibold">Order summary</h2>
        <ul className="mt-3 divide-y border-y">
          {order.lines.map((l) => {
            const p = productById(l.id);
            return (
              <li key={lineKey(l)} className="flex items-center gap-3 py-3 text-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={lineImage(l)} alt="" className="aspect-[4/5] w-12 rounded-[2px] bg-secondary object-contain p-1" />
                <span className="flex-1">{lineName(l)}<span className="block text-xs text-muted-foreground">{l.size} × {l.qty}</span></span>
                <span className="font-semibold">{formatPrice(p.price * l.qty)}</span>
              </li>
            );
          })}
        </ul>
        <dl className="mt-4 grid grid-cols-[1fr_auto] gap-y-1.5 text-sm">
          <dt className="text-muted-foreground">Subtotal</dt><dd>{formatPrice(order.totals.subtotal)}</dd>
          <dt className="text-muted-foreground">Delivery ({express ? "express" : "standard"})</dt><dd>{order.totals.delivery ? formatPrice(order.totals.delivery) : "Free"}</dd>
          <dt className="mt-2 font-semibold">Total</dt><dd className="mt-2 font-semibold">{formatPrice(order.totals.total)}</dd>
          <dt className="mt-4 text-muted-foreground">Delivering to</dt><dd className="mt-4 text-right">{order.contact.name}<br />{order.delivery.address}, {order.delivery.area}, {order.delivery.emirate}</dd>
          <dt className="text-muted-foreground">Payment</dt><dd>{PAY[order.payment]}</dd>
        </dl>
      </section>
    </div>
  );
}
