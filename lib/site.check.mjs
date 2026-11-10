// Run: node lib/site.check.mjs
import assert from "node:assert/strict";
import { isEmailOrPhone, whatsappHref } from "./site.ts";

assert.ok(isEmailOrPhone("mariam@example.com"));
assert.ok(isEmailOrPhone("  mariam@example.ae "));
assert.ok(isEmailOrPhone("+971 50 123 4567"));
assert.ok(isEmailOrPhone("050-123-4567"));
assert.ok(!isEmailOrPhone(""));
assert.ok(!isEmailOrPhone("mariam@"));
assert.ok(!isEmailOrPhone("12345"));
assert.ok(!isEmailOrPhone("call me"));
assert.match(whatsappHref("Hi & bye"), /^https:\/\/wa\.me\/\?text=Hi%20%26%20bye$/);
console.log("site checks pass");
