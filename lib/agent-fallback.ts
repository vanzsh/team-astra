import type { AgentResponse } from "./contracts";

export function fallbackAgentResponse(text: string): AgentResponse {
  const prompt = text.toLowerCase();
  if (prompt.includes("build") && prompt.includes("demo")) return { answer: "The exception-first strategy is the strongest fit. I’ve prepared the personalized Relay demo for approval.", citations: ["relay-capabilities", "gulflink-operations"], action: { type: "generate_demo" }, live: false };
  if (prompt.includes("brief")) return { answer: "I’ll create the meeting brief from the approved account thesis, demo sequence, and evidence already in this workspace.", citations: ["relay-demo-guide", "gulflink-profile"], action: { type: "create_brief" }, live: false };
  if (prompt.includes("evidence") || prompt.includes("why")) return { answer: "The recommendation combines Relay’s approved exception and cross-region visibility capabilities with GulfLink’s synthetic GCC-to-Europe operating context. No real prospect facts are being claimed.", citations: ["relay-capabilities", "gulflink-profile", "gulflink-operations"], action: { type: "none" }, live: false };
  return { answer: "The clearest story is operational control across GCC-to-Europe lanes: open on prioritized exceptions, trace one delayed connection, then close on executive route KPIs.", citations: ["relay-capabilities", "gulflink-operations"], action: { type: "none" }, live: false };
}
