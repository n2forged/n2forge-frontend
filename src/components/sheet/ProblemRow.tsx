'use client';

import { SheetProblemDetail, ProblemStatus } from '@/types';

const DIFF_COLOR: Record<string, string> = {
  EASY: '#3F8A55',
  MEDIUM: '#C9A84C',
  HARD: '#9E4B3F',
};

export default function ProblemRow({
  problem,
  status,
  revision,
  hasNote,
  loggedIn,
  onToggleDone,
  onToggleRevision,
  onOpen,
  onOpenNote,
}: {
  problem: SheetProblemDetail;
  status: ProblemStatus;
  revision: boolean;
  hasNote: boolean;
  loggedIn: boolean;
  onToggleDone: (problemId: string) => void;
  onToggleRevision: (problemId: string) => void;
  onOpen: (problemId: string) => void;
  onOpenNote: (problemId: string) => void;
}) {
  const primary =
    problem.links.find((l) => l.isPrimary) ?? problem.links[0] ?? null;

  const done = status === 'SOLVED';
  const inProgress = status === 'ATTEMPTED';

  return (
    <div
      className="group relative flex items-center gap-4 border-b border-[#141414] transition-colors last:border-b-0 hover:bg-[#0E0E0E]"
      style={{ padding: '0.95rem 1.5rem 0.95rem 1.75rem' }}
    >
      {inProgress && (
        <span
          className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#C9A84C]"
          aria-hidden="true"
        />
      )}

      <button
        onClick={() => loggedIn && onToggleDone(problem.problemId)}
        disabled={!loggedIn}
        aria-label={done ? 'Mark as not done' : 'Mark as done'}
        className={`flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-[5px] border transition-all ${
          done
            ? 'border-[#C9A84C] bg-[#C9A84C]'
            : 'border-[#2E2E2E] bg-transparent'
        } ${loggedIn ? 'cursor-pointer hover:border-[#C9A84C]' : 'cursor-default opacity-50'}`}
      >
        {done && (
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 6.3L4.6 8.9L10 3.2"
              stroke="#070707"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      <span
        className={`min-w-0 flex-1 truncate text-[15px] transition-colors ${
          done ? 'text-[#5A5A56]' : 'text-[#F2F0EA]'
        }`}
      >
        {problem.name}
      </span>

      <span
        className="w-[58px] shrink-0 text-right text-[10px] font-medium uppercase tracking-[0.14em]"
        style={{ color: DIFF_COLOR[problem.difficulty] ?? '#5A5A56' }}
      >
        {problem.difficulty}
      </span>

      <button
        onClick={() => loggedIn && onOpenNote(problem.problemId)}
        disabled={!loggedIn}
        aria-label={hasNote ? 'Edit note' : 'Add note'}
        className={`shrink-0 transition-all ${
          hasNote
            ? 'text-[#C9A84C] opacity-100'
            : 'text-[#3A3A36] opacity-0 group-hover:opacity-100 hover:text-[#7C7C78]'
        } ${loggedIn ? 'cursor-pointer' : 'cursor-default'}`}
        style={{ padding: '0.25rem' }}
      >
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
          <path
            d="M2.6 3.4a.8.8 0 0 1 .8-.8h9.2a.8.8 0 0 1 .8.8v6.2a.8.8 0 0 1-.8.8H6.2L3.4 13V10.4h-.8Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
            fill={hasNote ? 'currentColor' : 'none'}
            fillOpacity={hasNote ? 0.18 : 0}
          />
        </svg>
      </button>

      <button
        onClick={() => loggedIn && onToggleRevision(problem.problemId)}
        disabled={!loggedIn}
        aria-label={revision ? 'Remove from revision' : 'Mark for revision'}
        className={`shrink-0 transition-all ${
          revision
            ? 'text-[#C9A84C] opacity-100'
            : 'text-[#3A3A36] opacity-0 group-hover:opacity-100 hover:text-[#7C7C78]'
        } ${loggedIn ? 'cursor-pointer' : 'cursor-default'}`}
        style={{ padding: '0.25rem' }}
      >
        <svg width="15" height="15" viewBox="0 0 16 16" fill={revision ? 'currentColor' : 'none'}>
          <path
            d="M3.5 2.2h9a.8.8 0 0 1 .8.8v10.6a.4.4 0 0 1-.63.33L8 10.6l-4.67 3.33a.4.4 0 0 1-.63-.33V3a.8.8 0 0 1 .8-.8Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {primary ? (
        <a
          href={primary.url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-[4px] text-[13px] font-medium text-[#5A5A56] transition-colors hover:text-[#C9A84C]"
          style={{ padding: '0.35rem 0.5rem' }}
        >
          Solve &#8599;
        </a>
      ) : (
        <span
          className="shrink-0 text-[13px] text-[#2E2E2A]"
          style={{ padding: '0.35rem 0.5rem' }}
        >
          &mdash;
        </span>
      )}
    </div>
  );
}
