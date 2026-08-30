import { v } from "convex/values";
import { action, env } from "./_generated/server";

function normalizeDomain(input: string) {
  const url = new URL(input.includes("://") ? input : `https://${input}`);
  if (!url.hostname.includes(".")) throw new Error("Enter a valid company domain");
  return url.hostname.replace(/^www\./, "").toLowerCase();
}

export const researchProspect = action({
  args: { domain: v.string() },
  handler: async (_ctx, { domain: input }) => {
    let domain: string;
    try {
      domain = normalizeDomain(input);
    } catch {
      return { status: "error", domain: input, message: "Enter a valid company domain" };
    }
    const apiKey = env.CONTEXT_DEV_API_KEY;
    if (!apiKey) return { status: "unavailable", domain, message: "Context.dev is not configured" };

    try {
      const response = await fetch("https://api.context.dev/v1/brand/retrieve", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ type: "by_domain", domain }),
        signal: AbortSignal.timeout(15000),
      });
      const data = await response.json();
      if (response.status === 400 && data.error_code === "NOT_FOUND") return { status: "not_found", domain };
      if (!response.ok) return { status: "error", domain, message: data.message ?? `Context.dev returned ${response.status}` };

      const brand = data.brand ?? {};
      return {
        status: "ok",
        domain: brand.domain ?? domain,
        source: {
          id: `context-${domain}`,
          group: "prospect",
          title: `${brand.title ?? domain} Website.txt`,
          filename: `${brand.title ?? domain} Website.txt`,
          format: "text",
          detail: "Context.dev public-web intelligence",
          truth: "FACT",
          content: [brand.description, brand.slogan].filter(Boolean).join("\n\n").slice(0, 4000),
          excerpt: [brand.description, brand.slogan].filter(Boolean).join(" ").slice(0, 800),
          url: `https://${brand.domain ?? domain}`,
        },
      };
    } catch {
      return { status: "unavailable", domain, message: "Context.dev could not be reached" };
    }
  },
});
