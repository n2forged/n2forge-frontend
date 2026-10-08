'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useSession } from '@/lib/useSession';

export default function Navbar() {
  const { user, ready, logout } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const signOut = () => {
    logout();
    setOpen(false);
    router.push('/');
  };

  const initials = user
    ? (user.firstName?.[0] ?? '') + (user.lastName?.[0] ?? '')
    : '';

  return (
    <nav className="fixed inset-x-0 top-0 z-50">
      <div
        className="mx-auto flex max-w-[1240px] items-center gap-8 rounded-[16px] border border-white/10"
        style={{
          marginTop: '14px',
          marginLeft: 'clamp(22px,5vw,64px)',
          marginRight: 'clamp(22px,5vw,64px)',
          padding: '13px 20px 13px 22px',
          background: 'rgba(17,23,34,.46)',
          backdropFilter: 'blur(22px) saturate(150%)',
          WebkitBackdropFilter: 'blur(22px) saturate(150%)',
          boxShadow: '0 1px 0 rgba(255,255,255,.06) inset, 0 18px 50px rgba(0,0,0,.35)',
        }}
      >
        <Link href="/" className="flex items-baseline text-[17px] font-medium tracking-[-0.01em]">
          <span className="text-[#F5F5F0]">n</span>
          <span className="align-super text-[10px] text-[#E8B95B]">2</span>
          <span className="ml-[7px] text-[12px] font-normal tracking-[0.2em] text-[#A7ADBB]">
            FORGE
          </span>
        </Link>

        <div className="ml-auto hidden items-center gap-7 md:flex">
          <Link
            href="/#sheets"
            className="text-sm text-[#A7ADBB] transition-colors hover:text-[#F5F5F0]"
          >
            Sheets
          </Link>
          <Link
            href="/mock-interview"
            className="flex items-center gap-2 text-sm text-[#A7ADBB] transition-colors hover:text-[#F5F5F0]"
          >
            Mock Interview
            <span
              className="rounded-full border border-[#E8B95B]/30 text-[9.5px] tracking-[0.1em] text-[#E8B95B]"
              style={{ padding: '2px 7px' }}
            >
              Soon
            </span>
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-3 md:ml-0">
          {!ready ? (
            <span className="h-[38px] w-[92px]" />
          ) : user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setOpen((o) => !o)}
                className="flex items-center gap-3 rounded-[10px] border border-white/10 transition-colors hover:border-white/20"
                style={{ padding: '0.35rem 0.7rem 0.35rem 0.35rem', background: 'rgba(255,255,255,.04)' }}
              >
                <span className="flex h-[27px] w-[27px] items-center justify-center rounded-full bg-[#E8B95B] text-[12px] font-semibold uppercase text-[#0B0D12]">
                  {initials || user.username[0]}
                </span>
                <span className="text-sm text-[#F5F5F0]">{user.username}</span>
                <span className="text-[10px] text-[#6E7585]">&#9662;</span>
              </button>

              {open && (
                <div
                  className="absolute right-0 z-50 w-[200px] overflow-hidden rounded-[14px] border border-white/10"
                  style={{
                    marginTop: '0.6rem',
                    background: 'rgba(17,23,34,.95)',
                    backdropFilter: 'blur(22px)',
                    WebkitBackdropFilter: 'blur(22px)',
                    boxShadow: '0 24px 60px rgba(0,0,0,.5)',
                  }}
                >
                  <div className="border-b border-white/[.06]" style={{ padding: '0.9rem 1rem' }}>
                    <p className="truncate text-[13px] text-[#F5F5F0]">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="truncate text-[12px] text-[#6E7585]" style={{ marginTop: '0.2rem' }}>
                      {user.email}
                    </p>
                  </div>

                  <Link
                    href="/profile"
                    onClick={() => setOpen(false)}
                    className="block text-[13px] text-[#A7ADBB] transition-colors hover:bg-white/[.04] hover:text-[#F5F5F0]"
                    style={{ padding: '0.75rem 1rem' }}
                  >
                    Profile
                  </Link>

                  {user.role === 'ADMIN' && (
                    <Link
                      href="/admin"
                      onClick={() => setOpen(false)}
                      className="block text-[13px] text-[#A7ADBB] transition-colors hover:bg-white/[.04] hover:text-[#F5F5F0]"
                      style={{ padding: '0.75rem 1rem' }}
                    >
                      Admin
                    </Link>
                  )}

                  <button
                    onClick={signOut}
                    className="block w-full border-t border-white/[.06] text-left text-[13px] text-[#C98A7E] transition-colors hover:bg-white/[.04] hover:text-[#E0A094]"
                    style={{ padding: '0.75rem 1rem' }}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-[#A7ADBB] transition-colors hover:text-[#F5F5F0]"
                style={{ padding: '0.5rem 0.75rem' }}
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="rounded-[10px] border border-white/10 text-sm text-[#F5F5F0] transition-colors hover:border-white/20"
                style={{ padding: '9px 18px', background: 'rgba(255,255,255,.04)' }}
              >
                Create account
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
