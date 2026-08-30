# ContextSE

ContextSE is a context-native AI presales agent that turns prospect research into an evidence-backed sales strategy and a personalized interactive enterprise software demo. The hackathon scenario prepares the fictional Relay logistics product for the synthetic GulfLink Logistics account.

Built for Solutions Engineers and Presales Engineers, ContextSE organizes each opportunity in an intelligent **Account Workspace**:

`Context → Agent → Outputs`

## Hackathon Goal

Prove one reliable golden path:

`prospect domain` → `public research` → `account understanding` → `use-case selection` → `demo strategy` → `personalized interactive demo`

The standard is one account, one excellent workflow, and one obvious before/after transformation.

## Approved Stack

- **Next.js, React, and TypeScript** — application foundation;
- **shadcn/ui** — UI components using only its required styling primitives;
- **Devin** — substantial engineering execution;
- **Ponytail** — mandatory minimal-engineering ruleset for every coding agent;
- **Convex** — the only application backend, database, persistent state, artifact, and realtime layer;
- **Context.dev** — the public-web research, extraction, company-intelligence, and evidence provider;
- **Groq** — the conversational model gateway.

Substitute frameworks, UI kits, backends, databases, and unnecessary runtime dependencies are out of scope.

## Agent Setup

`/.devin/config.json` requires Ponytail for this repository. Authenticated Devin sessions install it automatically when missing. If needed, run:

```bash
devin auth login
devin plugins install DietrichGebert/ponytail
```

Start a new agent session after installation so the Ponytail rules and skills load.

## Source of Truth

Read these before contributing:

1. [`AGENTS.md`](./AGENTS.md) — repository constitution and engineering rules;
2. [`PROJECT.md`](./PROJECT.md) — product definition, hackathon scope, truth boundaries, and non-goals;
3. [`DESIGN.md`](./DESIGN.md) — visual and interaction direction;
4. [`docs/CONTRACTS.md`](./docs/CONTRACTS.md) — frozen frontend/backend data contracts.

## Run the Reliable Fixture

```bash
npm install
npm run dev
```

The GulfLink workspace and real artifacts work without external credentials. Live conversation and buyer testing require Groq through Convex; missing configuration is identified clearly and never replaced with fake AI.

## Enable Live Services

Start and configure Convex:

```bash
npm run convex:dev
npx convex env set GROQ_API_KEY
npx convex env set CONTEXT_DEV_API_KEY
```

`convex dev` writes the local deployment values used by the browser. Groq powers the Solutions Engineer and buyer tester through separate model roles; Context.dev powers public-web company intelligence. Both providers are called only from Convex actions.

## Verify

```bash
npm run typecheck
npm run build
```
