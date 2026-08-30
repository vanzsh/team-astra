# SimsWorld — Master Prompt

Build SimsWorld, our second product. The first product, Astra (in `../frontend/`, still on `main`), generates a personalized product demo for a prospect. SimsWorld does not. SimsWorld is a **rehearsal room** where a Solution Architect / Solutions Engineer can practice, stress-test, and pressure-test their pitch against **simulated versions of the real people they are about to meet** — before the meeting happens.

The SA does not want another asset to send. The SA wants to walk into the room already having heard the CFO's objections, already having answered them, already knowing which slide gets skipped when the Practice Owner leans back in their chair. SimsWorld makes that possible.

Everything below is source of truth. When any decision downstream conflicts with something here, this document wins unless the SA explicitly overrides in chat.

---

## 1. Product concept in one paragraph

SimsWorld is a workspace an SA sets up per account. The SA drops in their own product materials (demos, docs, decks, case studies, discovery-call transcripts, ROI models). SimsWorld ingests the account: the company itself and, more importantly, the specific humans in the buying committee. For each real human, SimsWorld builds a **simulated persona** — a role-played agent grounded in what that person has actually written, posted, said, and shipped, plus the company's public and provided context. The SA then rehearses: chats with the CFO persona, pitches to the CTO persona, runs a mock demo call with all three personas in the room, and gets back honest, in-character objections, questions, and body-language cues. The output of a session is not a deliverable to send — it is a stronger SA walking into the actual meeting.

## 2. Who this is for

**Primary user:** Solutions Architect / Solutions Engineer at a B2B software company, sold to mid-market and enterprise, deal cycle 3+ weeks, deal size $50k+, meetings with 2–6 stakeholder committees. Rehearses before demos, discovery calls, executive readouts, and RFP presentations.

**Secondary user:** Account Executive prepping the SA, or the SA's manager reviewing a rehearsal replay to coach.

**Not this user:** BDR/SDR sending cold outbound (wrong stage), CS running QBRs (post-sale, different context), founder pitching investors (different meeting shape).

## 3. Job to be done

> "Before my [demo / discovery / executive readout] tomorrow with [named human at named company], let me walk through the meeting with a version of them that objects the way they will, so I do not get surprised in the room."

Success = SA closes their laptop after a rehearsal session feeling they know 3 things they did not know an hour ago: (1) the sharpest objection each stakeholder will raise, (2) which part of their existing pitch actually lands vs which part they thought landed, (3) one thing to change before tomorrow.

## 4. Golden path (the demo-day flow)

