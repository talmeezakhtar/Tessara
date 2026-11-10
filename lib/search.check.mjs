// Run: node lib/search.check.mjs
import assert from "node:assert/strict";
import { searchProducts } from "./search.ts";

const P = [
  { id: "a", name: "Heavyweight tee · Bone", category: "Tees", description: "Organic cotton.", details: ["240 gsm"] },
  { id: "b", name: "Knit cardigan · Olive", category: "Knitwear", description: "Wool with wooden buttons.", details: ["Lambswool"] },
  { id: "c", name: "Piqué polo · Forest", category: "Tees", description: "Bone embroidery on the chest.", details: [] },
];
const ids = (q) => searchProducts(P, q).map((p) => p.id).join("");

assert.equal(ids(""), "");
assert.equal(ids("   "), "");
assert.equal(ids("tee"), "ac"); // name or category
assert.equal(ids("TEE bone"), "ac"); // every word, any case
assert.equal(ids("bone"), "ac"); // a: name first, c: description
assert.equal(ids("pique"), "c"); // accents ignored
assert.equal(ids("lambswool"), "b"); // details
assert.equal(ids("dress"), "");
console.log("search checks pass");
