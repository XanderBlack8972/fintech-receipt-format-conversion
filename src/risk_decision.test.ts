import { strict as assert } from "node:assert";
import { decideRisk, paymentEvent } from "./fintech_types.js";

const event = paymentEvent.parse({ paymentId: "p-1", amountCents: 2500, customerTier: "verified", receiptImage: "img" });
assert.equal(decideRisk(event, "converted.webp").decision, "notify");
assert.equal(decideRisk({ ...event, amountCents: 100000 }, "converted.webp").decision, "review");
console.log("risk decisions verified");
