"use client";

import { useMemo, useState } from 'react';

const CALCULATORS = [
  ['general', 'General / website'],
  ['iso', 'ISO 286 Fit Calculator'],
  ['oring', 'O-Ring Groove Calculator'],
  ['gdt', 'GD&T Reference'],
  ['threads', 'Metric Thread & Bolt Calculator'],
  ['keys', 'Parallel Key Calculator'],
] as const;

type FormState = {
  type: string;
  calculator: string;
  subject: string;
  details: string;
  expected: string;
  reference: string;
};

const INITIAL: FormState = {
  type: 'calculation',
  calculator: 'general',
  subject: '',
  details: '',
  expected: '',
  reference: '',
};

export default function ContactForm({
  contactEmail,
}: {
  contactEmail: string | null;
}) {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState('');

  const report = useMemo(() => {
    const calculator =
      CALCULATORS.find(([id]) => id === form.calculator)?.[1] ??
      form.calculator;

    return [
      'DraftFit feedback / calculation issue',
      '',
      `Type: ${form.type}`,
      `Calculator: ${calculator}`,
      `Subject: ${form.subject || '—'}`,
      '',
      'Details:',
      form.details || '—',
      '',
      'Expected result / behavior:',
      form.expected || '—',
      '',
      'Reference / standard / source:',
      form.reference || '—',
      '',
      `Page: ${typeof window === 'undefined' ? 'DraftFit' : window.location.href}`,
    ].join('\n');
  }, [form]);

  async function copyReport() {
    try {
      await navigator.clipboard.writeText(report);
      setStatus('Report copied to clipboard.');
    } catch {
      setStatus('Clipboard access failed. Select the preview and copy it manually.');
    }
  }

  function openEmail() {
    if (!contactEmail) {
      setStatus(
        'No public contact email is configured yet. Copy the report for now.',
      );
      return;
    }

    const subject = encodeURIComponent(
      `[DraftFit] ${form.subject || 'Engineering feedback'}`,
    );
    const body = encodeURIComponent(report);

    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  const inputClass =
    'mt-2 w-full border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-orange-500';

  return (
    <div className="draftfit-safe-wrap space-y-6">
      <section className="grid gap-5 border border-zinc-800 bg-zinc-900/60 p-6 md:grid-cols-2 md:p-8">
        <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
          Feedback type
          <select
            className={inputClass}
            value={form.type}
            onChange={(event) => update('type', event.target.value)}
          >
            <option value="calculation">Calculation issue</option>
            <option value="bug">Website / UI bug</option>
            <option value="feature">Feature request</option>
            <option value="calculator">New calculator request</option>
            <option value="general">General feedback</option>
          </select>
        </label>

        <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
          Calculator
          <select
            className={inputClass}
            value={form.calculator}
            onChange={(event) => update('calculator', event.target.value)}
          >
            {CALCULATORS.map(([id, label]) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 md:col-span-2">
          Subject
          <input
            className={inputClass}
            value={form.subject}
            onChange={(event) => update('subject', event.target.value)}
            placeholder="e.g. M12 preload result differs from my reference"
          />
        </label>

        <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 md:col-span-2">
          What happened?
          <textarea
            className={`${inputClass} min-h-32`}
            value={form.details}
            onChange={(event) => update('details', event.target.value)}
            placeholder="Include the important inputs, result and steps to reproduce."
          />
        </label>

        <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
          Expected result / behavior
          <textarea
            className={`${inputClass} min-h-28`}
            value={form.expected}
            onChange={(event) => update('expected', event.target.value)}
            placeholder="What did you expect to obtain?"
          />
        </label>

        <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
          Reference
          <textarea
            className={`${inputClass} min-h-28`}
            value={form.reference}
            onChange={(event) => update('reference', event.target.value)}
            placeholder="Standard, handbook, manual calculation or other reference."
          />
        </label>
      </section>

      <section className="border border-zinc-800 bg-zinc-900/60 p-6 md:p-8">
        <h2 className="text-lg font-black">Structured report preview</h2>
        <pre className="mt-4 max-h-80 overflow-auto whitespace-pre-wrap border border-zinc-800 bg-zinc-950 p-4 text-xs leading-6 text-zinc-300">
          {report}
        </pre>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={copyReport}
            className="bg-orange-600 px-4 py-2 text-xs font-black uppercase tracking-wider text-white hover:bg-orange-500"
          >
            Copy report
          </button>

          <button
            type="button"
            onClick={openEmail}
            className="border border-zinc-700 px-4 py-2 text-xs font-black uppercase tracking-wider text-zinc-200 hover:border-orange-500 hover:text-orange-400"
          >
            Open email client
          </button>
        </div>

        {status ? (
          <p role="status" aria-live="polite" className="mt-4 text-sm text-zinc-400">{status}</p>
        ) : null}

        {!contactEmail ? (
          <p className="mt-4 text-xs leading-5 text-zinc-500">
            A public DraftFit email address is not configured yet. When the final
            domain is active, set NEXT_PUBLIC_CONTACT_EMAIL to enable the email
            button. The structured copy workflow already works without a backend.
          </p>
        ) : null}
      </section>
    </div>
  );
}
