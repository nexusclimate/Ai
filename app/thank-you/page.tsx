import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Thank You | Climate GPT Hub',
  description: 'Thank you for your GPT submission',
};

export default function ThankYouPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center">
        {/* Success Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center">
            <svg
              className="w-10 h-10 text-accent"
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

        {/* Message */}
        <h1 className="text-4xl md:text-5xl font-light text-lightgray mb-4">
          Thank You!
        </h1>
        <p className="text-xl text-lightgray/80 mb-3">
          Your GPT submission has been received.
        </p>
        <p className="text-lightgray/70 mb-12 max-w-2xl mx-auto">
          We'll review your submission and add it to Climate GPT Hub if it meets our criteria. 
          You should receive a confirmation email shortly.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-accent text-darkbg rounded-lg hover:opacity-90 font-medium transition"
          >
            Back to Home
          </Link>
          <Link
            href="/submit"
            className="inline-block px-6 py-3 glass border-accent/30 text-accent rounded-lg hover:border-accent/50 font-medium transition"
          >
            Submit Another
          </Link>
        </div>
      </div>
    </div>
  );
}
