import type { GarmentKind } from "@/components/ui/product-rail-gallery";

export type Size = "XS" | "S" | "M" | "L" | "XL";
export type Stock = "in" | "low" | "out";

export interface Product {
  id: string;
  name: string;
  /** Short name for buttons: "Shop the {short}". */
  short: string;
  kind: GarmentKind;
  /** AED, whole dirhams. */
  price: number;
  category: string;
  description: string;
  details: string[];
  image: string;
  backImage: string;
  /** Side view for the home rail's turn. Leave it out when the shot doesn't match the rail's
   * hanger framing; the rail then turns the front and back photos instead. */
  sideImage?: string;
  sizes: Partial<Record<Size, Stock>>;
  badge?: "New" | "Low stock" | "Back in stock";
  /** Fabric colour, for swatches and the product page backdrop. */
  swatch: string;
  /**
   * Other colours of this same piece, given as the ids of the entries that hold their
   * photos, swatch and stock (that entry's colour name is used, e.g. "Black").
   */
  colourways?: string[];
  /** Full photos (on model, close-ups) added to the product page gallery after the cutouts. */
  photos?: { src: string; label: string }[];
}

// ponytail: demo catalogue. Photos are the rail component stand-ins in /public/rail;
// replace with the boutique stock (and its real categories, e.g. Dresses / Sets / Tops).
const CDN = "/rail";
const BASE = [
  { id: "heavyweight-tee-bone", short: "bone tee", name: "Heavyweight tee · Bone", kind: "tee", price: 189, description: "Thick organic cotton with a small tonal embroidery on the chest.", details: ["240 gsm", "Regular fit", "Embroidered"], image: `${CDN}/1485bf44725b18fcdba71bfae54d67d648ab3bff4b24215a042c0cc4c895a2e6.webp`, backImage: `${CDN}/69937e656430ae33d950303e0d53051273e5b02189750ef1e7429ec4bbf95e20.webp`, sideImage: `${CDN}/838468c32f16b4acba62e4601276737411156052444712ff2534fefe994a7bed.webp` },
  { id: "graphic-tee-black", short: "graphic tee", name: "Graphic tee · Black", kind: "tee", price: 229, description: "Black cotton tee, printed front and back.", details: ["240 gsm", "Regular fit", "Screen print"], image: `${CDN}/d769f183472d0fd98a7aff2a643593748cd36ef9da1497d9bf6f0d87d1025a9b.webp`, backImage: `${CDN}/fec6f7e96b198cc5b9aad333ca2c4c10968a746d87f6dc11d9c118607b509058.webp`, sideImage: `${CDN}/b3b6984ea94b8b8cd19fb15387e89dca457ac0f947115c2a54a33217e4fb4571.webp` },
  { id: "oxford-shirt-sky", short: "oxford shirt", name: "Oxford shirt · Sky", kind: "shirt", price: 259, description: "Pale sky oxford with a button-down collar.", details: ["Oxford cotton", "Button-down collar", "Chest pocket"], image: `${CDN}/470a7723cef068f81e8a4c09d1ab3f8630c61b734c2168b10f3858e45efbf31f.webp`, backImage: `${CDN}/9be14e5dce879756775677e2d82dadc2ad9a1690b7df2f82de360cb3600d0ee5.webp`, sideImage: `${CDN}/5984d5ca60fd1aeee7e688ec33c2219a1c537fcde90d2accab813c13985f8632.webp` },
  { id: "knit-cardigan-olive", short: "olive cardigan", name: "Knit cardigan · Olive", kind: "knit", price: 299, description: "Chunky olive wool cardigan with wooden buttons and ribbed trims.", details: ["Lambswool", "Wooden buttons", "V-neck"], image: `${CDN}/581b13c5ca241c653dc94d2c8048c92a60f022cfbaaf153261076d3a6655827e.webp`, backImage: `${CDN}/d9178d906d37268565cf10af3431aee543aacfc73610f7fa7b0fa4758c498cb3.webp`, sideImage: `${CDN}/dee1c529600e0460413f1a9b07a29bedb7ea7dc96181fce5d9d6501231e6e45d.webp` },
  { id: "hoodie-heather", short: "heather hoodie", name: "Hoodie · Heather", kind: "hoodie", price: 349, description: "Soft heather fleece with a kangaroo pocket.", details: ["400 gsm fleece", "Kangaroo pocket", "Chest print"], image: `${CDN}/51750ba098dd622df46695bca781b3f0ec336a36b93b070e638cc04455def6d6.webp`, backImage: `${CDN}/e75c4ac8fb7f14caae756338a31f81f1437bb312b78e0d7d906e9f956e7968fa.webp`, sideImage: `${CDN}/a2eb2463d52146c341ede6bb9f6067e917a23eb29b7b1d1d4c40ac084a01c7ce.webp` },
  { id: "crewneck-lilac", short: "lilac crewneck", name: "Crewneck sweatshirt · Lilac", kind: "knit", price: 219, description: "Muted lilac fleece crewneck with a raised puff print.", details: ["400 gsm fleece", "Ribbed trims", "Puff print"], image: `${CDN}/8e38660e2add9637c27846d9b8d620f2abb228a5a153ccfd7b1c808b6845e1f8.webp`, backImage: `${CDN}/b9214a6e009ce4b3044595a51ea010c299135bab5b26775c43d7175c86e77898.webp`, sideImage: `${CDN}/591872e42b483c43c1cd08a3ac4d7d40c0b5fa2bc585a36096faded2e696e84e.webp` },
  { id: "pique-polo-forest", short: "forest polo", name: "Piqué polo · Forest", kind: "tee", price: 279, description: "Forest piqué polo with a bone embroidery on the chest.", details: ["Piqué knit", "Two-button placket", "Embroidered"], image: `${CDN}/19fe43cb681195ae227e3164088d86a07a1b6e33cc54c6e35637374736a16894.webp`, backImage: `${CDN}/e095182b1a7f04e600c5662aa871b4c055c294b152586817d84e312c22f744cf.webp`, sideImage: `${CDN}/005a8e10be234bc40917f3153208b8196ba1610c53c987e39942da1f4a7cd808.webp` },
  { id: "henley-brick", short: "brick henley", name: "Henley · Brick", kind: "knit", price: 199, description: "Dusty brick henley with a three-button placket.", details: ["Slub cotton", "Three buttons", "Long sleeve"], image: `${CDN}/84aa4b0e21ed11fcbc083647a607b94ee3a6c21cb66c114cfb1dad0792c15499.webp`, backImage: `${CDN}/01c299df56a29afca8dad4a64858bd506667338bfbd0435118e6c3698c7881b3.webp`, sideImage: `${CDN}/9ca38eeb156aae7d199d3c1ffb7947e395f77d1f094eea006c1b5fbb22352b4e.webp` },
  { id: "breton-long-sleeve", short: "Breton top", name: "Breton long sleeve", kind: "knit", price: 239, description: "Ink-and-bone stripe with a boat neck.", details: ["220 gsm", "Boat neck", "Long sleeve"], image: `${CDN}/096002a95aba7de9c197de4cb5c78cbbe17c1677b19c547cc20c6dbef47a899c.webp`, backImage: `${CDN}/74408a7dbb4f4fc6761ebb8d6ed93187248cddf75e1c2e70d38d04dfdd328776.webp`, sideImage: `${CDN}/eda3afca537071a80d7d82b3f0d1055b56f1f3263c20772224bae6660bf4072c.webp` },
  { id: "oversized-tee-ochre", short: "ochre tee", name: "Oversized tee · Ochre", kind: "tee", price: 329, description: "Boxy ochre tee with a large back print.", details: ["Oversized", "Dropped shoulder", "Back print"], image: `${CDN}/7208c811f54e123dd7b1a5c1c3926f43ca832f6c4c20c45de10671ffd544409d.webp`, backImage: `${CDN}/d356989b7bc741c5cfc934cac34983dfb24d5d6a6b6e7b8b7f6b27cd3eceae69.webp`, sideImage: `${CDN}/bf94beeafb21f9cb21aa45057a67dc8a2e23ba95c7ac0f79dd27ba3ce4a1230c.webp` },
  { id: "striped-shirt-rose", short: "rose shirt", name: "Striped shirt · Rose", kind: "shirt", price: 269, description: "Rose and white pinstripe oxford, cut relaxed, with Tessara embroidered over the pocket.", details: ["Oxford cotton", "Relaxed fit", "Embroidered pocket"], image: "/products/striped-shirt-rose-front.webp", backImage: "/products/striped-shirt-rose-back.webp", photos: [{ src: "/products/striped-shirt-rose-side.webp", label: "Side" }, { src: "/products/striped-shirt-rose-model.webp", label: "On model" }, { src: "/products/striped-shirt-rose-detail.webp", label: "Pocket" }] },
];

