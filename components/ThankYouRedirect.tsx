'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const REDIRECT_SECONDS = 3;

export default function ThankYouRedirect() {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [router]);

  return (
    <p className="text-lightgray/60 text-sm mt-4">
      Redirecting you back to the hub in {secondsLeft} second{secondsLeft !== 1 ? 's' : ''}…
    </p>
  );
}
