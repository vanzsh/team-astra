# MVP Architecture

## Runtime Shape

ContextSE is one Next.js application. The frontend renders a shared `AccountWorkspace` contract and starts with a deterministic GulfLink fixture. Convex is the backend/state boundary. Context.dev and OpenRouter are called only from Convex actions, where secrets remain server-side.

```text
Next.js workspace
  → typed fixture fallback
  → Convex queries/mutations/actions
      → Context.dev brand intelligence
      → OpenRouter account conversation
```

## Boundaries

### Frontend

Owns workspace layout, interaction state, evidence inspection, approval UX, Relay demo rendering, meeting-brief rendering, and responsive behavior. It consumes contracts from `lib/contracts.ts`; it does not reshape backend data ad hoc.

### Backend

Owns persisted account/research/conversation/artifact state and external calls. `researchProspect` normalizes Context.dev results into evidence. `converse` builds compact grounded context and returns a concise answer plus optional product action.

## Reliability

The GulfLink fixture is the last-known-good demo state. Missing credentials or external failures must not break account understanding, approval, the Relay demo, or the meeting brief. The UI identifies fixture-backed state without presenting a fake service success.

## Security

`CONTEXT_DEV_API_KEY` and `OPENROUTER_API_KEY` are Convex environment variables and never use `NEXT_PUBLIC_`. Browser code receives normalized results only. Domain input is normalized and external failures are returned as controlled states.

## Integration Sequence

1. UI reads deterministic fixture.
2. When Convex is configured, account state moves to Convex without changing renderers.
3. Context.dev replaces prospect fixture research through `researchProspect`.
4. OpenRouter powers conversation through `converse`.
5. Existing `DemoStrategy`, `DemoConfig`, and artifact renderers remain unchanged.
