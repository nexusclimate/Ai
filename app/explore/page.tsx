import type { Metadata } from 'next';
import { Suspense } from 'react';
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
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="h-10 w-64 bg-white/10 rounded mb-6 animate-pulse" />
          <div className="flex gap-8">
            <div className="w-56 space-y-4">
              <div className="h-4 bg-white/10 rounded w-16" />
              <div className="h-20 bg-white/10 rounded" />
              <div className="h-24 bg-white/10 rounded" />
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-48 bg-white/10 rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <ExploreClient
        tools={tools}
        collections={collections}
        topTags={topTags}
        platforms={platforms}
      />
    </Suspense>
  );
}
