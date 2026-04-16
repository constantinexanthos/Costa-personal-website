# Personal Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a minimal, crafted single-page personal website at a custom domain that showcases Costa's projects and doubles as a design artifact for his Conductor application.

**Architecture:** Static site built with Astro + Tailwind CSS v4. One Astro page composed of small focused components. Content lives in two typed TypeScript data files (`projects.ts`, `stack.ts`) so editing content never requires touching layout. Deployed to Vercel from a public GitHub repo.

**Tech Stack:**
- Astro 5 (static site generation, zero JS by default)
- Tailwind CSS 4 (via `@tailwindcss/vite` plugin)
- TypeScript (strict)
- `@fontsource/*` packages for self-hosted fonts
- pnpm (package manager)
- Vercel (hosting)
- GitHub (source control, public)

**Project root:** `/Users/costaxanthos/conductor/repos/personal-site/`

All paths below are relative to that root unless otherwise noted.

**Verification model:** For a static content site, "tests" are mostly compile-time and visual. Every code-writing task is gated by `pnpm astro check` (TypeScript + Astro type checking) and `pnpm build` (production build succeeds). Before the deploy task, Lighthouse audits verify perf/a11y targets. This is simpler than unit tests but still catches real bugs.

---

## File Structure

```
personal-site/
├── src/
│   ├── pages/
│   │   └── index.astro            # assembles all sections
│   ├── layouts/
│   │   └── Base.astro             # <html>, <head>, fonts, meta, <body> wrapper
│   ├── components/
│   │   ├── Hero.astro             # name + role + thesis
│   │   ├── Projects.astro         # section wrapper + maps data
│   │   ├── ProjectCard.astro      # one card (name, desc, status, link)
│   │   ├── About.astro            # bio
│   │   ├── Stack.astro            # tools list
│   │   ├── Contact.astro          # 4 links
│   │   └── Footer.astro           # "Now" line + copyright
│   ├── data/
│   │   ├── projects.ts            # Project[] with type
│   │   └── stack.ts               # StackItem[] with type
│   └── styles/
│       └── global.css             # Tailwind import + custom layer rules + color vars
├── public/
│   ├── resume.pdf                 # placeholder until Costa provides real one
│   └── favicon.svg                # simple monogram
├── astro.config.mjs
├── tsconfig.json                  # extends astro/tsconfigs/strict
├── package.json
├── .gitignore
├── .nvmrc                         # node version pin
└── README.md
```

Each component is small and does one thing. The `Base.astro` layout owns all document-level concerns (fonts, meta, color tokens). `index.astro` is pure composition — it imports sections and arranges them.

---

## Task 1: Initialize the Astro project

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`, `.nvmrc`
- Create: `src/pages/index.astro` (initial stub)

- [ ] **Step 1.1: Create the directory already exists; init git history is already started from the spec commit. Confirm state.**

Run from `/Users/costaxanthos/conductor/repos/personal-site`:
```bash
git log --oneline
ls -la
```
Expected: you see the spec commit(s) in git log and `docs/` directory. Nothing else to confirm; continue.

- [ ] **Step 1.2: Create `.nvmrc` pinning Node 20**

File: `.nvmrc`
```
20
```

- [ ] **Step 1.3: Create `package.json`**

File: `package.json`
```json
{
  "name": "personal-site",
  "type": "module",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check"
  },
  "dependencies": {
    "astro": "^5.0.0"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.0",
    "@tailwindcss/vite": "^4.0.0",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.5.0"
  }
}
```

- [ ] **Step 1.4: Create `astro.config.mjs` with the Tailwind Vite plugin**

File: `astro.config.mjs`
```js
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://costaxanthos.com',
  vite: {
    plugins: [tailwindcss()],
  },
});
```

Note: The `site` value is a placeholder. Update it once the final domain is confirmed (see Task 12).

- [ ] **Step 1.5: Create `tsconfig.json` using Astro's strict preset**

File: `tsconfig.json`
```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

- [ ] **Step 1.6: Create `.gitignore`**

File: `.gitignore`
```
node_modules
dist
.astro
.env
.env.local
.DS_Store
.vercel
```

- [ ] **Step 1.7: Create a minimal `src/pages/index.astro` so the project builds**

