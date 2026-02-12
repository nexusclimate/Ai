/**
 * Central SEO config for the site. Update SITE_URL when deploying to production.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nexusclimate.ai';

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og.png`;

export const SITE_NAME = 'Climate AI Tools Hub';

export const DEFAULT_DESCRIPTION =
  'Discover and explore the best climate AI tools and GPTs—curated for climate tech, sustainability, emissions, and impact. Find the right tool in minutes.';

export const DEFAULT_KEYWORDS = [
  'climate GPT',
  'climate AI tools',
  'climate tech AI',
  'sustainability AI',
  'climate technology',
  'ESG AI',
  'emissions tracking AI',
  'climate startup tools',
  'curated climate tools',
  'Nexus Climate',
].join(', ');
