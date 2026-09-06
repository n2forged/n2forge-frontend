'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import LogoAnimation from './LogoAnimation';

export default function HeroSection() {
  return (
    <section
      className="relative z-10 flex min-h-screen items-center"
      style={{ paddingLeft: '7vw', paddingRight: '7vw', paddingTop: '8rem', paddingBottom: '5rem' }}
    >
      <div className="grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1], delay: 0.15 }}
          className="flex min-w-0 flex-col"
        >
          <div className="mb-9 flex items-center gap-3">
            <span className="h-px w-10 bg-[#C9A84C]" />
            <span className="text-xs font-medium uppercase tracking-[0.28em] text-[#C9A84C]">
              DSA · Problem Solving · Engineering
            </span>
          </div>

          <h1 className="font-heading font-bold leading-[1.04] tracking-[-0.025em] text-[3rem] sm:text-[4rem] lg:text-[4.6rem] xl:text-[5.4rem]">
            <span className="text-[#C9A84C]">FORGE</span>
            <span className="text-[#F2F0EA]"> IDEAS</span>
            <br />
            <span className="text-[#F2F0EA]">INTO </span>
            <span className="text-[#C9A84C]">SKILLS.</span>
          </h1>

          <p className="mt-9 max-w-xl text-lg font-light leading-[1.8] text-[#7C7C78] sm:text-xl">
            Master problem-solving through structured learning,
            patterns, and deliberate practice.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link
              href="/sheet"
              className="rounded-[4px] bg-[#C9A84C] px-10 py-[18px] font-heading text-base font-semibold tracking-wide text-[#070707] transition-all duration-300 hover:bg-[#E3C97A]"
            >
              Start Forging →
            </Link>
            <Link
              href="/sheet"
              className="rounded-[4px] border border-[#2A2A2A] px-10 py-[18px] font-heading text-base font-medium tracking-wide text-[#F2F0EA] transition-all duration-300 hover:border-[#C9A84C] hover:text-[#C9A84C]"
            >
              Explore the Sheet
            </Link>
          </div>

          <div className="mt-16 flex items-center gap-14 border-t border-[#1E1E1E] pt-9">
            {[
              ['10k+', 'Blacksmiths'],
              ['500+', 'Blueprints'],
              ['100%', 'Free'],
            ].map(([value, label]) => (
              <div key={label}>
                <p className="font-heading text-[1.75rem] font-semibold text-[#C9A84C]">{value}</p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-[#7C7C78]">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="flex min-w-0 items-center justify-center">
          <LogoAnimation />
        </div>

      </div>
    </section>
  );
}