File: `src/pages/index.astro`
```astro
---
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Costa Xanthos</title>
  </head>
  <body>
    <p>scaffolded</p>
  </body>
</html>
```

- [ ] **Step 1.8: Install dependencies**

Run: `pnpm install`
Expected: installs Astro, Tailwind, TypeScript, and creates `pnpm-lock.yaml` and `node_modules/`.

If `pnpm` is not installed, run `npm install -g pnpm` first. (Alternative: substitute `npm` in every command in this plan; lockfile will be `package-lock.json`.)

- [ ] **Step 1.9: Verify the build works**

Run: `pnpm build`
Expected: output includes `Complete!` and `dist/` directory is created. No type or build errors.

- [ ] **Step 1.10: Verify dev server runs**

Run: `pnpm dev`
Expected: server starts at `http://localhost:4321/`. Visit in browser — see the word "scaffolded".

Stop the dev server with Ctrl-C.

- [ ] **Step 1.11: Commit**

```bash
git add .nvmrc package.json pnpm-lock.yaml astro.config.mjs tsconfig.json .gitignore src/pages/index.astro
git commit -m "chore: scaffold Astro 5 + Tailwind 4 project"
```

---

## Task 2: Typography, color tokens, and base layout

**Files:**
- Create: `src/layouts/Base.astro`
- Create: `src/styles/global.css`
- Modify: `src/pages/index.astro` (use new layout)
- Create: `public/favicon.svg`

This task wires up the global visual system: fonts, colors, meta tags, and the shell every page shares.

- [ ] **Step 2.1: Install self-hosted fonts**

Run:
```bash
pnpm add -D @fontsource/fraunces @fontsource/inter @fontsource-variable/jetbrains-mono
```

Rationale: `@fontsource/*` ships the font files with your bundle — no Google Fonts CDN call, better perf, no external DNS lookup. Fraunces for display serif; Inter for body sans; JetBrains Mono for metadata.

- [ ] **Step 2.2: Create the global CSS file**

File: `src/styles/global.css`
```css
@import "tailwindcss";

@import "@fontsource/fraunces/400.css";
@import "@fontsource/fraunces/500.css";
@import "@fontsource/inter/400.css";
@import "@fontsource/inter/500.css";
@import "@fontsource-variable/jetbrains-mono";

@theme {
  --color-bg: #faf9f6;
  --color-ink: #111111;
  --color-muted: #6b6b68;
  --color-accent: #7a4e2b;

  --font-display: "Fraunces", "Iowan Old Style", Georgia, serif;
  --font-sans: "Inter", system-ui, -apple-system, sans-serif;
  --font-mono: "JetBrains Mono Variable", ui-monospace, SFMono-Regular, Menlo, monospace;
}

html {
  background-color: var(--color-bg);
  color: var(--color-ink);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}

body {
  min-height: 100dvh;
}

:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
  border-radius: 2px;
}

a {
  color: inherit;
  text-decoration: none;
}
```

Notes:
- `@theme` is how Tailwind 4 registers design tokens. Colors and fonts added here become available as `text-ink`, `bg-bg`, `font-display`, etc.
- The warm off-white and near-black match the spec.
- The accent `#7a4e2b` is a muted warm brown — contrast with `#faf9f6` is ~8.3:1, well above WCAG AA. If you prefer a different accent, change it here only.

- [ ] **Step 2.3: Create a minimal favicon**

File: `public/favicon.svg`
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#111111"/>
  <text x="32" y="42" text-anchor="middle" font-family="Georgia, serif" font-size="34" fill="#faf9f6">c</text>
</svg>
```

- [ ] **Step 2.4: Create the base layout**

File: `src/layouts/Base.astro`
```astro
---
import '../styles/global.css';

interface Props {
  title?: string;
  description?: string;
}

const {
  title = 'Costa Xanthos',
  description = 'Aspiring product designer. I build software, I have strong opinions about AI, and I am leaving private equity for tech.',
} = Astro.props;

const canonical = new URL(Astro.url.pathname, Astro.site).toString();
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonical} />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
  </head>
  <body>
    <slot />
  </body>
