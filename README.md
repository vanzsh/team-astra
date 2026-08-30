# ContextSE

> Turn a prospect domain into an evidence-backed sales strategy and a personalized product demo.

Presales teams lose hours researching accounts, deciding what will resonate, rebuilding generic demos, and preparing for objections. ContextSE compresses that work into one account workspace.

Give it a prospect. It researches the company, connects evidence to approved product capabilities, recommends the strongest story, creates account-relevant sales assets, and pressure-tests the pitch against buyer personas.

`Prospect domain → Research → Account strategy → Personalized demo → Buyer test`

## The Wedge

**Personalized enterprise software demos.**

Most demo tools start after the seller already knows what to show. ContextSE starts one layer earlier: it determines what matters to the account, why it matters, and which truthful product capabilities should lead the conversation.

The result is not a generic demo with a new logo. It is an account-specific operating story with relevant language, scenarios, locations, KPIs, feature ordering, and evidence.

## What the Hackathon Demo Proves

1. **Research a prospect** from its public domain with Context.dev.
2. **Build an account view** that separates sourced facts, seller context, inferences, and synthetic demo data.
3. **Recommend a strategy** grounded in evidence and approved Relay capabilities.
4. **Create working outputs**: a personalized interactive demo and meeting brief.
5. **Test the pitch** against an adversarial CEO or CFO powered by Groq.
6. **Keep the demo reliable** with a deterministic fixture when external services are unavailable.

## The Workspace

ContextSE keeps the full presales loop visible in four persistent zones:

- **Workspace & Artifacts** — account conversations and generated work;
- **Sources** — seller context, prospect research, and evidence;
- **AI Solutions Engineer** — grounded reasoning, strategy, and creation;
- **Testing Lab** — buyer reactions, objections, missing proof, scores, and improvements.

## Demo Scenario

The hackathon uses **Relay**, a fictional supply-chain visibility platform, selling to **GulfLink Logistics**, a synthetic prospect.

Relay is limited to seven approved capabilities: shipment visibility, ETA monitoring, exception detection, prioritized alerts, route performance, cross-region visibility, and executive KPIs. ContextSE never invents capabilities outside that boundary.

GulfLink gives the demo a reliable before-and-after experience without pretending synthetic details are real customer facts. The same workspace can accept arbitrary prospect domains through Context.dev.

## Built With

- **Next.js, React, TypeScript, and shadcn/ui** — product experience;
- **Convex** — backend, persisted account state, actions, and realtime data;
- **Context.dev** — public-web company intelligence and evidence;
- **Groq** — separate Solutions Engineer and buyer-testing model roles;
- **Devin** — substantial engineering execution;
- **Ponytail** — minimal, demo-first engineering discipline.

Provider secrets stay in Convex actions and are never exposed to browser code.

## Run Locally

The GulfLink workspace and working artifacts run without external credentials:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Missing live credentials are shown explicitly. ContextSE does not replace unavailable AI or research with fake live responses.

## Enable Live Research and AI

Start Convex in one terminal:

```bash
npm run convex:dev
```

Then configure the development deployment from another terminal. Omitting each value keeps the secret out of shell history and opens an interactive prompt:

```bash
npx convex env set GROQ_API_KEY
npx convex env set CONTEXT_DEV_API_KEY
npm run dev
```

Groq powers the Solutions Engineer and buyer tester through separate model roles. Context.dev powers prospect research. Both integrations run behind the Convex backend boundary.

## Verify

```bash
npm run typecheck
npm run build
```

## Project Sources of Truth

Before contributing, read:

1. [`AGENTS.md`](./AGENTS.md) — repository constitution and engineering rules;
2. [`PROJECT.md`](./PROJECT.md) — product scope, golden path, and truth boundaries;
3. [`DESIGN.md`](./DESIGN.md) — visual and interaction direction;
4. [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) — runtime boundaries;
5. [`docs/CONTRACTS.md`](./docs/CONTRACTS.md) — frozen frontend/backend contracts.

The hackathon standard is simple: **one account, one excellent workflow, one obvious transformation.**
