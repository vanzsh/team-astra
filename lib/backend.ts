import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import type { AccountWorkspace, AgentResponse, ConversationMessage, PersonaTestResult, Source } from "./contracts";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const client = convexUrl ? new ConvexHttpClient(convexUrl) : null;
const configurationError = "Connect Convex and set GROQ_API_KEY to use live AI.";

export const backendMode = client ? "convex" : "unconfigured";

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

export async function converse(workspace: AccountWorkspace, persona: string, messages: ConversationMessage[], text: string): Promise<AgentResponse> {
  if (!client) return { answer: configurationError, citations: [], action: { type: "none" }, live: false, error: configurationError };
  try {
    return await client.action(api.agent.converse, {
      text,
      context: compactAccountContext(workspace, persona),
      sourceIds: workspace.sources.map((source) => source.id),
      messages: messages.map(({ role, content }) => ({ role, content })),
    });
  } catch {
    return { answer: "Groq is unavailable. Verify the Convex deployment and GROQ_API_KEY.", citations: [], action: { type: "none" }, live: false, error: "Groq request failed." };
  }
}

export async function testPersona(workspace: AccountWorkspace, persona: string, target: string): Promise<PersonaTestResult> {
  if (!client) return { persona, target, reaction: configurationError, objections: [], missing: [], score: 0, improve: [], live: false, error: configurationError };
  try {
    return await client.action(api.agent.testPersona, { persona, target, context: compactAccountContext(workspace, persona) });
  } catch {
    return { persona, target, reaction: "Groq is unavailable. Verify the Convex deployment and GROQ_API_KEY.", objections: [], missing: [], score: 0, improve: [], live: false, error: "Groq request failed." };
  }
}

export async function researchProspect(domain: string) {
  if (!client) return { status: "unavailable", domain, message: "Convex is not configured" };
  try {
    return await client.action(api.research.researchProspect, { domain });
  } catch {
    return { status: "unavailable", domain, message: "Research service is unavailable" };
  }
}

export async function persistApproval(workspace: AccountWorkspace, persona: string) {
  if (!client) return null;
  try {
    return await client.mutation(api.accounts.approveStrategy, { slug: workspace.id, name: workspace.name, domain: workspace.domain, persona });
  } catch {
    return null;
  }
}
