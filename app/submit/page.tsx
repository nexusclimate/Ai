import type { Metadata } from 'next';
import SubmitForm from '@/components/SubmitForm';

export const metadata: Metadata = {
  title: 'Submit a GPT | Climate GPT Hub',
  description: 'Submit your climate-focused GPT or AI tool to Climate GPT Hub',
};

export default function SubmitPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-light text-lightgray mb-4">
          Submit a Climate GPT
        </h1>
        <p className="text-lightgray/70 text-lg">
          Know of an excellent climate-related GPT or AI tool? Help us build the most comprehensive collection by submitting your recommendations.
        </p>
      </div>

      {/* Form */}
      <div className="glass rounded-lg p-8 border-accent/20">
        <SubmitForm />
      </div>
    </div>
  );
}
