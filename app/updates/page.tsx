import type { Metadata } from 'next';
import Link from 'next/link';
import { remark } from 'remark';
import html from 'remark-html';
import { getAllUpdates } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Updates',
  description: 'Changelog and recent updates to Climate GPT Hub—new tools, collections, and improvements.',
};

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return iso;
  }
}

export default async function UpdatesPage() {
  const updates = getAllUpdates();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-light text-lightgray mb-2">
          Updates
        </h1>
        <p className="text-lightgray/70">
          Changelog and recent changes to the hub—new tools, collections, and improvements.
        </p>
      </div>

      {updates.length === 0 ? (
        <div className="glass rounded-lg p-8 text-center text-lightgray/70">
          No updates yet. Add markdown files to <code className="text-accent">content/updates/</code> with <code className="text-accent">date</code>, <code className="text-accent">title</code>, and optional <code className="text-accent">summary</code>.
        </div>
      ) : (
        <ul className="space-y-10 list-none p-0 m-0">
          {await Promise.all(
            updates.map(async (update) => {
              const processed = await remark().use(html).process(update.content);
              const contentHtml = processed.toString();
              return (
                <li key={update.slug} className="glass rounded-lg p-6 md:p-8 border border-white/10">
                  <time
                    dateTime={update.date}
                    className="text-sm text-lightgray/50 block mb-1"
                  >
                    {formatDate(update.date)}
                  </time>
                  <h2 className="text-2xl font-semibold text-lightgray mb-2">
                    {update.title}
                  </h2>
                  {update.summary && (
                    <p className="text-lightgray/70 mb-4">{update.summary}</p>
                  )}
                  <div
                    className="prose prose-invert prose-sm max-w-none text-lightgray/80 prose-headings:text-lightgray prose-a:text-accent prose-a:no-underline hover:prose-a:underline"
                    dangerouslySetInnerHTML={{ __html: contentHtml }}
                  />
                </li>
              );
            })
          )}
        </ul>
      )}

      <div className="mt-12 text-center">
        <Link
          href="/"
          className="text-accent hover:text-softblue font-medium transition"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