const EXTRA: Record<string, Pick<Product, "category" | "sizes" | "badge" | "swatch" | "colourways">> = {
  // ponytail: demo colourways from the stand-in tee photos, so the swatch swap can be tried.
  "heavyweight-tee-bone": { colourways: ["graphic-tee-black", "oversized-tee-ochre"], swatch: "#EFEBE2", category: "Tees", badge: "New", sizes: { XS: "in", S: "in", M: "in", L: "low", XL: "out" } },
  "graphic-tee-black": { swatch: "#101214", category: "Tees", badge: "New", sizes: { S: "in", M: "in", L: "in", XL: "in" } },
  "oxford-shirt-sky": { swatch: "#A3D3EB", category: "Shirts", badge: "Low stock", sizes: { S: "out", M: "low", L: "in", XL: "out" } },
  "knit-cardigan-olive": { swatch: "#758151", category: "Knitwear", badge: "New", sizes: { XS: "in", S: "in", M: "in", L: "in" } },
  "hoodie-heather": { swatch: "#A0A5AB", category: "Hoodies", badge: "Back in stock", sizes: { S: "in", M: "in", L: "in", XL: "low" } },
  "crewneck-lilac": { swatch: "#CCB2E0", category: "Knitwear", sizes: { XS: "in", S: "low", M: "in", L: "out" } },
  "pique-polo-forest": { swatch: "#185B37", category: "Tees", sizes: { S: "in", M: "in", L: "in", XL: "in" } },
  "henley-brick": { swatch: "#B05139", category: "Knitwear", badge: "New", sizes: { S: "in", M: "out", L: "in" } },
  "breton-long-sleeve": { swatch: "#E4DFD3", category: "Knitwear", sizes: { XS: "in", S: "in", M: "in", L: "in", XL: "in" } },
  "striped-shirt-rose": { swatch: "#D8A3AD", category: "Shirts", badge: "New", sizes: { XS: "in", S: "in", M: "in", L: "low", XL: "in" } },
  "oversized-tee-ochre": { swatch: "#DE9C31", category: "Tees", sizes: { S: "in", M: "in", L: "in" } },
};

export const PRODUCTS: Product[] = BASE.map((p) => ({ ...p, kind: p.kind as GarmentKind, ...EXTRA[p.id]! }));

export const formatPrice = (aed: number) => `AED ${aed}`;

/**
 * Categories actually in stock, biggest first, each with its piece count and a cover piece.
 * The header, footer, home tiles and /shop/[category] pages all read this list, so they
 * change together when the catalogue does.
 */
export const SHOP_CATEGORIES = (() => {
  const groups = new Map<string, Product[]>();
  for (const p of PRODUCTS) groups.set(p.category, [...(groups.get(p.category) ?? []), p]);
  return [...groups.entries()]
    .sort((a, b) => b[1].length - a[1].length)
    .map(([label, items]) => ({ slug: label.toLowerCase(), label, href: `/shop/${label.toLowerCase()}`, count: items.length, cover: items[0]! }));
})();
