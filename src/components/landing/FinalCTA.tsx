'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import LogoAnimation from './LogoAnimation';

export default function FinalCTA() {
  return (
    <section
      className="relative z-10 flex min-h-screen flex-col items-center justify-center text-center"
      style={{
        paddingLeft: 'clamp(22px,5vw,64px)',
        paddingRight: 'clamp(22px,5vw,64px)',
        paddingTop: '7rem',
        paddingBottom: '7rem',
      }}
    >
      <div className="w-full max-w-[290px]">
        <LogoAnimation width={290} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
        className="flex flex-col items-center"
      >
        <h2
          className="font-extralight tracking-[-0.035em] text-[#F5F5F0]"
          style={{ marginTop: '2.5rem', fontSize: 'clamp(2rem,4.8vw,3.2rem)', lineHeight: 1.12 }}
        >
          Start where it actually starts.
        </h2>

        <p
          className="text-[#A7ADBB]"
          style={{ marginTop: '1.4rem', maxWidth: '44ch', lineHeight: 1.85 }}
        >
          Free, no trial, no card. Open the first sheet and work the first problem.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3" style={{ marginTop: '2.4rem' }}>
          <Link
            href="/register"
            className="rounded-[12px] text-[15px] font-medium text-[#0A0C11] transition-transform duration-300 hover:-translate-y-0.5"
            style={{
              padding: '15px 30px',
              background: 'linear-gradient(170deg,#F7F7F3,#CFD4E0)',
              boxShadow: '0 10px 30px rgba(190,200,225,.12)',
            }}
          >
            Create an account
          </Link>
          <Link
            href="#sheets"
            className="rounded-[12px] border border-white/10 text-[15px] text-[#F5F5F0] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#9B8CFF]/45"
            style={{ padding: '15px 30px', background: 'rgba(255,255,255,.04)' }}
          >
            Browse the sheets
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
