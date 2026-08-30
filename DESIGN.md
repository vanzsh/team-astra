# ContextSE Design Direction

## Product Read

ContextSE is one persistent desktop workspace. Within five seconds the user should understand **Sources → AI → Test**, with generated artifacts immediately reachable. Relay is an artifact opened from ContextSE, never the main application.

## Visual Character

Combine NotebookLM’s workspace clarity with Vercel’s restraint without cloning either. Use white and near-white surfaces, near-black typography, neutral gray borders, compact controls, minimal shadows, crisp alignment, restrained radius, and generous but efficient whitespace. Do not use gradients, glowing AI effects, glassmorphism, giant cards, or decorative animation.

## Workspace Anatomy

- **Global rail:** ContextSE identity, obvious New chat action, recent conversations, and real artifacts.
- **Sources:** compact Our company and Prospect groups with Add source always available.
- **AI Solutions Engineer:** dominant conversational work surface with a concise account brief and grounded responses.
- **Testing Lab:** persona selection, test target, and adversarial buyer feedback.

Desktop widths are intentionally unequal: global rail 184px, sources 248px, center consumes remaining space, testing lab 300px. Secondary creation and source-entry flows use focused modal surfaces rather than routes.

## Type and Density

Use Geist. Panel labels are compact and semibold; body copy is concise; controls are 32–38px high. Prefer separators and whitespace over nested cards. Every interactive element has a visible focus state.

## Truth Presentation

Truth labels are textual, not color-only:

- **FACT:** retrieved public evidence;
- **SELLER CONTEXT:** approved Relay or seller-provided account context;
- **INFERENCE:** ContextSE reasoning;
- **SYNTHETIC:** invented demo operations.

Every synthetic Relay surface carries a persistent label. Missing model configuration appears as an explicit error and never as a fake AI response.

## Interaction Rules

- New chat creates the active account workspace immediately from a website and optional material.
- Add source supports URL or pasted material without a complex uploader.
- Conversation is the primary center interaction and can trigger deterministic product actions from structured Groq output.
- Artifacts open from the global rail and are marked ready only when a working renderer exists.
- Testing uses a buyer role distinct from the Solutions Engineer role and returns reaction, objections, missing proof, score, and improvements.
- External failures preserve account context and artifacts without claiming live success.
