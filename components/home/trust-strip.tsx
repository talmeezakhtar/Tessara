import { Banknote, MessageCircle, RefreshCw, Truck } from "lucide-react";

// Section 4: four promises in one line. Phones drop WhatsApp (the floating button covers it)
// and use the short labels so all three still fit on one line.
const PROMISES = [
  { Icon: Truck, label: "Delivery in 1 to 3 days", short: "1 to 3 days" },
  { Icon: Banknote, label: "Cash on delivery", short: "COD" },
  { Icon: RefreshCw, label: "14-day exchange", short: "14-day exchange" },
  { Icon: MessageCircle, label: "WhatsApp support", short: null },
];

export function TrustStrip() {
  return (
    <section aria-label="Our promises" className="border-b">
      <ul className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 py-4 text-xs sm:text-sm md:justify-around md:px-8 md:py-5">
        {PROMISES.map(({ Icon, label, short }) => (
          <li key={label} className={`items-center gap-2 ${short ? "flex" : "hidden md:flex"}`}>
            <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden />
            <span className="md:hidden">{short}</span>
            <span className="hidden md:inline">{label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
