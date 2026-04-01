# Monorepo Structure

Turborepo monorepo with multiple Next.js brand apps and shared packages. Each brand deploys to its own subdomain for the owner to compare and choose.

---

## Directory Structure

```
oceantech-commercial/
├── apps/
│   ├── main-brand/              # Primary brand concept
│   │   ├── app/
│   │   ├── public/
│   │   ├── brand-materials/     # Brand documentation and generated assets
│   │   │   ├── brand-strategy.md
│   │   │   ├── brand-guidelines.md
│   │   │   ├── brand-writeup.md
│   │   │   ├── logo-prompts.md
│   │   │   ├── logos/           # DALL-E / Gemini generated logos
│   │   │   │   ├── logo-concept-1.png
│   │   │   │   ├── logo-concept-2.png
│   │   │   │   └── logo-final.svg
│   │   │   └── images/          # DALL-E generated imagery
│   │   │       ├── hero.png
│   │   │       └── ...
│   │   ├── theme.ts             # Brand-specific colors, fonts, copy, images
│   │   ├── next.config.js
│   │   ├── tailwind.config.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   ├── brand-1/                 # Alternative concept 1
│   │   ├── app/
│   │   ├── public/
│   │   ├── brand-materials/     # Same structure as above
│   │   │   └── ...
│   │   ├── theme.ts
│   │   ├── next.config.js
│   │   ├── tailwind.config.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   ├── brand-2/                 # Alternative concept 2
│   │   └── ... (same structure)
│   └── brand-3/                 # Alternative concept 3
│       └── ... (same structure)
├── packages/
│   ├── shared/                  # Shared React components
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── Hero.tsx
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── Services.tsx
│   │   │   │   ├── About.tsx
│   │   │   │   ├── Process.tsx
│   │   │   │   ├── WhyUs.tsx
│   │   │   │   ├── Contact.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── Certifications.tsx
│   │   │   ├── types/
│   │   │   │   └── theme.ts     # Theme type definitions
│   │   │   └── index.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   ├── config/                  # Shared configs
│   │   ├── tailwind-preset.ts   # Base Tailwind preset (spacing, breakpoints)
│   │   ├── eslint.js
│   │   └── tsconfig.base.json
│   └── content/                 # Shared copy and data
│       ├── services.ts          # Service definitions
│       ├── certifications.ts    # Certification list
│       ├── company.ts           # Company info, history, contact
│       └── team.ts              # Team member data
├── docs/
├── script/
├── brand-agent.md
├── turbo.json
├── package.json                 # Root workspace config
├── .gitignore
├── env.example
└── README.md
```

---

## How It Works

### Theme System

Each brand app has a `theme.ts` that defines its visual identity. Shared components consume the theme via a provider.

```ts
// apps/main-brand/theme.ts
export const theme = {
  name: "Main Brand",
  colors: {
    primary: "#0A4D68",      // Deep Ocean Teal
    secondary: "#E85D04",    // Sunset Orange
    accent: "#B87333",       // Copper/Bronze
    neutral: "#2D3436",      // Charcoal
    light: "#F8F9FA",        // Off-White
  },
  fonts: {
    heading: "Montserrat",
    body: "Inter",
    heritage: "Playfair Display",
  },
  logo: "/logo.svg",
  hero: {
    headline: "Diving Since 1980",
    subheadline: "Where 45 years of diving passion meets industrial precision.",
    image: "/hero.jpg",
  },
  // ... more brand-specific overrides
};
```

### Shared Components

Components are built once in `packages/shared` and accept theme values as props or via context. They handle layout and structure — each brand only customizes appearance through its theme.

```tsx
// packages/shared/src/components/Hero.tsx
import { ThemeConfig } from "../types/theme";

export function Hero({ theme }: { theme: ThemeConfig }) {
  return (
    <section style={{ backgroundColor: theme.colors.primary }}>
      <h1>{theme.hero.headline}</h1>
      <p>{theme.hero.subheadline}</p>
    </section>
  );
}
```

### Brand App Entry Point

Each brand app is minimal — it imports shared components and passes its theme.

```tsx
// apps/main-brand/app/page.tsx
import { Hero, Services, About, Contact, Footer } from "@oceantech/shared";
import { theme } from "../theme";

export default function Home() {
  return (
    <>
      <Hero theme={theme} />
      <Services theme={theme} />
      <About theme={theme} />
      <Contact theme={theme} />
      <Footer theme={theme} />
    </>
  );
}
```

---

## Brand Materials

Each brand app contains a `brand-materials/` folder that documents and stores all branding assets generated using the `brand-agent.md` workflow. This folder is not deployed — it serves as the source of truth for each brand's creative process.

### Folder Contents

