import type { Metadata } from 'next';
import './globals.css';
import { SITE_URL, DEFAULT_OG_IMAGE, SITE_NAME, DEFAULT_DESCRIPTION, DEFAULT_KEYWORDS } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Curated Climate AI Tools & GPTs`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS,
  authors: [{ name: 'Nexus Climate', url: 'https://nexusclimate.vc' }],
  creator: 'Nexus Climate',
  publisher: 'Nexus Climate',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: SITE_URL },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Curated Climate AI Tools & GPTs`,
    description: DEFAULT_DESCRIPTION,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | Curated Climate AI Tools & GPTs`,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  verification: {
    // Optional: add when you have them
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <JsonLd />
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
                <a href="/explore" className="hover:text-white transition">
                  Explore
                </a>
                <a href="/collections" className="hover:text-white transition">
                  Collections
                </a>
                <a 
                  href="/submit" 
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
        <footer className="relative z-10 border-t border-white/10 mt-24 px-6 py-6">
          <div className="max-w-7xl mx-auto space-y-4">
            {/* Maturity legend */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-lightgray/60">
              <span className="font-medium text-lightgray/70">Maturity:</span>
              <span><span className="inline-block w-2 h-2 rounded-full bg-accent/80 mr-1.5 align-middle" aria-hidden />stable — production-ready</span>
              <span><span className="inline-block w-2 h-2 rounded-full bg-yellow-400/80 mr-1.5 align-middle" aria-hidden />beta — in development</span>
              <span><span className="inline-block w-2 h-2 rounded-full bg-softblue/80 mr-1.5 align-middle" aria-hidden />experimental — early / try at your own risk</span>
            </div>
            <div className="border-t border-white/20 pt-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-lightgray/70">
              {/* Left: Copyright */}
              <div>© 2026 Climate GPT Hub</div>
              {/* Middle: Initiative */}
              <div>
                An initiative by{' '}
                <a href="https://nexusclimate.vc" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                  Nexus Climate
                </a>
              </div>
              {/* Right: Email */}
              <div>
                <a href="mailto:contact@nexusclimate.ai" className="text-accent hover:underline">
                  contact@nexusclimate.ai
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