1. **SA lands on a home screen.** Empty state: "Start a new rehearsal." Existing rehearsals listed if any.
2. **SA creates a rehearsal**: types a domain (`novadentalclinic.ae`) and one line of context (`pitching Relay for no-show recovery, 30-min slot Thu 3pm, primary contact Dr. Aisha Rashid (Practice Owner)`).
3. **SA drops sources**: uploads / pastes their product deck, feature docs, dental case study, discovery-call transcript. Marks a subset of them "Our Product." Everything else is optional context.
4. **SimsWorld researches — visibly.** Split-screen animation: left column shows "Learning your product" (crawling SA-provided docs); right column shows "Learning the client" (crawling `novadentalclinic.ae`, LinkedIn profiles of named + inferred stakeholders, Google reviews, press mentions, careers page, funding data). Every source becomes a citation chip with `FACT / INFERENCE / SYNTHETIC` truth label from day one.
5. **Workspace loads.** Three columns:
   - **Left rail — Sources**: two groups. "OUR PRODUCT" (SA's uploads). "THE BUYING COMMITTEE" (per-person source clusters: LinkedIn snapshot, posts, public bio, mutual-connection notes, inferred org fit).
   - **Center — Rehearsal room**: default view is a stage with the personas SimsWorld generated seated at the table. Each persona is a card with face (initial), name, role, motivation, top 3 things they care about, top 2 things they push back on. SA can start a **1:1 conversation** with one persona, or a **group meeting** with all of them.
   - **Right rail — Rehearsal library**: past sessions with this account, coaching notes, replay of last rehearsal, "insights I've built up about this deal."
6. **SA clicks "Start rehearsal — full meeting."** A chat opens. SimsWorld plays all personas in sequence, in-character, referencing the SA's uploaded product materials by name and pushing back with objections grounded in the person's real public content ("I saw on your LinkedIn you spent 3 years at [competitor] — how is Relay different from what you built there?").
7. **SA responds.** Each persona reacts in-character. SimsWorld tracks **which SA claims went unchallenged that should have been challenged, and which claims landed with all three personas.**
8. **Rehearsal ends.** SimsWorld generates a **coaching brief** in the right rail — not the leave-behind, the private prep note: "The Clinical Lead never got their real concern (clinical workflow disruption) addressed. Practice Owner accepted your ROI figure without pushback — expect harder pushback in the room from the real one because her LinkedIn shows she trained as a CPA. Suggested rewrite of your opening line: [line]."

**The wow moment for demo day (3-min judge slot):** SA types `novadentalclinic.ae` → SimsWorld generates 3 real-looking personas grounded in LinkedIn/site data in 20 seconds → SA starts a rehearsal → the Practice Owner persona pushes back on the pricing slide with an objection nobody at the judging table would have predicted, and the objection is grounded in a specific citation the judges can hover to inspect ("From Dr. Rashid's LinkedIn post 3 weeks ago: 'the last software vendor promised savings, delivered a subscription bill'"). Judges see the personas think.

## 5. Data model — Convex schema

Use Convex for all persisted state. Tables:

- **accounts** — one per prospect company. `slug`, `domain`, `displayName`, `industry`, `size` (headcount range), `createdBy`, `updatedAt`.
- **sources** — a piece of raw context. `accountId`, `owner` (`seller | prospect`), `kind` (`product-doc | product-demo | case-study | discovery-transcript | crm-note | website | linkedin-profile | linkedin-post | review-corpus | press | inferred`), `title`, `contentRef` (Convex storage id or URL), `citationExcerpts` (array of `{quote, offset}`), `truth` (`FACT | SELLER_CONTEXT | INFERENCE | SYNTHETIC`), `createdAt`.
- **people** — real humans on the buying committee. `accountId`, `fullName`, `role`, `linkedinUrl`, `linkedinSnapshotRef`, `bio`, `signals` (array of `{type, text, sourceId}` where type is `objection-pattern | value-driver | career-arc | writing-style | tenure-hint`), `certainty` (`confirmed | inferred`), `updatedAt`.
- **personas** — the *simulated* version of a `people` row, ready for rehearsal. `accountId`, `personId` (nullable if fully inferred), `displayName`, `avatarInitials`, `roleLabel`, `motivations` (top 3), `objections` (top 3, each with `{text, groundingSourceIds}`), `dealSignal` (`champion | economic-buyer | technical-gate | blocker | wildcard`), `simulationPrompt` (the actual system prompt SimsWorld uses when speaking as this persona — includes voice, register, and grounding excerpts).
- **rehearsals** — one session. `accountId`, `mode` (`one-to-one | full-meeting`), `personaIds` (array), `startedAt`, `endedAt`, `sellerGoal` (SA's one-line objective), `productFocus` (which source `product-*` docs were in scope).
- **turns** — messages inside a rehearsal. `rehearsalId`, `speaker` (`sa | persona:<personaId> | simsworld-narrator`), `content`, `citations` (source ids), `evaluation` (`{claimsMade, claimsChallenged, claimsAccepted}`), `createdAt`.
- **coachingBriefs** — post-rehearsal analysis. `rehearsalId`, `strengths`, `weaknesses`, `unaddressedObjections`, `suggestedRewrites`, `generatedAt`.

Every persona references its source citations. No persona claim is renderable without at least one source. Personas without grounding fall back to `SYNTHETIC` label and the UI shows that badge.

## 6. Tech stack

**Frozen. Do not substitute.**

- **Frontend:** Next.js 16 + React 19 + TypeScript. Tailwind 4 + shadcn/ui for base components. Route-first (`app/` router). Persona conversation UI uses streamed responses.
- **Backend / DB / realtime:** Convex. All persisted state, all mutations, all realtime subscriptions.
- **Research + LLM calls:** Context.dev for prospect and person research, OpenRouter (Claude Sonnet 5 default, downgrade tier configurable) for persona simulation. Both called only from Convex actions. Keys are Convex env vars, never `NEXT_PUBLIC_`.
- **LinkedIn data:** for the hackathon, a **provider-agnostic adapter** in `convex/linkedin.ts` with two implementations: `fixture` (returns hardcoded plausible profiles per demo domain) and `stub-live` (returns "not-implemented" error). Do not attempt to scrape LinkedIn directly; adapter accepts a future licensed-provider swap (Apollo, ZoomInfo, LI Sales Navigator API) without any renderer change.
- **File uploads:** Convex storage for SA-uploaded docs. Do not add S3, Uploadthing, or third-party file hosts.
- **No other runtime dependencies without justification.** No component library beyond shadcn. No ORM. No API gateway. No backend framework beyond Convex.

Reuse the `docs/ARCHITECTURE.md`, `docs/CONTRACTS.md`, `lib/contracts.ts`, and `lib/fixtures.ts` shape patterns from the v1 scaffold (`../app/`, `../convex/`, `../lib/` in the repo). Same discipline: typed contracts, fixture fallback, secrets server-side, truth labels on every citation.

## 7. MVP scope for hackathon

Ship, in order:

1. **Home screen** — new rehearsal button + list of existing accounts (fixture-seeded with Nova Dental).
2. **Create-rehearsal screen** — domain input, one-line context, drag-drop SA sources.
3. **Research animation** — 3–5 second scripted progress, then workspace opens.
4. **Workspace three-column layout** — sources left, rehearsal center, library right.
5. **Persona generation** — 3 personas for Nova Dental, all fixture-grounded, all citing at least 2 sources each.
6. **1:1 rehearsal chat with one persona** — SA types, persona responds in-character with citations. Live streaming.
7. **Coaching brief generation** — post-session summary with unaddressed objections and one suggested rewrite.

**MVP does not include:**
- Full-meeting mode with all 3 personas at once (v2).
- Voice mode / TTS (v3).
- Video / avatar rendering (never).
- SA account / auth (v2 — hardcode a fake user).
- Multi-account switching (v2).
- Real LinkedIn scraping (post-hackathon, with licensed provider).
- Post-meeting review — comparing rehearsal to actual meeting outcome (v3).

If a feature is not in the ship list above, do not build it, even if it looks easy. Time gets spent on the golden path polish.

## 8. Anti-goals

- **Not a demo generator.** Do not build any flow that produces a client-facing asset. If the SA asks for a "leave-behind," SimsWorld says "you're thinking of v1 — this workspace prepares you for the meeting, it doesn't send anything to the client."
- **Not a chatbot playground.** Personas are grounded, not general-purpose. If a source does not support a persona claim, the persona says "I don't have a view on that" instead of hallucinating.
- **Not a CRM.** Do not build pipeline stages, deal size fields, forecasting. SimsWorld is invoked per meeting, not per deal.
- **Not a coaching platform.** The coaching brief is one output at the end of a session, not a curriculum. Do not add training modules, quizzes, or scorecards over time.
- **Not a real person's twin.** Every persona card carries a visible disclosure — "Simulated based on public sources. Not [Real Name]. Do not use in front of the real person." — for both ethics and legal.

## 9. Constraints — read carefully

- **PII discipline.** Real people's real names appear only when SimsWorld has grounding for their role at the target company (LinkedIn public bio, company site staff page, press). If a person is inferred (there's a Practice Owner somewhere but SimsWorld doesn't know who), use a role label ("Practice Owner — name unknown") not a fabricated name.
- **LinkedIn ToS.** No direct scraping. The `fixture` adapter returns hand-authored plausible profiles for the demo domain. The `stub-live` adapter throws instructive errors ("LinkedIn adapter not wired to a licensed provider; see docs/LINKEDIN.md").
- **Grounding requirement.** Every persona objection must carry at least one `sourceId`. The UI never renders an objection without a hoverable citation. If SimsWorld generates an ungrounded objection, tag it `SYNTHETIC` and mark the persona card `partially synthetic`.
- **Truth labels on every claim.** Same discipline as v1's `lib/contracts.ts`. `FACT`, `SELLER_CONTEXT`, `INFERENCE`, `SYNTHETIC`.
- **Fixture-first.** No demo path may depend on live external APIs. The Nova Dental demo runs entirely on Convex + local fixtures if Context.dev, OpenRouter, and the LinkedIn provider are all unreachable. Live services enhance; they do not gate.
- **Hackathon budget.** 3-minute demo slot. Golden path must fit in 90 seconds of screen time with the other 90 seconds for judge questions.

## 10. UI principles — inherit v1, adapt for this concept

- Warm off-white surfaces, near-black ink, restrained cobalt for active state, amber only for attention. No gradients, no glass, no AI sparkle motion.
- Center column dominates. Sources and library rails support, do not compete.
- Persona cards are **the visual anchor** of this app. Every card must convey: who this simulated person is, why SimsWorld thinks so (grounding chips), and how they will behave in rehearsal.
- Chat bubbles for personas are visually distinct from SA. Each persona has a consistent color and initial across the workspace.
- Coaching brief renders inline in the workspace after a rehearsal ends — not in a modal, not in a new tab. Inline preview is the wow moment when the SA sees "SimsWorld caught the thing I missed."

## 11. Success criteria

Definition of done for the hackathon demo:

- [ ] SA can type `novadentalclinic.ae`, drop 2 fake product docs (fixture PDFs are fine), and see 3 grounded personas within 30 seconds.
- [ ] SA can start a 1:1 rehearsal with the Practice Owner persona and get 3–5 back-and-forth exchanges where the persona objects with a citation the judges can hover to inspect.
- [ ] At least one persona objection references a specific SA product doc BY NAME ("your Case Studies deck says X, but for our size that would mean Y") — proving SimsWorld actually read both sides.
- [ ] A coaching brief appears at the end and names one specific SA claim that went unchallenged plus one suggested rewrite.
- [ ] The generic-vs-personalized thesis from v1 has a parallel here: **untuned persona** (generic LLM CFO) vs **tuned persona** (Dr. Rashid, grounded in her LinkedIn) can be toggled inside the rehearsal, showing side-by-side how sharper the grounded objection is. This is the visible thesis of the v2 product.

## 12. Files to create first

Order matters. Do not skip ahead.

1. `README.md` at the simsworld-spec root — 2 paragraphs on what this is, one command to run.
2. `docs/CONCEPT.md` — extract sections 1–4 above, cleaned up. Handed to designers.
3. `docs/ARCHITECTURE.md` — extract sections 5–6, cleaned up. Handed to eng.
4. `docs/CONTRACTS.md` — enumerate the TypeScript types for `Account, Source, Person, Persona, Rehearsal, Turn, CoachingBrief`. Frozen from this point.
5. `lib/contracts.ts` — the actual types.
6. `lib/fixtures.ts` — Nova Dental account, 3 personas, all sources, all citations. Hand-authored, deterministic.
7. `convex/schema.ts` — the tables from section 5.
8. `convex/linkedin.ts` — the adapter with `fixture` + `stub-live` implementations.
9. `convex/personas.ts` — `generate`, `refine`, `list` actions.
10. `convex/rehearsals.ts` — `start`, `postTurn`, `endAndSummarize` actions.
11. `app/page.tsx` — home screen.
12. `app/rehearsals/new/page.tsx` — create-rehearsal screen.
13. `app/rehearsals/[id]/page.tsx` — workspace.
14. `components/persona-card.tsx`.
15. `components/rehearsal-chat.tsx`.
16. `components/coaching-brief.tsx`.

Only after the first 10 files exist should any UI work start. Fixture and contract layer is the foundation of the demo's reliability.

## 13. What to do when you get stuck

- If a design decision is not answered here, ask the SA in chat before choosing. Do not invent.
- If an external API is unavailable, degrade to the fixture. Never show a fake service success.
- If a persona would say something not grounded in a source, either add the source first or have the persona decline the topic.
- If the demo scenario needs a fact you don't have, add it to `lib/fixtures.ts` explicitly as `SYNTHETIC` — never smuggle synthetic data in as `FACT`.

## 14. Hand-off

The SA reading this can now hand it, in full, to a coding agent (Claude Code, Cursor, another SimsWorld instance) and expect a working MVP within a working session. Run `/spec` on this document to formalize into phased build tickets, or `/blueprint` to expand into a full `docs/` set before code.

The starting scaffold is a copy of the v1 mockup — treat it as scratch. Delete `simsworld-spec/index.html` and `simsworld-spec/templates/` once the Next.js app is scaffolded; they are only there so you know what the previous shape looked like.
