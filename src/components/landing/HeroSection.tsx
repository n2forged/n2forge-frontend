'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import LogoAnimation from './LogoAnimation';

export default function HeroSection() {
  const [animationComplete, setAnimationComplete] = useState(false);

  return (
    <section className="min-h-screen flex items-center justify-center px-8 pt-20">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left side — Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: animationComplete ? 1 : 0, x: animationComplete ? 0 : -40 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col gap-8"
        >
          <div className="flex flex-col gap-2">
            <h1 className="font-heading text-6xl lg:text-7xl font-bold leading-none tracking-tight">
              <span className="text-[#C9A84C]">FORGE</span>
              <span className="text-white"> IDEAS</span>
            </h1>
            <h1 className="font-heading text-6xl lg:text-7xl font-bold leading-none tracking-tight">
              <span className="text-white">INTO </span>
              <span className="text-[#C9A84C]">SKILLS.</span>
            </h1>
          </div>

          <p className="text-[#888888] text-lg leading-relaxed max-w-md">
            Master problem-solving through structured learning,
            patterns, and deliberate practice.
          </p>

          <div className="flex items-center gap-4">
            <Link
              href="/sheet"
              className="flex items-center gap-2 bg-[#C9A84C] text-black px-6 py-3 rounded font-heading font-semibold text-sm tracking-wide hover:opacity-90 transition-all hover:scale-105"
            >
              Start Forging →
            </Link>
            <Link
              href="/sheet"
              className="flex items-center gap-2 border border-[#333] text-white px-6 py-3 rounded font-heading font-semibold text-sm tracking-wide hover:border-[#C9A84C] transition-all"
            >
              Explore the Sheet
            </Link>
          </div>

          <div className="flex items-center gap-8 pt-4 border-t border-[#222]">
            <div>
              <p className="font-heading text-2xl font-bold text-[#C9A84C]">10k+</p>
              <p className="text-[#888888] text-xs tracking-widest uppercase">Blacksmiths</p>
            </div>
            <div>
              <p className="font-heading text-2xl font-bold text-[#C9A84C]">500+</p>
              <p className="text-[#888888] text-xs tracking-widest uppercase">Blueprints</p>
            </div>
            <div>
              <p className="font-heading text-2xl font-bold text-[#C9A84C]">100%</p>
              <p className="text-[#888888] text-xs tracking-widest uppercase">Free</p>
            </div>
          </div>
        </motion.div>

        {/* Right side — Animation */}
        <div className="flex items-center justify-center">
          <LogoAnimation onComplete={() => setAnimationComplete(true)} />
        </div>

      </div>
    </section>
  );
}