</html>
```

- [ ] **Step 2.5: Update `src/pages/index.astro` to use the base layout**

File: `src/pages/index.astro` (full replacement)
```astro
---
import Base from '../layouts/Base.astro';
---
<Base>
  <main class="mx-auto max-w-[680px] px-6 py-24 md:py-32">
    <p class="font-mono text-sm text-[color:var(--color-muted)]">layout ready</p>
  </main>
</Base>
```

- [ ] **Step 2.6: Run type check**

Run: `pnpm check`
Expected: "0 errors, 0 warnings, 0 hints".

- [ ] **Step 2.7: Verify dev server**

Run: `pnpm dev`
Expected: visiting `http://localhost:4321/` shows "layout ready" in monospace, off-white page, centered with margin.

Stop dev server with Ctrl-C.

- [ ] **Step 2.8: Commit**

```bash
git add .
git commit -m "feat: add base layout, typography, and color tokens"
```

---

## Task 3: Projects data file

**Files:**
- Create: `src/data/projects.ts`

- [ ] **Step 3.1: Create the typed projects data**

File: `src/data/projects.ts`
```ts
export type ProjectStatus = 'Building' | 'Shipped' | 'Consulting' | 'Advising';

export interface Project {
  name: string;
  description: string;
  url: string | null;
  status: ProjectStatus;
}

export const projects: Project[] = [
  {
    name: 'Vigil',
    description:
      'A control panel for your coding agents. See what they changed and why, in plain English.',
    url: 'https://vigil.ai',
    status: 'Building',
  },
  {
    name: 'Epitro',
    description:
      'AI property management for small landlords. Rents, cash flows, and portfolio health without the spreadsheet.',
    url: 'https://epitro.ai',
    status: 'Building',
  },
  {
    name: 'Beacon AP',
    description:
      'Building AI relationship intelligence for a Boston investment firm.',
    url: null,
    status: 'Consulting',
  },
  {
    name: 'Yieldstack',
    description:
      'AI-native commercial real estate brokerage. Helping a close friend with product and stack.',
    url: 'https://yieldstack.ai',
    status: 'Advising',
  },
  {
    name: 'Neutralis',
    description: 'A functional prediction market.',
    url: 'https://neutralis.ai',
    status: 'Shipped',
  },
];
```

- [ ] **Step 3.2: Run type check**

Run: `pnpm check`
Expected: 0 errors.

- [ ] **Step 3.3: Commit**

```bash
git add src/data/projects.ts
git commit -m "feat: add projects data with types"
```

---

## Task 4: Stack data file

**Files:**
- Create: `src/data/stack.ts`

- [ ] **Step 4.1: Create the typed stack data**

File: `src/data/stack.ts`
```ts
export interface StackItem {
  name: string;
  description: string;
  url: string;
}

export const stack: StackItem[] = [
  {
    name: 'Ghostty',
    description: 'terminal',
    url: 'https://ghostty.org',
  },
  {
    name: 'Conductor',
    description: 'orchestrating coding agents',
    url: 'https://conductor.build',
  },
  {
    name: 'Wispr Flow',
    description: 'voice-to-text for writing',
    url: 'https://wisprflow.ai',
  },
  {
    name: 'Opus 4.7',
    description: 'the model I use day to day',
    url: 'https://www.anthropic.com/claude',
  },
  {
    name: 'Vercel',
    description: 'hosting and deploys',
    url: 'https://vercel.com',
  },
  {
    name: 'Railway',
    description: 'backend services',
    url: 'https://railway.com',
  },
];
```

- [ ] **Step 4.2: Run type check**

Run: `pnpm check`
Expected: 0 errors.

- [ ] **Step 4.3: Commit**

```bash
git add src/data/stack.ts
git commit -m "feat: add stack data with types"
```

---

## Task 5: Hero component

**Files:**
- Create: `src/components/Hero.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 5.1: Create the Hero component**

File: `src/components/Hero.astro`
```astro
---
---
<header class="pb-16 md:pb-24">
  <p class="font-mono text-xs uppercase tracking-[0.12em] text-[color:var(--color-muted)]">
    Costa Xanthos
  </p>
  <p class="mt-1 font-mono text-xs text-[color:var(--color-muted)]">
    Aspiring product designer · Babson '26
  </p>
  <h1
    class="mt-10 font-[family-name:var(--font-display)] text-4xl font-medium leading-[1.15] tracking-[-0.01em] md:text-[2.75rem]"
  >
    I think my next job in private equity can be automated by an agent I could
    build in a weekend. So I'm designing software instead.
  </h1>
