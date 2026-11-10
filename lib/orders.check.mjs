// Run: node lib/orders.check.mjs
import assert from "node:assert/strict";
import { newOrderId, orderMessage } from "./orders.ts";

assert.match(newOrderId(), /^TS-[0-9A-Z]{6}$/);
assert.notEqual(newOrderId(1, 0.1), newOrderId(1, 0.9));

const order = {
  id: "TS-ABC123",
  contact: { name: "Mariam", phone: "+971 50 000 0000", email: "" },
  delivery: { emirate: "Dubai", area: "Al Barsha", address: "Villa 4", speed: "standard" },
  payment: "cod",
  totals: { subtotal: 378, delivery: 0, total: 378 },
};
const msg = orderMessage(order, [{ name: "Heavyweight tee · Bone", size: "M", qty: 2, price: 189 }]);
assert.match(msg, /^New order TS-ABC123/);
assert.match(msg, /size M × 2 = AED 378/);
assert.match(msg, /Delivery \(standard\) free/);
assert.match(msg, /Payment: Cash on delivery/);
assert.match(msg, /Address: Villa 4, Al Barsha, Dubai/);
assert.ok(!msg.includes("Email:"));
console.log("order checks pass");
