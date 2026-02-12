'use client';

import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import ToolCard from '@/components/ToolCard';
import type { Tool, Collection } from '@/lib/types';

type SortOption = 'updated' | 'featured' | 'verified' | 'name';

interface ExploreClientProps {
  tools: Tool[];
  collections: Collection[];
  topTags: string[];
  platforms: string[];
}

export default function ExploreClient({
  tools,
  collections,
  topTags,
  platforms,
}: ExploreClientProps) {
  const [query, setQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState<string[]>([]);
  const [collectionFilter, setCollectionFilter] = useState<string[]>([]);
  const [maturityFilter, setMaturityFilter] = useState<string[]>([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('updated');

  const toggleFilter = (
    value: string,
    current: string[],
    set: (v: string[]) => void
  ) => {
    set(current.includes(value) ? current.filter((x) => x !== value) : [...current, value]);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearAllFilters = () => {
    setQuery('');
    setPlatformFilter([]);
    setCollectionFilter([]);
    setMaturityFilter([]);
    setVerifiedOnly(false);
    setSelectedTags([]);
  };

  const hasActiveFilters =
    query.trim() ||
    platformFilter.length > 0 ||
    collectionFilter.length > 0 ||
    maturityFilter.length > 0 ||
    verifiedOnly ||
    selectedTags.length > 0;

  const filteredTools = useMemo(() => {
    let result = tools;

    // Text search (instant)
    if (query.trim()) {
      const fuse = new Fuse(result, {
        keys: ['name', 'short_summary', 'tags', 'collections'],
        threshold: 0.35,
      });
      result = fuse.search(query).map((r) => r.item);
    }

    // Facets (AND between facets)
    if (platformFilter.length > 0) {
      result = result.filter((t) => platformFilter.includes(t.platform));
    }
    if (collectionFilter.length > 0) {
      result = result.filter((t) =>
        collectionFilter.some((c) => t.collections.includes(c))
      );
    }
    if (maturityFilter.length > 0) {
      result = result.filter((t) => maturityFilter.includes(t.maturity));
    }
    if (verifiedOnly) {
      result = result.filter((t) => t.verified);
    }
    if (selectedTags.length > 0) {
      result = result.filter((t) =>
        selectedTags.some((tag) => t.tags.includes(tag))
      );
    }

    // Sort
    const sorted = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'updated': {
          const dateA = a.last_verified ? new Date(a.last_verified).getTime() : 0;
          const dateB = b.last_verified ? new Date(b.last_verified).getTime() : 0;
          return dateB - dateA;
        }
        case 'featured':
          if (a.featured !== b.featured) return a.featured ? -1 : 1;
          return a.name.localeCompare(b.name);
        case 'verified':
          if (a.verified !== b.verified) return a.verified ? -1 : 1;
          return a.name.localeCompare(b.name);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return sorted;
  }, [
    tools,
    query,
    platformFilter,
    collectionFilter,
    maturityFilter,
    verifiedOnly,
    selectedTags,
    sortBy,
  ]);

  const maturities: { value: string; label: string }[] = [
    { value: 'stable', label: 'Stable' },
    { value: 'beta', label: 'Beta' },
    { value: 'experimental', label: 'Experimental' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header + Search */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-light text-lightgray mb-2">
          Explore
        </h1>
        <p className="text-lightgray/70 mb-6 max-w-2xl">
          Search and filter climate AI tools by platform, collection, maturity, and tags.
        </p>
        <div className="relative max-w-2xl">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, description, or tags..."
            className="w-full px-4 py-3 pl-11 text-lightgray glass rounded-lg focus:border-accent/50 focus:outline-none transition border border-white/10"
            aria-label="Search tools"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-lightgray/50 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar: Facets */}
        <aside className="lg:w-56 shrink-0 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-lightgray uppercase tracking-wider">
              Filters
            </h2>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-accent hover:text-softblue font-medium"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-sm font-medium text-lightgray/90 mb-2">Platform</h3>
            <div className="flex flex-wrap gap-1.5">
              {platforms.map((p) => (
                <button
                  key={p}
                  onClick={() => toggleFilter(p, platformFilter, setPlatformFilter)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${
                    platformFilter.includes(p)
                      ? 'bg-accent text-darkbg'
                      : 'glass border border-white/10 text-lightgray/80 hover:border-accent/30'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Collection */}
          <div>
            <h3 className="text-sm font-medium text-lightgray/90 mb-2">Collection</h3>
            <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto">
              {collections.map((c) => (
                <button
                  key={c.slug}
                  onClick={() =>
                    toggleFilter(c.slug, collectionFilter, setCollectionFilter)
                  }
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition whitespace-nowrap ${
                    collectionFilter.includes(c.slug)
                      ? 'bg-accent text-darkbg'
                      : 'glass border border-white/10 text-lightgray/80 hover:border-accent/30'
                  }`}
                >
                  {c.title}
                </button>
              ))}
            </div>
          </div>

          {/* Maturity */}
          <div>
            <h3 className="text-sm font-medium text-lightgray/90 mb-2">Maturity</h3>
            <div className="flex flex-wrap gap-1.5">
              {maturities.map((m) => (
                <button
                  key={m.value}
                  onClick={() =>
                    toggleFilter(m.value, maturityFilter, setMaturityFilter)
                  }
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${
                    maturityFilter.includes(m.value)
                      ? 'bg-accent text-darkbg'
                      : 'glass border border-white/10 text-lightgray/80 hover:border-accent/30'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Verified */}
          <div>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="rounded border-white/30 bg-white/5 text-accent focus:ring-accent/50"
              />
              <span className="text-sm text-lightgray/90 group-hover:text-lightgray">
                Verified only
              </span>
            </label>
          </div>
        </aside>

        {/* Main: Tags + Sort + Results */}
        <div className="flex-1 min-w-0">
          {/* Tag chips (top tags) */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-lightgray/90 mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {topTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    selectedTags.includes(tag)
                      ? 'bg-accent text-darkbg'
                      : 'glass border border-white/10 text-lightgray/80 hover:border-accent/30'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Sort + count */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <p className="text-lightgray/70 text-sm">
              {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-lightgray/60">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-lightgray focus:border-accent/50 focus:outline-none"
              >
                <option value="updated">Updated</option>
                <option value="featured">Featured</option>
                <option value="verified">Verified</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>

          {/* Result cards */}
          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center glass rounded-lg border border-white/10">
              <p className="text-lightgray/70 mb-2">No tools match your filters.</p>
              <button
                onClick={clearAllFilters}
                className="text-accent hover:text-softblue font-medium text-sm"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
