# tiagoevanp_website_next

Tiago Evangelista Pinto's personal website: a professional profile plus bilingual (English / Brazilian Portuguese) articles on front-end development. It is built with Next.js and exported as a fully static site.

**Live:** https://tiagoevanp.com.br

## What's on the site

- **Home**: introduction, availability, current tech stack and featured skill-docs.
- **Experience** (`/experience/en`, `/experience/pt-BR`): work history timeline, "at a glance" stats, a technology filter, education and spoken languages, print styles, a contact call to action and JSON-LD structured data.
- **Skill-docs** (`/skill-docs`): an index of MDX articles grouped into *HTML & CSS*, *Javascript & Typescript* and *React*. Each article has an English and a Portuguese version (`/skill-docs/<topic>/en`, `/skill-docs/<topic>/pt-BR`), and some include interactive examples. Current topics are semantic HTML, ARIA, modern layouts, animations & transitions, Sass, CSS-in-JS, ES6+, async, web APIs, lifecycle and state management.
- **Site-wide**: English and Portuguese UI, dark and light themes, a skip link, a footer, a 404 page, `sitemap.xml` with hreflang alternates, and `robots.txt`.

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router, `output: 'export'`, Turbopack)
- React 19 and TypeScript
- MDX via `@next/mdx` (`src/mdx-components.tsx` maps the elements), with syntax highlighting from `highlight.js`
- Sass CSS Modules (`*.module.sass`, written in indented syntax, not SCSS)
- i18next, react-i18next and `i18next-browser-languagedetector`
- `next-themes` for dark and light mode
- SVG icons via `@svgr/webpack` and `react-inlinesvg`
- ESLint 9 (Next core-web-vitals and TypeScript configs, `jsx-a11y`, `@stylistic`, `simple-import-sort`)
- pnpm

## Getting started

Prerequisites:

- Node.js 22 (see `.nvmrc`; run `nvm use` if you use nvm)
- pnpm (CI uses pnpm 10)

```bash
pnpm install
pnpm dev
```

Then open http://localhost:3000.

## Scripts

| Command      | Description                                                  |
| ------------ | ------------------------------------------------------------ |
| `pnpm dev`   | Start the dev server with Turbopack                          |
| `pnpm build` | Build the static export into `out/`                          |
| `pnpm start` | `next start` (the deployed site is the static `out/` folder) |
| `pnpm lint`  | Run ESLint                                                   |

To preview the production build, serve `out/` with any static file server.

## Project structure

```
.
├── .github/workflows/      # CI: lint, build and deploy on push to main
├── .claude/agents/         # Claude Code agents (developer, qa, product-owner, ux-designer)
├── eslint/                 # ESLint rule sets (jsx-a11y, stylistic, simple-import-sort)
├── public/                 # Static assets (photo, favicon)
├── scripts/
│   └── create_mdx_page.js  # Scaffolds a new skill-doc in both languages
└── src/
    ├── app/
    │   ├── (en)/           # English root layout: home, experience/en, skill-docs/<topic>/en
    │   ├── (pt-BR)/        # Portuguese root layout: experience/pt-BR, skill-docs/<topic>/pt-BR
    │   ├── global-not-found.tsx
    │   ├── sitemap.ts, robots.ts
    │   └── globals.sass, theme.sass, _breakpoints.sass
    ├── components/         # Reusable components, re-exported from components/index.ts
    ├── UI/                 # Page-level sections (Experience, SkillDocsLayout, SiteFooter, ...)
    ├── i18n/               # i18next setup, language detection, localized path helpers
    │   └── locales/{en,pt-BR}/translation.json
    ├── lib/                # Site data and helpers (experience, technologies, SEO, JSON-LD, links)
    ├── providers/          # Theme, screen and sidebar providers; skill-doc registry (providers/lib)
    └── mdx-components.tsx  # Element mapping for MDX pages
```

Components live in `src/components/<Name>/<Name>.tsx` with a `<Name>.module.sass` next to them, and you import them as `import { Footer } from '@/components'`.

## Editing content

### Add a skill-doc

1. Scaffold the doc in both languages:

   ```bash
   node scripts/create_mdx_page.js <topic>
   ```

   This creates `src/app/(en)/skill-docs/<topic>/en/page.mdx` and `src/app/(pt-BR)/skill-docs/<topic>/pt-BR/page.mdx`. It never overwrites an existing file.
2. Fill in the title, description (`skillDocMetadata`) and content in **both** files.
3. Register the doc in `src/providers/lib/ItemsList.ts`, then add it to a group in `src/providers/lib/GroupsList.ts`. The sidebar, the previous/next footer links and the sitemap all follow this order.
4. Add the doc's strings to both locales:
   - `sidebar.items.<title>`: the title shown in the sidebar and on cards
   - `skill_docs.summaries.<title>`: the summary shown on the index cards

### Edit UI text

All user-visible strings live in `src/i18n/locales/en/translation.json` and `src/i18n/locales/pt-BR/translation.json`. **Keep the two files in sync:** every key must exist in both languages. Don't hardcode visible text in components.

### Edit the Experience page

Jobs, dates (ISO `YYYY-MM`), work mode, technologies, education, spoken languages and the "at a glance" stats are in `src/lib/experience.ts`, and their text is in the locale files under `experience.*`. The comments in that file say which translation keys each entry needs.

## Build and deploy

The site is fully static (`output: 'export'`, unoptimized images). Don't use server-only features such as API routes, server actions, `cookies()`/`headers()`, ISR or runtime image optimization.

Every push to `main` triggers `.github/workflows/update-website.yml`, which:

1. installs dependencies, runs `pnpm run lint` and `pnpm run build`
2. syncs `out/` into the [`tiagoevanp/tiagoevanp.github.io`](https://github.com/tiagoevanp/tiagoevanp.github.io) repository with `rsync --delete`, keeping its `CNAME` and `.nojekyll`
3. commits and pushes the result to that repo's `master` branch, which GitHub Pages serves

The push authenticates with the `TARGET_REPO_TOKEN` repository secret.

## Conventions

- Run `pnpm lint` and `pnpm build` before pushing. CI runs both, and a failure blocks the deploy.
- Accessibility matters: `jsx-a11y` rules are enforced, so use semantic HTML, label your controls and check keyboard navigation.
- Code style comes from the ESLint config (`@stylistic` and sorted imports).
- Styles go in Sass modules next to their component. Theme tokens are in `src/app/theme.sass`, and both dark and light themes must work.
- Every page and skill-doc ships in both `en` and `pt-BR`.

## AI-assisted workflow

`.claude/agents/` defines Claude Code subagents for this repo:

- **product-owner**: proposes prioritized tasks
- **ux-designer**: audits design and UX and files issues
- **developer**: implements tasks
- **qa**: checks changes against acceptance criteria, build, i18n parity and accessibility
