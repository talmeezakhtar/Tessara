"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { clearBag, lineImage, lineKey, lineName, productById, totalsFor, useBag } from "@/lib/bag";
import { EXPRESS_DELIVERY_AED } from "@/lib/bag-totals";
import { PayMark } from "@/components/site/pay-mark";
import { saveOrder, type Order, type Payment, type Speed } from "@/lib/orders";
import { formatPrice } from "@/lib/products";

const EMIRATES = ["Abu Dhabi", "Dubai", "Sharjah", "Ajman", "Umm Al Quwain", "Ras Al Khaimah", "Fujairah"];

const focus = "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
const field = `h-12 w-full rounded-[2px] border border-input bg-background px-3 text-base ${focus}`;
const label = "grid gap-1.5 text-sm font-medium";
const filled = `inline-flex min-h-12 w-full items-center justify-center rounded-[2px] bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto ${focus}`;
const choice = "flex min-h-14 cursor-pointer items-center justify-between gap-3 rounded-[2px] border border-input px-4 text-sm has-checked:border-foreground has-checked:bg-secondary has-focus-visible:ring-2 has-focus-visible:ring-ring";

type Contact = Order["contact"];
type Delivery = Order["delivery"];

// Structure p.15: three steps on one page. Completed steps collapse to one line with Edit.
// Guest checkout only. DEMO: no payment is taken and nothing is sent.
export function Checkout() {
  const lines = useBag();
  const router = useRouter();
  const [step, setStep] = React.useState(1);
  const [contact, setContact] = React.useState<Contact>({ name: "", phone: "", email: "" });
  const [delivery, setDelivery] = React.useState<Delivery>({ emirate: "", area: "", address: "", speed: "standard" });
  const [payment, setPayment] = React.useState<Payment>("cod");
  const [placing, setPlacing] = React.useState(false);
  const headings = React.useRef<(HTMLHeadingElement | null)[]>([]);

  const firstRender = React.useRef(true);
  // Move focus to the step that just opened, so keyboard and screen reader users follow along.
  React.useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    headings.current[step]?.focus();
  }, [step]);
  const go = setStep;

  if (lines === null) return <div aria-busy className="min-h-[60vh]" />;
  if (lines.length === 0 && !placing) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 py-16 text-center">
        <h1 className="text-4xl font-medium">Your bag is empty</h1>
        <Link href="/new" className={filled}>Shop new in</Link>
      </div>
    );
  }

  const base = totalsFor(lines);
  const deliveryFee = delivery.speed === "express" ? EXPRESS_DELIVERY_AED : base.delivery;
  const total = base.subtotal + deliveryFee;

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setPlacing(true);
    const id = saveOrder({ lines, contact, delivery, payment, totals: { subtotal: base.subtotal, delivery: deliveryFee, total } });
    clearBag();
    router.push(`/order/${id}`);
  };

  const Step = ({ n, title, summary, children }: { n: number; title: string; summary: string; children: React.ReactNode }) => {
    const done = step > n;
    const open = step === n;
    return (
      <section aria-labelledby={`step-${n}`} className="border-b py-6">
        <div className="flex items-center gap-3">
          <span aria-hidden className={`grid size-7 shrink-0 place-items-center rounded-full text-xs font-semibold ${done ? "bg-lagoon text-pearl" : open ? "bg-foreground text-background" : "border text-muted-foreground"}`}>
            {done ? <Check className="size-3.5" /> : n}
          </span>
          <h2 id={`step-${n}`} ref={(el) => { headings.current[n] = el; }} tabIndex={-1} className={`flex-1 font-sans text-base font-semibold outline-none ${!open && !done ? "text-muted-foreground" : ""}`}>
            {title}{done && <span className="sr-only">, done</span>}
          </h2>
          {done && <button type="button" onClick={() => go(n)} className={`min-h-11 px-2 text-sm text-lagoon underline underline-offset-4 ${focus}`}>Edit<span className="sr-only"> {title.toLowerCase()}</span></button>}
        </div>
        {done && <p className="mt-2 pl-10 text-sm text-muted-foreground">{summary}</p>}
        {open && <div className="mt-5 sm:pl-10">{children}</div>}
      </section>
    );
  };

  return (
    <div className="grid gap-8 px-4 py-6 md:grid-cols-12 md:gap-12 md:px-0 md:py-10">
      <div className="md:col-span-7">
        <h1 className="text-4xl font-medium md:text-5xl">Checkout</h1>
        <p className="mt-2 inline-block rounded-[2px] bg-sand px-2 py-1 text-xs text-ink">Demo store: no payment is taken</p>

        <div className="mt-4 border-t">
          {Step({
            n: 1, title: "Contact", summary: [contact.name, contact.phone, contact.email].filter(Boolean).join(" · "),
            children: (
              <form onSubmit={(e) => { e.preventDefault(); go(2); }} className="grid gap-4">
                <label className={label}>Full name
                  <input required autoComplete="name" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} className={field} />
                </label>
                <label className={label}>Phone (for delivery updates on WhatsApp)
                  <input required type="tel" autoComplete="tel" inputMode="tel" pattern="\+?[0-9 \-]{8,20}" title="A phone number with at least 8 digits" placeholder="+971 50 123 4567" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} className={field} />
                </label>
                <label className={label}><span>Email <span className="font-normal text-muted-foreground">(optional)</span></span>
                  <input type="email" autoComplete="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} className={field} />
                </label>
                <div><button type="submit" className={filled}>Continue to delivery</button></div>
              </form>
            ),
          })}

          {Step({
            n: 2, title: "Delivery", summary: `${delivery.address}, ${delivery.area}, ${delivery.emirate} · ${delivery.speed === "express" ? "Express" : "Standard"}`,
            children: (
              <form onSubmit={(e) => { e.preventDefault(); go(3); }} className="grid gap-4">
                <label className={label}>Emirate
                  <select required value={delivery.emirate} onChange={(e) => setDelivery({ ...delivery, emirate: e.target.value })} className={field}>
                    <option value="" disabled>Choose an emirate</option>
                    {EMIRATES.map((em) => <option key={em}>{em}</option>)}
                  </select>
                </label>
                <label className={label}>Area
                  <input required autoComplete="address-level2" placeholder="e.g. Al Barsha" value={delivery.area} onChange={(e) => setDelivery({ ...delivery, area: e.target.value })} className={field} />
                </label>
                <label className={label}>Building, flat or villa
                  <input required autoComplete="street-address" value={delivery.address} onChange={(e) => setDelivery({ ...delivery, address: e.target.value })} className={field} />
                </label>
                <fieldset className="grid gap-2">
                  <legend className="mb-1.5 text-sm font-medium">Speed</legend>
                  {([["standard", "Standard · 1 to 3 days", base.delivery ? formatPrice(base.delivery) : "Free"], ["express", "Express · next day", formatPrice(EXPRESS_DELIVERY_AED)]] as [Speed, string, string][]).map(([v, text, price]) => (
                    <label key={v} className={choice}>
                      <span className="flex items-center gap-3"><input type="radio" name="speed" checked={delivery.speed === v} onChange={() => setDelivery({ ...delivery, speed: v })} className="size-4 accent-[var(--ink)]" />{text}</span>
                      <span className="font-semibold">{price}</span>
                    </label>
                  ))}
                </fieldset>
                <div><button type="submit" className={filled}>Continue to payment</button></div>
              </form>
            ),
          })}

          {Step({
            n: 3, title: "Payment", summary: "",
            children: (
              <form onSubmit={placeOrder} className="grid gap-4">
                <fieldset className="grid gap-2">
                  <legend className="sr-only">Payment method</legend>
                  {([["cod", "Cash on delivery", "Pay in cash when it arrives."], ["tabby", "Tabby", `4 payments of ${formatPrice(Math.ceil(total / 4))}.`], ["card", "Card", "Visa or Mastercard."]] as [Payment, string, string][]).map(([v, name, note]) => (
                    <label key={v} className={choice}>
                      <span className="flex items-center gap-3"><input type="radio" name="payment" checked={payment === v} onChange={() => setPayment(v)} className="size-4 accent-[var(--ink)]" />{name}
                        {v === "tabby" && <PayMark name="tabby" />}
                        {v === "card" && <><PayMark name="visa" /><PayMark name="mastercard" /></>}
                      </span>
                      <span className="text-right text-xs text-muted-foreground">{note}</span>
                    </label>
                  ))}
                </fieldset>
                {/* Card and Tabby are shown for the pitch only: no card details are ever asked for. */}
                {payment !== "cod" && <p className="text-sm text-muted-foreground">In this demo {payment === "card" ? "card payment" : "Tabby"} is not connected. Placing the order takes no payment.</p>}
                <div><button type="submit" disabled={placing} className={`${filled} disabled:opacity-60`}>Place order (demo) · {formatPrice(total)}</button></div>
              </form>
            ),
          })}
        </div>
      </div>

      <aside aria-label="Order summary" className="md:col-span-5">
        <div className="grid gap-5 rounded-[2px] bg-secondary p-5 md:sticky md:top-20 md:p-8">
          <ul className="grid gap-3">
            {lines.map((l) => {
              const p = productById(l.id);
              return (
                <li key={lineKey(l)} className="flex items-center gap-3 text-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={lineImage(l)} alt="" className="aspect-[4/5] w-12 rounded-[2px] bg-background object-contain p-1" />
                  <span className="flex-1">{lineName(l)}<span className="block text-xs text-muted-foreground">{l.size} × {l.qty}</span></span>
                  <span className="font-semibold">{formatPrice(p.price * l.qty)}</span>
                </li>
              );
            })}
          </ul>
          <dl className="grid grid-cols-[1fr_auto] gap-y-1.5 border-t border-foreground/10 pt-4 text-sm">
            <dt className="text-muted-foreground">Subtotal</dt><dd>{formatPrice(base.subtotal)}</dd>
            <dt className="text-muted-foreground">Delivery</dt><dd>{deliveryFee ? formatPrice(deliveryFee) : "Free"}</dd>
            <dt className="mt-2 font-semibold">Total</dt><dd className="mt-2 font-semibold">{formatPrice(total)}</dd>
          </dl>
          <Link href="/bag" className={`text-sm underline underline-offset-4 ${focus}`}>Edit bag</Link>
        </div>
      </aside>
    </div>
  );
}
