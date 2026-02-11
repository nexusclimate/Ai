'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Fuse from 'fuse.js';
import SearchBox from '@/components/SearchBox';
import ToolCard from '@/components/ToolCard';
import type { Tool } from '@/lib/types';

interface SearchClientProps {
  tools: Tool[];
  allTags: string[];
}

export default function SearchClient({ tools, allTags }: SearchClientProps) {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [filteredTools, setFilteredTools] = useState<Tool[]>(tools);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    let results = tools;

    // Apply tag filter
    if (selectedTags.length > 0) {
      results = results.filter((tool) =>
        selectedTags.some((tag) => tool.tags.includes(tag))
      );
    }

    // Apply search query
    if (query.trim()) {
      const fuse = new Fuse(results, {
        keys: ['name', 'short_summary', 'tags', 'collections'],
        threshold: 0.3,
      });
      results = fuse.search(query).map((result) => result.item);
    }

    setFilteredTools(results);
  }, [query, tools, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Search Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-light text-lightgray mb-8">
          Search Tools
        </h1>
        <SearchBox placeholder="Search climate AI tools..." autoFocus />
      </div>

      {/* Tag Filters */}
      {allTags.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-lightgray mb-3">
            Filter by tag:
          </h2>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedTags.includes(tag)
                    ? 'bg-accent text-darkbg'
                    : 'glass border-lightgray/20 text-lightgray/80 hover:border-accent/30'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          {selectedTags.length > 0 && (
            <button
              onClick={() => setSelectedTags([])}
              className="mt-3 text-sm text-accent hover:text-softblue font-medium transition"
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      {/* Results */}
      <div>
        <p className="text-lightgray/70 mb-6">
          {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'} found
          {query && ` for "${query}"`}
        </p>

        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 glass rounded-lg">
            <p className="text-lightgray/70 mb-4">No tools found matching your criteria.</p>
            <Link
              href="/search"
              className="text-accent hover:text-softblue font-medium transition"
            >
              Clear search
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
