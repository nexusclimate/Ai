import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';
import { getAllTools, getAllCollections } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = getAllTools();
  const collections = getAllCollections();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/explore`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${SITE_URL}/search`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/collections`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/submit`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  const toolRoutes: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${SITE_URL}/tools/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const collectionRoutes: MetadataRoute.Sitemap = collections.map((collection) => ({
    url: `${SITE_URL}/collections/${collection.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...toolRoutes, ...collectionRoutes];
}
