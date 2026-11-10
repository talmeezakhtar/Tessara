// Card and Tabby logos, each on a small white chip so they read on any background.
const MARKS = {
  visa: { src: "/pay/visa.png", label: "Visa" },
  mastercard: { src: "/pay/mastercard.png", label: "Mastercard" },
  tabby: { src: "/pay/tabby.png", label: "Tabby" },
};

export function PayMark({ name, className = "h-6" }: { name: keyof typeof MARKS; className?: string }) {
  const m = MARKS[name];
  return (
    <span className={`inline-flex items-center rounded-[3px] border border-foreground/10 bg-white ${name === "tabby" ? "" : "px-1.5 py-0.5"} ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={m.src} alt={m.label} className="h-full w-auto" />
    </span>
  );
}
