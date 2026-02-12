import Link from 'next/link';
import type { Update } from '@/lib/types';

interface LatestUpdatesProps {
  updates: Update[];
  /** Set to false when already on the updates page to hide "View all" */
  showViewAll?: boolean;
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return iso;
  }
}

export default function LatestUpdates({ updates, showViewAll = true }: LatestUpdatesProps) {
  if (updates.length === 0) return null;

  return (
    <section className="mb-16">
      <div className={`flex ${showViewAll ? 'justify-between' : ''} items-center mb-6`}>
        <h2 className="text-3xl font-semibold text-lightgray">
          Latest website updates
        </h2>
        {showViewAll && (
          <Link
            href="/updates"
            className="text-accent hover:text-softblue font-medium transition"
          >
            View all →
          </Link>
        )}
      </div>
      <ul className="space-y-3 list-none p-0 m-0">
        {updates.map((update) => (
          <li key={update.slug}>
            <Link
              href="/updates"
              className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 py-3 px-4 rounded-lg glass border border-white/10 hover:border-accent/30 transition group"
            >
              <div className="min-w-0">
                <span className="text-lightgray group-hover:text-accent transition font-medium">
                  {update.title}
                </span>
                {update.summary && (
                  <p className="text-lightgray/60 text-sm mt-0.5 line-clamp-1">
                    {update.summary}
                  </p>
                )}
              </div>
              <time
                dateTime={update.date}
                className="text-lightgray/50 text-sm shrink-0"
              >
                {formatDate(update.date)}
              </time>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
