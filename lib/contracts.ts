export type TruthKind = "FACT" | "SELLER_CONTEXT" | "INFERENCE" | "SYNTHETIC";
export type SourceGroup = "seller" | "prospect";

export type Source = {
  id: string;
  group: SourceGroup;
  title: string;
  detail: string;
  truth: TruthKind;
  excerpt: string;
  url?: string;
};

export type AccountInsight = {
  title: string;
  detail: string;
  truth: TruthKind;
  sourceIds: string[];
};

export type DemoMoment = {
  title: string;
  capability: string;
  why: string;
  sourceIds: string[];
};

export type DemoStrategy = {
  persona: string;
  objective: string;
  thesis: string;
  moments: DemoMoment[];
  sourceIds: string[];
  status: "recommended" | "approved";
};

export type DemoKpi = { label: string; value: string; delta: string };

export type DemoException = {
  id: string;
  title: string;
  route: string;
  eta: string;
  impact: string;
  severity: "critical" | "warning" | "stable";
};

export type DemoShipment = {
  id: string;
  mode: "Ocean" | "Air" | "Road";
  origin: string;
  destination: string;
  eta: string;
  status: string;
};

export type DemoConfig = {
  mode: "generic" | "personalized";
  companyName: string;
  subtitle: string;
  narrative: string;
  locations: string[];
  kpis: DemoKpi[];
  exceptions: DemoException[];
  shipments: DemoShipment[];
  synthetic: true;
};

export type Artifact = {
  id: string;
  type: "interactive_demo" | "meeting_brief";
  title: string;
  status: "recommended" | "generating" | "ready" | "error";
  updatedAt: string;
};

export type ConversationMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  citations?: string[];
  live?: boolean;
  error?: boolean;
};

export type AgentAction =
  | { type: "focus_persona"; persona: string }
  | { type: "approve_strategy" }
  | { type: "generate_demo" }
  | { type: "create_brief" }
  | { type: "research" }
  | { type: "test_persona"; persona: string }
  | { type: "none" };

export type AgentResponse = {
  answer: string;
  citations: string[];
  action: AgentAction;
  live: boolean;
  error?: string;
};

export type PersonaTestResult = {
  persona: string;
  target: string;
  reaction: string;
  objections: string[];
  missing: string[];
  score: number;
  improve: string[];
  live: boolean;
  error?: string;
};

export type AccountWorkspace = {
  id: string;
  name: string;
  domain: string;
  region: string;
  sellerProduct: string;
  researchStatus: "fixture" | "researching" | "live" | "unavailable";
  sources: Source[];
  insights: AccountInsight[];
  strategy: DemoStrategy;
  artifacts: Artifact[];
  demo: { generic: DemoConfig; personalized: DemoConfig };
};
