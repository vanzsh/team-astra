import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import type { AccountWorkspace, AgentResponse, ConversationMessage, PersonaTestResult, Source } from "./contracts";

const defaultConvexUrl = "https://perfect-monitor-827.eu-west-1.convex.cloud";
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL?.trim() || defaultConvexUrl;
const client = new ConvexHttpClient(convexUrl);

export const backendMode = process.env.NEXT_PUBLIC_CONVEX_URL ? "convex" : "demo";

export function compactAccountContext(workspace: AccountWorkspace, persona: string) {
  return JSON.stringify({
    account: { name: workspace.name, domain: workspace.domain, region: workspace.region, truth: "SYNTHETIC" },
    seller: { company: workspace.sellerCompany, product: workspace.sellerProduct },
    opportunity: `${workspace.sellerCompany} is preparing to present ${workspace.sellerProduct} to ${workspace.name}`,
    persona: `${persona} at ${workspace.name}`,
    insights: workspace.insights,
    strategy: { ...workspace.strategy, persona },
    sources: workspace.sources.map(({ id, filename, truth, excerpt }) => ({ id, filename, truth, excerpt })),
    artifacts: workspace.artifacts,
  });
}

export async function converse(workspace: AccountWorkspace, persona: string, messages: ConversationMessage[], text: string): Promise<AgentResponse> {
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
  try {
    return await client.action(api.agent.testPersona, { persona, target, context: compactAccountContext(workspace, persona) });
  } catch {
    return { persona, target, reaction: "Groq is unavailable. Verify the Convex deployment and GROQ_API_KEY.", objections: [], missing: [], score: 0, improve: [], live: false, error: "Groq request failed." };
  }
}

export async function researchProspect(domain: string) {
  try {
    return await client.action(api.research.researchProspect, { domain });
  } catch {
    return { status: "unavailable", domain, message: "Research service is unavailable" };
  }
}

export async function persistApproval(workspace: AccountWorkspace, persona: string) {
  try {
    return await client.mutation(api.accounts.approveStrategy, { slug: workspace.id, name: workspace.name, domain: workspace.domain, persona });
  } catch {
    return null;
  }
}
