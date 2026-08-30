# SimsWorld Spec

Static HTML mockup + master prompt for **SimsWorld**, the v2 product from Team Astra. The mockup is the **demo-day artifact**, not the real app (that's the Next.js scaffold in `../app/`). The full product spec lives in `MASTER-PROMPT.md`.

## Files

- `MASTER-PROMPT.md` — the SimsWorld master prompt. Source of truth for the v2 product.
- `index.html` — the whole app. Three screens (create → research → workspace), single file, inline CSS + JS. Nova Dental Clinic is the scripted demo domain.
- `templates/product-tour.html` — the artifact SimsWorld "generates" during the demo. Relay product tour that reskins between generic and Nova Dental branding via `?mode=generic` / `?mode=personalized`. Toggle inside the page flips between them.

## Run

```bash
python3 -m http.server 8765 --directory simsworld-spec
```

Open http://localhost:8765.

## Demo path

1. Land on create screen — `novadentalclinic.ae` prefilled.
2. Click **Research & Create Workspace** → 4-step research animation.
3. Workspace: Nova account summary, no-show strategy, 3 personas (Practice Owner primary).
4. Type in composer: `make a 5-min interactive demo for the Practice Owner showing no-show recovery in their morning huddle`.
   - Rich prompt → builds immediately.
   - Thin prompt → one clarifying question. Reply with persona, or `just do it`.
5. Right rail lights up with Personalized Product Tour → `Open demo →` opens the Nova-branded tour.
6. Inside the tour, bottom toggle bar flips Generic Relay ↔ Nova Dental Edition. That's the wow.
