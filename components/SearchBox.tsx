'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface SearchBoxProps {
  placeholder?: string;
  autoFocus?: boolean;
}

export default function SearchBox({ placeholder = 'Search tools...', autoFocus = false }: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/explore?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full px-4 py-3 pl-12 text-lightgray glass rounded-lg focus:border-accent/50 focus:outline-none transition"
        />
        <svg
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-lightgray/50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </form>
  );
}
