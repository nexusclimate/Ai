import Link from 'next/link';
import Badge from './Badge';
import type { Tool } from '@/lib/types';

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const maturityColors = {
    beta: 'warning',
    stable: 'success',
    experimental: 'info',
  } as const;

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="block p-6 glass rounded-lg hover:border-accent/30 transition-all duration-200 group"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold text-lightgray flex-1 group-hover:text-accent transition">
          {tool.name}
        </h3>
        {tool.verified && (
          <span className="text-accent ml-2" title="Verified">
            ✓
          </span>
        )}
      </div>
      
      <p className="text-lightgray/70 text-sm mb-3 line-clamp-2">
        {tool.short_summary}
      </p>

      <div className="flex flex-wrap gap-2 mb-3">
        <Badge variant={maturityColors[tool.maturity]}>
          {tool.maturity}
        </Badge>
        <Badge variant="default">{tool.platform}</Badge>
        {tool.tags.slice(0, 2).map((tag) => (
          <Badge key={tag} variant="default">
            {tag}
          </Badge>
        ))}
      </div>

      {tool.featured && (
        <span className="inline-block text-xs font-medium text-accent">
          ★ Featured
        </span>
      )}
    </Link>
  );
}
