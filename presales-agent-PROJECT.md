# PROJECT.md

## Product

A context-native **AI presales agent** for enterprise sales teams.

For every prospect or deal, the agent creates a dedicated workspace containing everything the company already knows about the prospect, everything the seller chooses to provide, and everything the agent can learn from public sources.

The user can then work with the agent like a highly capable Solutions Engineer: research the account, reason about what matters to the buyer, determine the best sales narrative, plan the demo, and generate or deploy personalized sales materials including interactive demos, presentations, microsites, PDFs, proposals, ROI models, and other deal-specific assets.

The core promise is simple:

> **Give the agent everything you know about the account. It figures out what will resonate and builds what you need to sell to them.**

---

# 1. Problem

Enterprise software demos and presales materials are still heavily manual.

Before an important customer meeting, Solutions Engineers and sales teams often have to:

- research the company;
- understand its business model;
- understand the target buyer;
- review discovery notes and previous conversations;
- identify relevant product capabilities;
- decide what story to tell;
- customize demo data;
- modify presentations;
- prepare proposals;
- create ROI arguments;
- adapt landing pages or demo environments;
- coordinate all of this across multiple people and tools.

The problem is not simply **creating a deck** or **changing a logo**.

The expensive part is the reasoning beforehand:

> **What does this customer care about, what should we show them, and how should our product be presented so that they immediately understand its value?**

That work is repeated for every important account.

---

# 2. Product Thesis

Presales should become **context-native and agentic**.

Instead of manually moving information between research tools, CRM records, documents, presentation software, demo environments, and coding tools, every prospect should have an intelligent workspace.

The agent should understand two worlds simultaneously:

### Our Company

Everything relevant about what the seller can actually offer:

- products;
- features;
- capabilities;
- positioning;
- approved messaging;
- limitations;
- customer stories;
- case studies;
- pricing;
- previous demos;
- presentation decks;
- product documentation;
- templates;
- existing websites and demo environments.

### Their Company

Everything relevant about the prospect:

- company website;
- industry;
- products and services;
- geography;
- customers;
- business model;
- strategic priorities;
- terminology;
- current initiatives;
- target persona;
- discovery notes;
- CRM information;
- emails;
- call transcripts;
- uploaded documents;
- requirements;
- objections;
- previous interactions;
- public information.

The agent's job is to intelligently connect these two context sets.

```text
OUR COMPANY
Products
Capabilities
Proof
Messaging
Assets
        │
        │
        ▼
   PRESALES AGENT
        ▲
        │
        │
THEIR COMPANY
Needs
Priorities
People
Context
Signals
```

The result is not merely research.

The result is **actionable, prospect-specific sales execution**.

---

# 3. Primary User

The initial user is a:

## Solutions Engineer / Presales Engineer

They already know the product deeply.

Their problem is not a lack of intelligence.

Their problem is that preparing excellent account-specific demos and materials takes too much time.

The agent should therefore feel like:

> **an additional Solutions Engineer who has already read everything, researched the account, understands the product, and can build.**

Secondary users may eventually include:

- Account Executives;
- Revenue Enablement;
- Sales Engineers;
- Enterprise SDRs;
- Product Marketing;
- Customer Success;
- Solution Architects;
- Partnerships teams.

The MVP remains optimized for **presales**.

---

# 4. Core Product Object: Account Workspace

The fundamental unit of the product is not a conversation.

It is an:

# Account Workspace

Example:

```text
ACME CORPORATION
Enterprise Opportunity
```

Everything connected to that opportunity lives within the workspace.

The user can provide as much or as little context as they have.

At minimum:

```text
acme.com
```

Optionally:

- target persona;
- discovery notes;
- CRM data;
- PDFs;
- presentations;
- emails;
- transcripts;
- requirements;
- existing proposals;
- screenshots;
- spreadsheets;
- internal notes;
- other relevant context.

The system enriches this with external account research.

All reasoning and generated assets remain attached to the account.

---

# 5. Persistent Seller Context

The seller should not need to explain their own company again for every account.

There is a persistent **Company Context** shared across account workspaces.

It may contain:

```text
COMPANY
│
├── Product documentation
├── Existing sales decks
├── Demo environment
├── Landing pages
├── Features
├── Positioning
├── Case studies
├── Pricing
├── Approved messaging
├── Brand assets
├── Previous successful demos
└── Other company knowledge
```

When a new prospect workspace is created, the agent automatically understands:

> **what we can sell**

before researching:

> **what this prospect needs.**

---

# 6. Agent Role

