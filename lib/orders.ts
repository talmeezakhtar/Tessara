import * as React from "react";
import type { BagLine } from "./bag";

// DEMO ONLY: orders live on this device so the confirmation page has something to show.
// No payment is taken and nothing reaches the boutique. Replace with a real order API.
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
const FIRST_NUMBER = 1042;

function readAll(): Order[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** Saves the order and returns its id, e.g. "TS1042". */
export function saveOrder(order: Omit<Order, "id" | "createdAt">): string {
  const all = readAll();
  const last = all.reduce((n, o) => Math.max(n, Number(o.id.slice(2)) || 0), FIRST_NUMBER - 1);
  const id = `TS${last + 1}`;
  try { localStorage.setItem(KEY, JSON.stringify([...all, { ...order, id, createdAt: new Date().toISOString() }])); } catch { /* storage blocked */ }
  return id;
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
