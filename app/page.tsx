import Link from 'next/link';
import SearchBox from '@/components/SearchBox';
import CollectionCard from '@/components/CollectionCard';
import ToolCard from '@/components/ToolCard';
import { getFeaturedCollections, getFeaturedTools } from '@/lib/content';

export default function HomePage() {
  const featuredCollections = getFeaturedCollections();
  const featuredTools = getFeaturedTools();

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
          Climate GPT Hub
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
          <span>Try the Climate GPT Hub Concierge</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
        <p className="text-lightgray/50 text-sm mt-3 max-w-md mx-auto">
          Chat with our AI to get personalized tool recommendations and workflows.
        </p>
      </div>

      {/* Featured Collections */}
      {featuredCollections.length > 0 && (
        <section className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold text-lightgray">
              Featured Collections
            </h2>
            <Link
              href="/collections/climate-analysis"
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
              href="/search"
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

      {/* CTA Section */}
      <section className="mb-16 glass rounded-lg p-8 text-center border-accent/20">
        <h2 className="text-2xl font-bold text-lightgray mb-4">
          Ready to explore?
        </h2>
        <p className="text-lightgray/70 mb-6 max-w-2xl mx-auto">
          Browse our curated collections or search for specific climate AI tools to accelerate your impact.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/collections/climate-analysis"
            className="inline-block px-6 py-3 bg-accent text-darkbg rounded-lg hover:opacity-90 font-medium transition"
          >
            Browse Collections
          </Link>
          <Link
            href="/search"
            className="inline-block px-6 py-3 glass border-accent/30 text-accent rounded-lg hover:border-accent/50 font-medium transition"
          >
            Search Tools
          </Link>
        </div>
      </section>
    </div>
  );
}
