# Astra Rehearsal — mockup

Barebones static HTML mockup for **Astra Rehearsal** (working name), a sibling product to the v1 in `frontend/`. Where v1 is a research/build agent for pre-meeting prep, Rehearsal is where the Sales Assistant *practices the actual meeting* — a WhatsApp-style workspace that runs the SA through a live rehearsal against grounded persona simulations of the real humans in the buying committee (Practice Owner, Office Manager, Clinical Lead at Nova Dental Clinic), each one seeded from real account sources (LinkedIn, discovery call transcript, Google Reviews). Every persona reply is tagged `SIMULATED` so the SA never confuses the rehearsal with a real conversation, and a coaching card surfaces objections that went unaddressed and SA claims that were accepted without pushback.

## Serve

```
python3 -m http.server 8766 --directory rehearsal
```

Open http://localhost:8766.

## Scope of this mockup

- Static HTML, inline CSS + JS, no build step, no frameworks, no external CDN.
- Client-side only: persona switching, chat composer with fake persona replies + typing indicator, voice-note play toggle with animated waveform, drag-drop and file-picker on the sources column. No Convex, no Context.dev, no persistence.

For the full product spec see `personas-app/MASTER-PROMPT.md` on the `himanshu` branch.
