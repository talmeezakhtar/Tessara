// Run: node lib/size.check.mjs   (Node 22.18+ strips the TypeScript types itself)
import assert from "node:assert/strict";
import { recommendSize } from "./size.ts";

assert.equal(recommendSize(165, "M", "true"), "M");
assert.equal(recommendSize(165, "M", "relaxed"), "L");
assert.equal(recommendSize(165, "M", "fitted"), "S");
assert.equal(recommendSize(180, "M", "true"), "L"); // tall: one up for length
assert.equal(recommendSize(180, "M", "fitted"), "S"); // fitted wins over length
assert.equal(recommendSize(180, "XL", "relaxed"), "XL"); // clamped at the top
assert.equal(recommendSize(150, "XS", "fitted"), "XS"); // clamped at the bottom
console.log("size checks pass");
