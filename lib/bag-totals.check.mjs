// Run: node lib/bag-totals.check.mjs
import assert from "node:assert/strict";
import { bagTotals } from "./bag-totals.ts";

const price = (id) => ({ a: 149, b: 259 })[id];

const empty = bagTotals([], price);
assert.deepEqual([empty.count, empty.subtotal, empty.delivery, empty.total, empty.toFree], [0, 0, 0, 0, 200]);

const under = bagTotals([{ id: "a", size: "M", qty: 1 }], price);
assert.deepEqual([under.subtotal, under.delivery, under.total, under.toFree], [149, 15, 164, 51]);

const over = bagTotals([{ id: "a", size: "M", qty: 1 }, { id: "b", size: "S", qty: 2 }], price);
assert.deepEqual([over.count, over.subtotal, over.delivery, over.total, over.toFree, over.progress], [3, 667, 0, 667, 0, 1]);

const exactly = bagTotals([{ id: "x", size: "M", qty: 1 }], () => 200);
assert.equal(exactly.delivery, 0); // the threshold itself is free
console.log("bag checks pass");
