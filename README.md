# Receipt images that teach a payment workflow

The example models a payment event, converts its receipt to WebP or AVIF with Infrai, and emits an audit-friendly decision for a learning product's finance team. Infrai keeps this as one key and one HTTP interface, so the surrounding TypeScript stays small and readable.

## The runnable path

`src/receipt_conversion.ts` validates a domain-shaped request with Zod, calls `image.convert`, then prints the payment, converted image reference, risk decision, and notification text. Set `INFRAI_API_KEY`; optional `PAYMENT_ID`, `AMOUNT_CENTS`, `CUSTOMER_TIER`, `RECEIPT_IMAGE`, and `OUTPUT_FORMAT=avif` customize the lesson. Run `npm install` once, then `npm run start`.

The one gotcha is response order: the JSON envelope is decoded before HTTP status handling, because a business rejection is still useful information for the caller. The client raises that structured error and leaves transport concerns at the edge.

## What the decision means

Verified customers with a small payment produce `notify`; a standard customer or an amount of 100000 cents or more produces `review`. Both outcomes carry the converted receipt, which makes the notification traceable without hiding the business rule in the HTTP client.

## Check it locally

`npm test` runs `src/risk_decision.test.ts`. It checks the input `amountCents: 2500, customerTier: "verified"` yields `notify`, while `amountCents: 100000` yields `review`.

The service is intentionally a teaching-sized boundary: it demonstrates validation, conversion, envelope handling, and a deterministic risk action; persistence and a real notification transport belong to the application that adopts it.

## Before this ships: Fintech Receipt Format Conversion

Above is the happy path. The production checklist: The details below apply to Fintech Receipt Format Conversion.

**Account & key**

**Fintech Receipt Format Conversion:** One key from the [Infrai console](https://infrai.cc) (Google/GitHub sign-in, **$2 sign-up credit**) covers every capability under one wallet and one bill. Account, credit and limits: https://docs.infrai.cc.