The agent is not a chatbot attached to a document repository.

It should behave like an autonomous presales partner.

Its responsibilities are:

### Understand

Build a strong model of the prospect and the seller.

### Investigate

Identify missing information and research it.

### Reason

Determine which customer problems are most relevant to the seller's capabilities.

### Strategize

Recommend how the account should be approached.

### Plan

Determine what story, workflow, product features, and proof should be shown.

### Create

Produce the actual materials required.

### Execute

When appropriate, modify or deploy personalized demo experiences.

### Explain

Every important recommendation should be traceable to evidence.

---

# 7. Agent Operating Loop

The core agent loop is:

```text
INGEST
   ↓
UNDERSTAND
   ↓
RESEARCH
   ↓
SYNTHESIZE
   ↓
RECOMMEND
   ↓
BUILD
   ↓
REVIEW
   ↓
DELIVER
```

More specifically:

## Step 1 — Ingest

Understand:

- seller context;
- prospect context;
- meeting objective;
- target persona;
- available materials.

## Step 2 — Understand

Create an internal account model:

```text
Who are they?
What do they do?
What matters to them?
Who are we selling to?
What problems might exist?
What do we know versus infer?
```

## Step 3 — Research

Fill relevant information gaps through external research.

Do not collect information merely because it exists.

Research should be driven by the sales objective.

## Step 4 — Synthesize

Map:

```text
PROSPECT PRIORITY
        ↓
RELEVANT PROBLEM
        ↓
OUR CAPABILITY
        ↓
PROOF / EVIDENCE
        ↓
BEST DEMO STORY
```

## Step 5 — Recommend

Tell the user what the agent believes should be created.

Example:

> For this account, I recommend leading with your supply-chain visibility workflow rather than inventory optimization. Their recent expansion creates a stronger narrative around cross-region operational visibility.

Then recommend outputs such as:

- interactive demo;
- executive presentation;
- microsite;
- ROI model.

## Step 6 — Build

Generate the approved assets.

## Step 7 — Review

Check:

- factual consistency;
- seller capability accuracy;
- prospect relevance;
- unsupported claims;
- contradictions;
- visual quality;
- narrative coherence.

## Step 8 — Deliver

Present all outputs as reusable account assets.

---

# 8. Agent Autonomy

The agent should be proactive.

The user should not need to know every artifact they need before using the product.

Instead of:

> “Create me a six-slide presentation.”

The user may simply say:

> “I have a meeting with Acme's COO tomorrow.”

The agent should be capable of responding:

> I recommend preparing three things:
>
> 1. a short executive deck focused on operational visibility;
> 2. a personalized interactive demo using Acme-specific scenarios;
> 3. a one-page ROI model for the COO.
>
> I can build all three.

The user retains control.

The agent provides judgment.

---

# 9. Core Interaction Model

The ideal interaction model is inspired by the simplicity of NotebookLM:

## Left — Context

Everything the agent knows.

Example:

```text
SOURCES

OUR COMPANY
✓ Product Deck
✓ Product Documentation
✓ Case Studies
✓ Demo Environment

ACME
✓ acme.com
✓ Discovery Call
✓ CRM Notes
✓ COO Interview
✓ Annual Report
✓ Uploaded Requirements
```

## Center — Agent

The reasoning and collaboration surface.

Example:

```text
What should we show Acme tomorrow?

Based on the account context, I would lead with...
```

This is where the user can:

- ask questions;
- investigate;
- brainstorm;
- challenge assumptions;
- plan;
- request assets;
- refine strategy.

## Right — Outputs

Everything produced for the deal.

```text
ACCOUNT ASSETS

▶ Personalized Demo
▤ Executive Deck
▤ ROI Model
◇ Microsite
▤ Meeting Brief
```

This creates a simple conceptual model:

# Context → Agent → Output

---

# 10. Personalized Demo

The hero output is the:

# Personalized Interactive Demo

This should go significantly beyond replacing logos.

The generated demo should adapt:

- company name;
- branding;
- terminology;
- locations;
- products;
- business units;
- example customers;
- realistic entities;
- scenarios;
- sample data;
- relevant workflows;
- features shown;
- order of the product journey;
- narrative;
- pain points;
- proof.

The objective is:

> **The prospect should feel like they are seeing their own business inside the seller's product.**

Example:

A generic supply-chain demo might contain:

```text
Warehouse A
Supplier 18
Shipment 4812
Route 01
```

A prospect-specific demo could contain:

```text
Jebel Ali
Rotterdam
Container DXB-2814
UAE → Netherlands
Port congestion
Estimated delay: 14 hours
```

