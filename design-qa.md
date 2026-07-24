# Design QA

final result: passed

## Source and capture conditions

- Source: `/tmp/codex-remote-attachments/019f91c6-33ab-7a80-b849-4a080ebd0932/6CBCB194-72D3-48D9-A3C2-479FCC350742/1-Photo-1.jpg`
- Source dimensions: 853 × 1280 px
- Implementation capture: `qa-artifacts/implementation-desktop-v4.jpg`
- Implementation dimensions: 1280 × 1976 px, normalized to 853 × 1280 px for comparison
- Browser viewport: 1280 × 900 CSS px
- Device pixel ratio: 2
- State: desktop, initial page state, all reveal transitions settled
- Full-view comparison: `qa-artifacts/design-comparison-final.jpg`

The comparison includes the hero, services, Redondo Beach section, production CTA band, and footer in a single side-by-side view.

## Iteration history

1. The first desktop comparison found P2 scale mismatches in the header/navigation cluster and the supporting typography and icon sizes. Brand, navigation spacing, icon sizing, section copy, and footer scale were adjusted.
2. The next comparison found the hero image and overlay balance too dark on the right. The overlay was refined to preserve left-side text contrast while restoring the generated set detail and jacket lettering.
3. Mobile QA found a P2 state issue where the navigation could remain open behind the contact dialog and a 7 px overflow caused by a reveal transform. The menu now closes before dialogs open, and the location section clips the reveal transform without page overflow.
4. Release QA found insufficient contrast on white-over-gold buttons and gold eyebrow text, an unlocked mobile-menu state after resizing to desktop, and unapproved placeholder testimonials. Button text now uses navy, eyebrow text uses an accessible deep gold, desktop media-query changes close the mobile menu, and the testimonial dialog transparently requests approved references instead of presenting invented endorsements.
5. Final desktop comparison and phone/tablet checks found no remaining P0, P1, or P2 visual or interaction issues.

## Responsive and interaction evidence

- Phone: 390 × 844 CSS px (`qa-artifacts/mobile-top-v2.jpg`, `mobile-contact-dialog-v2.jpg`, `mobile-middle-v2.jpg`, `mobile-footer-final.jpg`)
- Tablet: 768 × 1024 CSS px (`qa-artifacts/tablet-top.jpg`)
- No horizontal overflow at phone, tablet, or desktop sizes.
- Mobile navigation opens, closes, updates `aria-expanded`, follows section links, and closes before a dialog opens.
- Contact, biography, and testimonials dialogs expose accessible names and return focus to their triggers.
- Required form fields use native validation before the email inquiry is composed.
- Reveal transitions settle correctly, and reduced-motion CSS disables smooth scrolling and shortens animations/transitions.
- Browser console: no errors or warnings in tested phone, tablet, or desktop states.

## Accessibility and asset checks

- One `h1`, one `main`, a declared `lang`, and a unique document title.
- No duplicate IDs.
- No unlabeled form controls.
- No missing image alternative text.
- All three dialogs have valid `aria-labelledby` references.
- All local images, CSS, JavaScript, and favicon returned HTTP 200 in the local preview.
- External font and icon stylesheets returned HTTP 200.

## Accepted P3 differences

- The production-set hero is newly generated, so the crew placement and lighting are not pixel-identical to the reference photograph; the composition, subject, copy space, jacket lettering, crop, and color direction intentionally match the source.
- Minor font rasterization and line-wrapping differences remain between the raster reference and the browser-rendered implementation.
