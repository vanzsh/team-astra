# Frozen MVP Contracts

The TypeScript source of truth is `lib/contracts.ts`. Frontend and backend changes to these shapes require coordination.

## AccountWorkspace

Contains prospect identity, seller company and product, sources, research summary, strategy, artifacts, and demo configuration. Renderers must not depend on raw provider responses.

## Source

A source retains its original filename, format, full preview content, seller/prospect side, truth classification, extracted context excerpt, and optional URL. The original document remains human-inspectable while the excerpt is the compact AI context. Claims and model citations retain source IDs.

## AgentResponse

The Groq Solutions Engineer returns a concise answer, validated source citations, optional application action, `live`, and an optional configuration/error message. Actions are limited to persona focus, strategy approval, demo generation, brief generation, research, or buyer testing.

## PersonaTestResult

The Groq tester returns persona, target, reaction, objections, missing proof, score from 1–10, and one to three improvements. Tester prompts are independent from the Solutions Engineer prompt.

## DemoStrategy and DemoConfig

Strategies may reference only approved Relay capabilities. Demo configuration contains renderer-safe identity, terminology, locations, KPIs, exceptions, shipments, and narrative. Every operational record is synthetic.

## Artifact

Artifacts are `interactive_demo`, `meeting_brief`, or `demo_script` with a status. `ready` means the item opens a working live or document preview.

## Integration Results

External actions return controlled success, unavailable, not-found, or error states. Failure preserves the last reliable workspace and never converts fixture content into FACT.
