"use client";

import * as React from "react";
import Link from "next/link";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useBagCount } from "@/lib/bag";
import { SHOP_CATEGORIES } from "@/lib/products";

// New in, the categories in stock (from the catalogue), then the lookbook.
const NAV = [
  { href: "/new", label: "New in" },
  ...SHOP_CATEGORIES.map((c) => ({ href: c.href, label: c.label })),
  { href: "/lookbook", label: "Lookbook" },
];

const focus = "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

function Logo({ compact }: { compact?: boolean }) {
  return (
    <Link href="/" aria-label="Tessara, home" className={`font-heading font-semibold uppercase tracking-[0.42em] transition-[font-size] duration-200 motion-reduce:transition-none ${compact ? "text-lg" : "text-xl md:text-2xl"} ${focus}`}>
      Tessara
    </Link>
  );
}

export function SiteHeader() {
  const [offer, setOffer] = React.useState(true);
  const [compact, setCompact] = React.useState(false);
  const menu = React.useRef<HTMLDialogElement>(null);
  const bagCount = useBagCount();

  React.useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {offer && (
        <div className="relative flex min-h-9 items-center justify-center bg-secondary px-11 py-2 text-center text-xs text-secondary-foreground">
          <p>
            Free delivery over AED 200<span className="hidden sm:inline"> across the UAE · Cash on delivery</span>
          </p>
          <button type="button" onClick={() => setOffer(false)} aria-label="Dismiss offer" className={`absolute right-1 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-[2px] text-secondary-foreground/70 hover:text-secondary-foreground ${focus}`}>
            <X className="size-3.5" aria-hidden />
          </button>
        </div>
      )}

      <header className={`sticky top-0 z-40 border-b bg-background/95 backdrop-blur transition-[height] duration-200 motion-reduce:transition-none ${compact ? "h-12" : "h-16"}`}>
        <div className="mx-auto grid h-full max-w-[1280px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 md:px-8 lg:grid-cols-[auto_1fr_auto]">
          {/* Phone: menu button left, logo centred, bag right. */}
          <button type="button" onClick={() => menu.current?.showModal()} className={`-ml-2 inline-flex min-h-11 items-center gap-2 justify-self-start rounded-[2px] px-2 text-sm lg:hidden ${focus}`}>
            <Menu className="size-5" aria-hidden />
            Menu
          </button>

          <Logo compact={compact} />

          <nav aria-label="Main" className="hidden justify-center lg:flex">
            <ul className="flex gap-6 text-sm xl:gap-8">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={`py-2 underline-offset-8 hover:underline ${focus}`}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center justify-self-end gap-1 text-sm">
            <Link href="/search" className={`hidden min-h-11 items-center gap-1.5 rounded-[2px] px-2 hover:text-foreground/70 lg:inline-flex ${focus}`}>
              <Search className="size-4" aria-hidden />Search
            </Link>
            <Link href="/ar" hrefLang="ar" lang="ar" aria-label="العربية" className={`hidden min-h-11 items-center rounded-[2px] px-2 hover:text-foreground/70 lg:inline-flex ${focus}`}>
              <span lang="en">EN</span>&nbsp;/&nbsp;عربي
            </Link>
            <Link href="/wishlist" className={`hidden min-h-11 items-center gap-1.5 rounded-[2px] px-2 hover:text-foreground/70 lg:inline-flex ${focus}`}>
              <Heart className="size-4" aria-hidden />Saved
            </Link>
            <Link href="/bag" aria-label={`Bag, ${bagCount} ${bagCount === 1 ? "item" : "items"}`} className={`-mr-2 inline-flex min-h-11 items-center gap-1.5 rounded-[2px] px-2 hover:text-foreground/70 ${focus}`}>
              <ShoppingBag className="size-4" aria-hidden />
              <span aria-hidden>Bag</span>
              {bagCount > 0 && <span aria-hidden className="grid size-5 place-items-center rounded-full bg-accent text-[11px] font-semibold text-accent-foreground">{bagCount}</span>}
            </Link>
          </div>
        </div>
      </header>

      {/* Phone menu: a plain full-screen list (structure p.14). Native dialog handles Escape and focus. */}
      <dialog
        ref={menu}
        aria-label="Menu"
        onClick={(e) => { if (e.target === e.currentTarget) e.currentTarget.close(); }}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-background p-0 text-foreground backdrop:bg-foreground/40"
      >
        <div className="flex h-full flex-col px-4">
          <div className="flex h-16 items-center justify-between">
            <span className="font-heading text-xl font-semibold uppercase tracking-[0.42em]">Tessara</span>
            <button type="button" autoFocus onClick={() => menu.current?.close()} className={`-mr-2 inline-flex min-h-11 items-center gap-2 rounded-[2px] px-2 text-sm ${focus}`}>
              Close<X className="size-4" aria-hidden />
            </button>
          </div>
          <nav aria-label="Main">
            <ul className="divide-y border-y">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={() => menu.current?.close()} className={`flex min-h-14 items-center font-heading text-2xl ${focus}`}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="mt-6 flex flex-col text-sm">
            {[
              { href: "/search", label: "Search", Icon: Search },
              { href: "/wishlist", label: "Saved", Icon: Heart },
            ].map(({ href, label, Icon }) => (
              <li key={href}>
                <Link href={href} onClick={() => menu.current?.close()} className={`flex min-h-11 items-center gap-2 ${focus}`}><Icon className="size-4" aria-hidden />{label}</Link>
              </li>
            ))}
            <li>
              <Link href="/ar" hrefLang="ar" lang="ar" onClick={() => menu.current?.close()} className={`flex min-h-11 items-center ${focus}`}>عربي</Link>
            </li>
          </ul>
        </div>
      </dialog>
    </>
  );
}
