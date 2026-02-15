import Link from 'next/link';
import type { Metadata } from 'next';
import SearchBox from '@/components/SearchBox';
import CollectionCard from '@/components/CollectionCard';
import ToolCard from '@/components/ToolCard';
import RecentlyUpdated from '@/components/RecentlyUpdated';
import { getFeaturedCollections, getFeaturedTools, getRecentlyUpdatedTools } from '@/lib/content';
import { SITE_URL, DEFAULT_OG_IMAGE, SITE_NAME, DEFAULT_DESCRIPTION } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Curated Climate AI Tools & GPTs',
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    title: `${SITE_NAME} | Curated Climate AI Tools & GPTs`,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function HomePage() {
  const featuredCollections = getFeaturedCollections();
  const featuredTools = getFeaturedTools();
  const recentlyUpdated = getRecentlyUpdatedTools(5);
  const generatedAt = new Date();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section - Centered Search */}
      <div className="text-center py-20 min-h-[60vh] flex flex-col justify-center animate-fade-in">
        <div className="inline-block mb-6 mx-auto">
          <span className="bg-accent/20 text-accent font-semibold px-4 py-2 rounded-full text-sm md:text-base border border-accent/30">
            CURATED CLIMATE AI TOOLS
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-light text-lightgray leading-tight mb-6">
          Climate AI Tools Hub
        </h1>
        <p className="text-accent font-medium text-xl mb-2">
          The One-Stop Shop for Climate Tech AI Tools
        </p>
        <p className="text-lightgray/70 text-lg max-w-2xl mx-auto mb-12">
          Discover and explore specialized AI tools for climate action, sustainability, and environmental impact.
        </p>
        <div className="flex justify-center">
          <SearchBox placeholder="Search climate AI tools..." />
        </div>
        <p className="text-lightgray/60 text-sm mt-6 mb-4">or</p>
        <Link
          href="/tools/climate-gpt-concierge"
          className="inline-flex items-center gap-2 px-6 py-3 glass border-accent/40 text-accent rounded-lg hover:border-accent hover:bg-accent/10 font-medium transition"
        >
          <span>Try the Climate AI Tools Hub Concierge</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
        <p className="text-lightgray/50 text-sm mt-3 max-w-md mx-auto">
          Find the right climate GPTs and tools in minutes — get recommendations, comparisons, and workflows from the hub directory.
        </p>
        <p className="text-lightgray/40 text-xs mt-4" role="status">
          Last refreshed: {generatedAt.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
          {process.env.NEXT_PUBLIC_APP_VERSION && (
            <> · v{process.env.NEXT_PUBLIC_APP_VERSION}</>
          )}
        </p>
      </div>

      {/* Recently updated */}
      <RecentlyUpdated tools={recentlyUpdated} />

      {/* Featured Collections */}
      {featuredCollections.length > 0 && (
        <section className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold text-lightgray">
              Featured Collections
            </h2>
            <Link
              href="/collections"
              className="text-accent hover:text-softblue font-medium transition"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCollections.map((collection) => (
              <CollectionCard key={collection.slug} collection={collection} />
            ))}
          </div>
        </section>
      )}

      {/* Featured Tools */}
      {featuredTools.length > 0 && (
        <section className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold text-lightgray">
              Featured Tools
            </h2>
            <Link
              href="/explore"
              className="text-accent hover:text-softblue font-medium transition"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>
      )}

      {/* Nexus Climate banner */}
      <section className="mb-16 rounded-lg overflow-hidden">
        <a
          href="https://nexusclimate.vc"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-darkbg"
          aria-label="Nexus Climate - Get in touch for climate tech advice"
        >
          <img
            src="/nexus-climate-banner.png"
            alt="Climate tech start-up? Need some advice? Growth Strategy & Engagement | Training | Enablement | Communications | Policy — www.nexusclimate.vc — Get in touch"
            className="w-full h-auto"
            width={1200}
            height={280}
          />
        </a>
      </section>
    </div>
  );
}
