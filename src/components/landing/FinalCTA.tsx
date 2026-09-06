'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function FinalCTA() {
  return (
    <section
      className="relative z-10 border-t border-[#141414]"
      style={{ paddingLeft: '7vw', paddingRight: '7vw', paddingTop: '11rem', paddingBottom: '11rem' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        className="flex flex-col items-center text-center"
      >
        <h2 className="max-w-3xl font-heading text-[2.25rem] font-bold leading-[1.14] tracking-[-0.02em] sm:text-[3rem] lg:text-[3.6rem]">
          <span className="text-[#F2F0EA]">Stop collecting problems.</span>
          <br />
          <span className="text-[#C9A84C]">Start building intuition.</span>
        </h2>

        <p
          className="max-w-lg text-lg font-light leading-[1.8] text-[#7C7C78]"
          style={{ marginTop: '2rem' }}
        >
          Free, forever. No paywalls, no drip content, no upsell.
        </p>

        <div
          className="flex flex-wrap items-center justify-center gap-4"
          style={{ marginTop: '3rem' }}
        >
          <Link
            href="/register"
            className="rounded-[4px] bg-[#C9A84C] font-heading text-base font-semibold tracking-wide text-[#070707] transition-all duration-300 hover:bg-[#E3C97A]"
            style={{ padding: '18px 40px' }}
          >
            Start Forging &rarr;
          </Link>
          <Link
            href="#sheets"
            className="rounded-[4px] border border-[#2A2A2A] font-heading text-base font-medium tracking-wide text-[#F2F0EA] transition-all duration-300 hover:border-[#C9A84C] hover:text-[#C9A84C]"
            style={{ padding: '18px 40px' }}
          >
            Browse Sheets
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