</header>
```

Notes:
- The thesis is the largest type on the page. It's the hero.
- Name and role are set small in mono above — deliberately quiet so the thesis carries the weight.
- Line-height 1.15 and slight negative letter-spacing make the serif read tight and considered at this size.

- [ ] **Step 5.2: Use Hero in the page**

File: `src/pages/index.astro` (full replacement)
```astro
---
import Base from '../layouts/Base.astro';
import Hero from '../components/Hero.astro';
---
<Base>
  <main class="mx-auto max-w-[680px] px-6 py-24 md:py-32">
    <Hero />
  </main>
</Base>
```

- [ ] **Step 5.3: Visual check**

Run: `pnpm dev`
Open `http://localhost:4321/`. Expected:
- Small mono name and role at top
- Large serif thesis line below, dominant
- Generous margin top and bottom

Stop dev server.

- [ ] **Step 5.4: Type check**

Run: `pnpm check`
Expected: 0 errors.

- [ ] **Step 5.5: Commit**

```bash
git add src/components/Hero.astro src/pages/index.astro
git commit -m "feat: add hero with thesis"
```

---

## Task 6: ProjectCard component

**Files:**
- Create: `src/components/ProjectCard.astro`

- [ ] **Step 6.1: Create the card**

File: `src/components/ProjectCard.astro`
```astro
---
import type { Project } from '../data/projects';

interface Props {
  project: Project;
}

const { project } = Astro.props;
const hasLink = project.url !== null;
const Tag = hasLink ? 'a' : 'div';
const extraProps = hasLink
  ? { href: project.url!, target: '_blank', rel: 'noreferrer' }
  : {};
---
<Tag
  class:list={[
    'group relative block border-t border-black/10 py-6 transition-colors duration-200',
    hasLink ? 'hover:border-[color:var(--color-accent)]' : 'cursor-default',
  ]}
  {...extraProps}
>
  <div class="flex items-baseline justify-between gap-4">
    <h3 class="text-lg font-medium text-[color:var(--color-ink)]">
      {project.name}
    </h3>
    <span
      class="font-mono text-[11px] uppercase tracking-[0.1em] text-[color:var(--color-muted)] opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
    >
      {project.status}{hasLink ? ' →' : ''}
    </span>
  </div>
  <p class="mt-2 text-[15px] leading-relaxed text-[color:var(--color-muted)]">
    {project.description}
  </p>
</Tag>
```

Notes:
- The root element is an `<a>` when there's a URL, a `<div>` otherwise (Beacon AP has no public URL). This keeps semantics honest — no empty `href`.
- Status tag + arrow reveal on hover or keyboard focus. That's the "one distinctive craft touch" from the spec.
- The border on the left/top serves as the card separator. No boxed cards; it's a list with dividers. More editorial.

- [ ] **Step 6.2: Type check**

Run: `pnpm check`
Expected: 0 errors.

- [ ] **Step 6.3: Commit**

```bash
git add src/components/ProjectCard.astro
git commit -m "feat: add ProjectCard component"
```

---

## Task 7: Projects section

**Files:**
- Create: `src/components/Projects.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 7.1: Create the Projects section**

File: `src/components/Projects.astro`
```astro
---
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard.astro';
---
<section class="py-12 md:py-16" aria-labelledby="projects-heading">
  <h2
    id="projects-heading"
    class="font-mono text-xs uppercase tracking-[0.12em] text-[color:var(--color-muted)]"
  >
    Projects
  </h2>
  <ul class="mt-6 border-b border-black/10">
    {
      projects.map((project) => (
        <li>
          <ProjectCard project={project} />
        </li>
      ))
    }
  </ul>
