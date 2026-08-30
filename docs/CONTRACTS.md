# Frozen MVP Contracts

The TypeScript source of truth is `lib/contracts.ts`. Frontend and backend changes to these shapes require coordination.

## AccountWorkspace

Contains account identity, seller product, sources, research summary, strategy, conversation, artifacts, and demo configuration. The MVP uses one account but no field assumes GulfLink-specific rendering.

## Source

- `id`, `group`, `title`, `detail`;
- `truth`: `FACT | SELLER_CONTEXT | INFERENCE | SYNTHETIC`;
- optional `url` and excerpt;
- source IDs are retained by claims and recommendations.

## DemoStrategy

- target persona and meeting objective;
- concise thesis;
- ordered demo moments;
- reasons and evidence source IDs;
- approval status.

A strategy may reference only capabilities declared in the seller product contract.

## DemoConfig

Renderer-safe content only: identity, terminology, locations, KPIs, exceptions, shipments, and narrative. Operational records carry `synthetic: true`. Renderers do not consume raw research responses.

## Artifact

- `type`: `interactive_demo | meeting_brief`;
- `status`: `recommended | generating | ready | error`;
- title and updated timestamp.

An artifact marked `ready` must open a working renderer or downloadable document.

## Conversation

The frontend sends user text, recent messages, compact workspace intelligence, and source excerpts. The backend returns:

- concise grounded `answer`;
- zero or more cited source IDs;
- optional action: `focus_persona | approve_strategy | generate_demo | create_brief | research`;
- optional action payload.

Unknown or unsafe actions are ignored. Conversation continuity is scoped to the account.

## Integration Results

External actions return `ok`, `unavailable`, `not_found`, or `error`. Failure results preserve the last reliable workspace state and never convert fixture content into `FACT`.
