'use client';

import { motion } from 'framer-motion';

const STEPS = [
  { n: '01', title: 'Understand', desc: 'Read until the constraints tell you what shape the answer takes.' },
  { n: '02', title: 'Think', desc: 'Reach for the pattern before the code. Brute force first, then sharpen.' },
  { n: '03', title: 'Experiment', desc: 'Trace edge cases by hand. Break your approach before the judge does.' },
  { n: '04', title: 'Solve', desc: 'Write it clean. Optimize only once correctness is proven.' },
  { n: '05', title: 'Build', desc: 'Revisit, re-derive, and connect it to what you have already forged.' },
];

export default function ApproachSection() {
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
            The Approach
          </span>
        </div>

        <h2 className="max-w-3xl font-heading text-[2.25rem] font-bold leading-[1.15] tracking-[-0.02em] sm:text-[3rem] lg:text-[3.4rem]">
          <span className="text-[#F2F0EA]">We believe it should look </span>
          <span className="text-[#C9A84C]">like this.</span>
        </h2>
      </motion.div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        style={{ marginTop: '4.5rem', gap: '1.5rem' }}
      >
        {STEPS.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="rounded-[6px] border border-[#1A1A1A] bg-[#0B0B0B] transition-colors duration-300 hover:border-[#2E281A]"
            style={{ padding: '2.5rem 2rem' }}
          >
            <span className="font-mono text-xs tracking-[0.2em] text-[#C9A84C]">{s.n}</span>
            <h3
              className="font-heading text-xl font-semibold text-[#F2F0EA]"
              style={{ marginTop: '1.5rem' }}
            >
              {s.title}
            </h3>
            <p
              className="text-[15px] font-light leading-[1.75] text-[#7C7C78]"
              style={{ marginTop: '1rem' }}
            >
              {s.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
