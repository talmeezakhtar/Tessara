import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { arHeading, arText } from "@/lib/fonts-ar";
import { FREE_DELIVERY_AED } from "@/lib/bag-totals";
import { SHOP_CATEGORIES } from "@/lib/products";
import { whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "تيسارا · ملابس نسائية يومية في الإمارات",
  description: "توصيل خلال 1 إلى 3 أيام إلى كل الإمارات، والدفع عند الاستلام.",
  alternates: { languages: { en: "/", ar: "/ar" } },
};

// SAMPLE COPY: Arabic written for the demo; have a native proofreader check it (p.19 #7).
// ponytail: an Arabic landing page, not the full mirror yet. Category names fall back to
// English when a translation is missing.
const AR_CATEGORY: Record<string, string> = { Tees: "تيشيرتات", Knitwear: "ملابس محبوكة", Shirts: "قمصان", Hoodies: "هوديز" };

const PROMISES = [
  { title: "التوصيل", text: `توصيل مجاني للطلبات فوق ${FREE_DELIVERY_AED} درهم، خلال 1 إلى 3 أيام.` },
  { title: "الاستبدال", text: "لديكِ 14 يوماً لاستبدال المقاس أو اللون، ونستلم القطعة من عندك." },
  { title: "المقاسات", text: "أرسلي لنا طولك ومقاسك المعتاد على واتساب وسنساعدك في الاختيار." },
];

const focus = "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
const heading = { fontFamily: "var(--font-ar-heading)" };

// Structure p.18: Arabic mirrors the layout (start is on the right); photos, prices and the
// logo do not flip. Arabic headlines get more line height than Latin ones.
export default function ArabicPage() {
  return (
    <main dir="rtl" lang="ar" className={`${arHeading.variable} ${arText.variable} mx-auto w-full max-w-[1280px] px-4 pb-16 md:px-8`} style={{ fontFamily: "var(--font-ar-text)" }}>
      <div className="mt-6 rounded-[2px] bg-sand px-4 py-3 text-sm text-ink">
        نعمل على النسخة العربية الكاملة من المتجر. حتى ذلك الحين يمكنك التسوّق بالإنجليزية، أو مراسلتنا على واتساب بالعربية.
      </div>

      <section className="grid gap-8 py-12 md:grid-cols-12 md:py-20">
        <div className="md:col-span-7">
          <p className="text-sm text-muted-foreground">ملابس نسائية يومية في الإمارات</p>
          <h1 className="mt-3 text-4xl font-semibold leading-[1.5] md:text-6xl md:leading-[1.45]" style={heading}>قطع جديدة لهذا الموسم</h1>
          <p className="mt-4 max-w-[48ch] text-lg leading-loose text-muted-foreground">
            توصيل خلال 1 إلى 3 أيام إلى كل الإمارات، والدفع عند الاستلام، واستبدال خلال 14 يوماً.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/new" className={`inline-flex min-h-12 items-center rounded-[2px] bg-primary px-6 text-base font-medium text-primary-foreground hover:opacity-90 ${focus}`}>
              تسوّقي الجديد
            </Link>
            <a href={whatsappHref("مرحباً تيسارا، عندي سؤال.")} target="_blank" rel="noopener noreferrer" className={`inline-flex min-h-12 items-center gap-2 rounded-[2px] border border-foreground px-6 text-base font-medium hover:bg-foreground hover:text-background ${focus}`}>
              <MessageCircle className="size-4" aria-hidden />تحدثي معنا على واتساب
            </a>
          </div>
        </div>

        <nav aria-label="الأقسام" className="md:col-span-5">
          <h2 className="text-xl font-semibold leading-loose" style={heading}>الأقسام</h2>
          <ul className="mt-3 divide-y border-y">
            {SHOP_CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link href={c.href} className={`flex min-h-14 items-center justify-between text-base hover:text-lagoon ${focus}`}>
                  <span>{AR_CATEGORY[c.label] ?? c.label}</span>
                  <span className="text-sm text-muted-foreground">{c.count === 1 ? "قطعة واحدة" : c.count === 2 ? "قطعتان" : `${c.count} قطع`}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      <section aria-labelledby="ar-promise" className="border-t pt-10">
        <h2 id="ar-promise" className="text-2xl font-semibold leading-loose md:text-3xl" style={heading}>التسوّق معنا</h2>
        <ul className="mt-6 grid gap-8 md:grid-cols-3">
          {PROMISES.map((p) => (
            <li key={p.title} className="border-t border-foreground/15 pt-4">
              <h3 className="text-xl font-semibold leading-loose" style={heading}>{p.title}</h3>
              <p className="mt-1 text-base leading-loose text-muted-foreground">{p.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-12 text-sm">
        <Link href="/" lang="en" dir="ltr" className={`underline underline-offset-4 ${focus}`}>English</Link>
      </p>
    </main>
  );
}
