import { Suspense } from 'react';
import SearchRedirect from './search-redirect';

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-12 text-center text-lightgray/70">
          Redirecting to Explore…
        </div>
      }
    >
      <SearchRedirect />
    </Suspense>
  );
}
