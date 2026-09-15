# Anayat Ullah — Premium Portfolio V12

V12 focuses on responsive behavior, mobile interaction quality, polished Gmail email templates, and the simplified local Nodemailer workflow.

## V12 highlights

- Projects keep the stacked scroll-deck experience on desktop.
- On tablets and phones, Projects become a horizontal swipe / snap gallery instead of a long vertical list.
- Certificates use the same premium swipe / snap pattern on smaller devices and remain large/readable.
- Added mobile spacing, typography, modal, contact form, review form, hero, and touch-target refinements.
- Contact / booking / review email HTML has been redesigned with a premium navy, blue, violet, and emerald visual system.
- Owner notifications and visitor confirmations use distinct status badges and accent treatments.
- `/api/contact` and `/api/review` run locally through Vite middleware, so local development only needs `npm run dev`.
- Navbar section clicks jump immediately to the selected section while keeping Lenis for normal wheel/touch scrolling.

## Run locally

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

## Email configuration

Create a `.env` file in the project root:

```env
GMAIL_USER=your-gmail@gmail.com
GMAIL_APP_PASSWORD=your-16-character-google-app-password
CONTACT_TO=your-gmail@gmail.com
VITE_GITHUB_USERNAME=AnayatUllah123
```

Use a Google App Password, not your normal Gmail password. Do not prefix Gmail credentials with `VITE_`.

During `npm run dev`, Vite handles `/api/contact` and `/api/review` in its Node environment, so Nodemailer credentials stay out of the React/browser bundle.

## Responsive behavior

Desktop keeps the advanced GSAP stacked decks. At `980px` and below, Projects and Certificates switch to touch-friendly horizontal snap galleries. At phone widths, each card fills most of the viewport so one primary card is visible with a small hint of the next card, making the swipe interaction discoverable.

V13 updates:
- Projects and certificates are free-scrolling horizontal auto carousels; no vertical scroll trapping.
- Responsive card sizing for desktop/tablet/mobile.
- Improved readability and font sizing.
- Faster/smoother Lenis, GSAP and Framer Motion transitions.
- Instant navbar jumps with dynamic navbar/section offset.
- New professional folded-arms hero portrait.
