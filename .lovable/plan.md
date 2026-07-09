## Concept — "The People's Broadsheet"

CivicNet's landing page borrows the visual language of a modern independent newspaper — the town square in print form — and fuses it with the intimacy of a social feed. The metaphor tells the story before the copy does: *your voice, set in type big enough for a minister to read.*

One page. No dashboard-look. Every pixel earns its place.

### The signature moves

1. **Broadsheet masthead nav** — thin rule top and bottom, tiny uppercase "ISSUE 001 · EST. 2026 · YOUR REGION" ticker on the left, wordmark centered, single **Sign Up** pill on the right. No 6-link nav bar. Just: `Manifesto` · `How it works` · **Sign Up**.

2. **Hero — the front page**
   - Eyebrow (tiny uppercase, ochre): `A civic network for developing democracies`
   - Headline (massive DM Serif Display, mixed roman + italic, tight leading):
     *"Speak up.*
     Be heard.
     ***Be answered.***"
   - The last line's "answered" gets an ochre hand-drawn underline.
   - Sub (Plus Jakarta Sans, warm charcoal): two lines about connecting citizens to verified officials from local wards to federal ministries.
   - CTA cluster: solid green **Sign Up as a Citizen** (primary) + ghost outlined **I'm a Government Official** (secondary, with a tiny verified-badge checkmark icon).
   - Trust microline underneath: `Verified officials · Public accountability · Free forever`.

3. **The Visual Anchor — a floating "Civic Feed" card**
   Occupies the right half on desktop, drops below hero on mobile. Not a stock photo — a **designed UI mock** rendered in pure HTML/CSS:
   - Cream card, rounded-2xl, warm shadow, subtle 1px green border.
   - Header strip: "LIVE · Nnewi North LGA" with a pulsing ochre dot.
   - Post 1: citizen avatar (initials), *"The community borehole in Umudim has been dry for 3 weeks. Please."* — 412 upvotes, "Escalated to LGA Chair" badge.
   - Response chip below it: green tinted card, small badge `✓ VERIFIED OFFICIAL`, name + title (`Hon. A. Okeke · LGA Chairman`), one-line reply `"Repair team dispatched today. Photo update by Friday."`
   - Post 2 (peeking, faded): "Streetlights on Market Road…"
   - Subtle rotation (-2deg), slight parallax feel via layered offset shadow. This card IS the product demo.

4. **Section break — a running marquee**
   Full-width thin band, warm dark green background, cream text scrolling slowly:
   `GRIEVANCES · OPINIONS · POLICY · TRANSPARENCY · GRASSROOTS → FEDERAL · GRIEVANCES · OPINIONS ·` (repeat)
   Tiny ochre asterisks between words. Signals rhythm and gives the page its "editorial pulse."

5. **Features — "Chapters," not a boring 3-column grid**
   Six features rendered as a **numbered manuscript list** — big italic serif numeral (`I.`, `II.`, `III.`…) hanging in the left margin, feature title in bold sans, one-sentence description, thin hairline divider between each. Two columns on desktop, one on mobile. Reads like a table of contents.
   - I. Post grievances and opinions
   - II. Verified officials, badged and accountable
   - III. Follow issues from ward to federal
   - IV. Upvotes surface what the community cares about
   - V. Track responses, watch resolutions
   - VI. Moderated, safe, no anonymous bullying

6. **The "Two Sides" strip** — a quiet split module
   Single row, two halves separated by a thin vertical hairline:
   - Left (cream): "For citizens" — one sentence, tiny arrow link `Sign up →`
   - Right (deep green, cream text): "For officials" — one sentence, tiny arrow link `Request verification →`
   Restrained, editorial, no card chrome.

7. **Closing CTA — the front-page banner**
   Full-width ochre band. Enormous italic serif: *"The square is open."* Below: single green **Sign Up** button. Tiny line beneath: `No cost. No noise. Just voices.`

