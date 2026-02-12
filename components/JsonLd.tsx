import { SITE_URL, SITE_NAME, DEFAULT_DESCRIPTION } from '@/lib/seo';

/**
 * JSON-LD structured data for SEO: WebSite (with search) and Organization.
 * Helps search engines understand the site and can enable sitelinks search box.
 */
export default function JsonLd() {
  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    publisher: {
      '@type': 'Organization',
      name: 'Nexus Climate',
      url: 'https://nexusclimate.vc',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/explore?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Nexus Climate',
    url: 'https://nexusclimate.vc',
    description: 'An initiative by Nexus Climate. Climate AI Tools Hub curates climate AI tools and GPTs for climate tech and sustainability.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
    </>
  );
}
