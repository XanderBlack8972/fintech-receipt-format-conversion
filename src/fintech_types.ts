import { z } from "zod";

export const paymentEvent = z.object({
  paymentId: z.string().min(1),
  amountCents: z.number().int().nonnegative(),
  customerTier: z.enum(["standard", "verified"]),
  receiptImage: z.string().min(1)
});
export type PaymentEvent = z.infer<typeof paymentEvent>;

export type RiskDecision = "notify" | "review";
export function decideRisk(event: PaymentEvent, convertedImage: string): { decision: RiskDecision; message: string; image: string } {
  const decision: RiskDecision = event.amountCents >= 100000 || event.customerTier === "standard" ? "review" : "notify";
  const message = decision === "review" ? `Payment ${event.paymentId} needs a human review.` : `Payment ${event.paymentId} receipt is ready.`;
  return { decision, message, image: convertedImage };
}
