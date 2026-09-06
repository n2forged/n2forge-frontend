'use client';

import { useState } from 'react';
import { TopicGroup, ProblemStatus } from '@/types';
import ProblemRow from './ProblemRow';

export default function TopicBlock({
  topic,
  index,
  statuses,
  filter,
  loggedIn,
  onToggle,
}: {
  topic: TopicGroup;
  index: number;
  statuses: Record<string, ProblemStatus>;
  filter: 'ALL' | 'EASY' | 'MEDIUM' | 'HARD';
  loggedIn: boolean;
  onToggle: (problemId: string) => void;
}) {
  const [open, setOpen] = useState(index === 0);

  const visible = topic.problems.filter(
    (p) => filter === 'ALL' || p.difficulty === filter
  );

  const solved = topic.problems.filter(
    (p) => statuses[p.problemId] === 'SOLVED'
  ).length;

  if (visible.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-[6px] border border-[#1A1A1A] bg-[#0B0B0B]">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-6 text-left transition-colors hover:bg-[#0E0E0E]"
        style={{ padding: '1.5rem 1.75rem' }}
      >
        <div className="flex min-w-0 items-center gap-4">
          <span className="font-mono text-xs tracking-[0.18em] text-[#C9A84C]">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h2 className="truncate font-heading text-lg font-semibold text-[#F2F0EA]">
            {topic.name}
          </h2>
        </div>

        <div className="flex shrink-0 items-center gap-5">
          <span className="text-[12px] tracking-wide text-[#5A5A56]">
            {loggedIn ? `${solved} / ${topic.problems.length}` : `${topic.problems.length} problems`}
          </span>
          <span
            className="text-[#5A5A56] transition-transform"
            style={{ transform: open ? 'rotate(180deg)' : 'none' }}
          >
            ▾
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
              loggedIn={loggedIn}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}