</section>
```

- [ ] **Step 7.2: Add Projects to the page**

File: `src/pages/index.astro` (full replacement)
```astro
---
import Base from '../layouts/Base.astro';
import Hero from '../components/Hero.astro';
import Projects from '../components/Projects.astro';
---
<Base>
  <main class="mx-auto max-w-[680px] px-6 py-24 md:py-32">
    <Hero />
    <Projects />
  </main>
</Base>
```

- [ ] **Step 7.3: Visual check**

Run: `pnpm dev`. Visit `http://localhost:4321/`. Expected:
- 5 project rows with dividers above/below each
- Hovering a linked card reveals status tag + `→` on the right and switches the top border to accent brown
- Beacon AP shows `CONSULTING` on hover but no arrow and does not behave as a link (cursor is default)
- Tab through the page — focus visibly rings each linked card, status tag reveals on focus too

Stop dev server.

- [ ] **Step 7.4: Type check**

Run: `pnpm check`
Expected: 0 errors.

- [ ] **Step 7.5: Commit**

```bash
git add src/components/Projects.astro src/pages/index.astro
git commit -m "feat: add projects section"
```

---

## Task 8: About section

**Files:**
- Create: `src/components/About.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 8.1: Create the About component**

File: `src/components/About.astro`
```astro
---
---
<section class="py-12 md:py-16" aria-labelledby="about-heading">
  <h2
    id="about-heading"
    class="font-mono text-xs uppercase tracking-[0.12em] text-[color:var(--color-muted)]"
  >
    About
  </h2>
  <div class="mt-6 space-y-5 text-[17px] leading-[1.65] text-[color:var(--color-ink)]">
    <p>
      I've been building since Legos and K'NEX. At Clarion Partners this summer I
      was the one intern out of nine to get a return offer — partly because I
      built them an Excel VBA system that automated their deal screening. That
      same instinct is why I'm leaving real estate: the work has right answers,
      and I want to work on questions that don't.
    </p>
    <p>
      I have strong opinions about AI and what's coming. I'd rather design the
      tools than be the person they replace.
    </p>
  </div>
</section>
```

- [ ] **Step 8.2: Add About to the page**

File: `src/pages/index.astro` (full replacement)
```astro
---
import Base from '../layouts/Base.astro';
import Hero from '../components/Hero.astro';
import Projects from '../components/Projects.astro';
import About from '../components/About.astro';
---
<Base>
  <main class="mx-auto max-w-[680px] px-6 py-24 md:py-32">
    <Hero />
    <Projects />
    <About />
  </main>
</Base>
```

- [ ] **Step 8.3: Visual check**

Run: `pnpm dev`. Confirm bio paragraphs appear below projects, typography reads comfortably, line length is not cramped or too wide.

Stop dev server.

- [ ] **Step 8.4: Type check**

Run: `pnpm check`
Expected: 0 errors.

- [ ] **Step 8.5: Commit**

```bash
git add src/components/About.astro src/pages/index.astro
git commit -m "feat: add about section"
```

---

## Task 9: Stack section

**Files:**
- Create: `src/components/Stack.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 9.1: Create the Stack component**

File: `src/components/Stack.astro`
```astro
---
import { stack } from '../data/stack';
---
<section class="py-12 md:py-16" aria-labelledby="stack-heading">
  <h2
    id="stack-heading"
    class="font-mono text-xs uppercase tracking-[0.12em] text-[color:var(--color-muted)]"
  >
    Stack
  </h2>
  <ul class="mt-6 space-y-3">
    {
      stack.map((item) => (
        <li class="flex items-baseline gap-3 text-[15px]">
          <a
            href={item.url}
            target="_blank"
            rel="noreferrer"
            class="text-[color:var(--color-ink)] underline decoration-transparent underline-offset-[3px] transition-colors hover:decoration-[color:var(--color-accent)]"
          >
            {item.name}
          </a>
          <span class="text-[color:var(--color-muted)]">— {item.description}</span>
        </li>
      ))
    }
  </ul>
</section>
```

- [ ] **Step 9.2: Add Stack to the page**

File: `src/pages/index.astro` (full replacement)
```astro
---
import Base from '../layouts/Base.astro';
import Hero from '../components/Hero.astro';
import Projects from '../components/Projects.astro';
import About from '../components/About.astro';
import Stack from '../components/Stack.astro';
---
<Base>
  <main class="mx-auto max-w-[680px] px-6 py-24 md:py-32">
    <Hero />
    <Projects />
    <About />
    <Stack />
  </main>
</Base>
```

