'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { getSheetDetail, getUserProgress, markProblem } from '@/lib/api';
import { getToken } from '@/lib/auth';
import { SheetDetail, ProblemStatus, UserProblem } from '@/types';
import TopicBlock from './TopicBlock';
import NoteModal from './NoteModal';

type Filter = 'ALL' | 'EASY' | 'MEDIUM' | 'HARD' | 'REVISION';

export default function SheetView({ slug }: { slug: string }) {
  const [sheet, setSheet] = useState<SheetDetail | null>(null);
  const [statuses, setStatuses] = useState<Record<string, ProblemStatus>>({});
  const [revisions, setRevisions] = useState<Record<string, boolean>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [noteFor, setNoteFor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<Filter>('ALL');
  const [loggedIn, setLoggedIn] = useState(false);

  const sheetRef = useRef<SheetDetail | null>(null);
  sheetRef.current = sheet;

  const notesRef = useRef<Record<string, string>>({});
  notesRef.current = notes;

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const data = await getSheetDetail(slug);
        if (cancelled) return;
        setSheet(data);

        const token = getToken();
        setLoggedIn(Boolean(token));

        if (token) {
          try {
            const progress: UserProblem[] = await getUserProgress(data.id, token);
            if (cancelled) return;
            const s: Record<string, ProblemStatus> = {};
            const r: Record<string, boolean> = {};
            const n: Record<string, string> = {};
            progress.forEach((p) => {
              s[p.problemId] = p.status;
              r[p.problemId] = p.revision;
              if (p.note) n[p.problemId] = p.note;
            });
            setStatuses(s);
            setRevisions(r);
            setNotes(n);
          } catch {
            // progress is optional
          }
        }
      } catch {
        if (!cancelled) setError('Could not load this sheet.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [slug]);

  const counts = useMemo(() => {
    if (!sheet) return { solved: 0, total: 0, revision: 0 };
    let solved = 0;
    let total = 0;
    let revision = 0;
    sheet.topics.forEach((t) =>
      t.problems.forEach((p) => {
        total += 1;
        if (statuses[p.problemId] === 'SOLVED') solved += 1;
        if (revisions[p.problemId]) revision += 1;
      })
    );
    return { solved, total, revision };
  }, [sheet, statuses, revisions]);

  const push = async (
    problemId: string,
    status: ProblemStatus,
    revision: boolean,
    note?: string
  ) => {
    const token = getToken();
    const current = sheetRef.current;
    if (!token || !current) return;
    try {
      await markProblem(
        {
          problemId,
          sheetId: current.id,
          status,
          revision,
          note: note ?? notesRef.current[problemId] ?? '',
        },
        token
      );
    } catch {
      // optimistic; a reload reconciles
    }
  };

  const toggleDone = (problemId: string) => {
    const next: ProblemStatus =
      statuses[problemId] === 'SOLVED' ? 'NOT_STARTED' : 'SOLVED';
    setStatuses((p) => ({ ...p, [problemId]: next }));
    push(problemId, next, revisions[problemId] ?? false);
  };

  const toggleRevision = (problemId: string) => {
    const next = !revisions[problemId];
    const updated = { ...revisions, [problemId]: next };
    setRevisions(updated);
    push(problemId, statuses[problemId] ?? 'NOT_STARTED', next);

    if (filter === 'REVISION' && !Object.values(updated).some(Boolean)) {
      setFilter('ALL');
    }
  };

  const saveNote = (problemId: string, note: string) => {
    setNotes((p) => {
      const next = { ...p };
      if (note) next[problemId] = note;
      else delete next[problemId];
      return next;
    });
    push(
      problemId,
      statuses[problemId] ?? 'NOT_STARTED',
      revisions[problemId] ?? false,
      note
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-[rgba(255,255,255,.25)]">Loading…</p>
      </div>
    );
  }

  if (error || !sheet) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <p className="text-lg text-[#9898A6]">{error || 'Sheet not found.'}</p>
        <Link
          href="/#sheets"
          className="text-sm text-[#FFB84D] transition-opacity hover:opacity-80"
          style={{ marginTop: '1.5rem' }}
        >
          &larr; Back to sheets
        </Link>
      </div>
    );
  }

  const visibleCount = sheet.topics.reduce((acc, t) => {
    return acc + t.problems.filter((p) => {
      if (filter === 'REVISION') return revisions[p.problemId];
      if (filter === 'ALL') return true;
      return p.difficulty === filter;
    }).length;
  }, 0);

  const pct = counts.total ? Math.round((counts.solved / counts.total) * 100) : 0;
  const circ = 2 * Math.PI * 52;

  const filters: { key: Filter; label: string }[] = [
    { key: 'ALL', label: 'All' },
    { key: 'EASY', label: 'Easy' },
    { key: 'MEDIUM', label: 'Medium' },
    { key: 'HARD', label: 'Hard' },
  ];

  return (
    <section
      className="relative z-10"
      style={{ paddingLeft: '5vw', paddingRight: '5vw', paddingTop: '8rem', paddingBottom: '7rem' }}
    >
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-start gap-14 lg:grid-cols-[minmax(0,1fr)_280px]">

        <div className="min-w-0">
          <Link
            href="/#sheets"
            className="text-[13px] font-light text-[#7A7A88] transition-colors hover:text-[#FFB84D]"
          >
            &larr; All sheets
          </Link>

          <h1
            className="font-heading text-[2.25rem] font-bold tracking-[-0.02em] text-[#F4F4F7] sm:text-[2.75rem]"
            style={{ marginTop: '1.75rem' }}
          >
            {sheet.name}
          </h1>

          <p
            className="max-w-xl text-[15px] font-light leading-[1.75] text-[#9898A6]"
            style={{ marginTop: '0.85rem' }}
          >
            {sheet.description}
          </p>

          <div
            className="flex flex-wrap items-center gap-1.5 border-t border-[rgba(255,255,255,.07)]"
            style={{ marginTop: '2.5rem', paddingTop: '1.75rem' }}
          >
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`rounded-[6px] text-[13px] font-medium transition-colors ${
                  filter === f.key
                    ? 'bg-[rgba(255,255,255,.08)] text-[#F4F4F7]'
                    : 'text-[#7A7A88] hover:text-[#9898A6]'
                }`}
                style={{ padding: '0.45rem 0.9rem' }}
              >
                {f.label}
              </button>
            ))}

            {loggedIn && counts.revision > 0 && (
              <button
                onClick={() => setFilter(filter === 'REVISION' ? 'ALL' : 'REVISION')}
                className={`flex items-center gap-1.5 rounded-[6px] text-[13px] font-medium transition-colors ${
                  filter === 'REVISION'
                    ? 'bg-[rgba(255,184,77,.14)] text-[#FFB84D]'
                    : 'text-[#7A7A88] hover:text-[#9898A6]'
                }`}
                style={{ padding: '0.45rem 0.9rem', marginLeft: '0.5rem' }}
              >
                <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M3.5 2.2h9a.8.8 0 0 1 .8.8v10.6a.4.4 0 0 1-.63.33L8 10.6l-4.67 3.33a.4.4 0 0 1-.63-.33V3a.8.8 0 0 1 .8-.8Z" />
                </svg>
                {counts.revision}
              </button>
            )}
          </div>

          <div className="flex flex-col" style={{ marginTop: '1.75rem', gap: '0.85rem' }}>
            {sheet.topics.map((topic, i) => (
              <TopicBlock
                key={topic.topicId}
                topic={topic}
                index={i}
                statuses={statuses}
                revisions={revisions}
                notes={notes}
                filter={filter}
                loggedIn={loggedIn}
                onToggleDone={toggleDone}
                onToggleRevision={toggleRevision}
                onOpenNote={setNoteFor}
              />
            ))}
          </div>

          {sheet.topics.length === 0 && (
            <div
              className="rounded-[14px] border border-[rgba(255,255,255,.07)] text-center"
              style={{ marginTop: '2rem', padding: '4rem 2rem' }}
            >
              <p className="text-[#7A7A88]">No problems in this sheet yet.</p>
            </div>
          )}

          {sheet.topics.length > 0 && visibleCount === 0 && (
            <div
              className="rounded-[14px] border border-[rgba(255,255,255,.07)] text-center"
              style={{ marginTop: '2rem', padding: '4rem 2rem' }}
            >
              <p className="text-[#7A7A88]">
                {filter === 'REVISION'
                  ? 'Nothing marked for revision.'
                  : 'No problems match this filter.'}
              </p>
              <button
                onClick={() => setFilter('ALL')}
                className="text-[13px] text-[#FFB84D] transition-opacity hover:opacity-80"
                style={{ marginTop: '1rem' }}
              >
                Show all
              </button>
            </div>
          )}
        </div>

        <aside className="w-full lg:sticky lg:top-28">
          {loggedIn ? (
            <div
              className="flex flex-col items-center rounded-[16px] border"
              style={{
                padding: '2.25rem 1.75rem',
                borderColor: 'rgba(255,255,255,.08)',
                background: 'rgba(255,255,255,.035)',
                backdropFilter: 'blur(26px) saturate(150%)',
                WebkitBackdropFilter: 'blur(26px) saturate(150%)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,.08), 0 10px 36px rgba(0,0,0,.3)',
              }}
            >
              <div className="relative h-[132px] w-[132px]">
                <svg width="132" height="132" viewBox="0 0 132 132" className="-rotate-90">
                  <defs>
                    <linearGradient id="nfWheel" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#FFB84D" />
                      <stop offset="100%" stopColor="#9B8CFF" />
                    </linearGradient>
                  </defs>
                  <circle cx="66" cy="66" r="52" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="8" />
                  <circle
                    cx="66" cy="66" r="52"
                    fill="none"
                    stroke="url(#nfWheel)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circ}
                    strokeDashoffset={circ - (pct / 100) * circ}
                    style={{ transition: 'stroke-dashoffset .6s ease' }}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-heading text-[1.75rem] font-bold tabular-nums text-[#FFB84D]">
                  {pct}%
                </span>
              </div>

              <p
                className="font-heading text-[1.5rem] font-bold leading-none tabular-nums text-[#F4F4F7]"
                style={{ marginTop: '1.5rem' }}
              >
                {counts.solved}
                <span className="font-normal text-[rgba(255,255,255,.25)]"> / {counts.total}</span>
              </p>
              <p
                className="text-[10px] uppercase tracking-[0.22em] text-[#7A7A88]"
                style={{ marginTop: '0.6rem' }}
              >
                Forged
              </p>

              {counts.revision > 0 && (
                <div
                  className="flex w-full items-center justify-between border-t border-[rgba(255,255,255,.07)]"
                  style={{ marginTop: '1.75rem', paddingTop: '1.25rem' }}
                >
                  <span className="text-[12px] text-[#7A7A88]">Marked for revision</span>
                  <span className="text-[13px] tabular-nums text-[#FFB84D]">
                    {counts.revision}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div
              className="rounded-[16px] border text-center"
              style={{
                padding: '2rem 1.75rem',
                borderColor: 'rgba(255,255,255,.08)',
                background: 'rgba(255,255,255,.035)',
                backdropFilter: 'blur(26px) saturate(150%)',
                WebkitBackdropFilter: 'blur(26px) saturate(150%)',
              }}
            >
              <p className="text-[14px] font-light leading-[1.7] text-[#9898A6]">
                <Link href="/login" className="text-[#FFB84D] hover:opacity-80">Sign in</Link>
                {' '}to track progress, mark problems for revision, and keep notes.
              </p>
            </div>
          )}
        </aside>

      </div>

      {noteFor && (
        <NoteModal
          problemName={
            sheet.topics
              .flatMap((t) => t.problems)
              .find((p) => p.problemId === noteFor)?.name ?? ''
          }
          initialNote={notes[noteFor] ?? ''}
          onSave={(note) => saveNote(noteFor, note)}
          onClose={() => setNoteFor(null)}
        />
      )}
    </section>
  );
}
