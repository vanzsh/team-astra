# Frozen MVP Contracts

The TypeScript source of truth is `lib/contracts.ts`. Frontend and backend changes to these shapes require coordination.

## AccountWorkspace

Contains account identity, seller product, sources, research summary, strategy, artifacts, and demo configuration. Renderers must not depend on raw provider responses.

## Source

A source has an ID, seller/prospect group, title, detail, truth classification, excerpt, and optional URL. Claims and model citations retain source IDs.

## AgentResponse

The Groq Solutions Engineer returns a concise answer, validated source citations, optional application action, `live`, and an optional configuration/error message. Actions are limited to persona focus, strategy approval, demo generation, brief generation, research, or buyer testing.

## PersonaTestResult

The Groq tester returns persona, target, reaction, objections, missing proof, score from 1–10, and one to three improvements. Tester prompts are independent from the Solutions Engineer prompt.

## DemoStrategy and DemoConfig

Strategies may reference only approved Relay capabilities. Demo configuration contains renderer-safe identity, terminology, locations, KPIs, exceptions, shipments, and narrative. Every operational record is synthetic.

## Artifact

Artifacts are `interactive_demo` or `meeting_brief` with a status. `ready` means the item opens a working renderer or downloadable document.

## Integration Results

External actions return controlled success, unavailable, not-found, or error states. Failure preserves the last reliable workspace and never converts fixture content into FACT.
