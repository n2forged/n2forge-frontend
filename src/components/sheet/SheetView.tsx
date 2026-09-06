'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { getSheetDetail, getUserProgress, markProblem } from '@/lib/api';
import { getToken } from '@/lib/auth';
import { SheetDetail, ProblemStatus, UserProblem } from '@/types';
import TopicBlock from './TopicBlock';
import ProgressRail from './ProgressRail';

export default function SheetView({ slug }: { slug: string }) {
  const [sheet, setSheet] = useState<SheetDetail | null>(null);
  const [statuses, setStatuses] = useState<Record<string, ProblemStatus>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'EASY' | 'MEDIUM' | 'HARD'>('ALL');

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const data = await getSheetDetail(slug);
        if (cancelled) return;
        setSheet(data);

        const token = getToken();
        if (token) {
          try {
            const progress: UserProblem[] = await getUserProgress(data.id, token);
            if (cancelled) return;
            const map: Record<string, ProblemStatus> = {};
            progress.forEach((p) => { map[p.problemId] = p.status; });
            setStatuses(map);
          } catch {
            // progress is optional — sheet still renders
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
    if (!sheet) return { solved: 0, attempted: 0, total: 0 };
    let solved = 0;
    let attempted = 0;
    let total = 0;
    sheet.topics.forEach((t) =>
      t.problems.forEach((p) => {
        total += 1;
        const s = statuses[p.problemId];
        if (s === 'SOLVED') solved += 1;
        else if (s === 'ATTEMPTED') attempted += 1;
      })
    );
    return { solved, attempted, total };
  }, [sheet, statuses]);

  const cycleStatus = async (problemId: string) => {
    const token = getToken();
    if (!token || !sheet) return;

    const current = statuses[problemId] ?? 'NOT_STARTED';
    const next: ProblemStatus =
      current === 'NOT_STARTED' ? 'ATTEMPTED'
      : current === 'ATTEMPTED' ? 'SOLVED'
      : 'NOT_STARTED';

    setStatuses((prev) => ({ ...prev, [problemId]: next }));

    try {
      await markProblem(
        { problemId, sheetId: sheet.id, status: next, revision: false, note: '' },
        token
      );
    } catch {
      setStatuses((prev) => ({ ...prev, [problemId]: current }));
    }
  };

  if (loading) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ paddingLeft: '7vw', paddingRight: '7vw' }}
      >
        <p className="text-[#5A5A56]">Loading sheet…</p>
      </div>
    );
  }

  if (error || !sheet) {
    return (
      <div
        className="flex min-h-screen flex-col items-center justify-center"
        style={{ paddingLeft: '7vw', paddingRight: '7vw' }}
      >
        <p className="text-lg text-[#7C7C78]">{error || 'Sheet not found.'}</p>
        <Link
          href="/#sheets"
          className="text-sm text-[#C9A84C] transition-opacity hover:opacity-80"
          style={{ marginTop: '1.5rem' }}
        >
          &larr; Back to sheets
        </Link>
      </div>
    );
  }

  const loggedIn = Boolean(getToken());

  return (
    <section
      className="relative z-10"
      style={{ paddingLeft: '7vw', paddingRight: '7vw', paddingTop: '9rem', paddingBottom: '7rem' }}
    >
      <Link
        href="/#sheets"
        className="text-sm font-light text-[#7C7C78] transition-colors hover:text-[#C9A84C]"
      >
        &larr; All sheets
      </Link>

      <div
        className="flex flex-wrap items-end justify-between gap-8"
        style={{ marginTop: '2.5rem' }}
      >
        <div className="min-w-0">
          <h1 className="font-heading text-[2.5rem] font-bold tracking-[-0.02em] text-[#F2F0EA] sm:text-[3.25rem]">
            {sheet.name}
          </h1>
          <p
            className="max-w-xl text-[15px] font-light leading-[1.75] text-[#7C7C78]"
            style={{ marginTop: '1rem' }}
          >
            {sheet.description}
          </p>
        </div>

        <ProgressRail
          solved={counts.solved}
          attempted={counts.attempted}
          total={counts.total}
          loggedIn={loggedIn}
        />
      </div>

      <div
        className="flex flex-wrap items-center gap-2 border-t border-[#141414]"
        style={{ marginTop: '3rem', paddingTop: '2rem' }}
      >
        {(['ALL', 'EASY', 'MEDIUM', 'HARD'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-[4px] border text-[12px] font-medium uppercase tracking-[0.14em] transition-colors ${
              filter === f
                ? 'border-[#C9A84C] text-[#C9A84C]'
                : 'border-[#1E1E1E] text-[#5A5A56] hover:border-[#2A2A2A] hover:text-[#7C7C78]'
            }`}
            style={{ padding: '0.55rem 1.1rem' }}
          >
            {f === 'ALL' ? 'All' : f.charAt(0) + f.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      <div className="flex flex-col" style={{ marginTop: '3rem', gap: '1.25rem' }}>
        {sheet.topics.map((topic, i) => (
          <TopicBlock
            key={topic.topicId}
            topic={topic}
            index={i}
            statuses={statuses}
            filter={filter}
            loggedIn={loggedIn}
            onToggle={cycleStatus}
          />
        ))}
      </div>

      {sheet.topics.length === 0 && (
        <div
          className="rounded-[6px] border border-[#1A1A1A] bg-[#0B0B0B] text-center"
          style={{ marginTop: '3rem', padding: '4rem 2rem' }}
        >
          <p className="text-[#7C7C78]">No problems in this sheet yet.</p>
        </div>
      )}
    </section>
  );
}
