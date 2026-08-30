# ContextSE — Context-Native AI Presales Agent

## Product Definition

ContextSE is a context-native AI presales agent where every prospect receives an intelligent **Account Workspace**. The agent understands both the seller's company and the prospect, reasons about what should resonate, and creates the materials needed to sell to that account.

The primary user is the **Solutions Engineer / Presales Engineer**. The core object is the **Account Workspace**. The core interaction is:

`Context → Agent → Outputs`

The hero wedge is **personalized enterprise software demos**.

ContextSE operates one layer before traditional demo-personalization tools:

`research → account reasoning → sales strategy → determine what should be shown → generate`

The product should not begin with a generic content generator or a generic chat interface. It should start from a specific account, assemble a defensible understanding of that account, and turn that understanding into useful presales work.

# Hackathon Mode — August 30

This section overrides long-term scope for the event.

The hackathon proves only this loop:

`prospect domain`
→ `public research`
→ `account understanding`
→ `use-case selection`
→ `demo strategy`
→ `personalized interactive demo`

The product UI has four persistent zones. The center remains dominant.

### Far Left — Workspace / Artifacts

Global account conversations and real generated work product for the opportunity.

Examples:

- Personalized Interactive Demo;
- Meeting Brief / PDF;
- Executive Presentation;
- HTML / Microsite;
- ROI Model.

### Left — Context / Sources

Everything the agent knows, grouped as:

**OUR COMPANY**

- seller capabilities;
- documentation;
- case studies;
- demo/product information;
- approved context.

**PROSPECT**

- prospect website;
- public research;
- discovered sources;
- seller-provided account context;
- evidence.

### Center — AI Solutions Engineer

A real grounded conversation where the user investigates, challenges assumptions, reviews research, gets strategy recommendations, and creates presales outputs.

### Right — Testing Lab

An adversarial buyer simulation where the user tests strategy and artifacts against account-aware personas such as CEO and CFO, then receives objections, missing proof, a score, and prioritized improvements.

For the hackathon:

## P0

- Personalized Interactive Demo;
- Real Meeting Brief / PDF or equivalent downloadable artifact;
- Real HTML output / demo experience;
- evidence-backed recommendation.

## P1

- PPTX if stable and cheap to implement.

## P2

Everything else.

## Product Thesis

Presales work is most valuable when it is account-specific. A generic demo explains a product; an account-aware demo demonstrates why the product matters to this prospect, in this operating context, with this set of priorities.

ContextSE gives a Solutions Engineer a workspace that connects seller truth, prospect evidence, reasoning, strategy, and final work product. The agent should make its reasoning inspectable: facts are backed by sources, seller statements come from approved seller context, conclusions are clearly presented as inferences, and generated operational examples are clearly synthetic.

The intended transformation is not merely visual rebranding. It is a shift from a generic product walkthrough to an account-relevant operating story: what the prospect likely cares about, which truthful capabilities address that need, what should be shown first, and how the story should be framed.

## Hackathon Demo Product

For the demo, the Solutions Engineer works for the fictional seller **Supply X**, whose enterprise logistics SaaS product is called **Relay**.

Relay is a **Supply Chain Visibility / Operations Control Tower**.

Its truthful capability boundary for the hackathon is:

1. multi-modal shipment visibility;
2. ETA and delay monitoring;
3. operational exception detection;
4. prioritized alerts;
5. route/location performance;
6. cross-region operational visibility;
7. executive operational KPIs.

No generated demo may imply Relay supports capabilities outside this list.

## Generic Foundation Prospect

Do not hard-code the hackathon around a real customer. The foundation can use a fictional company fixture:

# Gulf Logistics

Synthetic profile:

- Dubai-based enterprise logistics company;
- Jebel Ali operations;
- GCC warehousing and freight operations;
- trade lanes into Europe;
- multiple regional teams;
- cross-region shipment visibility challenges;
- operational exception-management needs.

Gulf Logistics is entirely synthetic. It exists only so the frontend can demonstrate the system before live Context.dev integration exists. Every Gulf Logistics detail must be treated as synthetic demo context.

The eventual system must accept arbitrary real prospect domains. Its conceptual flow is:

`real domain`
→ `Context.dev`
→ `AccountResearch`
→ `DemoStrategy`
→ `DemoConfig`
→ `artifact renderers`

The frontend rendering architecture must not need to change to support real prospect domains later.

## Hero Moment

This is the P0 visual product moment.

### BEFORE

Relay is a generic logistics product demo.

Generic:

- companies;
- routes;
- facilities;
- shipments;
- alerts;
- terminology;
- operational story.

### USER ACTION

The Solutions Engineer adds a prospect. The agent:

- researches;
- understands;
- determines what matters;
- maps prospect priorities to truthful Relay capabilities;
- recommends the strongest demo narrative.

### AFTER

Relay becomes a prospect-relevant demonstration.

The following may change:

- company identity;
- terminology;
- locations;
- entities;
- scenarios;
- synthetic data;
- workflows emphasized;
- feature ordering;
- KPI framing;
- narrative;
- account-specific evidence.

The important distinction is non-negotiable:

- **real prospect facts are evidence-backed;**
- **operational demo records are synthetic and must be labeled as such.**

## Long-Term Direction

The Account Workspace is the durable product primitive. It accumulates the seller context, prospect context, evidence, research, reasoning, recommended strategy, approvals, and generated outputs required to advance one opportunity.

Over time, the workspace can support multiple presales artifacts, but they must derive from shared account understanding rather than independent prompts. A meeting brief, executive presentation, interactive demo, HTML microsite, and ROI model should be different expressions of the same evidence-backed account strategy.

The agent’s role is not to replace the Solutions Engineer’s judgment. It should accelerate research, surface assumptions for challenge, explain why a recommendation is appropriate, help choose the strongest truthful narrative, and build approved work product. The human remains able to investigate, correct context, challenge conclusions, and approve creation.

## Non-Goals for the Hackathon

We are **not** building:

- CRM;
- authentication;
- billing;
- teams/permissions;
- generic chatbot;
- generic RAG platform;
- email sequencing;
- SDR replacement;
- full logistics product;
- multiple verticals;
- arbitrary website builder;
- generic presentation editor;
- production multi-tenancy;
- unnecessary infrastructure.

The standard is:

> One account. One excellent workflow. One obvious before/after transformation.
