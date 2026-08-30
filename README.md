# ContextSE

> Turn a prospect domain into an evidence-backed sales strategy and a personalized product demo.

ContextSE is an AI presales workspace for Solutions Engineers. It researches an account, determines what will resonate, creates account-relevant sales assets, and pressure-tests the pitch against buyer personas.

`Prospect domain → Research → Account strategy → Personalized demo → Buyer test`

## Judges: Start Here

The public hackathon build uses a shared Convex demo deployment. You do not need API keys or a `.env.local` file.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app starts in the preloaded **GulfLink Logistics** workspace. For the most reliable judging path, use this workspace before creating a new account.

### Three-Minute Walkthrough

| Step | What to do | What it proves |
| --- | --- | --- |
| 1. Inspect context | In **Sources**, open a Relay source and a GulfLink source. Check the visible **Provided**, **Inference**, and **Synthetic** labels. | Seller truth, prospect context, and generated demo data remain distinguishable. |
| 2. Ask the agent | Click **What should I show the CEO?** or type a question in the center composer. Open any source citation in the response. | Groq reasons from the account workspace instead of answering as a generic chatbot. |
| 3. Review the strategy | Expand **Account brief**, inspect the objective and recommended sequence, then click **Approve strategy**. | Evidence becomes an explicit, human-approved presales plan. |
| 4. See the hero moment | Under **Artifacts**, open **Interactive demo**. Toggle **Before · Generic** and **After · GulfLink**. | The same Relay product becomes an account-specific operating story, not just a logo swap. |
| 5. Use the demo | In the personalized view, switch between **Control tower** and **Shipments**, then select an operational exception. | The output is a working interactive artifact with relevant lanes, KPIs, scenarios, and feature ordering. |
| 6. Open the brief | Return to the workspace and open **Meeting brief**. Try **Print / PDF** or **Download HTML**. | The shared account strategy produces another real, usable sales asset. |
| 7. Pressure-test it | In **Testing Lab**, choose **CFO**, select **Personalized demo**, and click **Test with CFO**. | A separate Groq buyer role returns a score, reaction, objections, missing proof, and improvements. |

### Optional: Show Live Research

Click **Refresh research** at the bottom of Sources. ContextSE calls Context.dev through a Convex action and adds retrieved public-web intelligence as a **Fact**. If the provider is unavailable, the known-good fixture remains intact and the UI reports the failure.

### Optional: Create Another Account

1. Click **New chat**.
2. Enter a company website, discovery material, and meeting objective.
3. Click **Create workspace**.
4. Add a source or click **Refresh research**.
5. Ask the agent what matters and what Relay should show.

The GulfLink fixture is the polished golden path; arbitrary domains demonstrate the reusable account-workspace architecture.

## What to Look For

ContextSE is not a generic chatbot or a reskinned demo generator. It starts before generation:

1. understand the seller and prospect;
2. separate evidence from assumptions;
3. choose a truthful sales strategy;
4. create the right account-specific output;
5. test it from the buyer's perspective.

The four persistent workspace zones keep that loop visible:

- **Workspace & Artifacts** — account conversations and finished work;
- **Sources** — seller context, prospect research, and evidence;
- **AI Solutions Engineer** — grounded reasoning, strategy, and creation;
- **Testing Lab** — buyer reactions, objections, missing proof, and improvements.

## Demo Scenario

The hackathon uses **Relay**, a fictional supply-chain visibility platform, selling to **GulfLink Logistics**, a synthetic prospect.

Relay is limited to seven approved capabilities: shipment visibility, ETA monitoring, exception detection, prioritized alerts, route performance, cross-region visibility, and executive KPIs. ContextSE never invents capabilities outside that boundary.

GulfLink provides a reliable before-and-after experience without presenting synthetic details as real customer facts. Every operational record in the personalized demo is visibly labeled synthetic.

## Built With

- **Next.js, React, TypeScript, and shadcn/ui** — product experience;
- **Convex** — backend, persisted account state, actions, and realtime data;
- **Context.dev** — public-web company intelligence and evidence;
- **Groq** — separate Solutions Engineer and buyer-testing roles;
- **Devin** — substantial engineering execution;
- **Ponytail** — minimal, demo-first engineering discipline.

Provider secrets stay in Convex actions and are never exposed to browser code.

## Use Your Own Backend

The shared deployment requires no setup. To use your own Convex deployment, start Convex in one terminal:

```bash
npm run convex:dev
```

Then configure the deployment from another terminal. Omitting each value opens an interactive prompt and keeps the secret out of shell history:

```bash
npx convex env set GROQ_API_KEY
npx convex env set CONTEXT_DEV_API_KEY
npm run dev
```

Set `NEXT_PUBLIC_CONVEX_URL` to override the shared demo deployment.

## Verify

```bash
npm run typecheck
npm run build
```

## Project Sources of Truth

- [`PROJECT.md`](./PROJECT.md) — product scope, golden path, and truth boundaries;
- [`DESIGN.md`](./DESIGN.md) — visual and interaction direction;
- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) — runtime boundaries;
- [`docs/CONTRACTS.md`](./docs/CONTRACTS.md) — frozen frontend/backend contracts;
- [`AGENTS.md`](./AGENTS.md) — repository constitution and engineering rules.

**One account. One excellent workflow. One obvious transformation.**
