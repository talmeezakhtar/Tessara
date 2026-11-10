import * as React from "react";

// Saved items (the wishlist, structure p.16), kept on this device like the bag.
const KEY = "tessara-saved";
const listeners = new Set<() => void>();

const raw = () => {
  try { return localStorage.getItem(KEY) ?? "[]"; } catch { return "[]"; }
};

function ids(): string[] {
  try {
    const parsed = JSON.parse(raw());
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function setSaved(id: string, saved: boolean) {
  const next = ids().filter((x) => x !== id);
  if (saved) next.push(id);
  try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* storage blocked */ }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => { listeners.delete(cb); window.removeEventListener("storage", cb); };
}

/** Whether this piece is saved; false during server render. */
export function useSaved(id: string) {
  return React.useSyncExternalStore(subscribe, () => ids().includes(id), () => false);
}

const rawSnapshot = () => raw();

/** Saved piece ids, newest first; null during server render. */
export function useSavedIds(): string[] | null {
  const r = React.useSyncExternalStore(subscribe, rawSnapshot, () => null);
  return React.useMemo(() => {
    if (r === null) return null;
    try {
      const parsed = JSON.parse(r);
      return Array.isArray(parsed) ? [...parsed].reverse() : [];
    } catch {
      return [];
    }
  }, [r]);
}
