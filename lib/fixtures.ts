import type { AccountWorkspace } from "./contracts";

export const gulfLinkWorkspace: AccountWorkspace = {
  id: "gulflink-logistics",
  name: "GulfLink Logistics",
  domain: "gulflink.example",
  region: "Dubai · GCC · Europe",
  sellerProduct: "Relay",
  researchStatus: "fixture",
  sources: [
    {
      id: "relay-capabilities",
      group: "seller",
      title: "Relay capability brief",
      detail: "Approved seller context",
      truth: "SELLER_CONTEXT",
      excerpt: "Relay supports multi-modal visibility, ETA and delay monitoring, exception detection, prioritized alerts, route performance, cross-region visibility, and executive operational KPIs.",
    },
    {
      id: "relay-demo-guide",
      group: "seller",
      title: "Control tower demo guide",
      detail: "Approved demo context",
      truth: "SELLER_CONTEXT",
      excerpt: "Lead with active operational exceptions, then move from network-level KPIs into route and shipment detail.",
    },
    {
      id: "gulflink-profile",
      group: "prospect",
      title: "GulfLink company profile",
      detail: "Hackathon fixture",
      truth: "SYNTHETIC",
      excerpt: "Synthetic Dubai-based enterprise logistics company with Jebel Ali operations, GCC warehousing and freight operations, and trade lanes into Europe.",
    },
    {
      id: "gulflink-operations",
      group: "prospect",
      title: "Regional operations notes",
      detail: "Seller-provided demo fixture",
      truth: "SYNTHETIC",
      excerpt: "Synthetic context: multiple regional teams need shared cross-region shipment visibility and faster operational exception management.",
    },
  ],
  insights: [
    {
      title: "Cross-region control is the likely executive theme",
      detail: "GulfLink’s synthetic operating profile spans GCC nodes and European trade lanes, making network-level visibility the clearest opening story.",
      truth: "INFERENCE",
      sourceIds: ["gulflink-profile", "gulflink-operations"],
    },
    {
      title: "Exceptions should lead the demo",
      detail: "Prioritized operational exceptions connect Relay’s truthful capabilities to the fixture’s coordination challenge without implying unsupported automation.",
      truth: "INFERENCE",
      sourceIds: ["relay-capabilities", "gulflink-operations"],
    },
  ],
  strategy: {
    persona: "COO",
    objective: "Show how a regional operator can identify and prioritize cross-region shipment risk before reviewing route performance.",
    thesis: "Lead with the morning exception queue, trace one Jebel Ali–Hamburg delay, then close on executive network KPIs.",
    moments: [
      {
        title: "Open on prioritized exceptions",
        capability: "Operational exception detection + prioritized alerts",
        why: "Makes the coordination problem visible in the first 30 seconds.",
        sourceIds: ["relay-capabilities", "gulflink-operations"],
      },
      {
        title: "Trace Jebel Ali to Hamburg",
        capability: "ETA and delay monitoring + multi-modal visibility",
        why: "Connects the story to GulfLink’s synthetic GCC-to-Europe operating context.",
        sourceIds: ["gulflink-profile", "relay-capabilities"],
      },
      {
        title: "Close on network performance",
        capability: "Route performance + executive operational KPIs",
        why: "Gives the COO a concise cross-region outcome view.",
        sourceIds: ["relay-demo-guide", "gulflink-operations"],
      },
    ],
    sourceIds: ["relay-capabilities", "relay-demo-guide", "gulflink-profile", "gulflink-operations"],
    status: "recommended",
  },
  artifacts: [
    {
      id: "relay-demo",
      type: "interactive_demo",
      title: "Personalized Relay demo",
      status: "recommended",
      updatedAt: "Awaiting approval",
    },
    {
      id: "meeting-brief",
      type: "meeting_brief",
      title: "COO meeting brief",
      status: "recommended",
      updatedAt: "Awaiting approval",
    },
  ],
  demo: {
    generic: {
      mode: "generic",
      companyName: "Northstar Logistics",
      subtitle: "Global operations overview",
      narrative: "Monitor active shipments and network health across a generic global logistics network.",
      locations: ["Port Alpha", "Hub Central", "Warehouse East", "Port Delta"],
      kpis: [
        { label: "Active shipments", value: "1,284", delta: "+3.2%" },
        { label: "On-time", value: "91.4%", delta: "+0.8%" },
        { label: "Exceptions", value: "38", delta: "-4 today" },
      ],
      exceptions: [
        { id: "EX-1042", title: "Late vessel departure", route: "Port Alpha → Hub Central", eta: "+18h", impact: "14 shipments", severity: "critical" },
        { id: "EX-1038", title: "Warehouse dwell threshold", route: "Warehouse East", eta: "+6h", impact: "8 shipments", severity: "warning" },
      ],
      shipments: [
        { id: "NS-8421", mode: "Ocean", origin: "Port Alpha", destination: "Hub Central", eta: "Sep 02, 08:30", status: "Delayed" },
        { id: "NS-8394", mode: "Road", origin: "Hub Central", destination: "Warehouse East", eta: "Aug 31, 14:10", status: "On track" },
      ],
      synthetic: true,
    },
    personalized: {
      mode: "personalized",
      companyName: "GulfLink Logistics",
      subtitle: "GCC → Europe exception control",
      narrative: "Start the COO’s morning with cross-region risk: prioritize exceptions from Jebel Ali through European arrival nodes, then inspect route performance.",
      locations: ["Jebel Ali", "Dubai South", "Riyadh Hub", "Hamburg Port"],
      kpis: [
        { label: "GCC–EU shipments", value: "428", delta: "+6.1%" },
        { label: "On-time to Europe", value: "89.7%", delta: "-1.8%" },
        { label: "Priority exceptions", value: "12", delta: "3 critical" },
      ],
      exceptions: [
        { id: "GL-2048", title: "Jebel Ali vessel connection at risk", route: "Jebel Ali → Hamburg", eta: "+22h", impact: "18 shipments", severity: "critical" },
        { id: "GL-2039", title: "Riyadh consolidation dwell", route: "Riyadh Hub → Dubai South", eta: "+7h", impact: "6 shipments", severity: "warning" },
        { id: "GL-2011", title: "Hamburg arrival window stable", route: "Dubai South → Hamburg", eta: "On time", impact: "24 shipments", severity: "stable" },
      ],
      shipments: [
        { id: "GLX-4821", mode: "Ocean", origin: "Jebel Ali", destination: "Hamburg Port", eta: "Sep 03, 11:20", status: "Connection risk" },
        { id: "GLX-4770", mode: "Road", origin: "Riyadh Hub", destination: "Dubai South", eta: "Aug 31, 16:40", status: "Dwell alert" },
        { id: "GLX-4718", mode: "Air", origin: "Dubai South", destination: "Hamburg", eta: "Aug 31, 09:15", status: "On track" },
      ],
      synthetic: true,
    },
  },
};

export const relayCapabilities = [
  "Multi-modal shipment visibility",
  "ETA and delay monitoring",
  "Operational exception detection",
  "Prioritized alerts",
  "Route and location performance",
  "Cross-region operational visibility",
  "Executive operational KPIs",
] as const;
