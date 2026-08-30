import { ConvexHttpClient } from "convex/browser";
import { makeFunctionReference } from "convex/server";
import { fallbackAgentResponse } from "./agent-fallback";
import type { AccountWorkspace, AgentResponse, ConversationMessage, Source } from "./contracts";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const client = convexUrl ? new ConvexHttpClient(convexUrl) : null;

const converseRef = makeFunctionReference<
  "action",
  { text: string; context: string; sourceIds: string[]; messages: { role: "user" | "assistant"; content: string }[] },
  AgentResponse
>("agent:converse");

const researchRef = makeFunctionReference<"action", { domain: string }, { status: string; domain: string; message?: string; source?: Source }>("research:researchProspect");
const approveRef = makeFunctionReference<"mutation", { slug: string; name: string; domain: string; persona: string }, { approved: boolean; updatedAt: number }>("accounts:approveStrategy");

export const backendMode = client ? "convex" : "fixture";

export function compactAccountContext(workspace: AccountWorkspace, persona: string) {
  return JSON.stringify({
    account: { name: workspace.name, domain: workspace.domain, region: workspace.region, truth: "SYNTHETIC" },
    sellerProduct: workspace.sellerProduct,
    persona,
    insights: workspace.insights,
    strategy: { ...workspace.strategy, persona },
    sources: workspace.sources.map(({ id, title, truth, excerpt }) => ({ id, title, truth, excerpt })),
    artifacts: workspace.artifacts,
  });
}

export async function converse(workspace: AccountWorkspace, persona: string, messages: ConversationMessage[], text: string) {
  if (!client) return fallbackAgentResponse(text);
  try {
    return await client.action(converseRef, {
      text,
      context: compactAccountContext(workspace, persona),
      sourceIds: workspace.sources.map((source) => source.id),
      messages: messages.map(({ role, content }) => ({ role, content })),
    });
  } catch {
    return fallbackAgentResponse(text);
  }
}

export async function researchProspect(domain: string) {
  if (!client) return { status: "unavailable", domain, message: "Convex is not configured" };
  try {
    return await client.action(researchRef, { domain });
  } catch {
    return { status: "unavailable", domain, message: "Research service is unavailable" };
  }
}

export async function persistApproval(workspace: AccountWorkspace, persona: string) {
  if (!client) return null;
  try {
    return await client.mutation(approveRef, { slug: workspace.id, name: workspace.name, domain: workspace.domain, persona });
  } catch {
    return null;
  }
}
