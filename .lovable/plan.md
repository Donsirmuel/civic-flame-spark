## Two originals to replace the Shobs-y landing and the Twitter-y timeline

### 1. Landing — "Constituency Map-first"

The whole hero becomes a stylized Nigeria. No product screenshot, no floating tweet card.

**Layout**
- Full-bleed background: a hand-drawn / SVG map of Nigeria (36 states + FCT), rendered in the ink/ochre palette we already use. Not a real Google/Mapbox map — a designed one. Ships as a single SVG asset so it stays fast and themable.
- Compact left rail (~380px) holds the wordmark, a short headline ("Every voice has a constituency."), one sentence of body copy, and the two CTAs (Sign Up as a Citizen / I'm a Government Official — both already routed to `/signup`).
- Right side is the map, taking ~65% of the viewport.

**What lives on the map**
- ~14 pulsing pins scattered across real LGAs (Nnewi, Ikeja, Kano, Port Harcourt, Jos, Ibadan, Maiduguri, Abuja, etc.). Pin color encodes status (open / in progress / resolved).
- Hovering a pin pops a small card: citizen grievance excerpt + "Answered by Hon. X" (or "Awaiting response"). Cards use the same case-file styling as the timeline so the landing previews the product.
- One pin is "active" by default on load and cycles every ~4s so the page feels alive without interaction.
- A live counter strip pinned to the map's bottom edge: "1,284 grievances today · 402 official replies · 37 LGAs active" (static seeded numbers, no backend call).

**Below the fold** (kept minimal, no more Shobs-y editorial chapters)
- One horizontal "How it moves" strip: three tight steps (Post → Route → Answer) as small illustrated tiles, not numbered book chapters.
- One quiet closing band with the sign-up CTA.
- Existing Marquee, Chapters, TwoSides, ClosingBand landing sections get removed — the map does the storytelling.

**Motion**
- Pins fade + scale in with a stagger on mount.
- Active pin has a soft ochre ripple.
- Hover card slides up 4px with a shadow lift.
- Nothing scroll-jacky.

### 2. Timeline — "Thread-as-Case-File"

Every post is a case-file card, not a tweet row. The feed reads like a public docket.

**Card anatomy** (replaces the current `PostRow`)

```text
┌──────────────────────────────────────────────────────┐
│  CASE #NN-042  ·  WATER · Ward 4, Nnewi North LGA    │  ← status ribbon on the right
├──────────────────────────────────────────────────────┤
│  FILED BY                                             │
│  ● Chinelo N.  ·  Citizen  ·  2h ago                 │
│                                                       │
│  "The borehole in Umudim has been dry for 3 weeks…"  │
│  [optional image / poll]                             │
│                                                       │
│  ▸ 412 citizens signed on   ▸ 38 comments            │
├──────────────────────────────────────────────────────┤
│  ESCALATION LADDER                                    │
│  ● Ward 4  →  ● LGA Chair  →  ○ State  →  ○ Federal  │  ← filled dots = reached
├──────────────────────────────────────────────────────┤
│  OFFICIAL RESPONSE  ✓ Verified                       │
│  Hon. A. Okeke  ·  LGA Chairman  ·  1h ago           │
│  "Repair team on site today. Photo update Friday."   │
├──────────────────────────────────────────────────────┤
│  Upvote · Comment · Repost · Bookmark · Share        │
└──────────────────────────────────────────────────────┘
```

**Why this differs from Twitter**
- Card has explicit sections (Filed by / Escalation / Response) with tiny uppercase labels — feels like a form, not a chat.
- Escalation ladder is a first-class visual (dots + arrows), showing where the grievance currently sits and how far it can travel. Dots fill as the case moves up.
- Case number + category tag in the header ribbon.
- Unanswered cases show a dashed "Awaiting response" section instead of the reply block, so silence is visible.
- Status ribbon color-codes the whole card edge (open = neutral, in progress = ochre, resolved = green, escalated = red).

**Feed page shell**
- Keep the sticky header + tabs (For you / Verified / My region / Trending) — those are fine.
- Composer stays but gets a subtle "File a new grievance" framing instead of a tweet box (label change only, functionality unchanged).
- Right rail: replace "Trending regions" with a small **live constituency map** — same asset as the landing, but at ~280px wide, showing where recent cases in the current tab are located. Click a pin → filters the feed to that LGA.
- Left sidebar and bottom mobile nav are unchanged.

**Motion**
- Cards fade+rise on first paint with a small stagger.
- Escalation ladder dots pulse briefly when a case updates.
- No hover-lift on the whole card (too much at feed density) — just a subtle background tint.

### Scope of this change

**Files touched**
- `src/routes/index.tsx` — swap sections for the new map hero + minimal below-the-fold.
- `src/components/landing/Hero.tsx` — rewritten as `MapHero`.
- New: `src/components/landing/NigeriaMap.tsx` (SVG map + pin layer + hover cards).
- New: `src/components/landing/HowItMoves.tsx` (3-tile strip).
- Removed from landing render: `Marquee`, `Chapters`, `TwoSides`, `CivicFeedCard` (files can be deleted or left unused — I'll delete to keep the tree clean).
- `src/routes/_authenticated/timeline.tsx` — replace `PostRow` with a new `CaseFileCard` component.
- New: `src/components/app/CaseFileCard.tsx`, `src/components/app/EscalationLadder.tsx`.
- `src/components/app/AppShell.tsx` — swap the right-rail "Trending regions" block for a small `<NigeriaMap variant="rail" />`.
- `src/components/app/Composer.tsx` — relabel "What's happening…" → "File a grievance…" and section chip copy; no logic change.
- `src/styles.css` — add ribbon color utilities and ladder-dot styles.

**Out of scope**
- No schema changes. The existing `posts` table already has `region`, `scope`, `status`, `official_reply*` — the case file reads all of it. Escalation ladder is derived from `scope` for now (LGA → Ward-only filled; STATE → up to State filled; FEDERAL → all filled). Real ladder history is a later feature.
- No new dependencies. Map is hand-authored SVG.
- Auth, routing, notifications, messages, profile, settings pages: unchanged.

### Order of work

1. Build `NigeriaMap` (SVG + pin data + hover card) — the shared primitive both pages use.
2. Rebuild landing (`MapHero`, `HowItMoves`, updated `index.tsx`, delete unused landing sections).
3. Build `CaseFileCard` + `EscalationLadder`, wire into `timeline.tsx`.
4. Swap right rail in `AppShell` to the rail-variant map.
5. Relabel composer copy.
6. Verify build + take a Playwright screenshot of `/` and `/timeline` to confirm the new look.
