# The Other Bean

One-scroll site for The Other Bean — Indian robusta from the Western Ghats, told as a year of rain.
Built with Next.js (App Router, TypeScript, no CSS framework). Live at https://theotherbean.in.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Where things live

- `lib/chapters.ts` — the eight chapters: copy, palette, rain, and what the stage shows (branch / beans).
- `lib/products.ts` — the three coffees. **Set `price` here** (currently the `[YOUR PRICE]` placeholder).
- `lib/site.ts` — brand name, domain, nav, footer line, gauge total.
- `components/Branch.tsx` — the branch, drawn once; recoloured per chapter via props.
- `components/Stage.tsx` — hero pose (large, rotated, bleeding off the edge, with a faint depth layer) vs. standard pose.
- `components/YearScroll.tsx` — scroll engine: active chapter, progress, parallax variables.
- `app/globals.css` — all styling, including the 760px mobile breakpoint and reduced-motion rules.
- `app/icon.svg` — favicon (cherry cluster). `app/opengraph-image.tsx` — social preview image.

The "Add to cart" buttons are intentionally inert for now; wire them to a checkout when ready.

## Deploy to Vercel

1. Push this repo to GitHub (or GitLab/Bitbucket).
2. In Vercel, **Add New → Project → Import** the repo. Framework is auto-detected as Next.js; no settings needed.
3. Alternatively from the terminal: `npx vercel login` then `npx vercel --prod`.

### Custom domain (theotherbean.in)

1. Vercel → Project → **Settings → Domains** → add `theotherbean.in` and `www.theotherbean.in` (redirect www → apex).
2. At your registrar, add the records Vercel shows. Typically:
   - `A` record for `@` → `76.76.21.21`
   - `CNAME` record for `www` → `cname.vercel-dns.com`
3. Wait for DNS to propagate; Vercel issues the TLS certificate automatically.
