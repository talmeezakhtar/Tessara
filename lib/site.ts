// The store's WhatsApp number in international format (e.g. 971501234567), set in
// NEXT_PUBLIC_WHATSAPP_NUMBER (see .env.example). Spaces and "+" are stripped. While it is
// empty, wa.me opens WhatsApp and lets the shopper pick a chat, so nothing is sent to
// a wrong number.
export const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, "");

// Where the contact form sends messages (it opens the shopper's email app, ready to send).
export const CONTACT_EMAIL = "talmeezmzp@gmail.com";

// The live address, for share previews, the sitemap and canonical links.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export function whatsappHref(text = "Hi Tessara, I have a question.") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// UAE shoppers often give a WhatsApp number instead of an email: + optional, 8 to 15 digits,
// spaces and dashes allowed.
const PHONE = /^\+?\d{8,15}$/;

/** True when the value is an email address or a phone number. */
export function isEmailOrPhone(value: string) {
  const v = value.trim();
  return EMAIL.test(v) || PHONE.test(v.replace(/[\s-]/g, ""));
}
