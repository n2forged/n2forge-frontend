'use client';

import { motion } from 'framer-motion';

const PAINS = [
  { stat: '200+', label: 'Problems solved', text: 'Still blank when a new question shows up.' },
  { stat: '15', label: 'Patterns memorized', text: 'None of them click under real pressure.' },
  { stat: '0', label: 'Intuition built', text: 'Only recall — and recall fades fast.' },
];

export default function ProblemSection() {
  return (
    <section
      className="relative z-10 border-t border-[#141414]"
      style={{ paddingLeft: '7vw', paddingRight: '7vw', paddingTop: '9rem', paddingBottom: '9rem' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <div style={{ marginBottom: '1.75rem' }} className="flex items-center gap-3">
          <span className="h-px w-10 bg-[#C9A84C]" />
          <span className="text-xs font-medium uppercase tracking-[0.28em] text-[#C9A84C]">
            The Problem
          </span>
        </div>

        <h2 className="max-w-3xl font-heading text-[2.25rem] font-bold leading-[1.15] tracking-[-0.02em] sm:text-[3rem] lg:text-[3.4rem]">
          <span className="text-[#F2F0EA]">DSA isn&rsquo;t about solving </span>
          <span className="text-[#C9A84C]">more</span>
          <span className="text-[#F2F0EA]"> problems.</span>
        </h2>

        <p
          className="max-w-xl text-lg font-light leading-[1.85] text-[#7C7C78]"
          style={{ marginTop: '1.75rem' }}
        >
          It&rsquo;s about learning how to solve. Most students run the same loop
          for months and end up exactly where they started.
        </p>

        <div
          className="flex flex-wrap items-center gap-x-6 gap-y-4"
          style={{ marginTop: '3.5rem' }}
        >
          {['Learn', 'Memorize', 'Repeat', 'Forget'].map((step, i) => (
            <div key={step} className="flex items-center gap-6">
              <span
                className={`font-heading text-lg font-medium tracking-wide ${
                  step === 'Forget' ? 'text-[#4A4A46] line-through' : 'text-[#F2F0EA]'
                }`}
              >
                {step}
              </span>
              {i < 3 && <span className="text-[#3A3A36]">&rarr;</span>}
            </div>
          ))}
        </div>
      </motion.div>

      <div
        className="grid grid-cols-1 sm:grid-cols-3"
        style={{ marginTop: '5rem', gap: '1.5rem' }}
      >
        {PAINS.map((p, i) => (
          <motion.div
            key={p.stat}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="rounded-[6px] border border-[#1A1A1A] bg-[#0B0B0B]"
            style={{ padding: '2.5rem 2rem' }}
          >
            <p className="font-heading text-[2.75rem] font-bold leading-none text-[#C9A84C]">
              {p.stat}
            </p>
            <p
              className="text-[11px] uppercase tracking-[0.2em] text-[#F2F0EA]"
              style={{ marginTop: '1.25rem' }}
            >
              {p.label}
            </p>
            <p
              className="text-[15px] font-light leading-[1.7] text-[#7C7C78]"
              style={{ marginTop: '0.75rem' }}
            >
              {p.text}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
