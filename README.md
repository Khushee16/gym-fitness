# IronPeak Fitness — Gym Website

A fictional gym website built as a **self-directed portfolio piece**.
IronPeak Fitness is an invented business: there is no real gym, no real
trainers, no real members, and no real memberships. All copy, prices,
people, class times and contact details are fictional demo content.

## What it is

A polished, responsive, multi-page gym website with a class timetable,
trainer profiles, membership pricing, a join enquiry form, and a
client-side BMI calculator.

## Pages

| Page | Purpose |
| --- | --- |
| `index.html` | Home / hero, what we offer, **BMI calculator**, featured classes, CTA |
| `classes.html` | Class cards with JS category filter + full weekly timetable |
| `trainers.html` | Six fictional trainer profiles with specialities |
| `membership.html` | Three pricing plans, join enquiry form (demo mode), FAQ accordion |

Shared navigation and footer appear on every page.

## Stack

- **HTML5 + CSS3** (custom `assets/css/style.css`)
- **JavaScript** (vanilla, `assets/js/main.js` — scroll reveals, class filter,
  BMI calculator, demo-mode join form)
- **Bootstrap 5.3** via CDN (layout, components, responsive grid)
- **Images:** placeholder photography from `picsum.photos` (seeded URLs),
  so no local image assets are needed

## Backend

**None.** This project is intentionally front-end only:

- The **BMI calculator** is pure JavaScript: `BMI = weight (kg) / height (m)²`,
  with result ranges — under 18.5 underweight, 18.5–24.9 healthy,
  25–29.9 overweight, 30+ obese — plus a visual range meter. Numbers never
  leave the browser.
- The **join enquiry form** on `membership.html` runs in clearly labelled
  **demo mode**: submitting it shows a "Demo mode — enquiry previewed, not
  sent" message. Nothing is stored, emailed or faked.

## What works where

| Environment | Behaviour |
| --- | --- |
| Any static host / `file://` (e.g. GitHub Pages) | Everything works — all pages, class filter, BMI calculator, FAQ, and the demo-mode join form. No backend is needed. |

## Run locally

```bash
cd gym-fitness
python3 -m http.server 8001
# open http://localhost:8001
```

## Design notes

- Dark "coal + ember orange" palette, Archivo + Inter typography, bold
  uppercase hero type, generous spacing.
- Scroll-reveal animations (IntersectionObserver), hover lift on cards,
  class filter with instant feedback, animated BMI range meter.
- Fully responsive: mobile / tablet / desktop via Bootstrap grid + custom
  breakpoints.

## Status

Self-directed portfolio project by Khushi Khatri. **Not client work.**
