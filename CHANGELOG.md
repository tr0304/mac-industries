# Changelog

All notable changes to the **Mac Industries** website are recorded here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and dates are written as YYYY-MM-DD.

## [1.1.0] - 2026-11-07

Corrections made in response to the lecturer's Part 2 feedback.

### Added
- `CHANGELOG.md` (this file) and a changelog section in `README.md`.
- `SITEMAP.md` and a sitemap section in `README.md`, showing how the six pages link together.
- A references and image-credits section in `README.md`.
- A consistent semantic structure on all six pages: `<header>` containing the `<nav>`, a single `<main>`, and a `<footer>`.
- A "Skip to main content" link and `aria-current="page"` on the active navigation link of every page.
- `srcset`, `sizes` and `loading="lazy"` on the content images, with 480px and 800px wide versions stored in `_images/responsive/`.
- Reusable layout classes in `css/styles.css`: `.card-grid`, `.card-grid--wide` and `.banner`.
- Tablet and mobile breakpoints for the navigation (3 x 2 grid on phones, 2 x 3 on very narrow phones, single row from 40em) and for spacing, buttons, forms and the footer on phones.
- Responsive text sizes using `clamp()`.
- Extra interaction states: `:focus-visible`, `:focus-within` and `:active` styles, and hover, focus, valid and invalid states on form fields.

### Changed
- **Services page:** the inline `style` widths and fixed 45% flex columns were replaced with the shared `.card-grid` and `.card` classes, so products now wrap and stack on small screens. Prices are shown in their own `.price` line.
- Navigation links use the same wording on every page and are wrapped in a `<ul>`.
- Every link to the About page now matches the real filename, `aboutUs.html`.
- Alt text rewritten to describe each image.
- The enquiry form button now uses the shared `.btn` style.
- On phones the header scrolls with the page instead of staying fixed, so the two-row navigation does not cover the screen.
- `README.md` rewritten: corrected directory tree, completed Author and Licence sections, and updated breakpoint table.

### Fixed
- Every page now has one stylesheet link, `../css/styles.css`, in the `<head>`.
- Broken `<img>` tags, unclosed `<div>` elements, a stray `</header>` and `></iframe>`, and duplicate `</body></html>` tags.
- Missing alt text and unlabelled map and video frames.
- Spaces in image paths are now written as `%20` so every browser and web host loads them.

## [1.0.0] - 2026-11-07

### Added
- Initial commit and Part 2 files transferred into this repository.
- Six pages: Home, About Us, Services, Gallery, Enquiry and Contact, with a shared navigation bar.
- External stylesheet `css/styles.css` with CSS variables, a dark-blue gaming theme and a responsive gallery.
- Enquiry form with labelled fields, and an embedded Google Map and YouTube video on the Contact page.
- Images organised in the `_images` folder.
