import type { Metadata } from 'next';
import { getAllTools, getAllCollections } from '@/lib/content';
import ExploreClient from './explore-client';
import type { Tool, Collection } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Explore',
  description: 'Explore and filter climate AI tools and GPTs by platform, collection, maturity, and tags. Find the right tool for your use case.',
};

function getTopTags(tools: Tool[], limit = 14): string[] {
  const count: Record<string, number> = {};
  tools.forEach((tool) => {
    tool.tags.forEach((tag) => {
      count[tag] = (count[tag] || 0) + 1;
    });
  });
  return Object.entries(count)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag]) => tag);
}

function getPlatforms(tools: Tool[]): string[] {
  const set = new Set(tools.map((t) => t.platform).filter(Boolean));
  return Array.from(set).sort();
}

export default function ExplorePage() {
  const tools = getAllTools();
  const collections = getAllCollections();
  const topTags = getTopTags(tools);
  const platforms = getPlatforms(tools);

  return (
    <ExploreClient
      tools={tools}
      collections={collections}
      topTags={topTags}
      platforms={platforms}
    />
  );
}