- [ ] **Step 9.3: Visual check**

Run: `pnpm dev`. Verify 6 stack items list cleanly. Hover shows underline in accent color.

Stop dev server.

- [ ] **Step 9.4: Type check**

Run: `pnpm check`
Expected: 0 errors.

- [ ] **Step 9.5: Commit**

```bash
git add src/components/Stack.astro src/pages/index.astro
git commit -m "feat: add stack section"
```

---

## Task 10: Contact section

**Files:**
- Create: `src/components/Contact.astro`
- Create: `public/resume.pdf` (placeholder)
- Modify: `src/pages/index.astro`

- [ ] **Step 10.1: Add a placeholder resume**

Place any PDF at `public/resume.pdf`. If Costa has not provided one yet, create a one-page placeholder — for example in macOS Pages or by printing a simple text document to PDF. The file must exist so the link works; content can be updated later.

Run to confirm:
```bash
ls public/resume.pdf
```
Expected: file exists and is non-empty.

- [ ] **Step 10.2: Create the Contact component**

File: `src/components/Contact.astro`
```astro
---
interface Link {
  label: string;
  href: string;
  external: boolean;
}

const links: Link[] = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/costa-xanthos/',
    external: true,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/constantinexanthos',
    external: true,
  },
  {
    label: 'Email',
    href: 'mailto:cxanthos22@gmail.com',
    external: false,
  },
  {
    label: 'Resume (PDF)',
    href: '/resume.pdf',
    external: false,
  },
];
---
<section class="py-12 md:py-16" aria-labelledby="contact-heading">
  <h2
    id="contact-heading"
    class="font-mono text-xs uppercase tracking-[0.12em] text-[color:var(--color-muted)]"
  >
    Contact
  </h2>
  <ul class="mt-6 space-y-3 text-[15px]">
    {
      links.map((link) => (
        <li>
          <a
            href={link.href}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noreferrer' : undefined}
            class="underline decoration-transparent underline-offset-[3px] transition-colors hover:decoration-[color:var(--color-accent)]"
          >
            {link.label}
          </a>
        </li>
      ))
    }
  </ul>
</section>
```

Note: GitHub URL is confirmed (`constantinexanthos`). LinkedIn URL is a best guess from Costa's name — confirm it loads his real profile before deploy (Task 12.4). If wrong, update the `href` value in this file.

- [ ] **Step 10.3: Add Contact to the page**

File: `src/pages/index.astro` (full replacement)
```astro
---
import Base from '../layouts/Base.astro';
import Hero from '../components/Hero.astro';
import Projects from '../components/Projects.astro';
import About from '../components/About.astro';
import Stack from '../components/Stack.astro';
import Contact from '../components/Contact.astro';
---
<Base>
  <main class="mx-auto max-w-[680px] px-6 py-24 md:py-32">
    <Hero />
    <Projects />
    <About />
    <Stack />
    <Contact />
  </main>
</Base>
```

- [ ] **Step 10.4: Visual check**

Run: `pnpm dev`. Visit `http://localhost:4321/`. Click the resume link — it should open the PDF in a new tab (or download). Click email — opens mail client. Tab through all links — each shows a visible focus ring.

Stop dev server.

- [ ] **Step 10.5: Type check**

Run: `pnpm check`
Expected: 0 errors.

- [ ] **Step 10.6: Commit**

```bash
git add src/components/Contact.astro src/pages/index.astro public/resume.pdf
git commit -m "feat: add contact section and placeholder resume"
```

---

## Task 11: Footer

**Files:**
- Create: `src/components/Footer.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 11.1: Create the Footer component**

File: `src/components/Footer.astro`
```astro
---
const nowLine = 'Now: building Vigil, applying to Conductor, in Boston.';
const updated = '2026-04-16';
const year = new Date().getFullYear();
---
<footer class="mt-16 border-t border-black/10 pt-8 pb-4 text-[color:var(--color-muted)]">
  <p class="text-[14px] leading-relaxed">{nowLine}</p>
  <p class="mt-2 font-mono text-[11px] uppercase tracking-[0.1em]">
    Updated {updated} · © {year} Costa Xanthos
  </p>
