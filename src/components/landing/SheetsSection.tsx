'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const SHEETS = [
  {
    name: 'The Anvil',
    sub: 'Complete DSA Foundation',
    slug: 'complete-dsa',
    count: 450,
    split: { easy: 38, medium: 44, hard: 18 },
    desc: 'Every core topic from arrays to graphs, sequenced so each problem earns the next.',
  },
  {
    name: 'The Blueprint',
    sub: 'SDE Interview Sheet',
    slug: 'sde-sheet',
    count: 191,
    split: { easy: 26, medium: 52, hard: 22 },
    desc: 'The interview-ready set. Tight, high-signal, built for the weeks before a loop.',
  },
  {
    name: 'Tempered Steel',
    sub: 'Product-Based Companies',
    slug: 'product-based',
    count: 250,
    split: { easy: 18, medium: 48, hard: 34 },
    desc: 'Problems that actually show up at product companies. Harder, deeper, unforgiving.',
  },
  {
    name: 'First Strike',
    sub: 'Service-Based Companies',
    slug: 'service-based',
    count: 180,
    split: { easy: 52, medium: 38, hard: 10 },
    desc: 'Fundamentals-heavy and output-focused — exactly what service company rounds test.',
  },
];

export default function SheetsSection() {
  return (
    <section
      id="sheets"
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
            The Sheets
          </span>
        </div>

        <h2 className="max-w-3xl font-heading text-[2.25rem] font-bold leading-[1.15] tracking-[-0.02em] sm:text-[3rem] lg:text-[3.4rem]">
          <span className="text-[#F2F0EA]">Pick your </span>
          <span className="text-[#C9A84C]">blueprint.</span>
        </h2>

        <p
          className="max-w-xl text-lg font-light leading-[1.85] text-[#7C7C78]"
          style={{ marginTop: '1.75rem' }}
        >
          Four curated tracks. Same philosophy, different destination.
        </p>
      </motion.div>

      <div
        className="grid grid-cols-1 md:grid-cols-2"
        style={{ marginTop: '4.5rem', gap: '1.5rem' }}
      >
        {SHEETS.map((s, i) => (
          <motion.div
            key={s.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
          >
            <Link
              href={`/sheet/${s.slug}`}
              className="group flex h-full flex-col rounded-[6px] border border-[#1A1A1A] bg-[#0B0B0B] transition-all duration-300 hover:border-[#3A3120] hover:bg-[#0E0E0E]"
              style={{ padding: '2.75rem 2.5rem' }}
            >
              <div className="flex items-start justify-between gap-6">
                <div className="min-w-0">
                  <h3 className="font-heading text-2xl font-bold tracking-tight text-[#F2F0EA] transition-colors group-hover:text-[#C9A84C]">
                    {s.name}
                  </h3>
                  <p
                    className="text-[12px] uppercase tracking-[0.18em] text-[#7C7C78]"
                    style={{ marginTop: '0.6rem' }}
                  >
                    {s.sub}
                  </p>
                </div>
                <span className="shrink-0 font-heading text-[2rem] font-bold leading-none text-[#C9A84C]">
                  {s.count}
                </span>
              </div>

              <p
                className="text-[15px] font-light leading-[1.75] text-[#7C7C78]"
                style={{ marginTop: '1.75rem' }}
              >
                {s.desc}
              </p>

              <div className="mt-auto" style={{ paddingTop: '2.5rem' }}>
                <div className="flex h-[3px] w-full overflow-hidden rounded-full">
                  <span style={{ width: `${s.split.easy}%` }} className="bg-[#3F8A55]" />
                  <span style={{ width: `${s.split.medium}%` }} className="bg-[#C9A84C]" />
                  <span style={{ width: `${s.split.hard}%` }} className="bg-[#9E4B3F]" />
                </div>

                <div
                  className="flex items-center justify-between gap-4"
                  style={{ marginTop: '1.25rem' }}
                >
                  <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.14em] text-[#5A5A56]">
                    <span>{s.split.easy}% Easy</span>
                    <span>{s.split.medium}% Med</span>
                    <span>{s.split.hard}% Hard</span>
                  </div>
                  <span className="shrink-0 font-heading text-sm font-medium text-[#7C7C78] transition-colors group-hover:text-[#C9A84C]">
                    Start &rarr;
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
