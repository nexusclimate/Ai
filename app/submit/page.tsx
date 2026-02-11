import type { Metadata } from 'next';

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
        <form 
          name="gpt-submission" 
          method="POST" 
          data-netlify="true"
          netlify-honeypot="bot-field"
          action="/thank-you"
          className="space-y-6"
        >
          {/* Hidden fields for Netlify */}
          <input type="hidden" name="form-name" value="gpt-submission" />
          <p className="hidden">
            <label>
              Don't fill this out if you're human: <input name="bot-field" />
            </label>
          </p>

          {/* GPT Name */}
          <div>
            <label htmlFor="gpt-name" className="block text-lightgray font-medium mb-2">
              GPT/Tool Name <span className="text-accent">*</span>
            </label>
            <input
              type="text"
              id="gpt-name"
              name="gpt-name"
              required
              className="w-full px-4 py-3 glass rounded-lg text-lightgray focus:border-accent/50 focus:outline-none transition"
              placeholder="e.g., Climate Risk Analyzer"
            />
          </div>

          {/* URL */}
          <div>
            <label htmlFor="gpt-url" className="block text-lightgray font-medium mb-2">
              GPT/Tool URL <span className="text-accent">*</span>
            </label>
            <input
              type="url"
              id="gpt-url"
              name="gpt-url"
              required
              className="w-full px-4 py-3 glass rounded-lg text-lightgray focus:border-accent/50 focus:outline-none transition"
              placeholder="https://chat.openai.com/g/..."
            />
          </div>

          {/* Platform */}
          <div>
            <label htmlFor="platform" className="block text-lightgray font-medium mb-2">
              Platform <span className="text-accent">*</span>
            </label>
            <select
              id="platform"
              name="platform"
              required
              className="w-full px-4 py-3 glass rounded-lg text-lightgray focus:border-accent/50 focus:outline-none transition"
            >
              <option value="">Select a platform</option>
              <option value="OpenAI">OpenAI ChatGPT</option>
              <option value="Anthropic">Anthropic Claude</option>
              <option value="Google">Google Gemini</option>
              <option value="Web App">Web Application</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-lightgray font-medium mb-2">
              Primary Category <span className="text-accent">*</span>
            </label>
            <select
              id="category"
              name="category"
              required
              className="w-full px-4 py-3 glass rounded-lg text-lightgray focus:border-accent/50 focus:outline-none transition"
            >
              <option value="">Select a category</option>
              <option value="climate-analysis">Climate Analysis</option>
              <option value="energy">Energy & Infrastructure</option>
              <option value="carbon-markets">Carbon Markets</option>
              <option value="startup-resources">Startup Resources</option>
              <option value="sustainable-agriculture">Sustainable Agriculture</option>
              <option value="climate-finance">Climate Finance</option>
              <option value="climate-adaptation">Climate Risk & Adaptation</option>
              <option value="circular-economy">Circular Economy</option>
              <option value="nature-based-solutions">Nature-based Solutions</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-lightgray font-medium mb-2">
              Description <span className="text-accent">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              className="w-full px-4 py-3 glass rounded-lg text-lightgray focus:border-accent/50 focus:outline-none transition resize-none"
              placeholder="Brief description of what this GPT/tool does and who it's for..."
            />
          </div>

          {/* Use Cases */}
          <div>
            <label htmlFor="use-cases" className="block text-lightgray font-medium mb-2">
              Key Use Cases
            </label>
            <textarea
              id="use-cases"
              name="use-cases"
              rows={3}
              className="w-full px-4 py-3 glass rounded-lg text-lightgray focus:border-accent/50 focus:outline-none transition resize-none"
              placeholder="What problems does it solve? (Optional)"
            />
          </div>

          {/* Your Name */}
          <div>
            <label htmlFor="submitter-name" className="block text-lightgray font-medium mb-2">
              Your Name <span className="text-accent">*</span>
            </label>
            <input
              type="text"
              id="submitter-name"
              name="submitter-name"
              required
              className="w-full px-4 py-3 glass rounded-lg text-lightgray focus:border-accent/50 focus:outline-none transition"
              placeholder="Your name"
            />
          </div>

          {/* Your Email */}
          <div>
            <label htmlFor="submitter-email" className="block text-lightgray font-medium mb-2">
              Your Email <span className="text-accent">*</span>
            </label>
            <input
              type="email"
              id="submitter-email"
              name="submitter-email"
              required
              className="w-full px-4 py-3 glass rounded-lg text-lightgray focus:border-accent/50 focus:outline-none transition"
              placeholder="your.email@example.com"
            />
          </div>

          {/* Additional Notes */}
          <div>
            <label htmlFor="notes" className="block text-lightgray font-medium mb-2">
              Additional Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              className="w-full px-4 py-3 glass rounded-lg text-lightgray focus:border-accent/50 focus:outline-none transition resize-none"
              placeholder="Any additional information or context... (Optional)"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full px-6 py-3 bg-accent text-darkbg rounded-lg hover:opacity-90 font-medium transition text-lg"
            >
              Submit GPT
            </button>
          </div>

          <p className="text-lightgray/60 text-sm text-center">
            We'll review your submission and add it to the hub if it meets our criteria.
          </p>
        </form>
      </div>
    </div>
  );
}
