# Climate GPT Hub

A curated directory of climate-focused AI tools and GPTs, built with Next.js 14 and deployed as a static site.

## Features

- 🌍 Browse curated collections of climate AI tools
- 🔍 Full-text search with tag filtering
- 📱 Responsive design with Tailwind CSS
- 🎨 Dark theme with glass morphism effects and animated gradients
- ⚡ Static site generation for fast loading
- 💎 Modern UI matching the original Climate GPT Hub aesthetic

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

Generate a static export:

```bash
npm run build
```

The static site will be generated in the `out` directory, ready for deployment.

## Project Structure

```
climate-gpt-hub/
├── app/                    # Next.js app router pages
│   ├── layout.tsx         # Root layout with navigation
│   ├── page.tsx           # Home page
│   ├── collections/       # Collections pages
│   ├── tools/             # Tool detail pages
│   └── search/            # Search page
├── components/            # React components
│   ├── Badge.tsx
│   ├── CollectionCard.tsx
│   ├── ToolCard.tsx
│   └── SearchBox.tsx
├── lib/                   # Utility functions
│   ├── content.ts        # Content loading functions
│   └── types.ts          # TypeScript type definitions
├── content/              # Content files (JSON and Markdown)
│   ├── collections/      # Collection definitions (JSON)
│   └── tools/            # Tool definitions (Markdown with frontmatter)
└── public/               # Static assets
```

## Adding Content

### Add a Collection

Create a JSON file in `content/collections/`:

```json
{
  "slug": "collection-name",
  "title": "Collection Title",
  "description": "Collection description",
  "status": "active",
  "featured": true
}
```

### Add a Tool

Create a Markdown file in `content/tools/` with frontmatter:

```markdown
---
name: Tool Name
slug: tool-slug
platform: OpenAI
url: https://example.com
collections:
  - collection-slug
tags:
  - tag1
  - tag2
maturity: beta  # beta, stable, or experimental
verified: true
featured: true
short_summary: "Brief tool description"
last_verified: "2026-02-11"  # Use quotes to avoid YAML date parsing
use_cases:
  - "Use case 1"
  - "Use case 2"
limitations:
  - "Limitation 1"
---

## What it does
Tool description in markdown format.

## Who it's for
Target audience description.
```

**Important:** Always quote the `last_verified` date to prevent YAML from parsing it as a Date object.

### Add a tool and sync to Updates (don’t forget)

When you add or update tools, the **Updates** page and **Recently updated** list should stay in sync.

**Recommended: one command after adding cards**

1. **Add your tool cards** — Create (or edit) Markdown file(s) in `content/tools/` and set `last_verified: "YYYY-MM-DD"` (e.g. today’s date).
2. **Run the release command** — This syncs tools to Updates and bumps the patch version by +0.0.1:
   ```bash
   npm run release:additions
   ```
   This will:
   - Sync new tools into `content/updates/YYYY-MM-DD-additions.md` (so they appear on the [Updates](/updates) page)
   - Bump the version in `package.json` (e.g. 1.1.12 → 1.1.13)

Then run `npm run build` when you’re ready to build with the new version.

**Optional:** Sync only (no version bump):
```bash
npm run update:sync
```
To sync only a specific date: `node scripts/sync-updates-from-tools.js 2026-02-13`

If you forget to run `release:additions` (or `update:sync`), new tools will still show in Explore and Collections, but they won’t appear in the Updates changelog until you run it.

## Deployment

### Submit form (free, no backend)

The Submit page uses a **mailto:** flow: when the user submits, their email client opens with the submission pre-filled and sent to your inbox. No third-party service, no API keys, no backend. It works on any static host (Dokploy, Vercel, etc.). If the email client doesn’t open, the page shows a **Copy to clipboard** option so they can paste the submission into an email manually. The recipient address is set in the component (`contact@nexusclimate.ai`); change it in `components/SubmitForm.tsx` if needed.

### Netlify

This project is configured for Netlify deployment:

1. Connect your repository to Netlify
2. Netlify will automatically detect the build settings from `netlify.toml`
3. Push to deploy

### Manual Deployment

After running `npm run build`, deploy the contents of the `out` directory to any static hosting service:

- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Any static file host

## Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS with custom dark theme
- **Design:** Glass morphism effects with animated gradient mesh background
- **Colors:** Cyan accent (#0EE4FC), dark background (#0A0A0B)
- **Font:** Work Sans
- **Search:** Fuse.js for fuzzy search
- **Content:** Markdown with gray-matter for frontmatter parsing
- **TypeScript:** Full type safety
- **Deployment:** Static export for maximum compatibility

## License

MIT
