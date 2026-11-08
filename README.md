# Mac Industries

A website for Mac Industries, a gaming retailer that sells consoles and video games. It is built with HTML, CSS and JavaScript (no frameworks) and works on phones, tablets and computers.

| | |
|---|---|
| **Student** | Troy Mac Donald (ST10511649) |
| **Module** | WEDE5020 Web Development (Introduction) |
| **Assessment** | Summative 1 Portfolio of Evidence (POE), Part 3 |
| **Live website** | https://tr0304.github.io/mac-industries/ |
| **Repository** | `wede5020-g1-2026-summative-1-portfolio-of-evidence-st10511649` |
| **Copy used for publishing** | https://github.com/tr0304/mac-industries |

## Contents

1. [About the project](#about-the-project)
2. [Pages and sitemap](#pages-and-sitemap)
3. [Project structure](#project-structure)
4. [Part 3 requirements and where to find them](#part-3-requirements-and-where-to-find-them)
5. [How the main features work](#how-the-main-features-work)
6. [How I addressed the Part 2 feedback](#how-i-addressed-the-part-2-feedback)
7. [Changelog](#changelog)
8. [Publishing the website](#publishing-the-website)
9. [Testing](#testing)
10. [Known limitations](#known-limitations)
11. [References](#references)
12. [Image credits](#image-credits)
13. [Use of AI tools](#use-of-ai-tools)
14. [Author and licence](#author-and-licence)

## About the project

Mac Industries is a made-up South African gaming store. Customers can read about the company, browse and search the products, look at a gallery, send an enquiry about a product and contact the store. The business is not real, so the products, stock numbers and store location are sample data.

Technologies used:

- HTML5 (semantic elements such as `header`, `nav`, `main`, `section` and `footer`)
- CSS3 (custom properties, Grid, Flexbox, media queries, `clamp()`, pseudo-classes, transitions)
- JavaScript (plain JavaScript, no libraries except Leaflet for the map)
- Leaflet and OpenStreetMap for the interactive map

## Pages and sitemap

All six pages share the same navigation bar, so every page links to every other page. A longer version with a link table is in [SITEMAP.md](SITEMAP.md).

```
Mac Industries
├── Home ............ screens/index.html
├── About Us ........ screens/aboutUs.html
├── Services ........ screens/services.html
├── Gallery ......... screens/gallery.html
├── Enquiry ......... screens/enquiry.html
└── Contact ......... screens/contact.html
```

| Page | What it has |
|------|-------------|
| Home | Welcome message, logo, and reasons to shop with us |
| About Us | Background, mission, vision and an FAQ accordion |
| Services | Product list with search, category filter and sort |
| Gallery | Image gallery with a lightbox |
| Enquiry | Enquiry form with validation and a cost and availability response |
| Contact | Interactive map, video, and a contact form that builds an email |

## Project structure

```
├── _images/
│   ├── responsive/            480px and 800px wide copies of each image
│   ├── ps5-console.jpg ... and the other full-size images
├── css/
│   └── styles.css             the one stylesheet used by all pages
├── js/
│   ├── lightbox.js            gallery lightbox
│   ├── accordion.js           FAQ accordion on the About page
│   ├── animations.js          scroll animations
│   ├── map.js                 Leaflet map on the Contact page
│   ├── products.js            the product list (data)
│   ├── services.js            builds, searches, filters and sorts the products
│   ├── enquiry.js             enquiry form validation and response
│   └── contact.js             contact form validation and email
├── screens/
│   ├── index.html
│   ├── aboutUs.html
│   ├── services.html
│   ├── gallery.html
│   ├── enquiry.html
│   └── contact.html
├── index.html                 sends visitors to screens/index.html
├── robots.txt
├── sitemap.xml
├── CHANGELOG.md
├── SITEMAP.md
└── README.md
```

## Part 3 requirements and where to find them

| Requirement | Where it is |
|-------------|-------------|
| Feedback for Part 2 and changelog | [How I addressed the Part 2 feedback](#how-i-addressed-the-part-2-feedback) and [Changelog](#changelog) below, and [CHANGELOG.md](CHANGELOG.md) |
| Interactive elements | FAQ accordion on About Us (`js/accordion.js`) and scroll animations on every page (`js/animations.js`) |
| Interactive map | Contact page (`js/map.js`) |
| Gallery lightbox | Gallery page (`js/lightbox.js`) |
| Dynamic content and search | Services page (`js/products.js` and `js/services.js`) |
| SEO: title tags, meta description, meta keywords | The `<head>` of all six pages |
| SEO: image file names and alt text | `_images/` and the `alt` text on every image |
| SEO: robots.txt and sitemap.xml | Project root |
| Enquiry form controls, validation and response | Enquiry page (`js/enquiry.js`) |
| Contact form controls, validation and email | Contact page (`js/contact.js`) |
| GitHub commits, README and changelog | This repository |
| Website deployed | See the live website link at the top |
| References | [References](#references) below |

## How the main features work

**SEO.** Every page has its own title, a meta description of about 150 characters and meta keywords about that page's content. Titles and descriptions follow Google's guidance on writing for search results (Google, n.d.a; Google, n.d.b). I renamed the images from names like `Ps5 console.jpg` to descriptive names like `ps5-console.jpg` and gave each image alt text that describes it. `robots.txt` lets search engines read the whole site and points to `sitemap.xml`, which lists all six pages (Google, n.d.c; Sitemaps.org, n.d.).

**Gallery lightbox.** `lightbox.js` turns each gallery picture into a button. Clicking it opens the picture large on a dark background with its caption. You can close it with the X button, the Escape key or by clicking outside the picture. The arrow buttons, the left and right arrow keys, or a swipe on a phone move to the next or previous picture. The lightbox is built following the W3C modal dialog pattern (W3C, n.d.b).

**Interactive elements.** The About Us page has an FAQ accordion. Clicking a question opens its answer and closes the others, and it can be used with the keyboard (W3C, n.d.a). Sections, cards and gallery pictures fade in as the page scrolls, using the Intersection Observer API (MDN, n.d.d). The animations turn off for visitors who have "reduce motion" switched on (MDN, n.d.e).

**Interactive map.** The Contact page uses Leaflet with OpenStreetMap tiles (Leaflet, n.d.; OpenStreetMap, n.d.). It shows a marker and popup for the store. The visitor can drag and zoom the map, click a button to see how far they are from the store, reset the map, or open directions in Google Maps. If the map cannot load, a message is shown instead.

**Dynamic content and search.** The products are stored as a list in `products.js`. `services.js` builds the product cards from that list with JavaScript. The visitor can search by typing, filter by category (All, Consoles, Games, Accessories) and sort by price or name. The count of products shown updates, and a message appears if nothing matches.

**Enquiry form.** The form has text fields, a dropdown, a number field, checkboxes and radio buttons. Each field is checked in the browser, and a clear message appears under any field that is wrong. When the form is valid it is sent with `fetch()` without reloading the page (MDN, n.d.f). A response then shows the estimated cost (price times quantity), whether the product is in stock, and delivery information, depending on what the visitor ticked. Clicking "Enquire" on a Services card opens this form with the product already selected.

**Contact form.** The form has name, email, topic (dropdown) and message fields, all validated. When it is valid, the page builds an email addressed to `macindustriesDigital@gmail.com` and opens it in the visitor's email app using a `mailto:` link (Hoffman, Masinter and Zawinski, 1998). A confirmation message with an "Open my email app" button is shown.

**Responsive design.** The CSS is written for phones first. Media queries at 40em (tablet) and 64em (desktop) change the layout. The navigation is a grid on phones and a single row on larger screens, and cards and gallery pictures wrap into more columns as the screen gets wider. Text sizes use `clamp()` so they scale smoothly (MDN, n.d.g). Images use `srcset` and `sizes` so phones download smaller files (MDN, n.d.h).

## How I addressed the Part 2 feedback

The table below lists each point from my Part 2 feedback and what I did about it.

| Feedback from Part 2 | What I did | Where |
|----------------------|-----------|-------|
| The sitemap is missing | Created a sitemap with a page-link table, and added a sitemap section here | `SITEMAP.md`, this README |
| The changelog is missing and must be dated and specific | Created `CHANGELOG.md` and included the full changelog in this README | `CHANGELOG.md`, [Changelog](#changelog) |
| References are incomplete and the image credit was a placeholder | Wrote a full reference list with links and an image credits section | [References](#references), [Image credits](#image-credits) |
| Five pages had the wrong `css/styles.css` path, and the correct link sat inside the navigation | Every page now has one `<link rel="stylesheet" href="../css/styles.css">` inside `<head>` | All six pages in `screens/` |
| Semantic structure was inconsistent, with `<header>` and `<main>` missing on some pages | Every page now has a skip link, `<header>` with `<nav>`, one `<main>`, and a `<footer>` | All six pages in `screens/` |
| The About page link used `aboutus.html` but the file is `aboutUs.html`, and the link text was inconsistent | Every link now uses `aboutUs.html`, and the navigation is the same on every page | All six pages in `screens/` |
| The Services page used inline widths and Flexbox without wrapping | Moved the layout into reusable classes (`.card-grid`, `.card`) that wrap and stack on small screens, and then rebuilt the product list with JavaScript | `css/styles.css`, `screens/services.html` |
| Responsive changes were not consistent across pages, and the tablet and mobile adjustments were missing for Services and navigation | Added breakpoints for phone, tablet and desktop that apply to every page, and a navigation layout that works at narrow widths | `css/styles.css` |
| Smaller text and page-specific headings needed responsive refinements | Body text and headings now scale with `clamp()` | `css/styles.css` |
| Extend interaction styling and keep keyboard focus clearly visible | Added `:hover`, `:focus-visible` and `:active` styles for links, buttons, form fields and the new accordion, chips and lightbox buttons | `css/styles.css` |
| Images were missing `srcset` and `sizes`, and the logo alt text said "profile image" | Added `srcset`, `sizes` and `loading="lazy"` with 480px and 800px copies of each image, and wrote descriptive alt text | `_images/responsive/`, all pages with images |
| Commit messages should name the files or features changed | I commit after each change with a specific message, for example "Add gallery lightbox with keyboard and swipe support" | Commit history |
| The README Author and Licence sections were incomplete, and the directory tree needed correcting | Completed both sections and rewrote the directory tree to match the real files | [Project structure](#project-structure), [Author and licence](#author-and-licence) |
| The README needed a dated changelog section, including updates for the Part 1 feedback | Added the [Changelog](#changelog) below with dated entries from the first version | [Changelog](#changelog) |

## Changelog

The full changelog is below. It is also in [CHANGELOG.md](CHANGELOG.md). Dates are written as year-month-day.

### [2.1.0] - 2026-11-08
**Added**
- Contact form on the Contact page with name, email, topic and message fields, validation, and an email built with a `mailto:` link (`js/contact.js`).
- Full README with the Part 2 feedback table, requirements table, references and image credits.
- Root `index.html` that redirects visitors to `screens/index.html`, so the published site opens correctly.

**Changed**
- Error messages in both forms now keep their space reserved, so the form no longer jumps when a message appears. This fixed a bug where clicking a checkbox straight after typing in the message box sometimes did nothing.
- `sitemap.xml` and `robots.txt` now use the real published website address.

**Removed**
- The consent checkbox from the Enquiry form, because it was not needed.

### [2.0.0] - 2026-11-07 (Part 3 features)
**Added**
- SEO: unique title, meta description and meta keywords on all six pages, plus author, robots and Open Graph tags.
- `robots.txt` and `sitemap.xml`.
- Gallery lightbox with captions, arrow buttons, keyboard controls and swipe (`js/lightbox.js`).
- FAQ accordion on the About Us page (`js/accordion.js`) and scroll animations on all pages (`js/animations.js`).
- Interactive Leaflet map on the Contact page with a marker, popup, distance button and reset button (`js/map.js`).
- Products built with JavaScript on the Services page, with search, category filter and sort (`js/products.js`, `js/services.js`). Three more games (EA Sports FC 26, God of War Ragnarök, Gran Turismo 7) were added using the prices from the Gallery.
- Rebuilt Enquiry form with a dropdown, number field, checkboxes, radio buttons, validation, `fetch()` submission and a cost and availability response (`js/enquiry.js`).

**Changed**
- All 15 images renamed with descriptive names (for example `Ps5 console.jpg` became `ps5-console.jpg`) and their `responsive` copies renamed to match.
- The Contact page Google Maps embed was replaced by the Leaflet map.
- The Xbox description on the Services page now matches the Xbox Series S that is on sale.
- The Contact page YouTube placeholder was replaced with a real video.

### [1.1.0] - 2026-11-07 (Part 2 feedback corrections)
**Added**
- `CHANGELOG.md`, `SITEMAP.md` and a references and image credits section in the README.
- Skip link, `<header>` with `<nav>`, one `<main>` and `<footer>` on every page, and `aria-current="page"` on the active link.
- `srcset`, `sizes` and `loading="lazy"` on content images, with 480px and 800px wide copies in `_images/responsive/`.
- Reusable layout classes `.card-grid`, `.card` and `.banner`.
- Breakpoints for phone, tablet and desktop, responsive text with `clamp()`, and `:focus-visible` and `:active` styles.

**Changed**
- The Services page inline styles and fixed-width Flexbox columns were replaced with CSS classes.
- Every page now links `../css/styles.css` once, inside `<head>`.
- Every link to the About page now uses `aboutUs.html`.
- Alt text on images now describes what the image shows.
- The enquiry button now uses the shared `.btn` style.
- README rewritten with a corrected directory tree and completed Author and Licence sections.

**Fixed**
- Broken `<img>` tags, unclosed `<div>` elements, a stray `</header>` and a duplicate `</body></html>`.
- Spaces in image paths are now encoded as `%20`.

### [1.0.0] - 2026-11-07 (Part 2 files carried over)
**Added**
- Initial commit, and the Part 2 files (six pages, `css/styles.css` and the images) transferred into this repository.

## Publishing the website

The GitHub Classroom repository cannot host a website, so I made a copy of the finished project in a repository under my own GitHub account and published that copy with GitHub Pages. The steps I followed are in the module's publishing guide. After publishing I opened the live link in a browser where I was not signed in and checked every page.

## Testing

I tested the site by opening every page at phone (375px), tablet (768px) and desktop (1280px) widths using the browser's device toolbar. I checked that:

- all six pages open, the navigation works and every image loads
- the lightbox opens, moves between images and closes
- the accordion opens and closes
- search, filter and sort work on the Services page, including a search with no results
- both forms show a clear message for each invalid field, and work when filled in correctly
- the map loads and the buttons work

Browser used: Google Chrome.

## Known limitations

- The enquiry form sends its data to JSONPlaceholder, a free testing service that does not store or email anything. To receive real enquiries I would need to replace the address in `js/enquiry.js` with my own form service.
- The stock numbers in `js/products.js` and the store location on the map are sample data, because the business is not real.
- The contact form uses a `mailto:` link, so it relies on the visitor having an email app set up. It does not send the email itself.
- Some product details, such as which console a game is for, were taken from the cover art.

## References

Google (n.d.a) *Control your snippets in search results*. Available at: https://developers.google.com/search/docs/appearance/snippet (Accessed: 8 November 2026).

Google (n.d.b) *SEO starter guide*. Available at: https://developers.google.com/search/docs/fundamentals/seo-starter-guide (Accessed: 8 November 2026).

Google (n.d.c) *Introduction to robots.txt*. Available at: https://developers.google.com/search/docs/crawling-indexing/robots/intro (Accessed: 8 November 2026).

Google (n.d.d) *Image SEO best practices*. Available at: https://developers.google.com/search/docs/appearance/google-images (Accessed: 8 November 2026).

GrandGeko (2026) *GTA 6 in 3 Weeks - Everything You Need To Know Before You Play!* [Video]. YouTube. Available at: https://youtu.be/hqJTNzRkVms (Accessed: 8 November 2026).

Hoffman, P., Masinter, L. and Zawinski, J. (1998) *RFC 2368: The mailto URL scheme*. Available at: https://datatracker.ietf.org/doc/html/rfc2368 (Accessed: 8 November 2026).

Keep a Changelog (n.d.) *Keep a Changelog 1.1.0*. Available at: https://keepachangelog.com/en/1.1.0/ (Accessed: 8 November 2026).

Leaflet (n.d.) *Leaflet quick start guide*. Available at: https://leafletjs.com/examples/quick-start/ (Accessed: 8 November 2026).

MDN Web Docs (n.d.a) *Semantic HTML*. Available at: https://developer.mozilla.org/en-US/docs/Glossary/Semantic_HTML (Accessed: 8 November 2026).

MDN Web Docs (n.d.b) *The Image Embed element*. Available at: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img (Accessed: 8 November 2026).

MDN Web Docs (n.d.c) *:focus-visible*. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible (Accessed: 8 November 2026).

MDN Web Docs (n.d.d) *Intersection Observer API*. Available at: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API (Accessed: 8 November 2026).

MDN Web Docs (n.d.e) *prefers-reduced-motion*. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion (Accessed: 8 November 2026).

MDN Web Docs (n.d.f) *Using the Fetch API*. Available at: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch (Accessed: 8 November 2026).

MDN Web Docs (n.d.g) *clamp()*. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/clamp (Accessed: 8 November 2026).

MDN Web Docs (n.d.h) *HTMLImageElement: srcset property*. Available at: https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/srcset (Accessed: 8 November 2026).

OpenStreetMap (n.d.) *Copyright and licence*. Available at: https://www.openstreetmap.org/copyright (Accessed: 8 November 2026).

Sitemaps.org (n.d.) *Sitemaps XML format*. Available at: https://www.sitemaps.org/protocol.html (Accessed: 8 November 2026).

Typicode (n.d.) *JSONPlaceholder: free fake and reliable API for testing and prototyping*. Available at: https://jsonplaceholder.typicode.com/ (Accessed: 8 November 2026).

W3C (n.d.a) *Accordion pattern*, WAI-ARIA Authoring Practices Guide. Available at: https://www.w3.org/WAI/ARIA/apg/patterns/accordion/ (Accessed: 8 November 2026).

W3C (n.d.b) *Dialog (modal) pattern*, WAI-ARIA Authoring Practices Guide. Available at: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/ (Accessed: 8 November 2026).

The Independent Institute of Education (2026) *WEDE5020 Web Development (Introduction) module manual* [Word document]. Available at: https://advtechonline.sharepoint.com/:w:/s/TertiaryStudents/cQpnfbbMxlRyS4cfz4xblUxqEgUCLNe9ab-zGeOYpowFzi1Buw (Accessed: 8 November 2026).
Also used work learnt during lecture time and constanly asked my lecturer for assistance with my project.

## Image credits

I found the images using Google Images and saved or screenshotted them for this assignment. I did not record the original website for each picture, so I have credited the owners of the artwork where I know who they are. The original pictures and artwork belong to their owners.

| Image file | Used on | Credit |
|------------|---------|--------|
| `ea-fc-26-cover.png` | Services, Gallery | Game cover art, © Electronic Arts (EA Sports) |
| `god-of-war-ragnarok-cover.png` | Services, Gallery | Game cover art, © Sony Interactive Entertainment |
| `gran-turismo-7-cover.png` | Services, Gallery | Game cover art, © Sony Interactive Entertainment |
| `gta-6-cover.png` | Services | Game artwork, © Rockstar Games |
| `minecraft-cover.png` | Services | Game artwork, © Mojang Studios |
| `mac-industries-logo.jpg` | Home, Gallery | Mac Industries logo, screenshot taken by me |
| `ps5-console.jpg`, `xbox-console.jpg`, `gaming-controllers-neon-desk.jpg`, `racing-game-on-tv.jpg`, `playstation-controller-floating.jpg`, `playstation-gaming-room.jpg`, `gamer-playing-fifa.jpg`, `gamer-playing-call-of-duty.jpg`, `gamer-playing-fortnite.jpg` | Home, About Us, Services, Gallery | Found through Google Images. Original photographer and website not recorded. The copyright belongs to the original owners. |

The map tiles are © OpenStreetMap contributors. The Contact page video is from the YouTube channel GrandGeko: https://youtu.be/hqJTNzRkVms (see the reference below).

## Use of AI tools

I used two AI assistants while working on this project: Google Gemini and Claude.It helped me plan the work,fix code, and draft documentation such as this README and the changelog. I implemented suggestions and corrections from gemini to my project and tested it myself. i used Gemini to help better my project by using its advise and pointers to better the project i also used it to mark my project via the rubric to see if i have left anything out and what i ciuld improve. 

My Gemini chat: https://share.gemini.google/zpJo8uQ1aUsI

## Author and licence

**Author:** Troy Mac Donald, student number ST10511649, WEDE5020 Web Development (Introduction).

**Licence:** All rights reserved. This is a student assignment. Game titles, console names and artwork belong to their owners.
