# Zackary Boudekak · Portfolio

The source for my personal portfolio. I'm a software and cloud engineer in Reading, UK, in my final year of BSc Computer Science (Hons) at the University of Reading, co-founder of [VoQuota](https://www.voquota.com/), and formerly a Cloud Engineer Intern at Virgin Media O2.

## What's in it

A single, dependency-free static page: a big name up top and the work shown as large tiles, with violet as the one bold colour.

- **Projects:** VoQuota (with an animated walkthrough of the quote, invoice and card payment flow, built in HTML and played like a video), a serverless Job Application Tracker on AWS (with Cognito sign-in and AI job-ad auto-fill on Bedrock), Patchwick, and a Google Cloud migration from my Virgin Media O2 placement
- **Experience:** placement and degree
- **Skills** and **Contact**

It works down to phone width, and respects reduced-motion settings (the walkthrough waits for a press of play instead of starting on its own).

## Structure

```
index.html                   the page
assets/styles.css            all styling (colour tokens at the top)
assets/main.js               VoQuota walkthrough player, scroll reveals, copy-email button
assets/favicon-32.png        site icon (browser tab)
assets/favicon-192.png       larger site icon (search results, Android)
assets/job-tracker.webp      Job Application Tracker screenshot
assets/patchwick.webp        Patchwick client workspace screenshot
assets/*-phone.webp          phone-sized versions of both screenshots, used on small screens
assets/apple-touch-icon.png  icon for iPhone home screens
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
