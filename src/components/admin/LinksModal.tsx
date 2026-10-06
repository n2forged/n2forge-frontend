'use client';

import { useState } from 'react';
import { addProblemLink, removeProblemLink } from '@/lib/api';
import { getToken } from '@/lib/auth';
import { WarehouseLink, WarehouseProblem } from '@/types';

const PLATFORMS = [
  'LEETCODE', 'GFG', 'HACKERRANK', 'CODEFORCES',
  'CODECHEF', 'CODING_NINJAS', 'N2FORGE',
];

const inputCls =
  'w-full rounded-[4px] border border-[#1E1E1E] bg-[#070707] text-[14px] text-[#F2F0EA] outline-none transition-colors placeholder:text-[#3A3A36] focus:border-[#C9A84C]';
const labelCls = 'block text-[11px] font-medium uppercase tracking-[0.18em] text-[#7C7C78]';

export default function LinksModal({
  problem,
  onClose,
  onChanged,
}: {
  problem: WarehouseProblem;
  onClose: () => void;
  onChanged: () => void;
}) {
  const [links, setLinks] = useState<WarehouseLink[]>(problem.links ?? []);
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState('LEETCODE');
  const [isPrimary, setIsPrimary] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [confirmId, setConfirmId] = useState('');

  const fail = (e: unknown, fallback: string) => {
    const m =
      typeof e === 'object' && e !== null && 'message' in e
        ? String((e as { message: unknown }).message)
        : fallback;
    setErr(m);
  };

  const add = async () => {
    const token = getToken();
    if (!token || !url.trim()) return;
    setErr('');
    setBusy(true);
    try {
      const created = (await addProblemLink(
        { problemId: problem.id, url: url.trim(), platform, isPrimary },
        token
      )) as WarehouseLink;
      setLinks((prev) => [...prev, created]);
      setUrl('');
      setIsPrimary(false);
      onChanged();
    } catch (e: unknown) {
      fail(e, 'Could not add link.');
    } finally {
      setBusy(false);
    }
  };

  const remove = async (linkId: string) => {
    const token = getToken();
    if (!token) return;
    setErr('');
    setBusy(true);
    try {
      await removeProblemLink(linkId, token);
      setLinks((prev) => prev.filter((l) => l.id !== linkId));
      setConfirmId('');
      onChanged();
    } catch (e: unknown) {
      fail(e, 'Could not remove link.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(7,7,7,.82)', padding: '1.5rem' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-[560px] rounded-[6px] border border-[#2A2A2A] bg-[#0B0B0B]"
        style={{ padding: '2rem' }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-heading text-lg font-semibold text-[#F2F0EA]">Links</h3>
        <p className="text-[13px] font-light text-[#5A5A56]" style={{ marginTop: '0.4rem' }}>
          {problem.name}
        </p>

        <div className="flex flex-col" style={{ marginTop: '1.5rem', gap: '0.6rem' }}>
          {links.length === 0 && (
            <p className="text-[13px] text-[#5A5A56]">No links yet.</p>
          )}

          {links.map((l) => (
            <div
              key={l.id}
              className="flex items-center gap-3 rounded-[4px] border border-[#1A1A1A] bg-[#070707]"
              style={{ padding: '0.7rem 0.9rem' }}
            >
              <span className="w-[108px] shrink-0 text-[10px] uppercase tracking-[0.14em] text-[#7C7C78]">
                {l.platform}
              </span>

              <a
                href={l.url}
                target="_blank"
                rel="noreferrer"
                className="min-w-0 flex-1 truncate text-[13px] text-[#9A9A96] underline-offset-2 hover:text-[#C9A84C] hover:underline"
              >
                {l.url}
              </a>

              {l.isPrimary && (
                <span className="shrink-0 text-[10px] uppercase tracking-[0.14em] text-[#C9A84C]">
                  primary
                </span>
              )}

              {confirmId === l.id ? (
                <span className="flex shrink-0 items-center gap-2">
                  <button
                    onClick={() => remove(l.id)}
                    disabled={busy}
                    className="rounded-[3px] bg-[#9E4B3F] text-[11px] font-medium text-[#F2F0EA] transition-colors hover:bg-[#B35849] disabled:opacity-40"
                    style={{ padding: '0.3rem 0.6rem' }}
                  >
                    Sure?
                  </button>
                  <button
                    onClick={() => setConfirmId('')}
                    className="text-[11px] text-[#5A5A56] hover:text-[#7C7C78]"
                  >
                    No
                  </button>
                </span>
              ) : (
                <button
                  onClick={() => setConfirmId(l.id)}
                  className="shrink-0 rounded-[3px] border border-[#2A2A2A] text-[11px] text-[#7C7C78] transition-colors hover:border-[#9E4B3F] hover:text-[#C9705F]"
                  style={{ padding: '0.3rem 0.6rem' }}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

        <div
          className="border-t border-[#161616]"
          style={{ marginTop: '1.5rem', paddingTop: '1.5rem' }}
        >
          <p className={labelCls}>Add a link</p>

          <div className="flex flex-col" style={{ marginTop: '0.9rem', gap: '0.8rem' }}>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://leetcode.com/problems/..."
              className={inputCls}
              style={{ padding: '0.7rem 0.9rem' }}
            />

            <div className="flex flex-wrap items-center gap-3">
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="rounded-[4px] border border-[#1E1E1E] bg-[#070707] text-[14px] text-[#F2F0EA] outline-none focus:border-[#C9A84C]"
                style={{ padding: '0.65rem 0.9rem' }}
              >
                {PLATFORMS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>

              <label className="flex items-center gap-2 text-[13px] text-[#7C7C78]">
                <input
                  type="checkbox"
                  checked={isPrimary}
                  onChange={(e) => setIsPrimary(e.target.checked)}
                  className="h-4 w-4 accent-[#C9A84C]"
                />
                Primary
              </label>

              <button
                onClick={add}
                disabled={busy || !url.trim()}
                className="rounded-[4px] bg-[#C9A84C] font-heading text-[13px] font-semibold text-[#070707] transition-all hover:bg-[#E3C97A] disabled:cursor-not-allowed disabled:opacity-40"
                style={{ padding: '0.65rem 1.2rem' }}
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {err && (
          <div
            className="rounded-[4px] border border-[#3A211C] bg-[#170E0C] text-[13px] font-light text-[#C9705F]"
            style={{ marginTop: '1.25rem', padding: '0.8rem 1rem' }}
          >
            {err}
          </div>
        )}

        <div style={{ marginTop: '1.75rem' }}>
          <button
            onClick={onClose}
            className="rounded-[4px] border border-[#2A2A2A] text-[14px] font-medium text-[#7C7C78] transition-colors hover:text-[#F2F0EA]"
            style={{ padding: '0.7rem 1.5rem' }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
