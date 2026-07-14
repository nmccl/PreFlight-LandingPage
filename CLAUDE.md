# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start dev server at http://localhost:5173
npm run build      # production build → dist/
npm run preview    # serve the dist/ build locally
npm run lint       # run oxlint
```

Node is installed via Homebrew. Shell sessions don't inherit the Homebrew PATH automatically — prefix commands with `eval "$(/opt/homebrew/bin/brew shellenv zsh)" &&` when running from a non-login shell, or just use `npm run ...` directly if the PATH is already set.

## Stack

- **Vite 8** + **React 19** + **TypeScript** (strict)
- **Tailwind CSS v4** via `@tailwindcss/vite` — no `tailwind.config.js`. Custom tokens go in `src/index.css` under `@theme { }`. Class utilities are generated automatically from those tokens.
- **React Router DOM v7** — `BrowserRouter` is mounted in `main.tsx`; routes are defined in `App.tsx`
- **react-hot-toast** — `<Toaster />` is mounted globally in `main.tsx`

## Architecture

**Entry**: `index.html` → `src/main.tsx` → `src/App.tsx`

`App.tsx` owns the persistent shell: `<Navbar />` at the top, `<Footer />` at the bottom, and a `<Routes>` block in between. Every page is a thin file under `src/pages/` that composes section components.

**Pages** (`src/pages/`): Route-level components. `Home.tsx` is the landing page — it imports and sequences the section components in scroll order. `Privacy.tsx`, `Terms.tsx`, and `Download.tsx` are stubs awaiting real content.

**Section components** (`src/components/`): Each section owns exactly one focal element (a score ring, an animated counter, a pull-quote). Sections are not reusable cards — they are unique, custom layouts. Do not refactor them into shared primitives.

**Animation system** (`src/index.css`): Scroll-reveal animations use the `.fade-up` / `.in-view` CSS class pair. Apply `fade-up` to an element, then toggle `in-view` when it enters the viewport. Stagger with `delay-1` through `delay-6`. JavaScript `requestAnimationFrame` loops drive the two counting animations (`ReadinessScore`, `IssueCounter`) — they are triggered once via `useInView` and never reset.

**`useInView`** (`src/hooks/useInView.ts`): Wraps `IntersectionObserver`. Fires once (disconnects after first intersection). Returns `{ ref, inView }`. The `ref` is typed as `HTMLElement` — cast to the specific element type at the call site: `ref as React.RefObject<HTMLDivElement>`.

**`cn`** (`src/lib/utils.ts`): Minimal class-name joiner (no external dependency).

## Design System

The site uses Apple's exact color values as inline Tailwind arbitrary values — **do not substitute Tailwind palette colors for these**:

| Role | Value |
|---|---|
| Primary text | `#1d1d1f` |
| Secondary text | `#6e6e73` |
| Section gray bg | `#f5f5f7` |
| Accent blue | `#0071e3` |
| Apple green | `#34c759` |
| Critical red | `#ff3b30` |
| Warning orange | `#ff9500` |

Typography follows SF Pro conventions: headlines use `tracking-[-0.045em]` and `leading-[1.02]` or tighter. Section labels use `text-[11px] font-semibold tracking-[0.22em] uppercase`.

Dark mode uses `dark:` variants. The root wrapper in `App.tsx` handles `dark:bg-black` / `dark:text-[#f5f5f7]`.

## Public Assets

`public/macbook.jpg` — MacBook product shot used as the Hero visual. Treat it as the page's primary hero image: display it large, never shrink it into a card.

`public/app-icon.png` — App icon displayed in the Hero section above the headline.

## Section Order (Home page)

`Hero` → `ReadinessScore` → `AISummary` → `IssueCounter` → `DownloadCTA`

This order mirrors the emotional arc: *uncertainty → analysis → clarity → confidence*. Maintain this narrative when adding or reordering sections.
