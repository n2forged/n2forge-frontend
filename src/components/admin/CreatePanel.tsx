'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  createSheet, createTopic, createProblem,
  addProblemLink, tagProblem, getAllSheets, getAllTopics2,
} from '@/lib/api';
import { getToken } from '@/lib/auth';
import { Sheet, Topic } from '@/types';

const PLATFORMS = [
  'LEETCODE', 'GFG', 'HACKERRANK', 'CODEFORCES',
  'CODECHEF', 'CODING_NINJAS', 'N2FORGE',
];

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const inputCls =
  'w-full rounded-[4px] border border-[#1E1E1E] bg-[#070707] text-[14px] text-[#F2F0EA] outline-none transition-colors placeholder:text-[#3A3A36] focus:border-[#C9A84C]';
const fieldStyle = { marginTop: '0.55rem', padding: '0.75rem 0.9rem' };

function Card({ title, hint, children }: {
  title: string; hint?: string; children: React.ReactNode;
}) {
  return (
    <div className="rounded-[6px] border border-[#1A1A1A] bg-[#0B0B0B]" style={{ padding: '2rem' }}>
      <h2 className="font-heading text-lg font-semibold text-[#F2F0EA]">{title}</h2>
      {hint && (
        <p className="text-[13px] font-light leading-[1.6] text-[#5A5A56]" style={{ marginTop: '0.5rem' }}>
          {hint}
        </p>
      )}
      <div className="flex flex-col" style={{ marginTop: '1.5rem', gap: '1.1rem' }}>
        {children}
      </div>
    </div>
  );
}