8. **Footer — the colophon**
   Thin, single line at the top: `CIVICNET · A CIVIC NETWORK`. Below in a small grid: three tiny columns (Product · About · Legal, each with 2–3 links), then a colophon line: `Set in DM Serif Display & Plus Jakarta Sans. A final-year project by Samuel Olaonipekun · © 2026 · GitHub`.

### Design system (into `src/styles.css` as oklch tokens)

- `--background` warm cream `#F4EFE6`
- `--foreground` warm near-black `#1A1A1A`
- `--primary` deep community green `#0F5132` (buttons, verified accents, dark band)
- `--accent` ochre `#E9C46A` (underline, dot, asterisks, closing band)
- `--muted` `#E8E2D3` (subtle card surface)
- `--border` warm taupe hairline
- Radius: `--radius: 1rem` for cards, but many elements use hairline rules instead of rounded borders — editorial restraint.

### Typography

- **Display**: DM Serif Display (400 + 400 italic) — headlines, chapter numerals, closing banner.
- **Body & UI**: Plus Jakarta Sans (400/500/600/700).
- Loaded via `<link>` tags in `src/routes/__root.tsx` `head()`, NOT via `@import` in `styles.css` (Tailwind v4 rule).

### Texture & motion (restrained — one hero moment, not scattered micro-interactions)

- Subtle SVG grain overlay on `body::before` at ~4% opacity — gives the cream a paper feel.
- One hero entrance on load: eyebrow → headline lines stagger up with a small blur-to-focus. The feed card fades in with a slight settle-into-place rotation.
- Feed card's live dot pulses (CSS keyframe).
- Marquee band scrolls infinitely via CSS animation.
- Feature chapters fade in on scroll (framer-motion, once, quick).
- No hover animations on every element. Buttons get a warm color deepen only.

### Technical plan

**Files to create/edit:**
- `src/styles.css` — replace default tokens with the warm palette above; add grain-overlay utility and marquee keyframe.
- `src/routes/__root.tsx` — update `head()` metadata (title "CivicNet — Speak up. Be heard. Be answered.", matching description, `og:title` / `og:description` / `og:type=website` / `twitter:card`). Add Google Fonts `<link>` tags for DM Serif Display and Plus Jakarta Sans.
- `src/routes/index.tsx` — replace placeholder; compose the landing sections. Add its own `head()` with self-referencing `og:url` and a leaf `og:image` once the hero anchor is captured (skip for now — no meaningful image URL yet, per head-metadata rules).
- `src/components/landing/Nav.tsx`
- `src/components/landing/Hero.tsx` (headline + CTAs)
- `src/components/landing/CivicFeedCard.tsx` (the designed UI mock — pure JSX, no image)
- `src/components/landing/Marquee.tsx`
- `src/components/landing/Chapters.tsx` (numbered features)
- `src/components/landing/TwoSides.tsx`
- `src/components/landing/ClosingBand.tsx`
- `src/components/landing/Footer.tsx`

**Dependencies to install:** `framer-motion` (entrance animations only).

**CTAs:** `Sign Up` and `Request verification` will scroll to the closing band (`#join`) since sign-up/auth pages don't exist yet. Say the word if you'd rather they link to placeholder routes or open a waitlist form (waitlist form would need Lovable Cloud).

**No backend in this pass.** Landing page only. Auth, sign-up flows, feed backend, and role/verification system are separate follow-up work.

### What I'm intentionally NOT doing

- No stock photos of "diverse citizens smiling at phones."
- No 3-column icon-grid feature section.
- No "Trusted by / As seen in" logo strip (you don't have that yet, and faking it kills credibility).
- No purple gradients, no default Shadcn button styling, no generic Inter/Poppins.
- No testimonials, stats block, or FAQ (you deselected them, and the page is stronger without them).
- No hero image asset — the designed feed card IS the hero visual, and it doubles as a live product demo.
