import * as React from "react";
import { bagTotals } from "./bag-totals";
import { colourOf } from "./collection";
import { PRODUCTS, formatPrice, type Product, type Size } from "./products";

// Bag kept on this device (localStorage), like the wishlist in structure p.16.
// ponytail: no server cart; add one with a real order API.
/** `colour` is set when the piece was bought in one of its other colourways. */
export type BagLine = { id: string; size: Size; qty: number; colour?: string };

const KEY = "tessara-bag";
const MAX_QTY = 9;
const EMPTY: BagLine[] = [];
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

// Cache by raw string so the snapshot keeps the same reference until the bag changes
// (useSyncExternalStore needs that).
let lastRaw: string | null = null;
let lastLines: BagLine[] = EMPTY;

function readLines(): BagLine[] {
  let raw: string | null = null;
  try { raw = localStorage.getItem(KEY); } catch { /* storage blocked */ }
  if (raw === lastRaw) return lastLines;
  lastRaw = raw;
  try {
    const parsed = JSON.parse(raw ?? "[]");
    // Drop lines for pieces no longer in the catalogue.
    lastLines = Array.isArray(parsed) ? parsed.filter((l) => PRODUCTS.some((p) => p.id === l?.id) && l.qty > 0) : EMPTY;
  } catch {
    lastLines = EMPTY;
  }
  return lastLines;
}

function write(lines: BagLine[]) {
  try { localStorage.setItem(KEY, JSON.stringify(lines)); } catch { /* storage blocked */ }
  emit();
}

const same = (l: BagLine, id: string, size: Size, colour?: string) => l.id === id && l.size === size && l.colour === colour;

export function addToBag(id: string, size: Size, colour?: string) {
  const lines = readLines().map((l) => ({ ...l }));
  const line = lines.find((l) => same(l, id, size, colour));
  if (line) line.qty = Math.min(MAX_QTY, line.qty + 1);
  else lines.push(colour ? { id, size, qty: 1, colour } : { id, size, qty: 1 });
  write(lines);
}

export function setQty(line: BagLine, qty: number) {
  const next = Math.max(0, Math.min(MAX_QTY, qty));
  write(readLines().flatMap((l) => (same(l, line.id, line.size, line.colour) ? (next ? [{ ...l, qty: next }] : []) : [l])));
}

export const removeLine = (line: BagLine) => setQty(line, 0);
export const lineKey = (l: BagLine) => `${l.id}-${l.size}-${l.colour ?? ""}`;

export const clearBag = () => write([]);

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb); // other tabs
  return () => { listeners.delete(cb); window.removeEventListener("storage", cb); };
}

/** Bag lines, or null during server render and hydration (unknown until we read storage). */
export function useBag(): BagLine[] | null {
  return React.useSyncExternalStore(subscribe, readLines, () => null);
}

/** Number of pieces in the bag; 0 during server render. */
export function useBagCount() {
  return React.useSyncExternalStore(subscribe, () => readLines().reduce((n, l) => n + l.qty, 0), () => 0);
}

export const productById = (id: string) => PRODUCTS.find((p) => p.id === id) as Product;
export const totalsFor = (lines: BagLine[]) => bagTotals(lines, (id) => productById(id).price);

/** The entry holding the photos for this line: the piece itself, or its chosen colourway. */
const photoSource = (l: BagLine) => {
  const p = productById(l.id);
  if (!l.colour) return p;
  return [p, ...(p.colourways ?? []).map(productById)].find((x) => x && colourOf(x) === l.colour) ?? p;
};
/** "Heavyweight tee · Black" for a colourway line, the piece's own name otherwise. */
export const lineName = (l: BagLine) => (l.colour ? `${productById(l.id).name.split(" · ")[0]} · ${l.colour}` : productById(l.id).name);
export const lineColour = (l: BagLine) => l.colour ?? colourOf(productById(l.id));
export const lineImage = (l: BagLine) => photoSource(l).image;

/** WhatsApp order text listing every line. */
export function bagMessage(lines: BagLine[]) {
  const t = totalsFor(lines);
  const items = lines.map((l) => `• ${lineName(l)}, size ${l.size} × ${l.qty} (${formatPrice(productById(l.id).price * l.qty)})`);
  return ["Hi Tessara, I'd like to order:", ...items, `Subtotal ${formatPrice(t.subtotal)}`].join("\n");
}

// Cart drawer open state, shared by Add to bag and the drawer itself.
let drawerOpen = false;
const drawerListeners = new Set<() => void>();
export function setBagDrawer(open: boolean) {
  drawerOpen = open;
  drawerListeners.forEach((l) => l());
}
export function useBagDrawer() {
  return React.useSyncExternalStore(
    (cb) => { drawerListeners.add(cb); return () => drawerListeners.delete(cb); },
    () => drawerOpen,
    () => false,
  );
}
