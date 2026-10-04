# CardDisplay website design QA

**Result: passed**

## Direction and evidence

- Expanded the selected dark, cinematic concept and made the product story more complete.
- Used the German App Store description in the Obsidian CardDisplay project notes as the source for feature copy.
- Reviewed the production preview at `http://127.0.0.1:4174/` in desktop 1280×720, iPhone 390×844, iPad portrait 820×1180, and iPad landscape 1180×820 viewports.
- Ran `npm run build`; Vite generated `dist/client/index.html`, hashed assets, `dist/server/index.js`, and `dist/.openai/hosting.json` successfully.

## Review

- **Content:** The page now explains importing and scanning, card design, QR codes, front and back sides, drafts, sharing and PNG export, multiple cards, local storage, and common questions.
- **Layout:** Added dedicated card-studio, sharing, use-case, and FAQ sections. On iPhone, process cards and feature sections use full-width imagery and stacked copy. iPad portrait uses compact image-and-copy rows where appropriate; landscape and desktop use wider grids.
- **Parallax:** Images move at a visibly different rate from page scroll. Position is calculated from their stable clipping frames, and each offset is limited to the available vertical image bleed so the frames do not reveal empty edges.
- **iOS fit:** The viewport uses `viewport-fit=cover`; header and footer respect safe areas. Primary controls keep 44px touch targets, and the mobile navigation works at phone widths.
- **Accessibility and behavior:** Reduced-motion settings disable parallax. Heading structure, image alt text, focus styles, skip link, anchor navigation, and expandable FAQ answers are present. Opened a FAQ item in the mobile preview to confirm its answer is readable.

## Iteration

- Replaced the earlier small, self-measuring image offsets with stronger offsets driven by the untransformed image frames.
- Expanded the page with product details grounded in the German App Store copy, then rebuilt and checked desktop, iPhone, and both iPad orientations.
