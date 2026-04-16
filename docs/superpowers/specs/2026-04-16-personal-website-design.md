# Personal Website — Design Spec

**Owner:** Costa Xanthos
**Date:** 2026-04-16
**Status:** Design approved, ready for implementation plan

## Purpose

A personal website at a custom domain that showcases Costa's current and past projects without cluttering a resume. The site serves a dual role:

1. A lightweight portfolio linked from job applications (most immediately, Conductor's founding Product Designer role).
2. A durable home for linking out to active projects (Vigil, Epitro, etc.) as they evolve.

Because the most immediate audience is a design-forward dev-tools startup (Conductor), the site itself is a design artifact. Craft matters — generic minimal is not the goal; minimal with intent is.

## Audience

- Primary: Charlie Holtz / Jackson and the Conductor team reviewing a Product Designer application.
- Secondary: Future employers, collaborators, friends of friends linking in.
- Both audiences are design- and engineering-literate. They will notice typography choices, performance, and restraint.

## Non-goals

- Blog / writing section (not in scope; can be added later).
- Per-project case study pages (pulled out intentionally to keep the site a single page).
- CMS or headless content system (content lives in the repo; editing is a code change).
- Dark mode (explicitly out of scope for v1 — one well-considered light theme beats two mediocre ones).
- Analytics (can be added later; not part of v1).

## Page structure

Single page, top to bottom:

1. **Hero** — Name, one-line role, and the thesis line.
2. **Projects** — Grid of 5 cards.
3. **About** — Short bio (120–180 words).
4. **Stack** — "Built with" block listing daily tools.
5. **Contact** — LinkedIn, email, GitHub, resume (PDF).
6. **Footer** — "Now" line (human-updated) + small copyright/year.

No navigation bar. The page is short enough that scroll is the only navigation needed.

## Visual direction

- **Minimal with intent.** Left-aligned content, max content width ~680px. Reads like a piece of writing, not a dashboard.
- **Generous vertical whitespace** between sections (at least 96px on desktop, scaled for mobile).
- **Typography as the craft signal:**
  - Thesis / section headings: large serif — Fraunces or Instrument Serif (to be finalized at implementation; pick one).
  - Body text: clean sans — Inter or Geist.
  - Metadata (project status, year, footer): monospace — JetBrains Mono or Geist Mono.
- **Color palette:**
  - Background: warm off-white (`#FAFAF7` — to be tuned at implementation).
  - Text: near-black (`#111111` or similar).
  - One subtle accent color used only on hover states (to be chosen at implementation — likely a muted blue or warm brown; must pass WCAG AA contrast for interactive elements).
- **Distinctive craft touches (limited to two to preserve restraint):**
  1. Project cards reveal a small `→` arrow and a mono status tag (`Live` / `Building` / `Shipped` / `Advising`) on hover.
  2. Footer has a human "Now" line ("Now: building Vigil, applying to Conductor, in Boston") above a mono timestamp, manually updated.

## Content

### Hero

> **Costa Xanthos**
> Aspiring product designer · Babson '26
>
> *I think my next job in private equity can be automated by an agent I could build in a weekend. So I'm designing software instead.*

The thesis line is the centerpiece of the hero and should be set in the largest type on the page.

### Projects

Cards render in this order (ordering is deliberate — most design-relevant projects first):

1. **Vigil** — A control panel for your coding agents. See what they changed and why, in plain English.
   Link: https://vigil.ai
   Status tag: `Building`
2. **Epitro** — AI property management for small landlords. Rents, cash flows, and portfolio health without the spreadsheet.
   Link: https://epitro.ai
   Status tag: `Building`
3. **Beacon AP** — Building AI relationship intelligence for a Boston investment firm.
   Link: (none — consulting engagement, no public URL)
   Status tag: `Consulting`
4. **Yieldstack** — AI-native commercial real estate brokerage. Helping a close friend with product and stack.
   Link: https://yieldstack.ai
   Status tag: `Advising`
5. **Neutralis** — A functional prediction market.
   Link: https://neutralis.ai
   Status tag: `Shipped`

Each card: project name (sans), short description (sans), status (mono, revealed on hover), external link icon.

### About

> I've been building since Legos and K'NEX. At Clarion Partners this summer I was the one intern out of nine to get a return offer — partly because I built them an Excel VBA system that automated their deal screening. That same instinct is why I'm leaving real estate: the work has right answers, and I want to work on questions that don't.
>
> I have strong opinions about AI and what's coming. I'd rather design the tools than be the person they replace.

To be lightly edited during implementation for rhythm, but substance is locked.

### Stack

A small block under the heading "Built with":

- **Conductor** — orchestrating coding agents
- **Ghosty** — (description TBD at implementation based on current usage)
- **Wispr Flow** — voice-to-text for writing
- **Opus 4.7** — the model I use day to day

One-line description per tool. Links to each tool's site where applicable.

### Contact

Four links, presented as a simple list:

- LinkedIn — (Costa to provide URL)
- Email — (Costa to provide)
- GitHub — (Costa to provide)
- Resume — PDF hosted in the repo at `/public/resume.pdf`

### Footer

- "Now" line — human-written, manually updated.
- Small copyright / year below it.

## Technical architecture

- **Framework:** Astro (static site generation, ships zero JS by default).
- **Styling:** Tailwind CSS.
- **Hosting:** Vercel (free tier is sufficient for v1).
- **Domain:** To be acquired by Costa before launch (likely `costaxanthos.com` or similar — decided at implementation).
- **Repository:** Public GitHub repo. Visibility itself is a signal for the Conductor application.
- **Performance targets:**
  - Single-page site, < 50kb JS total.
  - Lighthouse 100/100/100/100 on desktop; ≥95 on each category on mobile.
  - All fonts self-hosted (no third-party CDN calls) or loaded via `@fontsource`.
- **Accessibility:**
  - Semantic HTML (`<header>`, `<main>`, `<section>`, `<footer>`).
  - WCAG AA contrast on all text and interactive elements.
  - Focus states on all links; keyboard navigable.
- **SEO basics:** `<title>`, meta description, Open Graph tags for link previews, favicon.

## File/project structure (high level)

```
personal-site/
├── src/
│   ├── pages/
│   │   └── index.astro          # the whole site
│   ├── components/
│   │   ├── Hero.astro
│   │   ├── Projects.astro
│   │   ├── ProjectCard.astro
│   │   ├── About.astro
│   │   ├── Stack.astro
│   │   ├── Contact.astro
│   │   └── Footer.astro
│   ├── styles/
│   │   └── global.css           # Tailwind + a few custom layer rules
│   └── content/
│       └── projects.ts          # project data, typed
├── public/
│   ├── resume.pdf
│   └── favicon.svg
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
└── README.md
```

Each component is small and does one thing. Project data lives in a typed data file so editing content doesn't require touching layout.

## Success criteria

The site is considered done for v1 when:

1. It is deployed to Vercel at a custom domain.
2. All five projects render correctly with links, descriptions, and status tags.
3. Bio, stack, contact, and footer match the spec content.
4. Lighthouse scores meet the performance targets above.
5. The site is linked from the Conductor application.

## Open items to resolve at implementation time

- Final font pairing (Fraunces vs. Instrument Serif for display; Inter vs. Geist for body).
- Final accent color (must pass contrast; aim for something warm and restrained).
- Domain name confirmation and acquisition.
- Ghosty one-line description (confirm Costa's usage before writing).
- Exact LinkedIn / email / GitHub URLs.
- Initial "Now" line text.
