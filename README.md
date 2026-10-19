# Nicole Oraekie — portfolio

React + TypeScript + Vite + Tailwind CSS v4. No other runtime dependencies.

## Run it

Node lives in `~/.local/node` (not on the default PATH):

```bash
export PATH="$HOME/.local/node/bin:$PATH"
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build (http://localhost:4173)
```

## Editing content

All copy lives in `src/data/`. Components only render it.

| File | What's in it |
| --- | --- |
| `socials.ts` | **Email, LinkedIn, Medium, CV**, plus optional GitHub / X. Every link on the site reads from here; every "Say Hello" becomes a `mailto:` once `email` is set. |
| `testimonials.ts` | "Kind words": real LinkedIn recommendations. A quote shows once it's real; name/role/company show once they're filled in. `featured` leads, `hidden` keeps one in reserve. |
| `projects.ts` | Work index rows and full case studies (`/work/<slug>`) |
| `chapters.ts` | The six case-study questions |
| `metrics.ts` | The evidence numbers and their footnotes |
| `articles.ts` | Writing: verified articles (title, publication, category, description, URL). `featured` leads; entries with `[ADD ...]` fields stay hidden. |
| `speaking.ts` | Events (add `talk`, `year`, `href` when confirmed) |
| `site.ts` | The "Elsewhere" list in About |

Archived sections (the old Lab/Experiments and notes list) live in `source-material/drafts/`, outside the build.

Nothing unfinished is published. If a fact isn't verified, leave the field out (empty chapters and unset links simply don't render) and log it in **`source-material/content-gaps.md`**, the private checklist of everything still missing. As a safety net, any stray `[ADD ...]` text is dropped from the page and flagged in the dev console. Dashed "Dev only" notes (from `DevNote`) show where hidden things will appear; they render only under `npm run dev`, never in a build.

## The CV

Put the PDF at `public/nicole-oraekie-cv.pdf`. The navigation and mobile menu ("View CV ↗"), About ("View my CV ↗") and Contact ("CV / Resume ↗") all link to `/nicole-oraekie-cv.pdf` in a new tab. The labels live in `cv` in `src/data/socials.ts`. To host it elsewhere instead, change `resume` in `src/data/socials.ts` to the full URL. The dev server prints a warning while the file is missing, and both the dev and preview servers answer a missing PDF with a plain 404 rather than the site's not-found page. On Netlify/Vercel, a file in `public/` is always served as-is, ahead of the SPA fallback.

## Deploying

Case studies use real paths (`/work/stakeet`), so the host must serve `index.html` for unknown routes.

- **Cloudflare (Workers Static Assets):** configured in `wrangler.jsonc`. Build command `npm run build`, deploy command `npx wrangler deploy`. `"not_found_handling": "single-page-application"` provides the fallback. Check locally without deploying: `npx wrangler deploy --dry-run`. (Cloudflare ignores the Netlify-style rule in `public/_redirects` and logs a harmless warning about it.)
- **Netlify:** `public/_redirects` handles the fallback.
- **Vercel:** does it by default for Vite.