</footer>
```

Note: `nowLine` and `updated` are manually edited. That's intentional — it's a human signal, not a feed.

- [ ] **Step 11.2: Add Footer to the page**

File: `src/pages/index.astro` (full replacement)
```astro
---
import Base from '../layouts/Base.astro';
import Hero from '../components/Hero.astro';
import Projects from '../components/Projects.astro';
import About from '../components/About.astro';
import Stack from '../components/Stack.astro';
import Contact from '../components/Contact.astro';
import Footer from '../components/Footer.astro';
---
<Base>
  <main class="mx-auto max-w-[680px] px-6 py-24 md:py-32">
    <Hero />
    <Projects />
    <About />
    <Stack />
    <Contact />
    <Footer />
  </main>
</Base>
```

- [ ] **Step 11.3: Visual check**

Run: `pnpm dev`. Scroll to the bottom. Expected:
- "Now" line in muted body text
- Timestamp and copyright in mono below

Stop dev server.

- [ ] **Step 11.4: Type check**

Run: `pnpm check`
Expected: 0 errors.

- [ ] **Step 11.5: Commit**

```bash
git add src/components/Footer.astro src/pages/index.astro
git commit -m "feat: add footer with now line"
```

---

## Task 12: Production build, Lighthouse audit, and link check

**Files:**
- None (verification-only task that may trigger fixes in earlier files)

- [ ] **Step 12.1: Production build**

Run: `pnpm build`
Expected: build succeeds, `dist/` contains `index.html` and assets. No warnings about unused CSS or large JS.

- [ ] **Step 12.2: Preview the built site**

Run: `pnpm preview`
Expected: serves `dist/` at `http://localhost:4321/`. Visit it.

- [ ] **Step 12.3: Run Lighthouse in Chrome DevTools**

1. Open `http://localhost:4321/` in Chrome.
2. Open DevTools → Lighthouse tab.
3. Select: Desktop, Categories = all, Mode = Navigation.
4. Click "Analyze page load".

Expected scores per spec: Performance 100, Accessibility 100, Best Practices 100, SEO 100.

Repeat with Device = Mobile. Expected: all ≥ 95.

If any score is below target, read the audit and fix:
- Performance: usually about font loading or unused CSS. Check that fonts are self-hosted (they are) and the Tailwind purge is working (it is by default in Tailwind 4 via the Vite plugin).
- Accessibility: usually contrast or missing labels. All our colors pass; `aria-labelledby` is on every section.
- Best Practices: usually mixed content or console errors.
- SEO: usually missing `<meta name="description">` or `<title>` (both are in `Base.astro`).

- [ ] **Step 12.4: Manual link check**

From the preview, click each of these and confirm it opens the correct destination:
- Each project link (Vigil, Epitro, Yieldstack, Neutralis — Beacon AP should NOT be a link)
- Each stack link (all 6)
- LinkedIn, GitHub, Email, Resume

If LinkedIn or GitHub URL in `Contact.astro` does not resolve to Costa's real profile, update the `href` and rebuild.

- [ ] **Step 12.5: Responsive check**

In Chrome DevTools, toggle device toolbar. Test at:
- iPhone 14 Pro (390px)
- iPad (768px)
- Desktop (1280px)

Expected:
- Readable at all widths
- No horizontal scroll
- Max-width of 680px prevents over-long lines on desktop
- `px-6` padding keeps content off the edges on mobile

Fix any issues in the affected component file and rebuild.

Stop preview with Ctrl-C.

- [ ] **Step 12.6: Commit any fixes**

If you had to make changes in steps 12.3–12.5:
```bash
git add .
git commit -m "fix: address lighthouse and responsive issues"
```

If no changes were needed, skip this step.

---

## Task 13: Deploy to Vercel

**Files:**
- Create: `README.md`
- Modify: `astro.config.mjs` (update `site` once domain confirmed)

- [ ] **Step 13.1: Write a minimal README**

