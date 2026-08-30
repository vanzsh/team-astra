# Repository Constitution

Every agent and engineer must read this file before writing code. This repository is a one-day hackathon project; decisions must protect the working demonstration over speculative completeness.

## Required Reading

Before meaningful code changes, read in this order:

1. `/AGENTS.md`
2. `/PROJECT.md`
3. `/DESIGN.md`, if present
4. `/docs/ARCHITECTURE.md`, if present
5. `/docs/CONTRACTS.md`, if present
6. role-specific frontend or backend instructions, if present

When documents disagree, precedence is:

`AGENTS.md` → `PROJECT.md` → frozen contracts → role-specific instructions → implementation

Do not silently resolve a major contradiction. Stop, identify the conflict, and coordinate a decision before proceeding.

## Hackathon Priority Order

Optimize for, in order:

1. working golden path;
2. demo reliability;
3. obvious user value;
4. meaningful Devin / Convex / Context.dev usage;
5. simple implementation;
6. visual clarity;
7. architecture elegance.

Do not optimize for hypothetical scale. This is a one-day hackathon.

## Core Product Invariant

Every meaningful feature should reinforce:

`understand this account` → `determine what will resonate` → `build what presales needs`

Do not expand ContextSE into adjacent sales software.

## Approved Technology Stack

Application implementation is limited to:

- **Next.js, React, and TypeScript** for the application;
- **shadcn/ui** and the primitives and styling dependencies it requires;
- browser-native APIs, HTML, and CSS for basic frontend behavior;
- **Convex** as the only application backend, database, and state layer;
- **Context.dev** as the public-web intelligence provider.

Do not introduce:

- another frontend framework or meta-framework;
- another component library, design system, or competing CSS framework;
- another database, backend, BaaS, ORM, or API abstraction layer;
- another crawling, research, extraction, or company-intelligence provider;
- unnecessary state management, queues, CMS, authentication, analytics, or infrastructure;
- a package that duplicates an approved platform or browser capability.

Packages directly required by Next.js, shadcn/ui, Convex, Context.dev, or essential build/test tooling are allowed. Any other runtime dependency requires a concrete P0 need, must materially reduce delivery risk, and must be the smallest mature option. Do not add dependencies for convenience alone.

## Mandatory Partner Stack

The final product must meaningfully use all three partners.

### Devin

Devin must perform substantial engineering work. Do not complete all meaningful engineering before Devin/human engineers receive the repository.

### Convex

Convex is the application backend and state layer. It should ultimately own:

- persisted account state;
- research state;
- sources/evidence;
- generated strategy;
- artifacts;
- realtime status updates;
- queries, mutations, and actions.

Do not introduce another primary database or backend.

### Context.dev

Context.dev owns prospect public-web intelligence. It should ultimately be used for relevant:

- web research;
- crawling;
- extraction;
- company intelligence;
- brand/context discovery;
- evidence gathering.

Never expose Context.dev secrets in browser code. External Context.dev calls must cross a backend/server boundary, ideally Convex actions.

## Ownership Boundaries

### Frontend Owner

Owns:

- routes/pages;
- React components;
- workspace UI;
- interactions;
- design implementation;
- loading/progress states;
- evidence presentation;
- output presentation;
- interactive demo renderer;
- artifact UX;
- responsive/polish work;
- Convex client subscriptions.

Must not independently redesign Convex schema, backend business rules, Context.dev integration, model orchestration, or frozen API/data contracts.

Frontend must remain testable using fixtures when backend services fail.

### Backend Owner

Owns:

- Convex schema;
- queries;
- mutations;
- actions;
- Context.dev integration;
- account research;
- normalization;
- model/AI reasoning;
- evidence persistence;
- `DemoStrategy` generation;
- `DemoConfig` generation;
- backend fallbacks/errors.

Must not independently redesign the visual system, page layouts, UX architecture, components, or frontend interaction model.

## Shared and Frozen Surfaces

Once created, these require coordination before changing:

- `/AGENTS.md`;
- `/PROJECT.md`;
- `/DESIGN.md`;
- `/docs/CONTRACTS.md`;
- shared contract/type definitions.

No engineer or agent may silently change a contract merely because its implementation would be easier.

## Truth Rules

All account content must use one of these categories:

- **FACT** — supported by a retrieved or provided source.
- **SELLER CONTEXT** — provided by ContextSE/seller context.
- **INFERENCE** — a reasoned conclusion based on evidence.
- **SYNTHETIC** — invented only to demonstrate a workflow.

Never:

- fabricate prospect facts;
- fabricate ContextSE capabilities;
- present synthetic demo operations as real customer data.

For the hackathon, generated content must stay within ContextSE’s capability boundary in `/PROJECT.md`. Facts must retain evidence; synthetic operational records must be visibly labeled.

## Mandatory Ponytail Usage

Every agent must use the official [Ponytail](https://github.com/dietrichgebert/ponytail) ruleset. The repository requires the `DietrichGebert/ponytail` Devin plugin through `/.devin/config.json`. Authenticated Devin sessions auto-install this required plugin when it is missing.

If automatic installation fails, run `devin auth login`, then `devin plugins install DietrichGebert/ponytail`, and start a new agent session. Do not begin implementation until Ponytail is active.

Before any task that may write implementation code:

1. activate Ponytail using the host’s official plugin or skill command;
2. on Devin, invoke `/ponytail:ponytail` and keep the default `full` mode;
3. do not disable Ponytail for convenience;
4. if a host cannot load the plugin, apply the ladder below directly and report that the plugin was unavailable.

Every delegated coding subagent must receive the same requirement. Read-only investigation may proceed without explicit activation, but any resulting implementation plan must follow Ponytail.

## Ponytail Engineering Principles

Prefer, in order:

1. do not build what is unnecessary;
2. reuse existing implementation;
3. use browser/framework/platform-native primitives;
4. use an existing dependency;
5. add a mature dependency only where it materially reduces risk;
6. write the smallest custom implementation necessary.

Avoid:

- speculative abstractions;
- architecture astronautics;
- unnecessary wrappers;
- generic repositories/services;
- premature plugin systems;
- unnecessary state-management libraries;
- code written for imaginary future requirements.

**Simple and demonstrably working beats generalized and unfinished.**

## Before Coding

Before a substantial task:

1. determine whether you are the frontend or backend owner;
2. read the relevant source-of-truth documents;
3. understand existing contracts;
4. inspect existing code before replacing anything;
5. identify the smallest implementation required.

Do not rewrite a working system without evidence that replacement is required.

## Golden Path

All work must protect:

`create account` → `research prospect` → `understand account` → `recommend strategy` → `approve` → `generate personalized demo` → `open real account artifact`

If work threatens this flow close to submission, reduce scope rather than add complexity.

## Before Declaring Done

For the relevant area:

- run typecheck;
- run tests where they exist;
- run build;
- inspect runtime and console errors;
- manually verify the affected golden-path behavior.

Report exactly:

### BUILT

What changed.

### TESTED

What was actually verified.

### RISKS

Known unresolved issues.

### CONTRACT IMPACT

Whether any shared interface changed.

Never say a feature is complete merely because code was generated.
