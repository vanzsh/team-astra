# MVP Architecture

## Runtime Shape

ContextSE is one Next.js application. The frontend renders a shared `AccountWorkspace` contract with a deterministic GulfLink fallback. Convex is the backend/state boundary. Context.dev and Groq are called only from Convex actions, where secrets remain server-side.

```text
Sources and user context
  → Convex state/actions
      → Context.dev company intelligence
      → normalized account context
      → Groq Solutions Engineer or buyer tester
  → conversation, artifacts, and test feedback
```

## Boundaries

### Frontend

Owns the four-zone workspace, source entry, conversation UX, testing UX, evidence inspection, and existing Relay and meeting-brief renderers. It consumes `lib/contracts.ts` and does not expose provider secrets.

### Backend

Owns persisted account state, external research, grounded context construction, Groq calls, structured action parsing, and buyer-test evaluation. The Solutions Engineer and tester share transport but use separate prompts and model IDs.

## Reliability

The GulfLink fixture remains the last-known-good context and artifact state. Missing credentials return explicit configuration errors; they never produce fake live AI responses. Context.dev failure preserves fixture research.

## Security

`CONTEXT_DEV_API_KEY` and `GROQ_API_KEY` are Convex environment variables and never use `NEXT_PUBLIC_`. Browser code receives normalized results only. Domain and model outputs are validated at their boundaries.
