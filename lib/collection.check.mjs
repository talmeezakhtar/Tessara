// Run: node lib/collection.check.mjs
import assert from "node:assert/strict";
import { applyFilters, colourOf, parseFilters, toQuery } from "./collection.ts";

const P = [
  { id: "a", name: "Tee · Bone", price: 189, sizes: { S: "in", M: "out" } },
  { id: "b", name: "Shirt · Sky", price: 259, sizes: { M: "low", L: "in" } },
  { id: "c", name: "Breton long sleeve", price: 239, sizes: { M: "out" } },
  { id: "d", name: "Hoodie · Heather", price: 349, sizes: { M: "in" } },
];
const ids = (q) => applyFilters(P, parseFilters(new URLSearchParams(q))).map((p) => p.id).join("");

assert.equal(ids(""), "abcd");
assert.equal(ids("size=M"), "bd"); // sold-out M doesn't count, low stock does
assert.equal(ids("size=S&size=L"), "ab"); // sizes are OR
assert.equal(ids("stock=1"), "abd"); // c has nothing left
assert.equal(ids("colour=Sky&colour=Bone"), "ab");
assert.equal(ids("price=200-250"), "c");
assert.equal(ids("price=0-200&price=301-"), "ad");
assert.equal(ids("size=M&price=251-300"), "b"); // groups are AND
assert.equal(ids("sort=price-desc"), "dbca");
assert.equal(ids("sort=price-asc"), "acbd");
assert.equal(ids("size=XXL&price=bogus&sort=bogus"), "abcd"); // junk in the URL is ignored
assert.equal(colourOf({ name: "Breton long sleeve" }), null);

const f = parseFilters(new URLSearchParams("size=M&colour=Sky&stock=1&sort=price-asc"));
assert.equal(toQuery(f), "?size=M&colour=Sky&stock=1&sort=price-asc");
assert.equal(toQuery(parseFilters(new URLSearchParams(""))), "");
console.log("collection checks pass");
