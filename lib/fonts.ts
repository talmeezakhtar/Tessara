import { Cormorant_Garamond, Manrope } from "next/font/google";

// Shared so components that need the real family name (e.g. the footer wordmark, which
// measures glyphs on a canvas and can't read CSS variables) use the same loaded fonts.
export const sans = Manrope({ variable: "--font-manrope", subsets: ["latin"] });
export const serif = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"], weight: ["500", "600"] });
