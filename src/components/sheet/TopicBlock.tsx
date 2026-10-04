'use client';

import { useState } from 'react';
import { TopicGroup, ProblemStatus } from '@/types';
import ProblemRow from './ProblemRow';

export default function TopicBlock({
  topic,
  index,
  statuses,
  revisions,
  notes,
  filter,
  loggedIn,
  onToggleDone,
  onToggleRevision,
  onOpenNote,
}: {
  topic: TopicGroup;
  index: number;
  statuses: Record<string, ProblemStatus>;
  revisions: Record<string, boolean>;
  notes: Record<string, string>;
  filter: 'ALL' | 'EASY' | 'MEDIUM' | 'HARD' | 'REVISION' | 'PROGRESS';
  loggedIn: boolean;
  onToggleDone: (problemId: string) => void;
  onToggleRevision: (problemId: string) => void;
  onOpenNote: (problemId: string) => void;
}) {
  const [open, setOpen] = useState(index === 0);

  const visible = topic.problems.filter((p) => {
    if (filter === 'REVISION') return revisions[p.problemId];
    if (filter === 'PROGRESS') return statuses[p.problemId] === 'ATTEMPTED';
    if (filter === 'ALL') return true;
    return p.difficulty === filter;
  });

  const solved = topic.problems.filter(
    (p) => statuses[p.problemId] === 'SOLVED'
  ).length;

  const pct = topic.problems.length
    ? Math.round((solved / topic.problems.length) * 100)
    : 0;

  if (visible.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-[8px] border border-[#1A1A1A] bg-[#0A0A0A]">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-6 text-left transition-colors hover:bg-[#0E0E0E]"
        style={{ padding: '1.35rem 1.75rem' }}
      >
        <div className="flex min-w-0 items-center gap-4">
          <h2 className="truncate font-heading text-[17px] font-semibold text-[#F2F0EA]">
            {topic.name}
          </h2>
          {loggedIn && solved === topic.problems.length && (
            <span className="shrink-0 text-[#C9A84C]">
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.3" />
                <path
                  d="M5 8.2L7 10.2L11 5.8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-5">
          {loggedIn ? (
            <div className="flex items-center gap-3">
              <span className="h-[3px] w-[52px] overflow-hidden rounded-full bg-[#1E1E1E]">
                <span
                  className="block h-full rounded-full bg-[#C9A84C]"
                  style={{ width: `${pct}%`, transition: 'width .4s ease' }}
                />
              </span>
              <span className="w-[46px] text-right text-[12px] tabular-nums text-[#5A5A56]">
                {solved}/{topic.problems.length}
              </span>
            </div>
          ) : (
            <span className="text-[12px] text-[#5A5A56]">
              {topic.problems.length}
            </span>
          )}

          <span
            className="text-[#3A3A36] transition-transform"
            style={{ transform: open ? 'rotate(180deg)' : 'none' }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2.5 4.5L6 8L9.5 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </button>

      {open && (
        <div className="border-t border-[#161616]">
          {visible.map((p) => (
            <ProblemRow
              key={p.problemId}
              problem={p}
              status={statuses[p.problemId] ?? 'NOT_STARTED'}
              revision={revisions[p.problemId] ?? false}
              hasNote={Boolean(notes[p.problemId])}
              loggedIn={loggedIn}
              onToggleDone={onToggleDone}
              onToggleRevision={onToggleRevision}
              onOpenNote={onOpenNote}
            />
          ))}
        </div>
      )}
    </div>
  );
}
