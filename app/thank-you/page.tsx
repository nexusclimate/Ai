import type { Metadata } from 'next';
import ThankYouRedirect from '@/components/ThankYouRedirect';

export const metadata: Metadata = {
  title: 'Thank You | Climate GPT Hub',
  description: 'Thank you for your GPT submission',
};

export default function ThankYouPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center">
            <svg
              className="w-8 h-8 text-accent"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-light text-lightgray mb-2">
          Thank you!
        </h1>
        <p className="text-lightgray/80">
          Your submission has been received. We&apos;ll review it and add it to the hub if it fits.
        </p>
        <ThankYouRedirect />
      </div>
    </div>
  );
}
