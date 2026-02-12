import Link from 'next/link';
import type { Tool } from '@/lib/types';

interface RecentlyUpdatedProps {
  tools: Tool[];
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return iso;
  }
}

export default function RecentlyUpdated({ tools }: RecentlyUpdatedProps) {
  if (tools.length === 0) return null;

  return (
    <section className="mb-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-lightgray">
          Recently updated
        </h2>
        <Link
          href="/explore"
          className="text-accent hover:text-softblue font-medium transition text-sm"
        >
          Explore all →
        </Link>
      </div>
      <ul className="space-y-3">
        {tools.map((tool) => (
          <li key={tool.slug}>
            <Link
              href={`/tools/${tool.slug}`}
              className="flex items-baseline justify-between gap-4 py-2 px-4 rounded-lg glass border border-white/10 hover:border-accent/30 transition group"
            >
              <span className="text-lightgray group-hover:text-accent transition truncate">
                {tool.name}
              </span>
              <time
                dateTime={tool.last_verified}
                className="text-lightgray/50 text-sm shrink-0"
              >
                {formatDate(tool.last_verified)}
              </time>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