The underlying seller product remains truthful.

Personalization should improve relevance, not fabricate capabilities.

---

# 11. Demo Generation Philosophy

There are two valid demo-generation modes.

## Mode A — Personalize Existing Demo

The seller already has a product demo or demo environment.

The agent:

1. understands the environment;
2. selects the most relevant areas;
3. modifies permitted content;
4. injects prospect-specific data;
5. changes narrative and sequence;
6. prepares a personalized deployment.

This will likely be the most common enterprise workflow.

## Mode B — Build a New Interactive Experience

The seller provides reusable product components or templates.

The agent constructs a new interactive demo experience around the prospect.

The product should eventually support both.

---

# 12. Other Generated Outputs

The agent should eventually be capable of generating:

### Presentations

Prospect-specific executive decks.

### Microsites

Personalized landing pages or deal rooms.

### PDFs

Proposals, briefs, reports, leave-behinds.

### ROI Models

Prospect-specific financial/business cases.

### Meeting Briefs

Everything the seller needs before the call.

### Demo Scripts

Narrative and speaking guidance.

### Discovery Plans

Questions worth asking based on missing information.

### Follow-up Materials

Assets derived from what happened during the meeting.

These are not separate products.

They are different **renderings of the same account intelligence**.

---

# 13. Context.dev Role

Context.dev powers the agent's understanding of the prospect's public world.

The role is not:

> scrape their homepage.

The role is:

> **turn the prospect's public web presence into useful account intelligence.**

The agent may extract:

- business model;
- products;
- services;
- industries;
- regions;
- facilities;
- terminology;
- strategic messaging;
- positioning;
- customer types;
- public initiatives;
- relevant operational context;
- branding;
- evidence supporting each conclusion.

Context.dev should help answer:

> **What does this company care about that should change what we show them?**

External research must feed directly into the agent's reasoning and generated artifacts.

---

# 14. Evidence and Trust

This is enterprise sales software.

Hallucination is unacceptable.

The agent must distinguish:

### FACT

Directly supported by provided or retrieved evidence.

### INFERENCE

Reasonable conclusion based on evidence.

### SELLER CONTEXT

Information supplied by the seller.

### SYNTHETIC

Information created specifically for a demo scenario.

Generated demos may contain synthetic data, but it must never be presented as real prospect data.

For important account conclusions, the user should be able to inspect:

```text
WHY THIS WAS CHOSEN
```

Example:

> Showing multi-region shipment visibility because Acme publicly operates across 14 markets and your discovery notes identified fragmented regional operations as a concern.

Evidence should make the agent more trustworthy and the product feel materially more sophisticated.

---

# 15. Agent Principles

## Research only what matters

Do not scrape the internet indiscriminately.

Research is goal-driven.

## Never invent seller capabilities

If the seller cannot do something, the generated demo must not imply that it can.

## Separate fact from synthetic demonstration

A realistic demo is valuable.

Pretending synthetic data is real is not.

## Recommend before generating expensive outputs

For major artifacts, explain the intended strategy first.

## Optimize for buyer relevance

The goal is not maximal personalization.

The goal is:

> **show the right thing to the right person.**

## Preserve seller control

Users can:

- approve;
- reject;
- edit;
- regenerate;
- constrain;
- manually specify context.

## Reuse knowledge

Account intelligence should compound over time rather than disappear after each conversation.

---

# 16. Initial Workflow

The simplest product experience:

### 1. Create account

```text
Company domain:
[ acme.com ]

Target persona:
[ COO ]

Additional context:
[ + Add files ]
```

### 2. Agent researches

Build prospect intelligence automatically.

### 3. Workspace opens

User sees:

- sources;
- prospect summary;
- agent;
- outputs.

### 4. Agent recommends strategy

Example:

> Acme appears to be expanding internationally. Based on their public operations and your product capabilities, I recommend centering the demo around cross-region visibility.

### 5. User collaborates

They can challenge, add context, or approve.

### 6. Agent generates

Example:

```text
BUILDING

✓ Account narrative
✓ Demo scenario
✓ Synthetic account data
✓ Executive presentation
✓ Personalized demo
```

### 7. Outputs appear

The seller starts the meeting with the work already prepared.

---

# 17. Hackathon MVP

The hackathon should prove one thing exceptionally well:

# Prospect context can automatically become a compelling personalized demo.

The demo flow:

