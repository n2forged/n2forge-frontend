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
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-[#141414] bg-[#070707]/85 backdrop-blur-md">
      <div
        className="flex w-full items-center justify-between"
        style={{ paddingLeft: '7vw', paddingRight: '7vw', paddingTop: '1.25rem', paddingBottom: '1.25rem' }}
      >
        <Link href="/" className="font-heading text-xl font-bold tracking-tight">
          <span className="text-[#F2F0EA]">n</span>
          <span className="align-super text-[12px] text-[#C9A84C]">2</span>
          <span className="ml-1.5 text-[14px] tracking-[0.22em] text-[#F2F0EA]">FORGE</span>
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          <Link href="/#sheets" className="text-sm font-medium tracking-wide text-[#7C7C78] transition-colors hover:text-[#F2F0EA]">
            Sheets
          </Link>
          <Link href="/sheet/complete-dsa" className="text-sm font-medium tracking-wide text-[#7C7C78] transition-colors hover:text-[#F2F0EA]">
            Problems
          </Link>
          <Link href="/#roadmap" className="text-sm font-medium tracking-wide text-[#7C7C78] transition-colors hover:text-[#F2F0EA]">
            Roadmap
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {!ready ? (
            <span className="h-[38px] w-[92px]" />
          ) : user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setOpen((o) => !o)}
                className="flex items-center gap-3 rounded-[4px] border border-[#1E1E1E] transition-colors hover:border-[#2A2A2A]"
                style={{ padding: '0.4rem 0.7rem 0.4rem 0.4rem' }}
              >
                <span className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#C9A84C] font-heading text-[12px] font-bold uppercase text-[#070707]">
                  {initials || user.username[0]}
                </span>
                <span className="text-sm font-medium text-[#F2F0EA]">{user.username}</span>
                <span className="text-[10px] text-[#5A5A56]">&#9662;</span>
              </button>

              {open && (
                <div
                  className="absolute right-0 z-50 w-[190px] overflow-hidden rounded-[6px] border border-[#1E1E1E] bg-[#0B0B0B]"
                  style={{ marginTop: '0.6rem' }}
                >
                  <div className="border-b border-[#161616]" style={{ padding: '0.9rem 1rem' }}>
                    <p className="truncate text-[13px] text-[#F2F0EA]">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="truncate text-[12px] text-[#5A5A56]" style={{ marginTop: '0.2rem' }}>
                      {user.email}
                    </p>
                  </div>

                  <Link
                    href="/profile"
                    onClick={() => setOpen(false)}
                    className="block text-[13px] text-[#7C7C78] transition-colors hover:bg-[#0F0F0F] hover:text-[#F2F0EA]"
                    style={{ padding: '0.75rem 1rem' }}
                  >
                    Profile
                  </Link>

                  {user.role === 'ADMIN' && (
                    <Link
                      href="/admin"
                      onClick={() => setOpen(false)}
                      className="block text-[13px] text-[#7C7C78] transition-colors hover:bg-[#0F0F0F] hover:text-[#F2F0EA]"
                      style={{ padding: '0.75rem 1rem' }}
                    >
                      Admin
                    </Link>
                  )}

                  <button
                    onClick={signOut}
                    className="block w-full border-t border-[#161616] text-left text-[13px] text-[#9E6B5F] transition-colors hover:bg-[#0F0F0F] hover:text-[#C9705F]"
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
                className="text-sm font-medium text-[#7C7C78] transition-colors hover:text-[#F2F0EA]"
                style={{ padding: '0.5rem 1rem' }}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-[4px] border border-[#2A2A2A] text-sm font-medium text-[#F2F0EA] transition-all hover:border-[#C9A84C] hover:text-[#C9A84C]"
                style={{ padding: '0.6rem 1.25rem' }}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
