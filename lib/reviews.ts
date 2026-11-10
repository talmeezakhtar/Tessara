// Customer reviews. REVIEWS is empty until real ones come in: the home section and the
// product page stars hide while it is empty. SAMPLE_REVIEWS shows the format; never publish
// them as real (invented reviews mislead shoppers and break UAE consumer law).
export type Review = {
  author: string;
  city: string;
  productId: string;
  rating: 1 | 2 | 3 | 4 | 5;
  fit: "Runs small" | "True to size" | "Runs large";
  bought: string;
  heightCm: number;
  text: string;
};

export const SAMPLE_REVIEWS: Review[] = [
  { author: "Mariam A.", city: "Dubai", productId: "knit-cardigan-olive", rating: 5, fit: "True to size", bought: "S", heightCm: 162, text: "Warm without being heavy. The buttons feel solid and the colour is softer in person." },
  { author: "Noor K.", city: "Abu Dhabi", productId: "oxford-shirt-sky", rating: 4, fit: "Runs small", bought: "M", heightCm: 168, text: "Lovely cloth, but tight across the shoulders. I would go one size up next time." },
  { author: "Sara H.", city: "Sharjah", productId: "breton-long-sleeve", rating: 5, fit: "True to size", bought: "M", heightCm: 171, text: "Sleeves are long enough for me, which never happens. Washed twice and still in shape." },
];

export const REVIEWS: Review[] = [];
