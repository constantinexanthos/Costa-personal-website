# costaxanthos.com

Personal site. Built with Astro + Tailwind, deployed on Vercel.

## Requirements

- Node `20.19.0+` (see `.nvmrc`). The system Node on macOS may be too old; install a compatible version via [nvm](https://github.com/nvm-sh/nvm), [fnm](https://github.com/Schniz/fnm), or [mise](https://mise.jdx.dev/).
- npm (ships with Node).

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
npm run check      # type check
npm run build      # production build → dist/
npm run preview    # serve built output
```

## Edit content

- **Projects:** `src/data/projects.ts`
- **Stack:** `src/data/stack.ts`
- **Bio:** `src/components/About.astro`
- **Thesis + name:** `src/components/Hero.astro`
- **"Now" line:** `src/components/Footer.astro`
- **Contact links:** `src/components/Contact.astro`

## Design decisions

- Single page, no navigation bar (short enough that scroll is the only nav needed).
- Self-hosted fonts via `@fontsource` — no CDN call, no external DNS lookup.
- Zero client-side JS (pure static Astro SSG).
- Tailwind 4 with design tokens in `@theme` block (`src/styles/global.css`).
