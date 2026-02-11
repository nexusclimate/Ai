# Quick Start Guide

## Running Locally

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **View your site**
   Open http://localhost:3000 in your browser

## Building for Production

```bash
npm run build
```

This creates an `out` folder with your static site.

## Key Pages

- **Home** (`/`) - Featured collections and tools
- **Collections** (`/collections/[slug]`) - Tools grouped by category
- **Tools** (`/tools/[slug]`) - Individual tool details
- **Search** (`/search`) - Full-text search with tag filtering

## Next Steps

1. **Customize branding** - Update colors in `tailwind.config.ts`
2. **Add more content** - Create new files in `content/collections/` and `content/tools/`
3. **Add OG image** - Replace `public/OG_IMAGE_PLACEHOLDER.md` with a 1200x630 PNG image named `og.png`
4. **Deploy** - Push to GitHub and connect to Netlify

## Need Help?

- Check the README.md for detailed documentation
- Review existing content files for examples
- The structure follows Next.js 14 App Router conventions
