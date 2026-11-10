import * as React from "react";
import type { BagLine } from "./bag";

// Orders reach the store as a WhatsApp message the shopper sends (orderMessage); a copy stays
// on this device for the confirmation page. ponytail: no order database; add a server
// order API when volume makes WhatsApp hard to track.
export type Payment = "card" | "tabby" | "cod";
export type Speed = "standard" | "express";

export interface Order {
  id: string;
  createdAt: string;
  lines: BagLine[];
  contact: { name: string; phone: string; email: string };
  delivery: { emirate: string; area: string; address: string; speed: Speed };
  payment: Payment;
  totals: { subtotal: number; delivery: number; total: number };
}

const KEY = "tessara-orders";
const PAY_NAME: Record<Payment, string> = { cod: "Cash on delivery", tabby: "Tabby (send me a payment link)", card: "Card (send me a payment link)" };

/** One line per piece, already named and priced by the caller. */
export type MessageLine = { name: string; size: string; qty: number; price: number };

/** The WhatsApp message that places the order with the store. */
export function orderMessage(order: Omit<Order, "lines" | "createdAt">, lines: MessageLine[]) {
  const aed = (n: number) => `AED ${n}`;
  const { contact: c, delivery: d, totals: t } = order;
  return [
    `New order ${order.id}`,
    "",
    ...lines.map((l) => `• ${l.name}, size ${l.size} × ${l.qty} = ${aed(l.price * l.qty)}`),
    "",
    `Subtotal ${aed(t.subtotal)}`,
    `Delivery (${d.speed}) ${t.delivery ? aed(t.delivery) : "free"}`,
    `Total ${aed(t.total)}`,
    `Payment: ${PAY_NAME[order.payment]}`,
    "",
    `Name: ${c.name}`,
    `Phone: ${c.phone}`,
    ...(c.email ? [`Email: ${c.email}`] : []),
    `Address: ${d.address}, ${d.area}, ${d.emirate}`,
  ].join("\n");
}

/** A short id that won't clash between shoppers, e.g. "TS-K3F9Q2". */
export function newOrderId(now = Date.now(), rand = Math.random()) {
  const time = now.toString(36).slice(-4);
  const tail = Math.floor(rand * 36 * 36).toString(36).padStart(2, "0");
  return `TS-${time}${tail}`.toUpperCase();
}

function readAll(): Order[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** Keeps a copy of the order on this device for the confirmation page. */
export function saveOrder(order: Omit<Order, "createdAt">) {
  try { localStorage.setItem(KEY, JSON.stringify([...readAll(), { ...order, createdAt: new Date().toISOString() }])); } catch { /* storage blocked */ }
}

const noop = () => () => {};
const rawOrders = () => { try { return localStorage.getItem(KEY); } catch { return null; } };

/** The order with this id; undefined while reading, null when not found on this device. */
export function useOrder(id: string): Order | null | undefined {
  const raw = React.useSyncExternalStore(noop, rawOrders, () => undefined);
  return React.useMemo(() => {
    if (raw === undefined) return undefined;
    try { return (JSON.parse(raw ?? "[]") as Order[]).find((o) => o.id === id) ?? null; } catch { return null; }
  }, [raw, id]);
}
