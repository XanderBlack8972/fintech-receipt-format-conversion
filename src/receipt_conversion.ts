import { paymentEvent, decideRisk } from "./fintech_types.js";
import { convertReceipt } from "./infrai_image.js";

const input = paymentEvent.parse({
  paymentId: process.env.PAYMENT_ID ?? "demo-payment-42",
  amountCents: Number(process.env.AMOUNT_CENTS ?? 2450),
  customerTier: process.env.CUSTOMER_TIER === "verified" ? "verified" : "standard",
  receiptImage: process.env.RECEIPT_IMAGE ?? "data:image/jpeg;base64,receipt"
});
const format = process.env.OUTPUT_FORMAT === "avif" ? "avif" : "webp";
const converted = await convertReceipt(input.receiptImage, format);
console.log(JSON.stringify({ event: input, ...decideRisk(input, converted), format }, null, 2));
