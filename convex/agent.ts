import { v } from "convex/values";
import { action, env } from "./_generated/server";
import { GROQ_CHAT_URL, GROQ_MODELS } from "../lib/ai-config";
import type { AgentAction } from "../lib/contracts";

const capabilities = [
  "multi-modal shipment visibility",
  "ETA and delay monitoring",
  "operational exception detection",
  "prioritized alerts",
  "route/location performance",
  "cross-region operational visibility",
  "executive operational KPIs",
];

async function askGroq(model: string, system: string, messages: { role: "user" | "assistant"; content: string }[]) {
  if (!env.GROQ_API_KEY) return { error: "GROQ_API_KEY is not configured in Convex." };
  try {
    const response = await fetch(GROQ_CHAT_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${env.GROQ_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        response_format: { type: "json_object" },
        messages: [{ role: "system", content: system }, ...messages],
      }),
      signal: AbortSignal.timeout(20000),
    });
    if (!response.ok) return { error: `Groq returned ${response.status}. Check the API key and model access.` };
    const data = await response.json();
    return { value: JSON.parse(data.choices?.[0]?.message?.content ?? "{}") as Record<string, unknown> };
  } catch {
    return { error: "Groq could not be reached. Try again." };
  }
}

function safeAction(value: unknown): AgentAction {
  if (!value || typeof value !== "object" || !("type" in value)) return { type: "none" };
  const candidate = value as { type?: string; persona?: unknown };
  if ((candidate.type === "focus_persona" || candidate.type === "test_persona") && typeof candidate.persona === "string") return { type: candidate.type, persona: candidate.persona.slice(0, 60) };
  if (candidate.type === "approve_strategy") return { type: "approve_strategy" };
  if (candidate.type === "generate_demo") return { type: "generate_demo" };
  if (candidate.type === "create_brief") return { type: "create_brief" };
  if (candidate.type === "research") return { type: "research" };
  return { type: "none" };
}

function strings(value: unknown, limit = 4) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string").slice(0, limit) : [];
}

export const converse = action({
  args: {
    text: v.string(),
    context: v.string(),
    sourceIds: v.array(v.string()),
    messages: v.array(v.object({ role: v.union(v.literal("user"), v.literal("assistant")), content: v.string() })),
  },
  handler: async (_ctx, args) => {
    const text = args.text.trim().slice(0, 2000);
    if (!text) return { answer: "Ask a question about this account.", citations: [], action: { type: "none" } as const, live: false, error: "A message is required." };
    const system = `You are ContextSE's AI Solutions Engineer. Collaborate on an active enterprise opportunity: understand seller and prospect context, identify what matters, distinguish evidence from assumptions, recommend the strongest truthful story, and create requested presales outputs. Be concise and decision-oriented. Use only supplied account context. GulfLink and its operations are SYNTHETIC. Relay capabilities are limited to: ${capabilities.join(", ")}. Never invent prospect facts or Relay capabilities. Return JSON: {"answer":"under 140 words","citations":["valid source id"],"action":{"type":"none|focus_persona|approve_strategy|generate_demo|create_brief|research|test_persona","persona":"only when relevant"}}. Account context: ${args.context.slice(0, 12000)}`;
    const result = await askGroq(GROQ_MODELS.solutionsEngineer, system, [
      ...args.messages.slice(-8).map((message) => ({ ...message, content: message.content.slice(0, 2000) })),
      { role: "user", content: text },
    ]);
    if (result.error) return { answer: result.error, citations: [], action: { type: "none" } as const, live: false, error: result.error };
    const value = result.value ?? {};
    return {
      answer: typeof value.answer === "string" ? value.answer.slice(0, 1400) : "Groq returned an invalid response. Try again.",
      citations: strings(value.citations).filter((id) => args.sourceIds.includes(id)),
      action: safeAction(value.action),
      live: true,
    };
  },
});

export const testPersona = action({
  args: { persona: v.string(), target: v.string(), context: v.string() },
  handler: async (_ctx, args) => {
    const persona = args.persona.trim().slice(0, 60) || "CEO";
    const target = args.target.trim().slice(0, 80) || "Current strategy";
    const system = `You are an adversarial ${persona} buyer evaluating a presales pitch, not the Solutions Engineer helping create it. Ground your evaluation in the supplied account context. Challenge unsupported claims and synthetic numbers. Return concise JSON: {"reaction":"1-2 sentences","objections":["up to 3"],"missing":["up to 3"],"score":1-10,"improve":["1-3 highest-impact changes"]}. Account context: ${args.context.slice(0, 12000)}`;
    const result = await askGroq(GROQ_MODELS.tester, system, [{ role: "user", content: `Evaluate this target: ${target}` }]);
    if (result.error) return { persona, target, reaction: result.error, objections: [], missing: [], score: 0, improve: [], live: false, error: result.error };
    const value = result.value ?? {};
    return {
      persona,
      target,
      reaction: typeof value.reaction === "string" ? value.reaction.slice(0, 700) : "No reaction returned.",
      objections: strings(value.objections, 3),
      missing: strings(value.missing, 3),
      score: Math.max(1, Math.min(10, typeof value.score === "number" ? Math.round(value.score) : 5)),
      improve: strings(value.improve, 3),
      live: true,
    };
  },
});
