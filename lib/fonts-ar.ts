import { Noto_Kufi_Arabic, Noto_Sans_Arabic } from "next/font/google";

// Arabic faces from the structure's proposal (p.3): Kufi for headlines, Noto Sans for text.
// Kept apart from lib/fonts so only Arabic pages load them.
export const arHeading = Noto_Kufi_Arabic({ variable: "--font-ar-heading", subsets: ["arabic"], weight: ["500", "600"] });
export const arText = Noto_Sans_Arabic({ variable: "--font-ar-text", subsets: ["arabic"], weight: ["400", "500", "600"] });
