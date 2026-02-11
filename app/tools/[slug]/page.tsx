import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import Badge from '@/components/Badge';
import { getAllTools, getToolBySlug, getToolContent } from '@/lib/content';
import { SITE_URL } from '@/lib/seo';

export async function generateStaticParams() {
  const tools = getAllTools();
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const tool = getToolBySlug(params.slug);

  if (!tool) {
    return { title: 'Tool Not Found' };
  }

  const url = `${SITE_URL}/tools/${params.slug}`;
  return {
    title: tool.name,
    description: tool.short_summary,
    alternates: { canonical: url },
    openGraph: {
      title: tool.name,
      description: tool.short_summary,
      url,
    },
  };
}

export default async function ToolPage({ params }: { params: { slug: string } }) {
  const tool = getToolBySlug(params.slug);

  if (!tool) {
    notFound();
  }

  const contentHtml = await getToolContent(params.slug);

  const maturityColors = {
    beta: 'warning',
    stable: 'success',
    experimental: 'info',
  } as const;

  // Check if URL is a placeholder
  const isPlaceholder = tool.url.includes('example.com');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm">
        <Link href="/" className="text-lightgray/70 hover:text-accent transition">
          Home
        </Link>
        <span className="mx-2 text-lightgray/40">/</span>
        <Link href="/search" className="text-lightgray/70 hover:text-accent transition">
          Tools
        </Link>
        <span className="mx-2 text-lightgray/40">/</span>
        <span className="text-lightgray">{tool.name}</span>
      </nav>

      {/* Tool Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-4xl md:text-5xl font-light text-lightgray flex-1">
            {tool.name}
          </h1>
          {tool.verified && (
            <span className="text-accent text-2xl ml-4" title="Verified">
              ✓
            </span>
          )}
        </div>
        
        <p className="text-xl text-lightgray/80 mb-6">
          {tool.short_summary}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          <Badge variant={maturityColors[tool.maturity]}>
            {tool.maturity}
          </Badge>
          <Badge variant="default">{tool.platform}</Badge>
          {tool.tags.map((tag) => (
            <Badge key={tag} variant="default">
              {tag}
            </Badge>
          ))}
        </div>

        {!isPlaceholder ? (
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-accent text-darkbg rounded-lg hover:opacity-90 font-medium transition"
          >
            Open Tool
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        ) : (
          <div className="inline-flex items-center px-6 py-3 glass border-lightgray/20 text-lightgray/50 rounded-lg cursor-not-allowed">
            <span>Coming Soon</span>
          </div>
        )}
      </div>

      {/* Tool Content */}
      <div className="glass rounded-lg p-8 mb-8">
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </div>

      {/* Use Cases */}
      {tool.use_cases && tool.use_cases.length > 0 && (
        <div className="glass rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-lightgray mb-4">Use Cases</h2>
          <ul className="space-y-2">
            {tool.use_cases.map((useCase, index) => (
              <li key={index} className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span className="text-lightgray/80">{useCase}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Limitations */}
      {tool.limitations && tool.limitations.length > 0 && (
        <div className="glass rounded-lg p-8 mb-8 border-yellow-500/20">
          <h2 className="text-2xl font-bold text-lightgray mb-4">Limitations</h2>
          <ul className="space-y-2">
            {tool.limitations.map((limitation, index) => (
              <li key={index} className="flex items-start">
                <span className="text-yellow-400 mr-2">⚠</span>
                <span className="text-lightgray/80">{limitation}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Collections */}
      {tool.collections && tool.collections.length > 0 && (
        <div className="glass rounded-lg p-6">
          <h3 className="text-lg font-semibold text-lightgray mb-3">
            Found in collections:
          </h3>
          <div className="flex flex-wrap gap-2">
            {tool.collections.map((collectionSlug) => (
              <Link
                key={collectionSlug}
                href={`/collections/${collectionSlug}`}
                className="px-4 py-2 glass border-accent/20 rounded-lg hover:border-accent/40 text-lightgray/80 hover:text-accent transition"
              >
                {collectionSlug.replace(/-/g, ' ')}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Metadata */}
      <div className="mt-8 text-sm text-lightgray/50">
        Last verified: {tool.last_verified}
      </div>
    </div>
  );
}
