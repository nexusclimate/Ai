export interface Collection {
  slug: string;
  title: string;
  description: string;
  status: 'active' | 'draft';
  featured: boolean;
}

export interface Tool {
  name: string;
  slug: string;
  platform: string;
  url: string;
  collections: string[];
  tags: string[];
  maturity: 'beta' | 'stable' | 'experimental';
  verified: boolean;
  featured: boolean;
  short_summary: string;
  last_verified: string;
  use_cases: string[];
  limitations: string[];
  content: string;
}

export interface ToolMetadata {
  name: string;
  slug: string;
  platform: string;
  url: string;
  collections: string[];
  tags: string[];
  maturity: 'beta' | 'stable' | 'experimental';
  verified: boolean;
  featured: boolean;
  short_summary: string;
  last_verified: string;
  use_cases: string[];
  limitations: string[];
}

export interface Update {
  slug: string;
  date: string;
  title: string;
  summary?: string;
  content: string;
}
