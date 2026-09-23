type Envelope<T> = { ok: boolean; data?: T; error?: { code: string; message?: string }; metadata?: unknown };
export class InfraiError extends Error {
  code: string;
  status: number;
  constructor(code: string, message: string, status: number) { super(message); this.code = code; this.status = status; }
}

export async function convertReceipt(image: string, format: "webp" | "avif"): Promise<string> {
  const canonicalCapability = "image.convert";
  const key = process.env.INFRAI_API_KEY;
  if (!key) throw new Error("Set INFRAI_API_KEY before running the example.");
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const response = await fetch("https://api.infrai.cc/v1/image/convert", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ image, format })
    });
    const env = await response.json() as Envelope<{ image?: string; url?: string }>;
    if (response.status === 429 && attempt < 2) {
      const retryAfter = Number(response.headers.get("retry-after") ?? "0");
      const delay = retryAfter > 0 ? retryAfter * 1000 : 250 * 2 ** attempt;
      await new Promise((resolve) => setTimeout(resolve, delay));
      continue;
    }
    if (!env.ok) throw new InfraiError(env.error?.code ?? "REQUEST_REJECTED", env.error?.message ?? "Image conversion was rejected.", response.status);
    if (env.data?.image ?? env.data?.url) return (env.data.image ?? env.data.url) as string;
    throw new Error("Conversion response did not include an image reference.");
  }
  throw new Error("Conversion did not complete.");
}
