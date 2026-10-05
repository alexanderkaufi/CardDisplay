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

## Latest hero and motion update

- Replaced the hero asset with the user-supplied GymMix card and iPhone image. The wide composition remains fully visible on phone and tablet widths. The hero photo stays still; only the “Deine Karte. Dein Auftritt.” typography overlaps its lower edge and moves with parallax.
- Added parallax motion to other section headings, copy blocks, and use-case cards as well as product imagery. Text and cards move less than imagery, with one reversed card for depth. The reduced-motion preference still disables all parallax.
- Visually reviewed the local preview at desktop 1280×720, iPhone 390×844, and iPad portrait 820×1180. The hero composition remains visible, the title overlap is responsive, and description and buttons stay below the image without parallax movement.

## Image placement update

- Put the newly supplied photo of a person holding an iPhone at the top of the page, keeping the complete wide composition and the existing title-only parallax behavior.
- Moved the dark GymMix/iPhone image into the final call-to-action section near the bottom.
- Reassigned the process images and removed repeated versions of the person-at-phone, front/back card, and app-screen artwork from the lower sections.
- Set the lower image frame to the source image's wide aspect ratio to avoid cropping its composition.
- Kept the studio, sharing, and privacy content in centered single-column layouts after removing their repeated photos.

## Iteration

- Replaced the earlier small, self-measuring image offsets with stronger offsets driven by the untransformed image frames.
- Expanded the page with product details grounded in the German App Store copy, then rebuilt and checked desktop, iPhone, and both iPad orientations.

## Interactive preview and example cards

- Added a three-stage interactive preview for taking or importing a card photo, arranging card elements in the editor, and presenting or sharing a finished card. The preview is labeled as an example rather than an actual screen recording.
- Added three distinct CSS card concepts for professional, project, and private use. These are visual design examples, not additional app-provided cards or repeated photo assets.
- Added original interface illustrations beside the card studio, sharing, and on-device storage descriptions. Existing product photography remains in its original single-use locations.
- Added a translucent backed desktop navigation for contrast over the hero and included the new preview in the mobile menu.
- Confirmed the build with `npm run build` and visually reviewed the interactive stages at desktop 1280×720, iPhone 390×844, and iPad portrait 820×1180. Tapped through all three demo stages and checked the phone menu overlay.
