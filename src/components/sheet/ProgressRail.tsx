'use client';

import Link from 'next/link';

export default function ProgressRail({
  solved,
  attempted,
  total,
  loggedIn,
}: {
  solved: number;
  attempted: number;
  total: number;
  loggedIn: boolean;
}) {
  if (!loggedIn) {
    return (
      <div
        className="rounded-[6px] border border-[#1A1A1A] bg-[#0B0B0B]"
        style={{ padding: '1.5rem 1.75rem' }}
      >
        <p className="text-[13px] font-light text-[#7C7C78]">
          <Link href="/login" className="text-[#C9A84C] hover:opacity-80">Sign in</Link>
          {' '}to track progress
        </p>
      </div>
    );
  }

  const pct = total > 0 ? Math.round((solved / total) * 100) : 0;
  const circumference = 2 * Math.PI * 34;

  return (
    <div
      className="flex items-center gap-6 rounded-[6px] border border-[#1A1A1A] bg-[#0B0B0B]"
      style={{ padding: '1.5rem 1.75rem' }}
    >
      <div className="relative h-[84px] w-[84px] shrink-0">
        <svg width="84" height="84" viewBox="0 0 84 84" className="-rotate-90">
          <circle cx="42" cy="42" r="34" fill="none" stroke="#1A1A1A" strokeWidth="5" />
          <circle
            cx="42" cy="42" r="34"
            fill="none"
            stroke="#C9A84C"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (pct / 100) * circumference}
            style={{ transition: 'stroke-dashoffset .5s ease' }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-heading text-lg font-bold text-[#C9A84C]">
          {pct}%
        </span>
      </div>

      <div>
        <p className="font-heading text-2xl font-bold text-[#F2F0EA]">
          {solved}
          <span className="text-[#5A5A56]"> / {total}</span>
        </p>
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#7C7C78]" style={{ marginTop: '0.4rem' }}>
          Forged
        </p>
        {attempted > 0 && (
          <p className="text-[12px] font-light text-[#5A5A56]" style={{ marginTop: '0.5rem' }}>
            {attempted} in progress
          </p>
        )}
      </div>
    </div>
  );
}
