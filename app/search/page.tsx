'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function SearchRedirectPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const q = searchParams.get('q')?.trim();
    const target = q ? `/explore?q=${encodeURIComponent(q)}` : '/explore';
    router.replace(target);
  }, [searchParams, router]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 text-center text-lightgray/70">
      Redirecting to Explore…
    </div>
  );
}
