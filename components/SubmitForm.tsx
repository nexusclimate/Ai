'use client';

/**
 * Submit form: 100% free, no backend, no third-party service.
 * Opens the user's email client with a pre-filled message to your inbox.
 * Works on any static host (Dokploy, Vercel, etc.). No API keys required.
 */
import { useState } from 'react';

const SUBMISSION_EMAIL = 'contact@nexusclimate.ai';

function buildSubmissionBody(form: HTMLFormElement): string {
  const get = (name: string) => (form.querySelector(`[name="${name}"]`) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)?.value?.trim() ?? '';
  const lines: string[] = [
    '--- GPT/Tool submission for Climate AI Tools Hub ---',
    '',
    'GPT/Tool Name: ' + get('gpt-name'),
    'URL: ' + get('gpt-url'),
    'Platform: ' + get('platform'),
    'Category: ' + get('category'),
    '',
    'Description:',
    get('description'),
    '',
    'Key Use Cases:',
    get('use-cases') || '(none)',
    '',
    'Submitted by: ' + get('submitter-name'),
    'Email: ' + get('email'),
    '',
    'Additional Notes:',
    get('notes') || '(none)',
    '',
    '---',
  ];
  return lines.join('\n');
}

function buildSubject(form: HTMLFormElement): string {
  const name = (form.querySelector('[name="gpt-name"]') as HTMLInputElement)?.value?.trim() ?? 'Submission';
  const submitter = (form.querySelector('[name="submitter-name"]') as HTMLInputElement)?.value?.trim() ?? '';
  return `GPT submission: ${name}${submitter ? ` — from ${submitter}` : ''}`;
}

export default function SubmitForm() {
  const [status, setStatus] = useState<'idle' | 'opened' | 'copied'>('idle');
  const [submissionText, setSubmissionText] = useState<string>('');
  const [copyLabel, setCopyLabel] = useState<string>('Copy submission to clipboard');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) return;

    const subject = buildSubject(form);
    const body = buildSubmissionBody(form);
    setSubmissionText(body);

    const mailto = `mailto:${SUBMISSION_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setStatus('opened');
  }

  async function handleCopy() {
    if (!submissionText) return;
    try {
      await navigator.clipboard.writeText(submissionText);
      setCopyLabel('Copied!');
      setTimeout(() => setCopyLabel('Copy submission to clipboard'), 2000);
      setStatus('copied');
    } catch {
      setCopyLabel('Copy failed');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
        <label htmlFor="email" className="block text-lightgray font-medium mb-2">
          Your Email <span className="text-accent">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
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

      {(status === 'opened' || status === 'copied') && submissionText && (
        <div className="rounded-lg border border-accent/20 bg-accent/5 p-4 space-y-3">
          <p className="text-lightgray text-sm">
            Your email client should open with the submission pre-filled. If it didn’t, copy the text below and send it to{' '}
            <a href={`mailto:${SUBMISSION_EMAIL}`} className="text-accent hover:underline">
              {SUBMISSION_EMAIL}
            </a>
            .
          </p>
          <button
            type="button"
            onClick={handleCopy}
            className="text-sm px-3 py-1.5 rounded bg-accent/20 text-accent hover:bg-accent/30 transition"
          >
            {copyLabel}
          </button>
          <pre className="text-lightgray/80 text-xs whitespace-pre-wrap break-words max-h-48 overflow-y-auto">
            {submissionText}
          </pre>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          className="w-full px-6 py-3 bg-accent text-darkbg rounded-lg hover:opacity-90 font-medium transition text-lg"
        >
          Open email and send submission
        </button>
      </div>

      <p className="text-lightgray/60 text-sm text-center">
        Submissions go to {SUBMISSION_EMAIL}. We&apos;ll review and add tools that meet our criteria. No third-party form service — your data goes straight to our inbox.
      </p>
    </form>
  );
}
