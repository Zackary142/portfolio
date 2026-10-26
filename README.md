# Zackary Boudekak · Portfolio

The source for my personal portfolio. I'm a software engineer in Reading, UK, in my final year of BSc Computer Science (Hons) at the University of Reading, co-founder of [VoQuota](https://www.voquota.com/), and formerly a Cloud Engineer Intern at Virgin Media O2.

## What's in it

A single, dependency-free static page with my intro pinned on the left and the rest scrolling on the right:

- **Projects:** VoQuota (with an interactive quote-to-invoice demo rebuilt in HTML), Patchwick, and a Google Cloud migration from my Virgin Media O2 placement
- **Experience:** placement and degree
- **Skills** and **Contact**

It supports light and dark mode, works down to phone width, and respects reduced-motion settings.

## Structure

```
index.html          the page
assets/styles.css   all styling (colour tokens at the top)
assets/main.js      quote/invoice switcher, contents highlighting, copy-email button
assets/favicon.svg  site icon
```

## Running locally

No build step. Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

then visit http://localhost:8000.

## Deployment

Hosted on GitHub Pages from the `main` branch root. To use a custom domain, add a `CNAME` file containing the domain and point the domain's DNS at GitHub Pages.

## Licence

© Zackary Boudekak. All rights reserved. The code is public so it can be viewed; it is not licensed for reuse.
