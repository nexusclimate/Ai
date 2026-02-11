import Link from 'next/link';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import SearchClient from './search-client';
import { getAllTools } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search and discover climate-focused AI tools and GPTs by name, tag, or collection. Find the right climate GPT or tool for your use case.',
};

export default function SearchPage() {
  const tools = getAllTools();
  
  // Extract unique tags
  const tags = new Set<string>();
  tools.forEach((tool) => {
    tool.tags.forEach((tag: string) => tags.add(tag));
  });
  const allTags = Array.from(tags).sort();

  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-12">Loading...</div>}>
      <SearchClient tools={tools} allTags={allTags} />
    </Suspense>
  );
}