```
brand-materials/
├── brand-strategy.md        # Phase 1 output: purpose, personas, values, positioning, personality
├── brand-guidelines.md      # Phase 5 output: logo usage, color specs, typography, voice & tone
├── brand-writeup.md         # Brand narrative, taglines, copy direction
├── logo-prompts.md          # Prompts used for DALL-E 3 / Gemini logo generation + iterations
├── logos/                   # Generated logo assets
│   ├── concept-01.png       # DALL-E 3 output
│   ├── concept-02.png       # DALL-E 3 output
│   ├── concept-03.png       # Gemini output (wordmark)
│   ├── ...
│   ├── selected.png         # Chosen concept (raster)
│   └── final.svg            # Vectorized final logo
└── images/                  # Generated imagery for the site
    ├── hero.png             # Hero section image
    ├── about.png            # About section image
    ├── service-welding.png  # Service-specific imagery
    └── ...
```

### Workflow Per Brand (follows brand-agent.md)

| Phase | Model | Output | Saved To |
|-------|-------|--------|----------|
| 1. Brand Strategy | Claude Opus 4.6 (via OpenRouter) | Purpose, personas, values, positioning, visual direction | `brand-strategy.md` |
| 2. Logo Generation | DALL-E 3 (via OpenAI) | Abstract/icon/emblem logo concepts | `logos/*.png`, `logo-prompts.md` |
| 3. Logo Generation | Gemini 2.5 Pro (via OpenRouter) | Wordmark/lettermark/monogram concepts | `logos/*.png`, `logo-prompts.md` |
| 4. Post-Processing | Manual / Vectorizer tools | Vectorized final logo | `logos/final.svg` |
| 5. Brand Guidelines | Claude Opus 4.6 (via OpenRouter) | Full guidelines document | `brand-guidelines.md` |
| 6. Site Imagery | DALL-E 3 (via OpenAI) | Hero, about, service images | `images/*.png` |

### How Brand Materials Feed Into the App

```
brand-materials/brand-strategy.md   →  informs  →  theme.ts (colors, fonts, copy)
brand-materials/logos/final.svg     →  copied to →  public/logo.svg
brand-materials/images/hero.png     →  copied to →  public/hero.png
brand-materials/brand-guidelines.md →  reference →  tailwind.config.ts (color tokens, typography)
```

Production-ready assets from `brand-materials/` are copied into `public/` for the Next.js build. The markdown files stay as documentation and creative audit trail.

---

## Deployment

Each app deploys independently to its own subdomain:

| App | Subdomain | Purpose |
|-----|-----------|---------|
| `main-brand` | `main.oceantech.com` | Primary brand concept |
| `brand-1` | `brand1.oceantech.com` | Alternative concept 1 |
| `brand-2` | `brand2.oceantech.com` | Alternative concept 2 |
| `brand-3` | `brand3.oceantech.com` | Alternative concept 3 |

Once the owner selects a brand, that app gets deployed to the main domain (`oceantech.com`). The other subdomains can be taken down or kept as archives.

### Vercel Deployment

Each app in `apps/` is configured as a separate Vercel project pointing to the same repo:

- Root directory: `apps/main-brand`, `apps/brand-1`, etc.
- Turborepo is natively supported by Vercel
- Environment variables set per project

---

## Development

### Commands

```bash
# Install all dependencies
npm install

# Run all brand apps in dev mode
npx turbo dev

# Run a specific brand app
npx turbo dev --filter=main-brand

# Build all
npx turbo build

# Build a specific brand
npx turbo build --filter=brand-1

# Lint all
npx turbo lint
```

### Adding a New Brand

1. Copy an existing app folder (e.g., `apps/main-brand` → `apps/brand-4`)
2. Update `package.json` name field
3. Create a new `theme.ts` with the brand's visual identity
4. Add brand-specific assets to `public/`
5. Deploy to a new subdomain

---

## What Varies Per Brand

| Aspect | Shared | Per Brand |
|--------|--------|-----------|
| Component structure/layout | Yes | — |
| Colors | — | `theme.ts` |
| Fonts | — | `theme.ts` |
| Logo | — | `brand-materials/logos/` → `public/logo.svg` |
| Hero image/video | — | `brand-materials/images/` → `public/` |
| Headlines and copy tone | — | `theme.ts` |
| Service descriptions | Base shared | Can override |
| Photography | — | `brand-materials/images/` → `public/` |
| Tailwind theme extension | Base preset shared | Brand extends preset |
| Brand strategy & guidelines | — | `brand-materials/*.md` |
| Logo generation prompts | — | `brand-materials/logo-prompts.md` |

## What Stays the Same

- Page sections and order (Hero, Services, About, Process, Why Us, Contact, Footer)
- Company data (address, phone, services list, certifications)
- Responsive behavior and breakpoints
- SEO structure
- Contact form logic
- Accessibility
