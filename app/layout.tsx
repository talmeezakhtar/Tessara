import type { Metadata } from "next";
import { Suspense } from "react";
import { BagDrawer } from "@/components/bag/bag-drawer";
import { SiteFooter } from "@/components/site/footer";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { SiteHeader } from "@/components/site/header";
import { sans, serif } from "@/lib/fonts";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Tessara · Everyday women's wear in the UAE",
  description: "Everyday women's wear with free delivery over AED 200 across the UAE, cash on delivery and exchanges within 14 days.",
  openGraph: { siteName: "Tessara", type: "website", locale: "en_AE" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        {children}
        <SiteFooter />
        {/* Reads the URL, so it sits in Suspense to keep dynamic routes prerenderable. */}
        <Suspense fallback={null}>
          <WhatsAppButton />
        </Suspense>
        <BagDrawer />
      </body>
    </html>
  );
}
