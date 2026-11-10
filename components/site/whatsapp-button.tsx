"use client";

import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { whatsappHref } from "@/lib/site";

// Phones only: replaces the footer button and stays in the corner on every page,
// except product and bag pages, where the pinned bar already leads with WhatsApp.
export function WhatsAppButton() {
  const path = usePathname();
  if (path.startsWith("/p/") || path === "/bag") return null;
  return (
    <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="fixed bottom-4 right-4 z-30 grid size-14 place-items-center rounded-full bg-lagoon text-pearl shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:hidden">
      <MessageCircle className="size-6" aria-hidden />
    </a>
  );
}
