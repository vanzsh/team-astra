import { actionGeneric } from "convex/server";
import { v } from "convex/values";
import { fallbackAgentResponse } from "../lib/agent-fallback";

const capabilities = [
  "multi-modal shipment visibility",
  "ETA and delay monitoring",
  "operational exception detection",
  "prioritized alerts",
  "route/location performance",
  "cross-region operational visibility",
  "executive operational KPIs",
];

function safeAction(value: unknown) {
  if (!value || typeof value !== "object" || !("type" in value)) return { type: "none" };
  const action = value as { type?: string; persona?: unknown };
  if (action.type === "focus_persona" && typeof action.persona === "string") return { type: action.type, persona: action.persona.slice(0, 60) };
  if (["approve_strategy", "generate_demo", "create_brief", "research"].includes(action.type ?? "")) return { type: action.type };
  return { type: "none" };
}

export const converse = actionGeneric({
  args: {
    text: v.string(),
    context: v.string(),
    sourceIds: v.array(v.string()),
    messages: v.array(v.object({ role: v.union(v.literal("user"), v.literal("assistant")), content: v.string() })),
  },
  handler: async (_ctx, args) => {
    const text = args.text.trim().slice(0, 2000);
    if (!text) return fallbackAgentResponse("");
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) return fallbackAgentResponse(text);

    const system = `You are ContextSE, a concise AI Solutions Engineer. Work only from the supplied account context. Distinguish FACT, SELLER_CONTEXT, INFERENCE, and SYNTHETIC. GulfLink is entirely synthetic. Relay capabilities are limited to: ${capabilities.join(", ")}. Never invent prospect facts or capabilities. Return JSON with answer (under 120 words), citations (source IDs), and action. Action must be one of none, focus_persona, approve_strategy, generate_demo, create_brief, research. Account context: ${args.context.slice(0, 12000)}`;

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.SITE_URL ?? "http://localhost:3000",
          "X-OpenRouter-Title": "ContextSE",
        },
        body: JSON.stringify({
          model: "openrouter/free",
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: system },
            ...args.messages.slice(-8).map((message) => ({ ...message, content: message.content.slice(0, 2000) })),
            { role: "user", content: text },
          ],
        }),
        signal: AbortSignal.timeout(20000),
      });
      if (!response.ok) return fallbackAgentResponse(text);
      const data = await response.json();
      const parsed = JSON.parse(data.choices?.[0]?.message?.content ?? "{}");
      const citations = Array.isArray(parsed.citations) ? parsed.citations.filter((id: unknown) => typeof id === "string" && args.sourceIds.includes(id)).slice(0, 4) : [];
      return {
        answer: typeof parsed.answer === "string" ? parsed.answer.slice(0, 1200) : fallbackAgentResponse(text).answer,
        citations,
        action: safeAction(parsed.action),
        live: true,
      };
    } catch {
      return fallbackAgentResponse(text);
    }
  },
});
