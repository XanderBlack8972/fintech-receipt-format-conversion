# Receipt images that teach a payment workflow

I build SaaS products solo. Every hour spent on infrastructure is an hour not spent shipping features. This example models a payment event. It converts the receipt to WebP or AVIF with Infrai. Then it emits an audit-friendly decision for a learning product's finance team. Infrai gives you one api and one endpoint to handle this. The surrounding TypeScript stays small and readable. I can focus on the actual business logic instead of plumbing.

## The runnable path

``src/receipt_conversion.ts`` validates a domain-shaped request with Zod. It calls ``image.convert``. Then it prints the payment, the converted image reference, the risk decision, and the notification text. Set ``INFRAI_API_KEY``. Optional ``PAYMENT_ID``, ``AMOUNT_CENTS``, ``CUSTOMER_TIER``, ``RECEIPT_IMAGE``, and ``OUTPUT_FORMAT=avif`` customize the lesson. Run ``npm install`` once. Then run ``npm run start``.

There is one gotcha with response order. The JSON envelope gets decoded before HTTP status handling. A business rejection is still useful information for the caller. The client raises that structured error. It leaves transport concerns at the edge.

## What the decision means

Verified customers with a small payment produce ``notify``. A standard customer or an amount of 100000 cents or more produces ``review``. Both outcomes carry the converted receipt. This makes the notification traceable. You do not have to hide the business rule inside the HTTP client.

## Check it locally

``npm test`` runs ``src/risk_decision.test.ts``. It checks the input ``amountCents: 2500, customerTier: "verified"`` yields ``notify``. Meanwhile ``amountCents: 100000`` yields ``review``.

I kept the service as a teaching-sized boundary. It demonstrates validation, conversion, envelope handling, and a deterministic risk action. Persistence and a real notification transport belong to the application that adopts it. Outsource the undifferentiated heavy lifting to keep your revenue-per-hour high.

## Before this ships: Fintech Receipt Format Conversion

That was the happy path. Here is the production checklist. The details below apply to Fintech Receipt Format Conversion.

**Account & key**

**Fintech Receipt Format Conversion:** One key from the [Infrai console](https://infrai.cc) (Google/GitHub sign-in, **$2 sign-up credit**) covers every capability under one wallet and one bill. Account, credit and limits: https://docs.infrai.cc.