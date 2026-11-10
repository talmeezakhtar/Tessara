// Lookbook looks (structure p.16: 4 to 6 looks, story first, no filters).
// Spot x/y are % of the photo itself (not the frame), so they stay on the piece however the
// frame crops. `ratio` is the photo's width / height. Pieces are the closest catalogue match.
export type Spot = { id: string; x: number; y: number };
export type Look = { slug: string; title: string; line: string; photo?: { src: string; ratio: number }; spots: Spot[] };

const photo = (n: number, w: number, h: number) => ({ src: `/looks/look-${n}.webp`, ratio: w / h });

export const LOOKS: Look[] = [
  { slug: "look-1", title: "Off-duty layers", line: "A soft henley under a brushed jacket, for cooler evenings.", photo: photo(1, 960, 1197), spots: [{ id: "henley-brick", x: 49, y: 40 }, { id: "knit-cardigan-olive", x: 38, y: 35 }] },
  { slug: "look-2", title: "Cream on stripes", line: "A waffle henley with wide pinstripe trousers, easy all day.", photo: photo(2, 736, 1104), spots: [{ id: "heavyweight-tee-bone", x: 49, y: 40 }] },
  { slug: "look-3", title: "Green stripe polo", line: "A boxy knit polo with relaxed denim, made for warm afternoons.", photo: photo(3, 736, 1103), spots: [{ id: "pique-polo-forest", x: 48, y: 37 }] },
  { slug: "look-4", title: "Black and white knit", line: "One patterned sweater and plain wide trousers. Nothing else needed.", photo: photo(4, 690, 1200), spots: [{ id: "breton-long-sleeve", x: 51, y: 34 }] },
  { slug: "look-5", title: "Slate hoodie", line: "An oversized hoodie over washed grey denim, for errands and coffee.", photo: photo(5, 683, 1024), spots: [{ id: "hoodie-heather", x: 48, y: 39 }] },
  { slug: "look-6", title: "Stripes and cargo", line: "A loose striped tee with wide cargo trousers and a little colour on top.", photo: photo(6, 736, 989), spots: [{ id: "oversized-tee-ochre", x: 52, y: 43 }] },
];

export const lookBySlug = (slug: string) => LOOKS.find((l) => l.slug === slug);
