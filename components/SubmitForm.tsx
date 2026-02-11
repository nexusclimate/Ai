/**
 * Plain HTML form with Netlify form detection.
 * Netlify parses forms at deploy time — no API call or extra JavaScript needed.
 * Submissions appear in the Netlify dashboard automatically.
 */
export default function SubmitForm() {
  return (
    <form
      name="gpt-submission"
      method="POST"
      action="/thank-you"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      className="space-y-6"
    >
      <input type="hidden" name="form-name" value="gpt-submission" />
      <p className="hidden">
        <label>
          Don&apos;t fill this out if you&apos;re human: <input name="bot-field" />
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
          <option value="supply-chain-scope3">Supply Chain & Scope 3</option>
          <option value="water-resilience">Water & Climate Resilience</option>
          <option value="built-environment">Built Environment & Retrofits</option>
          <option value="climate-data-research">Climate Data & Research</option>
          <option value="emissions-accounting">Emissions Accounting & Reporting</option>
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
        We&apos;ll review your submission and add it to the hub if it meets our criteria.
      </p>
    </form>
  );
}
