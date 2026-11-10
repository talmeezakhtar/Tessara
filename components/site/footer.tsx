import { PayMark } from "@/components/site/pay-mark";
import DoodleCrewFooter, { type CrewMember, type FooterColumn } from "@/components/ui/doodle-crew-footer";
import { sans, serif } from "@/lib/fonts";
import { SHOP_CATEGORIES } from "@/lib/products";
import { whatsappHref } from "@/lib/site";

// Site footer (structure p.10, section 14): the doodle-crew look, filled with Tessara's
// links and copy. WhatsApp is the main contact route, so it is the one filled button.

const COLUMNS: FooterColumn[] = [
  { title: "Shop", links: [{ label: "New in", href: "/new" }, ...SHOP_CATEGORIES.map((c) => ({ label: c.label, href: c.href })), { label: "Lookbook", href: "/lookbook" }] },
  { title: "Help", links: [{ label: "Size guide", href: "/size-guide" }, { label: "Delivery", href: "/help#delivery" }, { label: "Returns and exchanges", href: "/help#returns" }, { label: "FAQ", href: "/help#faq" }] },
  { title: "Company", links: [{ label: "About", href: "/about" }, { label: "Contact", href: "/contact" }, { label: "Your bag", href: "/bag" }] },
];

// The crew lives on T-E-S-S-A-R-A (letters 0 to 6). Their lines are about the store.
const CREW: CrewMember[] = [
  { kind: "yeti", letter: 0, seat: "front", offset: -0.32, name: "Bruno", says: "Free delivery over AED 200!" },
  { kind: "bird", letter: 1, seat: "top", offset: 0.02, name: "Pip", says: "Message us on WhatsApp." },
  { kind: "mushroom", letter: 2, seat: "front", offset: 0.12, scale: 0.95, name: "Morel", says: "Cash on delivery, no stress." },
  { kind: "kid", letter: 3, seat: "top", offset: -0.05, name: "Juno", says: "Not sure of your size? Ask me!" },
  { kind: "ghost", letter: 5, seat: "behind", offset: 0, name: "Boo", says: "Boo! 14-day exchanges." },
  { kind: "cat", letter: 6, seat: "front", offset: 0.42, flip: true, name: "Patch", says: "New pieces every season." },
];

export function SiteFooter() {
  return (
    <DoodleCrewFooter
      wordmark="TESSARA"
      brand="tessara"
      blurb="Everyday clothing for women and men, delivered across the UAE in 1 to 3 days. Pay in cash at the door."
      tagline="New pieces every season, brought to your door anywhere in the UAE."
      columns={COLUMNS}
      actions={[
        { label: "Shop new in", href: "/new", icon: "sparkle", variant: "outline" },
        { label: "Chat on WhatsApp", href: whatsappHref(), icon: "heart", variant: "solid" },
      ]}
      // Ways to pay: cash at the door, or card and Tabby by a link sent on WhatsApp.
      copyright={
        <span className="inline-flex flex-wrap items-center gap-x-3 gap-y-2">
          © Tessara
          <span className="inline-flex items-center gap-1.5">
            <PayMark name="visa" /><PayMark name="mastercard" /><PayMark name="tabby" />
            <span>· Cash on delivery</span>
          </span>
        </span>
      }
      legal={[{ label: "Privacy and terms", href: "/legal" }, { label: "EN / عربي", href: "/ar" }]}
      // ponytail: plain labels until the boutique has social handles to link.
      socials={[{ label: "Instagram" }, { label: "TikTok" }]}
      crew={CREW}
      doodles={["sparkle", "heart", "star", "spiral", "plane", "sparkle", "heart", "star"]}
      doodleCount={10}
      palette={{ background: "var(--pearl)", ink: "var(--ink)", accent: "var(--lagoon)" }}
      fontFamily={sans.style.fontFamily}
      serifFamily={serif.style.fontFamily}
      height="640px"
      className="border-t"
    />
  );
}
