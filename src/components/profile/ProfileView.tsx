'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getOverallProgress } from '@/lib/api';
import { getToken } from '@/lib/auth';
import { useSession } from '@/lib/useSession';
import { OverallProgress } from '@/types';

export default function ProfileView() {
  const { user, ready } = useSession();
  const router = useRouter();
  const [progress, setProgress] = useState<OverallProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ready) return;
    if (!user) {
      router.push('/login');
      return;
    }

    const token = getToken();
    if (!token) return;

    getOverallProgress(token)
      .then(setProgress)
      .catch(() => setProgress(null))
      .finally(() => setLoading(false));
  }, [ready, user, router]);

  if (!ready || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-[#5A5A56]">Loading profile…</p>
      </div>
    );
  }

  if (!user) return null;

  const pct =
    progress && progress.totalProblems > 0
      ? Math.round((progress.totalSolved / progress.totalProblems) * 100)
      : 0;
  const circumference = 2 * Math.PI * 52;
  const initials = (user.firstName?.[0] ?? '') + (user.lastName?.[0] ?? '');

  return (
    <section
      className="relative z-10"
      style={{ paddingLeft: '7vw', paddingRight: '7vw', paddingTop: '9rem', paddingBottom: '7rem' }}
    >
      <div className="flex flex-wrap items-center gap-8">
        <span className="flex h-[86px] w-[86px] shrink-0 items-center justify-center rounded-full bg-[#C9A84C] font-heading text-[2rem] font-bold uppercase text-[#070707]">
          {initials || user.username[0]}
        </span>

        <div className="min-w-0">
          <h1 className="font-heading text-[2.25rem] font-bold tracking-[-0.02em] text-[#F2F0EA]">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-[15px] font-light text-[#7C7C78]" style={{ marginTop: '0.5rem' }}>
            @{user.username} &middot; {user.email}
          </p>
          {user.role === 'ADMIN' && (
            <span
              className="inline-block rounded-full bg-[#C9A84C] text-[10px] font-medium uppercase tracking-[0.2em] text-[#070707]"
              style={{ marginTop: '0.9rem', padding: '0.3rem 0.8rem' }}
            >
              Admin
            </span>
          )}
        </div>
      </div>

      <div
        className="grid grid-cols-1 border-t border-[#141414] lg:grid-cols-[auto_1fr]"
        style={{ marginTop: '3.5rem', paddingTop: '3.5rem', gap: '3.5rem' }}
      >
        <div
          className="flex items-center gap-8 rounded-[6px] border border-[#1A1A1A] bg-[#0B0B0B]"
          style={{ padding: '2.25rem 2.5rem' }}
        >
          <div className="relative h-[124px] w-[124px] shrink-0">
            <svg width="124" height="124" viewBox="0 0 124 124" className="-rotate-90">
              <circle cx="62" cy="62" r="52" fill="none" stroke="#1A1A1A" strokeWidth="7" />
              <circle
                cx="62" cy="62" r="52"
                fill="none"
                stroke="#C9A84C"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - (pct / 100) * circumference}
                style={{ transition: 'stroke-dashoffset .6s ease' }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-heading text-2xl font-bold text-[#C9A84C]">
              {pct}%
            </span>
          </div>

          <div>
            <p className="font-heading text-[2.5rem] font-bold leading-none text-[#F2F0EA]">
              {progress?.totalSolved ?? 0}
              <span className="text-[#5A5A56]"> / {progress?.totalProblems ?? 0}</span>
            </p>
            <p
              className="text-[11px] uppercase tracking-[0.22em] text-[#7C7C78]"
              style={{ marginTop: '0.7rem' }}
            >
              Problems Forged
            </p>
            <p className="text-[13px] font-light text-[#5A5A56]" style={{ marginTop: '0.9rem' }}>
              {progress?.totalAttempted ?? 0} in progress
            </p>
          </div>
        </div>

        <div>
          <h2 className="font-heading text-lg font-semibold text-[#F2F0EA]">
            Progress by sheet
          </h2>

          <div className="flex flex-col" style={{ marginTop: '1.5rem', gap: '0.85rem' }}>
            {progress?.sheets.map((s) => {
              const sheetPct = s.total > 0 ? Math.round((s.solved / s.total) * 100) : 0;
              return (
                <Link
                  key={s.sheetId}
                  href={`/sheet/${s.sheetSlug}`}
                  className="group rounded-[6px] border border-[#1A1A1A] bg-[#0B0B0B] transition-colors hover:border-[#3A3120]"
                  style={{ padding: '1.35rem 1.6rem' }}
                >
                  <div className="flex items-center justify-between gap-5">
                    <span className="truncate font-heading text-[15px] font-semibold text-[#F2F0EA] transition-colors group-hover:text-[#C9A84C]">
                      {s.sheetName}
                    </span>
                    <span className="shrink-0 text-[13px] text-[#7C7C78]">
                      {s.solved} / {s.total}
                    </span>
                  </div>

                  <div
                    className="h-[3px] w-full overflow-hidden rounded-full bg-[#1A1A1A]"
                    style={{ marginTop: '1rem' }}
                  >
                    <span
                      className="block h-full rounded-full bg-[#C9A84C]"
                      style={{ width: `${sheetPct}%`, transition: 'width .5s ease' }}
                    />
                  </div>
                </Link>
              );
            })}

            {(!progress || progress.sheets.length === 0) && (
              <div
                className="rounded-[6px] border border-[#1A1A1A] bg-[#0B0B0B] text-center"
                style={{ padding: '3rem 2rem' }}
              >
                <p className="text-[#7C7C78]">No sheets yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
