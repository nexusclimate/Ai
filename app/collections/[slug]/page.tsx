import { notFound } from 'next/navigation';
import Link from 'next/link';
import ToolCard from '@/components/ToolCard';
import { getAllCollections, getCollectionBySlug, getToolsByCollection } from '@/lib/content';

export async function generateStaticParams() {
  const collections = getAllCollections();
  return collections.map((collection) => ({
    slug: collection.slug,
  }));
}

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const collection = getCollectionBySlug(params.slug);

  if (!collection) {
    notFound();
  }

  const tools = getToolsByCollection(params.slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm">
        <Link href="/" className="text-lightgray/70 hover:text-accent transition">
          Home
        </Link>
        <span className="mx-2 text-lightgray/40">/</span>
        <span className="text-lightgray">{collection.title}</span>
      </nav>

      {/* Collection Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-light text-lightgray mb-4">
          {collection.title}
        </h1>
        <p className="text-xl text-lightgray/70">
          {collection.description}
        </p>
      </div>

      {/* Tools Grid */}
      {tools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 glass rounded-lg">
          <p className="text-lightgray/70">No tools found in this collection yet.</p>
        </div>
      )}
    </div>
  );
}
