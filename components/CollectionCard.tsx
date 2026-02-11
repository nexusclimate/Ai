import Link from 'next/link';
import type { Collection } from '@/lib/types';

interface CollectionCardProps {
  collection: Collection;
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className="block p-6 glass rounded-lg hover:border-accent/30 transition-all duration-200 group"
    >
      <h3 className="text-xl font-semibold text-accent mb-2 group-hover:text-softblue transition">
        {collection.title}
      </h3>
      <p className="text-lightgray/70 text-sm">
        {collection.description}
      </p>
      {collection.featured && (
        <span className="inline-block mt-3 text-xs font-medium text-accent">
          ★ Featured
        </span>
      )}
    </Link>
  );
}
