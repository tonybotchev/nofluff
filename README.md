# NoFluff Marketing

Production marketing site for [nofluffmarketing.io](https://nofluffmarketing.io).

**Stack:** React 19 · Vite 6 · TypeScript 5 · Tailwind CSS 4 · shadcn/ui · React Router 7

**Design system:** "Texas Bold" — dark charcoal (`#0A0A0A`) background, Texas orange (`#E05A1A`) accent, Barlow Condensed display type.

## Commands

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs to ./dist
npm run preview
```

## Structure

```
client/
  index.html           Vite entry
  src/
    components/        Reusable UI (Navbar, Footer, ROICalculator, …)
      ui/              shadcn primitives
    pages/             Route pages
    lib/
      schema.ts        JSON-LD schemas (Organization, LocalBusiness, …)
      utils.ts
    App.tsx            Router
    main.tsx
    index.css          Tailwind v4 @theme tokens
public/
  logo-dark.svg        White + orange, for dark bg
  logo-light.svg       Charcoal + orange, for light bg
  logo-icon.svg        Icon mark only
  og-image.png         1200×630 social share image
  sitemap.xml
  robots.txt           Allows GPTBot, ClaudeBot, Googlebot, …
```

## Routes

| Path                 | Page                     |
| -------------------- | ------------------------ |
| `/`                  | Home                     |
| `/dead-database`     | Dead Database Reactivation |
| `/about`             | About Tony Botchev         |
| `/privacy`           | Privacy policy             |
| `/terms`             | Terms of service           |

## Contact / Licensing

NoFluff Marketing I/O · Celina, TX 75009 · info@dfwhome.loans · (945) 370-8656

Tony Botchev NMLS #114198 · Sponsored by Loan Factory, Inc. NMLS #320841 · Equal Housing Lender.
