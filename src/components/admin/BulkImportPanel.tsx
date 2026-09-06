'use client';

import { useState } from 'react';
import { bulkImport } from '@/lib/api';
import { getToken } from '@/lib/auth';

interface Result {
  sheetSlug: string;
  topicsCreated: number;
  problemsCreated: number;
  problemsSkipped: number;
  warnings: string[];
}

const SAMPLE = JSON.stringify(
  {
    sheetName: 'The Blueprint',
    sheetSlug: 'sde-sheet',
    description: 'The interview-ready set. Tight, high-signal.',
    topics: [
      {
        name: 'Arrays',
        slug: 'arrays',
        problems: [
          {
            name: 'Two Sum',
            slug: 'two-sum',
            difficulty: 'EASY',
            url: 'https://leetcode.com/problems/two-sum/',
            platform: 'LEETCODE',
            articleUrl: '',
          },
        ],
      },
    ],
  },
  null,
  2
);

export default function BulkImportPanel() {
  const [json, setJson] = useState('');
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const run = async () => {
    setError('');
    setResult(null);

    const token = getToken();
    if (!token) {
      setError('Not signed in.');
      return;
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(json);
    } catch {
      setError('Invalid JSON — check for a trailing comma or missing bracket.');
      return;
    }

    setLoading(true);
    try {
      const res = await bulkImport(parsed, token);
      setResult(res as Result);
    } catch (err: unknown) {
      const message =
        typeof err === 'object' && err !== null && 'message' in err
          ? String((err as { message: unknown }).message)
          : 'Import failed.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr]" style={{ gap: '1.5rem' }}>
      <div
        className="rounded-[6px] border border-[#1A1A1A] bg-[#0B0B0B]"
        style={{ padding: '2rem' }}
      >
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-heading text-lg font-semibold text-[#F2F0EA]">
            Sheet JSON
          </h2>
          <button
            onClick={() => setJson(SAMPLE)}
            className="text-[12px] text-[#C9A84C] transition-opacity hover:opacity-80"
          >
            Load sample
          </button>
        </div>

        <textarea
          value={json}
          onChange={(e) => setJson(e.target.value)}
          spellCheck={false}
          placeholder="Paste your sheet JSON here…"
          className="w-full resize-y rounded-[4px] border border-[#1E1E1E] bg-[#070707] font-mono text-[13px] leading-[1.7] text-[#F2F0EA] outline-none transition-colors placeholder:text-[#3A3A36] focus:border-[#C9A84C]"
          style={{ marginTop: '1.25rem', padding: '1rem', minHeight: '420px' }}
        />

        {error && (
          <div
            className="rounded-[4px] border border-[#3A211C] bg-[#170E0C] text-[14px] font-light text-[#C9705F]"
            style={{ marginTop: '1.25rem', padding: '0.85rem 1rem' }}
          >
            {error}
          </div>
        )}

        <button
          onClick={run}
          disabled={loading || !json.trim()}
          className="rounded-[4px] bg-[#C9A84C] font-heading text-[15px] font-semibold tracking-wide text-[#070707] transition-all hover:bg-[#E3C97A] disabled:cursor-not-allowed disabled:opacity-40"
          style={{ marginTop: '1.5rem', padding: '0.9rem 2rem' }}
        >
          {loading ? 'Importing…' : 'Import sheet'}
        </button>
      </div>

      <div className="flex flex-col" style={{ gap: '1.5rem' }}>
        <div
          className="rounded-[6px] border border-[#1A1A1A] bg-[#0B0B0B]"
          style={{ padding: '2rem' }}
        >
          <h3 className="font-heading text-[15px] font-semibold text-[#F2F0EA]">
            Format
          </h3>
          <ul
            className="flex flex-col text-[13px] font-light leading-[1.7] text-[#7C7C78]"
            style={{ marginTop: '1rem', gap: '0.6rem' }}
          >
            <li>Slugs must be unique and URL-safe.</li>
            <li>Difficulty: EASY, MEDIUM or HARD.</li>
            <li>Platform: LEETCODE, GFG, HACKERRANK, CODEFORCES, CODECHEF, CODING_NINJAS, N2FORGE.</li>
            <li>Existing slugs are reused, not duplicated.</li>
            <li>Order follows array position.</li>
            <li>Re-running with the same sheetSlug appends to it.</li>
          </ul>
        </div>

        {result && (
          <div
            className="rounded-[6px] border border-[#243020] bg-[#0B0F0A]"
            style={{ padding: '2rem' }}
          >
            <h3 className="font-heading text-[15px] font-semibold text-[#7FA86B]">
              Import complete
            </h3>

            <div
              className="flex flex-col text-[13px] text-[#7C7C78]"
              style={{ marginTop: '1rem', gap: '0.5rem' }}
            >
              <p>Sheet: <span className="text-[#F2F0EA]">{result.sheetSlug}</span></p>
              <p>Topics created: <span className="text-[#F2F0EA]">{result.topicsCreated}</span></p>
              <p>Problems created: <span className="text-[#F2F0EA]">{result.problemsCreated}</span></p>
              <p>Skipped: <span className="text-[#F2F0EA]">{result.problemsSkipped}</span></p>
            </div>

            {result.warnings.length > 0 && (
              <div style={{ marginTop: '1.25rem' }}>
                <p className="text-[12px] uppercase tracking-[0.18em] text-[#C9A84C]">
                  Warnings
                </p>
                <ul
                  className="flex flex-col text-[12px] font-light leading-[1.6] text-[#7C7C78]"
                  style={{ marginTop: '0.7rem', gap: '0.4rem' }}
                >
                  {result.warnings.slice(0, 12).map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                  {result.warnings.length > 12 && (
                    <li className="text-[#5A5A56]">
                      +{result.warnings.length - 12} more
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
