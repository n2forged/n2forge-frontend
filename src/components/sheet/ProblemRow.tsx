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
  loggedIn,
  onToggle,
}: {
  problem: SheetProblemDetail;
  status: ProblemStatus;
  loggedIn: boolean;
  onToggle: (problemId: string) => void;
}) {
  const primary =
    problem.links.find((l) => l.isPrimary) ?? problem.links[0] ?? null;

  return (
    <div
      className="flex items-center gap-5 border-b border-[#141414] transition-colors last:border-b-0 hover:bg-[#0E0E0E]"
      style={{ padding: '1.1rem 1.75rem' }}
    >
      <button
        onClick={() => loggedIn && onToggle(problem.problemId)}
        disabled={!loggedIn}
        title={loggedIn ? 'Click to change status' : 'Sign in to track'}
        className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border-2 transition-all ${
          status === 'SOLVED'
            ? 'border-[#C9A84C] bg-[#C9A84C]'
            : status === 'ATTEMPTED'
            ? 'border-[#C9A84C] bg-transparent'
            : 'border-[#2A2A2A] bg-transparent'
        } ${loggedIn ? 'cursor-pointer hover:border-[#C9A84C]' : 'cursor-default'}`}
      >
        {status === 'SOLVED' && (
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 6.5L4.5 9L10 3"
              stroke="#070707"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {status === 'ATTEMPTED' && (
          <span className="h-[7px] w-[7px] rounded-full bg-[#C9A84C]" />
        )}
      </button>

      <span
        className={`min-w-0 flex-1 truncate text-[15px] ${
          status === 'SOLVED' ? 'text-[#7C7C78]' : 'text-[#F2F0EA]'
        }`}
      >
        {problem.name}
      </span>

      <span
        className="shrink-0 text-[11px] font-medium uppercase tracking-[0.16em]"
        style={{ color: DIFF_COLOR[problem.difficulty] ?? '#5A5A56' }}
      >
        {problem.difficulty}
      </span>

      {primary ? (
        <a
          href={primary.url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-[4px] border border-[#1E1E1E] text-[12px] font-medium tracking-wide text-[#7C7C78] transition-colors hover:border-[#C9A84C] hover:text-[#C9A84C]"
          style={{ padding: '0.4rem 0.9rem' }}
        >
          Solve &#8599;
        </a>
      ) : (
        <span
          className="shrink-0 text-[12px] text-[#3A3A36]"
          style={{ padding: '0.4rem 0.9rem' }}
        >
          No link
        </span>
      )}
    </div>
  );
}