```text
PROSPECT DOMAIN
      ↓
PUBLIC RESEARCH
      ↓
ACCOUNT UNDERSTANDING
      ↓
USE-CASE SELECTION
      ↓
DEMO STRATEGY
      ↓
PERSONALIZED DEMO
```

The exact vertical remains intentionally open until the team selects the use case that provides the strongest combination of:

- obvious personalization;
- enterprise willingness to pay;
- public prospect information;
- visually compelling demo data;
- understandable buyer problem.

Supply chain / logistics remains one strong candidate, but it is **not hard-coded into the product vision**.

---

# 18. Hackathon Hero Moment

The most important visual moment should be:

### BEFORE

A generic enterprise software demo.

Then enter:

```text
prospect.com
```

The agent investigates.

The user sees:

```text
UNDERSTANDING ACCOUNT
RESEARCHING BUSINESS
MATCHING USE CASES
PLANNING DEMO
GENERATING ENVIRONMENT
```

Then:

### AFTER

The same product now feels built for that prospect.

The correct:

- scenario;
- terminology;
- entities;
- workflows;
- product modules;
- narrative;
- evidence

have changed.

The judges should understand the value without needing it explained.

---

# 19. Product Positioning

Do not position this as:

> AI that customizes demos.

That space already exists and undersells the product.

Do not position this as:

> AI sales content generator.

Too generic.

The stronger framing is:

> **An AI presales agent that understands every account and builds what the team needs to sell to them.**

The wedge is personalized demos.

The broader product is the **context and execution layer for presales**.

---

# 20. Competitive Boundary

Existing demo tools generally help teams:

- capture demos;
- edit demos;
- personalize existing demos;
- build interactive product tours.

Our thesis begins one layer earlier:

> **What demo should this prospect see in the first place?**

The agent performs:

```text
RESEARCH
→ ACCOUNT REASONING
→ SALES STRATEGY
→ DEMO DESIGN
→ GENERATION
```

rather than requiring the Solutions Engineer to do the first four steps manually.

Long term, the product may integrate with existing demo platforms rather than needing to replace all of them.

---

# 21. Long-Term Vision

Every enterprise opportunity should eventually have its own intelligent account environment.

The agent should learn continuously from:

- discovery calls;
- CRM activity;
- prospect research;
- meetings;
- emails;
- product updates;
- previous demos;
- customer objections;
- sales outcomes.

Over time it should understand:

> what this account cares about;

> what our company can offer;

> what we've already shown them;

> what worked;

> what they objected to;

> what should happen next.

The output can change depending on the moment:

```text
FIRST OUTREACH
→ Personalized microsite

DISCOVERY
→ Research + question plan

DEMO
→ Personalized environment

PROCUREMENT
→ Business case + security materials

FOLLOW-UP
→ Tailored proposal

EXPANSION
→ New use-case demo
```

The durable product is therefore not a demo generator.

It is:

# **the intelligent working layer between a company and every account it is trying to win.**

---

# 22. North-Star Experience

A Solutions Engineer should be able to open the product before an important meeting and think:

> **“It already knows the account, it already knows our product, and most of my preparation is already done.”**

That is the standard.

---

# 23. North-Star Outcome

Today:

```text
Account research
+ demo planning
+ customization
+ asset creation
= hours or days
```

Target:

```text
Add account
→ review agent strategy
→ approve
→ ready-to-use personalized materials
= minutes
```

The product wins when Solutions Engineers spend their time on:

- judgment;
- customer conversations;
- technical depth;
- deal strategy;

instead of repetitive preparation.

---

# 24. Product Non-Goals

For the initial product, do not become:

- a CRM;
- a generic chatbot;
- a generic document generator;
- an email sequencing platform;
- an SDR replacement;
- a generic website builder;
- a generic presentation tool;
- a full sales engagement platform;
- a generic company-research product.

All functionality should reinforce:

> **understand this account → determine what will resonate → build what the presales team needs.**

---

# 25. Canonical Product Definition

> **A context-native AI presales agent where every prospect gets its own intelligent workspace. The agent combines everything the seller knows about its own company with everything available about the prospect, works with the Solutions Engineer to determine the strongest account strategy, and then creates or deploys personalized demos, presentations, microsites, proposals, and other materials needed to win the deal.**

## Hero wedge

**Personalized enterprise software demos.**

## Primary user

**Solutions Engineers / Presales.**

## Core object

**Account Workspace.**

## Core interaction

**Context → Agent → Execution.**

## Core advantage

**The system determines what should be shown before generating it.**

## Ultimate vision

**Every account gets an AI Solutions Engineer that already knows both sides of the deal.**