export default function CreatePanel() {
  const [sheets, setSheets] = useState<Sheet[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const [s, t] = await Promise.all([getAllSheets(), getAllTopics2()]);
      setSheets(s);
      setTopics(t);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const [sheet, setSheet] = useState({ name: '', slug: '', description: '' });
  const [topic, setTopic] = useState({ name: '', slug: '' });
  const [problem, setProblem] = useState({
    name: '', slug: '', difficulty: 'EASY',
    url: '', platform: 'LEETCODE', articleUrl: '', topicId: '',
  });

  const run = async (fn: () => Promise<void>, success: string) => {
    setMsg(''); setErr('');
    if (!getToken()) { setErr('Not signed in.'); return; }
    setBusy(true);
    try {
      await fn();
      setMsg(success);
      await refresh();
    } catch (e: unknown) {
      const m = typeof e === 'object' && e !== null && 'message' in e
        ? String((e as { message: unknown }).message)
        : 'Request failed.';
      setErr(m);
    } finally {
      setBusy(false);
    }
  };

  const btn =
    'rounded-[4px] bg-[#C9A84C] font-heading text-[14px] font-semibold tracking-wide text-[#070707] transition-all hover:bg-[#E3C97A] disabled:cursor-not-allowed disabled:opacity-40';
  const btnStyle = { padding: '0.75rem 1.5rem', alignSelf: 'flex-start' as const };

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

      <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: '1.5rem' }}>

        <Card title="New problem" hint="Goes into the warehouse. Place it in a sheet from the Warehouse tab.">
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-[#7C7C78]">Name</label>
            <input
              value={problem.name}
              onChange={(e) => setProblem({ ...problem, name: e.target.value, slug: slugify(e.target.value) })}
              placeholder="Coin Change"
              className={inputCls}
              style={fieldStyle}
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-[#7C7C78]">Slug</label>
            <input
              value={problem.slug}
              onChange={(e) => setProblem({ ...problem, slug: e.target.value })}
              placeholder="coin-change"
              className={inputCls}
              style={fieldStyle}
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-[#7C7C78]">Difficulty</label>
            <select
              value={problem.difficulty}
              onChange={(e) => setProblem({ ...problem, difficulty: e.target.value })}
              className={inputCls}
              style={fieldStyle}
            >
              <option value="EASY">EASY</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HARD">HARD</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-[#7C7C78]">Topic</label>
            <select
              value={problem.topicId}
              onChange={(e) => setProblem({ ...problem, topicId: e.target.value })}
              className={inputCls}
              style={fieldStyle}
            >
              <option value="">No topic</option>
              {topics.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-[#7C7C78]">Problem URL</label>
            <input
              value={problem.url}
              onChange={(e) => setProblem({ ...problem, url: e.target.value })}
              placeholder="https://leetcode.com/problems/…"
              className={inputCls}
              style={fieldStyle}
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-[#7C7C78]">Platform</label>
            <select
              value={problem.platform}
              onChange={(e) => setProblem({ ...problem, platform: e.target.value })}
              className={inputCls}
              style={fieldStyle}
            >
              {PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-[#7C7C78]">Article URL</label>
            <input
              value={problem.articleUrl}
              onChange={(e) => setProblem({ ...problem, articleUrl: e.target.value })}
              placeholder="optional"
              className={inputCls}
              style={fieldStyle}
            />
          </div>

          <button
            disabled={busy || !problem.name || !problem.slug}
            onClick={() =>
              run(async () => {
                const token = getToken()!;
                const created = (await createProblem(
                  { name: problem.name, slug: problem.slug, difficulty: problem.difficulty },
                  token
                )) as { id: string };

                if (problem.url.trim()) {
                  await addProblemLink(
                    { problemId: created.id, url: problem.url, platform: problem.platform, isPrimary: true },
                    token
                  );
                }
                if (problem.articleUrl.trim()) {
                  await addProblemLink(
                    { problemId: created.id, url: problem.articleUrl, platform: 'N2FORGE', isPrimary: false },
                    token
                  );
                }
                if (problem.topicId) {
                  await tagProblem(created.id, problem.topicId, token);
                }

                setProblem({ ...problem, name: '', slug: '', url: '', articleUrl: '' });
              }, 'Problem added to warehouse.')
            }
            className={btn}
            style={btnStyle}
          >
            Create problem
          </button>
        </Card>

        <Card title="New topic" hint="Shared across every sheet. Create once, reuse anywhere.">
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-[#7C7C78]">Name</label>
            <input
              value={topic.name}
              onChange={(e) => setTopic({ name: e.target.value, slug: slugify(e.target.value) })}
              placeholder="Dynamic Programming"
              className={inputCls}
              style={fieldStyle}
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-[#7C7C78]">Slug</label>
            <input
              value={topic.slug}
              onChange={(e) => setTopic({ ...topic, slug: e.target.value })}
              placeholder="dynamic-programming"
              className={inputCls}
              style={fieldStyle}
            />
          </div>

          <button
            disabled={busy || !topic.name || !topic.slug}
            onClick={() =>
              run(async () => {
                await createTopic(topic, getToken()!);
                setTopic({ name: '', slug: '' });
              }, 'Topic created.')
            }
            className={btn}
            style={btnStyle}
          >
            Create topic
          </button>

          <div className="border-t border-[#161616]" style={{ paddingTop: '1.1rem' }}>
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#7C7C78]">
              Existing ({topics.length})
            </p>
            <div className="flex flex-wrap gap-1.5" style={{ marginTop: '0.85rem' }}>
              {topics.map((t) => (
                <span
                  key={t.id}
                  className="rounded-full border border-[#2A2A2A] text-[10px] uppercase tracking-[0.12em] text-[#7C7C78]"
                  style={{ padding: '0.22rem 0.6rem' }}
                >
                  {t.name}
                </span>
              ))}
            </div>
          </div>
        </Card>

        <Card title="New sheet" hint="An empty sheet. Fill it from the Warehouse tab.">
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-[#7C7C78]">Name</label>
            <input
              value={sheet.name}
              onChange={(e) => setSheet({ ...sheet, name: e.target.value, slug: slugify(e.target.value) })}
              placeholder="The Blueprint"
              className={inputCls}
              style={fieldStyle}
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-[#7C7C78]">Slug</label>
            <input
              value={sheet.slug}
              onChange={(e) => setSheet({ ...sheet, slug: e.target.value })}
              placeholder="sde-sheet"
              className={inputCls}
              style={fieldStyle}
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-[#7C7C78]">Description</label>
            <input
              value={sheet.description}
              onChange={(e) => setSheet({ ...sheet, description: e.target.value })}
              className={inputCls}
              style={fieldStyle}
            />
          </div>

          <button
            disabled={busy || !sheet.name || !sheet.slug}
            onClick={() =>
              run(async () => {
                await createSheet(sheet, getToken()!);
                setSheet({ name: '', slug: '', description: '' });
              }, 'Sheet created.')
            }
            className={btn}
            style={btnStyle}
          >
            Create sheet
          </button>

          <div className="border-t border-[#161616]" style={{ paddingTop: '1.1rem' }}>
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#7C7C78]">
              Existing ({sheets.length})
            </p>
            <div className="flex flex-col" style={{ marginTop: '0.85rem', gap: '0.5rem' }}>
              {sheets.map((s) => (
                <span key={s.id} className="text-[13px] text-[#7C7C78]">{s.name}</span>
              ))}
            </div>
          </div>
        </Card>

      </div>
    </div>
  );
}
