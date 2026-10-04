# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## CardDisplay website direction

- The user selected visual concept 2: a dark, cinematic product showcase centered on the digital business card and iPhone.
- Keep the website in German and present CardDisplay as an iPhone app for scanning/importing, designing, and showing or sharing digital business cards.
- Use the supplied app icon and screenshot, plus the generated product imagery in `public/assets/`.
- Keep the user-supplied GymMix/iPhone image as the hero and preserve its full composition on phones. The hero image stays still while only the “Deine Karte. Dein Auftritt.” typography moves over its lower edge. Apply restrained parallax to other copy, headings, cards, and product imagery while respecting reduced-motion settings.
- The requested publishing destination is the `alexanderkaufi/CardDisplay` GitHub repository.
