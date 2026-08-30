# SimsWorld — mockup

Static HTML mockup for **SimsWorld** (renamed from Astra Rehearsal), a sibling product to the v1 research/build agent in `frontend/`. Where v1 preps for a meeting, SimsWorld lets the Sales Assistant **watch the product itself get judged, live**, by grounded simulations of the actual humans in the buying committee.

This mockup is the **two-way mirror**: the product being sold on the left, the personas' reactions on the right. No landing screen, no chat, no rehearsal loop — just the stage and the room.

## Layout

- **Top bar** — SimsWorld brand, breadcrumb *Nova Dental Clinic → Relay for Clinics Simulation*.
- **Left 60% — The Stage.** A fake browser frame pointed at `nova-dental.relay.app/dashboard`. Inside: a plausible Relay-for-Clinics dashboard (KPIs, pricing tier, today's schedule with a mix of confirmed / waitlist-recovered / at-risk appointments, integrations pill list). Three colored cursor blips (Aisha cobalt, Fatima amber, Omar teal) crawl the page continuously on scripted paths — Aisha lingers on pricing, Fatima on the schedule, Omar on the integration list.
- **Right 40% — The Room.** A video-call grid of three persona tiles stacked vertically. Each tile shows a gradient avatar (subtly bobbing), name + role, live status ("Doing the math…", "Voice-note incoming"), and a speech-bubble callout with the persona's most recent thought. When a persona hits a hot-take insight the tile does a spring bounce; the currently-speaking tile has a soft pulsing ring in their color. Below the tiles: a **LIVE INSIGHTS** feed that streams grounded objections tagged with the framework they came from (LIFT, Cialdini, Fogg, ability blocker).
- **Bottom control strip** — pick a page to simulate (Homepage / Pricing / Demo / Case Study), optional context input, and **▶ Run new simulation** to swap rounds.

Two rounds of scripted content ship in the mockup: Round 1 is a homepage-load simulation (5 insights across the 3 personas); Round 2 is a pricing-page simulation triggered by the Run button (5 fresh insights with the personas pushing back on price in their own voice — Aisha the CPA math, Fatima the training tax, Omar the per-seat implant question). Content is pulled from the grounded persona seed in `rehearsal-seed/nova-dental.md`.

## Serve

```
python3 -m http.server 8766 --directory simsworld
```

Open http://localhost:8766.

## Scope

- Single `index.html`. Inline CSS + JS. No frameworks. No CDN. No build step. No persistence.
- All animation is CSS keyframes (cursor paths, avatar bob, pulse ring) or short JS toggles (tile bounce, feed fade-in).
- Aesthetic follows the v1 design tokens in `frontend/index.html` — warm off-white surfaces, near-black ink, cobalt accent, amber attention, purple synthetic tags, 14–16px radii, soft shadows. Whimsy is scoped to the persona tiles.

For the full product spec see `simsworld-spec/MASTER-PROMPT.md` on the `himanshu` branch.
