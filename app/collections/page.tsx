import type { Metadata } from 'next';
import CollectionCard from '@/components/CollectionCard';
import { getAllCollections } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Collections | Climate AI Tools Hub',
  description: 'Browse curated collections of climate-focused AI tools and GPTs by category.',
};

export default function CollectionsIndexPage() {
  const collections = getAllCollections();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-light text-lightgray mb-4">
          Collections
        </h1>
        <p className="text-xl text-lightgray/70 max-w-3xl">
          Browse climate AI tools by category. Each collection groups tools around a theme—from climate analysis and energy to startup resources and nature-based solutions.
        </p>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection) => (
          <CollectionCard key={collection.slug} collection={collection} />
        ))}
      </div>
    </div>
  );
}
