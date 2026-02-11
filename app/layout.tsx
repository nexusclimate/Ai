import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Climate GPT Hub | Curated AI Tools for Climate Tech',
  description: 'Discover the best climate-related and climate tech startup GPTs across all major platforms. A curated one-stop-shop for climate AI tools.',
  keywords: 'climate GPT, climate tech AI, climate AI tools, GPT curation, climate technology, sustainability AI, climate startups',
  openGraph: {
    title: 'Climate GPT Hub | Curated AI Tools for Climate Tech',
    description: 'Discover the best climate-related and climate tech startup GPTs across all major platforms.',
    images: ['/og.png'],
    siteName: 'Climate GPT Hub',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Climate GPT Hub | Curated AI Tools for Climate Tech',
    description: 'Discover the best climate-related and climate tech startup GPTs across all major platforms.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Background gradient mesh */}
        <div className="fixed inset-0 mesh-gradient"></div>
        
        {/* Floating orbs */}
        <div className="floating-orb w-96 h-96 top-1/4 -left-48 animate-drift"></div>
        <div className="floating-orb w-72 h-72 top-3/4 -right-36 animate-drift"></div>

        {/* Navigation */}
        <nav className="relative z-10 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <a href="/" className="text-2xl font-bold text-accent tracking-tight">
                Climate GPT Hub
              </a>
              <div className="hidden md:flex items-center space-x-6 text-base text-lightgray/80">
                <a href="/collections/climate-analysis" className="hover:text-white transition">
                  Collections
                </a>
                <a href="/search" className="hover:text-white transition">
                  Search
                </a>
                <a 
                  href="mailto:info@nexusclimate.ai?subject=Submit a GPT" 
                  className="bg-accent text-darkbg font-semibold py-2 px-4 rounded hover:opacity-90 transition"
                >
                  Submit a GPT
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="relative z-10 min-h-screen">{children}</main>

        {/* Footer */}
        <footer className="relative z-10 border-t border-white/10 mt-24 px-6 py-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-y-8 md:gap-y-0">
            <div className="flex flex-col items-center md:items-start">
              <p className="text-lightgray/70 text-base mb-2">
                An initiative by{' '}
                <a href="https://nexusclimate.vc" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                  Nexus Climate
                </a>
              </p>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <p className="text-lightgray/70 text-base">
                Email:{' '}
                <a href="mailto:info@nexusclimate.ai" className="text-accent hover:underline">
                  info@nexusclimate.ai
                </a>
              </p>
              <p className="text-lightgray/60 text-base mt-1">© 2026 Climate GPT Hub</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
