'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isDark, setIsDark] = useState(true);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 border-b border-[#222222] bg-[#0A0A0A]/90 backdrop-blur-sm">
      
      {/* Logo */}
      <Link href="/" className="flex items-center gap-1">
        <span className="font-heading text-xl font-bold">
          <span className="text-white">n</span>
          <span className="text-[#C9A84C] text-sm align-super">2</span>
          <span className="text-white ml-1 tracking-widest text-sm">FORGE</span>
        </span>
      </Link>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-8">
        <Link href="/sheet" className="text-[#888888] hover:text-white text-sm transition-colors">
          Problems
        </Link>
        <Link href="#" className="text-[#888888] hover:text-white text-sm transition-colors">
          Contents
        </Link>
        <Link href="#" className="text-[#888888] hover:text-white text-sm transition-colors">
          Leaderboard
        </Link>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsDark(!isDark)}
          className="text-[#888888] hover:text-[#C9A84C] transition-colors text-lg"
        >
          {isDark ? '☀️' : '🌙'}
        </button>
        <Link
          href="/login"
          className="text-sm text-white border border-[#222222] px-4 py-2 rounded hover:border-[#C9A84C] transition-colors"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="text-sm bg-[#C9A84C] text-black px-4 py-2 rounded font-medium hover:opacity-90 transition-colors"
        >
          Register
        </Link>
      </div>
    </nav>
  );
}