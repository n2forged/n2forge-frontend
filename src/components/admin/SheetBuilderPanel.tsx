'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  getAllSheets, getSheetDetail,
  removeProblemFromSheet, reorderSheetProblems,
} from '@/lib/api';
import { getToken } from '@/lib/auth';
import { Sheet, SheetDetail } from '@/types';

const DIFF_COLOR: Record<string, string> = {
  EASY: '#3F8A55',
  MEDIUM: '#C9A84C',
  HARD: '#9E4B3F',
};

export default function SheetBuilderPanel() {
  const [sheets, setSheets] = useState<Sheet[]>([]);
  const [slug, setSlug] = useState('');
  const [detail, setDetail] = useState<SheetDetail | null>(null);
  const [dirty, setDirty] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [confirmKey, setConfirmKey] = useState('');

  useEffect(() => {
    getAllSheets().then(setSheets).catch(() => setErr('Could not load sheets.'));
  }, []);

  const load = useCallback(async (s: string) => {
    if (!s) {
      setDetail(null);
      return;
    }
    setLoading(true);
    setErr('');
    setDirty(new Set());
    setConfirmKey('');
    try {
      setDetail(await getSheetDetail(s));
    } catch {
      setErr('Could not load that sheet.');
      setDetail(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(slug); }, [slug, load]);

  const move = (topicId: string, index: number, dir: -1 | 1) => {
    setMsg('');
    setDetail((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        topics: prev.topics.map((tg) => {
          if (tg.topicId !== topicId) return tg;
          const arr = [...tg.problems];
          const j = index + dir;
          if (j < 0 || j >= arr.length) return tg;
          const tmp = arr[index];
          arr[index] = arr[j];
          arr[j] = tmp;
          return { ...tg, problems: arr };
        }),
      };
    });
    setDirty((prev) => new Set(prev).add(topicId));
  };

  const saveOrder = async (topicId: string) => {
    const token = getToken();
    if (!token || !detail) return;
    const group = detail.topics.find((t) => t.topicId === topicId);
    if (!group) return;

    setMsg(''); setErr(''); setBusy(true);
    try {
      await reorderSheetProblems(
        detail.id,
        topicId,
        group.problems.map((p) => p.problemId),
        token
      );
      setDirty((prev) => {
        const next = new Set(prev);
        next.delete(topicId);
        return next;
      });
      setMsg(`Order saved for ${group.name}.`);
    } catch (e: unknown) {
      const m =
        typeof e === 'object' && e !== null && 'message' in e
          ? String((e as { message: unknown }).message)
          : 'Could not save order.';
      setErr(m);
    } finally {
      setBusy(false);
    }
  };

  const remove = async (problemId: string) => {
    const token = getToken();
    if (!token || !detail) return;

    setMsg(''); setErr(''); setBusy(true);
    try {
      await removeProblemFromSheet(detail.id, problemId, token);
      await load(slug);
      setMsg('Removed from sheet. Still in the warehouse.');
    } catch (e: unknown) {
      const m =
        typeof e === 'object' && e !== null && 'message' in e
          ? String((e as { message: unknown }).message)
          : 'Could not remove.';
      setErr(m);
    } finally {
      setBusy(false);
    }
  };

  const inputCls =
    'rounded-[4px] border border-[#1E1E1E] bg-[#070707] text-[14px] text-[#F2F0EA] outline-none transition-colors focus:border-[#C9A84C]';

  return (
    <div>
      {(msg || err) && (
        <div
          className={`rounded-[4px] border text-[14px] font-light ${
            err
              ? 'border-[#3A211C] bg-[#170E0C] text-[#C9705F]'
              : 'border-[#243020] bg-[#0B0F0A] text-[#7FA86B]'
          }`}
          style={{ marginBottom: '1.5rem', padding: '0.85rem 1rem' }}
        >
          {err || msg}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <label className="text-[11px] uppercase tracking-[0.18em] text-[#7C7C78]" htmlFor="sb-sheet">
          Sheet
        </label>
        <select
          id="sb-sheet"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className={inputCls}
          style={{ padding: '0.7rem 1rem', minWidth: '240px' }}
        >
          <option value="">Pick a sheet…</option>
          {sheets.map((s) => (
            <option key={s.id} value={s.slug}>{s.name}</option>
          ))}
        </select>

        {detail && (
          <span className="text-[13px] text-[#5A5A56]">
            {detail.totalProblems} problems · {detail.topics.length} topics
          </span>
        )}
      </div>

      {loading && (
        <p className="text-[#5A5A56]" style={{ marginTop: '2rem' }}>Loading sheet…</p>
      )}

      {!loading && !detail && (
        <p className="text-[#5A5A56]" style={{ marginTop: '2rem' }}>
          Pick a sheet to reorder or remove its problems.
        </p>
      )}

      {!loading && detail && detail.topics.length === 0 && (
        <p className="text-[#5A5A56]" style={{ marginTop: '2rem' }}>
          This sheet has no topics yet. Add problems from the Warehouse tab first.
        </p>
      )}

      {!loading && detail && detail.topics.map((tg) => {
        const isDirty = dirty.has(tg.topicId);
        return (
          <div
            key={tg.topicId}
            className="overflow-hidden rounded-[6px] border border-[#1A1A1A] bg-[#0B0B0B]"
            style={{ marginTop: '1.5rem' }}
          >
            <div
              className="flex flex-wrap items-center gap-3 border-b border-[#161616] bg-[#0E0E0E]"
              style={{ padding: '0.9rem 1.5rem' }}
            >
              <span className="font-heading text-[14px] font-semibold text-[#F2F0EA]">
                {tg.name}
              </span>
              <span className="text-[11px] uppercase tracking-[0.16em] text-[#5A5A56]">
                {tg.problems.length}
              </span>

              {isDirty && (
                <span className="flex items-center gap-2" style={{ marginLeft: 'auto' }}>
                  <span className="text-[12px] text-[#C9A84C]">unsaved order</span>
                  <button
                    onClick={() => saveOrder(tg.topicId)}
                    disabled={busy}
                    className="rounded-[4px] bg-[#C9A84C] text-[12px] font-semibold text-[#070707] transition-all hover:bg-[#E3C97A] disabled:opacity-40"
                    style={{ padding: '0.45rem 0.9rem' }}
                  >
                    Save order
                  </button>
                  <button
                    onClick={() => load(slug)}
                    disabled={busy}
                    className="text-[12px] text-[#5A5A56] transition-colors hover:text-[#7C7C78] disabled:opacity-40"
                  >
                    Discard
                  </button>
                </span>
              )}
            </div>

            {tg.problems.map((p, i) => {
              const key = tg.topicId + ':' + p.problemId;
              return (
                <div
                  key={p.problemId}
                  className="flex items-center gap-4 border-b border-[#141414] transition-colors last:border-b-0 hover:bg-[#0E0E0E]"
                  style={{ padding: '0.8rem 1.5rem' }}
                >
                  <span className="w-[26px] shrink-0 text-[12px] tabular-nums text-[#3A3A36]">
                    {i + 1}
                  </span>

                  <span className="min-w-0 flex-1 truncate text-[14px] text-[#F2F0EA]">
                    {p.name}
                  </span>

                  <span
                    className="w-[62px] shrink-0 text-right text-[10px] font-medium uppercase tracking-[0.14em]"
                    style={{ color: DIFF_COLOR[p.difficulty] ?? '#5A5A56' }}
                  >
                    {p.difficulty}
                  </span>

                  <span className="flex shrink-0 items-center gap-1">
                    <button
                      onClick={() => move(tg.topicId, i, -1)}
                      disabled={i === 0 || busy}
                      aria-label={'Move ' + p.name + ' up'}
                      className="rounded-[3px] border border-[#2A2A2A] text-[13px] leading-none text-[#7C7C78] transition-colors hover:border-[#C9A84C] hover:text-[#C9A84C] disabled:opacity-25"
                      style={{ padding: '0.4rem 0.55rem' }}
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => move(tg.topicId, i, 1)}
                      disabled={i === tg.problems.length - 1 || busy}
                      aria-label={'Move ' + p.name + ' down'}
                      className="rounded-[3px] border border-[#2A2A2A] text-[13px] leading-none text-[#7C7C78] transition-colors hover:border-[#C9A84C] hover:text-[#C9A84C] disabled:opacity-25"
                      style={{ padding: '0.4rem 0.55rem' }}
                    >
                      ↓
                    </button>
                  </span>

                  {confirmKey === key ? (
                    <span className="flex shrink-0 items-center gap-2">
                      <button
                        onClick={() => remove(p.problemId)}
                        disabled={busy}
                        className="rounded-[3px] bg-[#9E4B3F] text-[11px] font-medium text-[#F2F0EA] transition-colors hover:bg-[#B35849] disabled:opacity-40"
                        style={{ padding: '0.35rem 0.65rem' }}
                      >
                        Sure?
                      </button>
                      <button
                        onClick={() => setConfirmKey('')}
                        className="text-[11px] text-[#5A5A56] hover:text-[#7C7C78]"
                      >
                        No
                      </button>
                    </span>
                  ) : (
                    <button
                      onClick={() => setConfirmKey(key)}
                      disabled={isDirty || busy}
                      title={isDirty ? 'Save or discard the order first' : 'Remove from this sheet'}
                      className="shrink-0 rounded-[3px] border border-[#2A2A2A] text-[11px] text-[#7C7C78] transition-colors hover:border-[#9E4B3F] hover:text-[#C9705F] disabled:opacity-25"
                      style={{ padding: '0.35rem 0.65rem' }}
                    >
                      Remove
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