File: `README.md`
```markdown
# costaxanthos.com

Personal site. Built with Astro + Tailwind, deployed on Vercel.

## Develop

```bash
pnpm install
pnpm dev       # http://localhost:4321
pnpm check     # type check
pnpm build     # production build to dist/
pnpm preview   # serve built output
```

## Edit content

- Projects: `src/data/projects.ts`
- Stack: `src/data/stack.ts`
- Bio: `src/components/About.astro`
- Thesis + name: `src/components/Hero.astro`
- "Now" line: `src/components/Footer.astro`
```

- [ ] **Step 13.2: Confirm domain**

Decide the final domain with Costa. Options:
- `costaxanthos.com` (recommended)
- `costa.build`
- `costa.design`

Register the chosen domain through a registrar (Vercel itself, Namecheap, or Porkbun). Record the final domain; it will be used in two places: `astro.config.mjs` (Step 13.4) and Vercel's domain settings (Step 13.7).

- [ ] **Step 13.3: Create the GitHub repo**

1. On GitHub, create a new **public** repository named `personal-site` (or `costaxanthos.com`) under Costa's account.
2. Do NOT initialize with a README or `.gitignore` — our repo already has history.
3. Add the remote locally. Replace `<user>` with Costa's GitHub username:
   ```bash
   cd /Users/costaxanthos/conductor/repos/personal-site
   git remote add origin git@github.com:<user>/personal-site.git
   git branch -M main
   git push -u origin main
   ```
   Expected: push succeeds. Repo page on GitHub shows all commits.

- [ ] **Step 13.4: Update the canonical `site` URL**

File: `astro.config.mjs` — replace the `site` value with the final domain, e.g. `'https://costaxanthos.com'`. Commit:
```bash
git add astro.config.mjs
git commit -m "chore: set canonical site URL"
git push
```

- [ ] **Step 13.5: Import into Vercel**

1. Go to https://vercel.com/new.
2. Import the GitHub repo.
3. Framework Preset: Astro (auto-detected).
4. Build command: `pnpm build` (default).
5. Output directory: `dist` (default).
6. Click Deploy.

Expected: first deploy succeeds at a `*.vercel.app` URL. Open it and confirm the site renders.

- [ ] **Step 13.6: Attach the custom domain**

In the Vercel project → Settings → Domains:
1. Add the domain from Step 13.2.
2. Follow Vercel's DNS instructions (either nameserver change or A/CNAME records).
3. Wait for SSL provisioning (usually a few minutes).

Expected: the custom domain serves the site over HTTPS.

- [ ] **Step 13.7: Final smoke check on production**

Visit the production URL:
- Page loads with correct fonts
- Projects render with hover states
- Resume PDF downloads
- Mail link opens mail client
- Run Lighthouse against the production URL — scores should match step 12.3

If any issue shows up only on production (e.g. a font not loading), debug by looking at the browser network tab; the fix is almost always in an Astro or CSS file, then push to deploy.

- [ ] **Step 13.8: Link the site in the Conductor application**

Once production is healthy, the site URL is ready to drop into the Conductor application form.

---

## Self-review notes

This plan covers each section and requirement in the spec: hero with thesis, 5-project grid with status hover, about, stack of 6 tools, contact with 4 links, footer with "Now" line, Astro + Tailwind 4 on Vercel, self-hosted fonts, semantic HTML, WCAG contrast (accent `#7a4e2b` on `#faf9f6` is ~8.3:1), and Lighthouse targets explicitly checked.

Open items from the spec that this plan defers to the engineer as explicit sub-steps rather than TBDs:
- Font pairing — locked to Fraunces + Inter + JetBrains Mono Variable in Task 2.
- Accent color — locked to `#7a4e2b` in Task 2 with a note on how to change it.
- Domain — handled as a decision point in Task 13.2, not a placeholder.
- LinkedIn / GitHub / email URLs — best guesses used in Task 10.2 with an explicit confirmation step in Task 12.4.
- "Now" line and timestamp — locked to an initial value in Task 11.1 with the contract that it's manually edited.
- Ghostty / additional stack items — locked at 6 items in Task 4.

There are no "TBD", "implement later", or "similar to above" placeholders in any step. Types and data shapes are consistent across tasks (`Project`, `ProjectStatus`, `StackItem`).
