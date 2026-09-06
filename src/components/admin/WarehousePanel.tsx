'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  getWarehouse, getAllSheets, getAllTopics2,
  assignProblemToSheet, assignTopicToSheet,
  tagProblem, untagProblem,
} from '@/lib/api';
import { getToken } from '@/lib/auth';
import { WarehouseProblem, Sheet, Topic } from '@/types';

const DIFF_COLOR: Record<string, string> = {
  EASY: '#3F8A55',
  MEDIUM: '#C9A84C',
  HARD: '#9E4B3F',
};

export default function WarehousePanel() {
  const [problems, setProblems] = useState<WarehouseProblem[]>([]);
  const [sheets, setSheets] = useState<Sheet[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  const [search, setSearch] = useState('');
  const [diffFilter, setDiffFilter] = useState('ALL');
  const [topicFilter, setTopicFilter] = useState('ALL');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const [targetSheet, setTargetSheet] = useState('');
  const [targetTopic, setTargetTopic] = useState('');
  const [tagTopic, setTagTopic] = useState('');

  const refresh = useCallback(async () => {
    const token = getToken();
    if (!token) return;
    try {
      const [w, s, t] = await Promise.all([
        getWarehouse(token), getAllSheets(), getAllTopics2(),
      ]);
      setProblems(w);
      setSheets(s);
      setTopics(t);
    } catch {
      setErr('Could not load warehouse.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return problems.filter((p) => {
      if (diffFilter !== 'ALL' && p.difficulty !== diffFilter) return false;
      if (topicFilter === 'UNTAGGED' && p.topics.length > 0) return false;
      if (topicFilter !== 'ALL' && topicFilter !== 'UNTAGGED') {
        if (!p.topics.some((t) => t.id === topicFilter)) return false;
      }
      if (q && !p.name.toLowerCase().includes(q) && !p.slug.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [problems, search, diffFilter, topicFilter]);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (filtered.every((p) => selected.has(p.id))) {
      setSelected((prev) => {
        const next = new Set(prev);
        filtered.forEach((p) => next.delete(p.id));
        return next;
      });
    } else {
      setSelected((prev) => {
        const next = new Set(prev);
        filtered.forEach((p) => next.add(p.id));
        return next;
      });
    }
  };

  const addToSheet = async () => {
    setMsg(''); setErr('');
    const token = getToken();
    if (!token || !targetSheet || !targetTopic) return;

    setBusy(true);
    let ok = 0; let failed = 0;

    try {
      await assignTopicToSheet(
        { sheetId: targetSheet, topicId: targetTopic, orderIndex: 1 },
        token
      );
    } catch {
      // topic already on sheet — fine
    }

    const ids = Array.from(selected);
    for (let i = 0; i < ids.length; i++) {
      try {
        await assignProblemToSheet(
          { sheetId: targetSheet, problemId: ids[i], topicId: targetTopic, orderIndex: i + 1 },
          token
        );
        ok++;
      } catch {
        failed++;
      }
    }

    setBusy(false);
    setSelected(new Set());
    setMsg(`Added ${ok} problem${ok === 1 ? '' : 's'}${failed ? ` · ${failed} already there` : ''}.`);
  };

  const applyTag = async () => {
    setMsg(''); setErr('');
    const token = getToken();
    if (!token || !tagTopic) return;

    setBusy(true);
    for (const id of Array.from(selected)) {
      try { await tagProblem(id, tagTopic, token); } catch { /* skip */ }
    }
    setBusy(false);
    setSelected(new Set());
    setMsg('Topic applied.');
    refresh();
  };

  const removeTag = async (problemId: string, topicId: string) => {
    const token = getToken();
    if (!token) return;
    try {
      await untagProblem(problemId, topicId, token);
      refresh();
    } catch {
      setErr('Could not remove tag.');
    }
  };

  if (loading) {
    return <p className="text-[#5A5A56]">Loading warehouse…</p>;
  }

  const inputCls =
    'rounded-[4px] border border-[#1E1E1E] bg-[#070707] text-[14px] text-[#F2F0EA] outline-none transition-colors placeholder:text-[#3A3A36] focus:border-[#C9A84C]';

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
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or slug…"
          className={inputCls}
          style={{ padding: '0.7rem 1rem', minWidth: '260px', flex: '1 1 260px' }}
        />

        <select
          value={diffFilter}
          onChange={(e) => setDiffFilter(e.target.value)}
          className={inputCls}
          style={{ padding: '0.7rem 1rem' }}
        >
          <option value="ALL">All difficulties</option>
          <option value="EASY">Easy</option>
          <option value="MEDIUM">Medium</option>
          <option value="HARD">Hard</option>
        </select>

        <select
          value={topicFilter}
          onChange={(e) => setTopicFilter(e.target.value)}
          className={inputCls}
          style={{ padding: '0.7rem 1rem' }}
        >
          <option value="ALL">All topics</option>
          <option value="UNTAGGED">Untagged</option>
          {topics.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>

        <span className="text-[13px] text-[#5A5A56]">
          {filtered.length} of {problems.length}
        </span>
      </div>

      {selected.size > 0 && (
        <div
          className="rounded-[6px] border border-[#3A3120] bg-[#0F0D08]"
          style={{ marginTop: '1.25rem', padding: '1.5rem' }}
        >
          <p className="text-[13px] font-medium text-[#C9A84C]">
            {selected.size} selected
          </p>

          <div className="flex flex-wrap items-end gap-3" style={{ marginTop: '1.25rem' }}>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.18em] text-[#7C7C78]">
                Sheet
              </label>
              <select
                value={targetSheet}
                onChange={(e) => setTargetSheet(e.target.value)}
                className={inputCls}
                style={{ marginTop: '0.45rem', padding: '0.65rem 0.9rem', minWidth: '180px' }}
              >
                <option value="">Pick a sheet…</option>
                {sheets.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.18em] text-[#7C7C78]">
                Under topic
              </label>
              <select
                value={targetTopic}
                onChange={(e) => setTargetTopic(e.target.value)}
                className={inputCls}
                style={{ marginTop: '0.45rem', padding: '0.65rem 0.9rem', minWidth: '180px' }}
              >
                <option value="">Pick a topic…</option>
                {topics.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>

            <button
              onClick={addToSheet}
              disabled={busy || !targetSheet || !targetTopic}
              className="rounded-[4px] bg-[#C9A84C] font-heading text-[14px] font-semibold text-[#070707] transition-all hover:bg-[#E3C97A] disabled:cursor-not-allowed disabled:opacity-40"
              style={{ padding: '0.7rem 1.5rem' }}
            >
              {busy ? 'Adding…' : 'Add to sheet'}
            </button>

            <span className="text-[#2A2A2A]">|</span>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.18em] text-[#7C7C78]">
                Tag topic
              </label>
              <select
                value={tagTopic}
                onChange={(e) => setTagTopic(e.target.value)}
                className={inputCls}
                style={{ marginTop: '0.45rem', padding: '0.65rem 0.9rem', minWidth: '180px' }}
              >
                <option value="">Pick a topic…</option>
                {topics.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>

            <button
              onClick={applyTag}
              disabled={busy || !tagTopic}
              className="rounded-[4px] border border-[#2A2A2A] font-heading text-[14px] font-medium text-[#F2F0EA] transition-all hover:border-[#C9A84C] hover:text-[#C9A84C] disabled:cursor-not-allowed disabled:opacity-40"
              style={{ padding: '0.7rem 1.5rem' }}
            >
              Apply tag
            </button>

            <button
              onClick={() => setSelected(new Set())}
              className="text-[13px] text-[#5A5A56] transition-colors hover:text-[#7C7C78]"
              style={{ padding: '0.7rem 0.5rem' }}
            >
              Clear
            </button>
          </div>
        </div>
      )}

      <div
        className="overflow-hidden rounded-[6px] border border-[#1A1A1A] bg-[#0B0B0B]"
        style={{ marginTop: '1.5rem' }}
      >
        <div
          className="flex items-center gap-4 border-b border-[#161616] bg-[#0E0E0E]"
          style={{ padding: '0.9rem 1.5rem' }}
        >
          <input
            type="checkbox"
            checked={filtered.length > 0 && filtered.every((p) => selected.has(p.id))}
            onChange={toggleAll}
            className="h-4 w-4 shrink-0 accent-[#C9A84C]"
          />
          <span className="text-[11px] uppercase tracking-[0.18em] text-[#5A5A56]">
            Select all shown
          </span>
        </div>

        {filtered.map((p) => (
          <div
            key={p.id}
            className={`flex items-center gap-4 border-b border-[#141414] transition-colors last:border-b-0 ${
              selected.has(p.id) ? 'bg-[#0F0D08]' : 'hover:bg-[#0E0E0E]'
            }`}
            style={{ padding: '0.95rem 1.5rem' }}
          >
            <input
              type="checkbox"
              checked={selected.has(p.id)}
              onChange={() => toggle(p.id)}
              className="h-4 w-4 shrink-0 accent-[#C9A84C]"
            />

            <span className="min-w-0 flex-1 truncate text-[14px] text-[#F2F0EA]">
              {p.name}
            </span>

            <div className="flex shrink-0 flex-wrap items-center gap-1.5">
              {p.topics.map((t) => (
                <button
                  key={t.id}
                  onClick={() => removeTag(p.id, t.id)}
                  title="Click to remove"
                  className="rounded-full border border-[#2A2A2A] text-[10px] uppercase tracking-[0.12em] text-[#7C7C78] transition-colors hover:border-[#9E4B3F] hover:text-[#C9705F]"
                  style={{ padding: '0.22rem 0.6rem' }}
                >
                  {t.name}
                </button>
              ))}
              {p.topics.length === 0 && (
                <span className="text-[10px] uppercase tracking-[0.12em] text-[#3A3A36]">
                  untagged
                </span>
              )}
            </div>

            <span
              className="w-[62px] shrink-0 text-right text-[10px] font-medium uppercase tracking-[0.14em]"
              style={{ color: DIFF_COLOR[p.difficulty] ?? '#5A5A56' }}
            >
              {p.difficulty}
            </span>
          </div>
        ))}

        {filtered.length === 0 && (
          <div style={{ padding: '3rem 1.5rem' }}>
            <p className="text-center text-[#5A5A56]">No problems match those filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
