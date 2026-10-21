# Zackary Boudekak · Portfolio

The source for my personal site: I'm a freelance software engineer based in Reading, UK, in my final year of BSc Computer Science (Hons) at the University of Reading, co-founder of [VoQuota](https://www.voquota.com/), and formerly a Cloud Engineer Intern at Virgin Media O2.

## What's in it

A single, dependency-free static page:

- **What I do:** web apps and internal tools, integrations and automation, hosting and upkeep
- **My work:** an interactive VoQuota demo, with a real quote and invoice rebuilt in HTML and a toggle that walks through converting one into the other
- **How it works:** the four steps of working with me
- **About me:** experience, education and technical skills
- **Contact:** email and LinkedIn

It supports light and dark mode, works down to phone width, and respects reduced-motion settings.

## Structure

```
index.html          the page
assets/styles.css   all styling (colour tokens at the top)
assets/main.js      quote/invoice switcher, menu highlighting, copy-email button
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
