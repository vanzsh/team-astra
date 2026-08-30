# ContextSE Design Direction

## Product Read

The interface must communicate **Context → Agent → Outputs** within five seconds. It is an account workspace, not a dashboard or chat app. The center is the dominant working surface; sources and outputs support it.

## Visual Character

Premium, calm, precise, technical, and compact. Use warm off-white surfaces, near-black ink, restrained cobalt for active intelligence, and amber only for attention. Avoid gradients, glass effects, oversized cards, AI sparkles, and decorative motion.

## Workspace Anatomy

- **Header:** product, current account, research state, and one compact utility action.
- **Left rail (Context):** seller and prospect sources, confidence/truth labels, and source inspection.
- **Center (AI Solutions Engineer):** account thesis, recommended strategy, evidence, approval, and grounded conversation.
- **Right rail (Outputs):** artifact state and direct open actions. Outputs are real work product, never placeholders.

Desktop uses three columns with the center receiving remaining width. On smaller screens, rails become explicit Context and Outputs views while the Agent remains the default.

## Type and Density

Use a neutral sans-serif system stack. Headings are compact and semibold; labels are uppercase and tracked; body copy stays short. Prefer dividers and whitespace over nested cards. Keep controls 32–40px high and preserve clear focus states.

## Truth Presentation

Truth labels are always textual, not color-only:

- **FACT:** sourced public information;
- **SELLER CONTEXT:** approved Relay information;
- **INFERENCE:** ContextSE reasoning;
- **SYNTHETIC:** invented demo operations.

Every prospect claim opens its supporting source. Every synthetic operational surface carries a persistent label.

## Interaction Rules

- Research reveals progress and leaves the last reliable state intact on failure.
- Recommendations explain what to show, why, and supporting evidence.
- Approval visibly changes artifact state.
- Conversation is compact and grounded in the workspace; structured recommendations and actions may appear inline.
- Every visible primary button performs a real action.
- Motion is limited to state transitions and progress feedback, and respects reduced-motion preferences.

## Hero Output

The Relay demo must make generic versus GulfLink-specific strategy obvious through operating story, locations, entities, exceptions, KPI framing, and feature priority—not just branding. Users can toggle the comparison without losing context.
