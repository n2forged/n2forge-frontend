'use client';

import { motion } from 'framer-motion';

const ITEMS = [
  {
    phase: 'Live',
    title: 'Curated Sheets',
    desc: 'Four tracks, ordered problems, linked articles, and progress that persists across sessions.',
    active: true,
  },
  {
    phase: 'Next',
    title: 'Editorials & Video',
    desc: 'Written breakdowns and walkthroughs for every problem — the thinking, not just the code.',
    active: false,
  },
  {
    phase: 'Later',
    title: 'Online Judge',
    desc: 'Write and run solutions in-browser against real test cases. No tab switching.',
    active: false,
  },
  {
    phase: 'Later',
    title: 'Original Problems',
    desc: 'Problems written by us, for the patterns existing platforms under-serve.',
    active: false,
  },
];

export default function RoadmapSection() {
  return (
    <section
      id="roadmap"
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
            What&rsquo;s Coming
          </span>
        </div>

        <h2 className="max-w-3xl font-heading text-[2.25rem] font-bold leading-[1.15] tracking-[-0.02em] sm:text-[3rem] lg:text-[3.4rem]">
          <span className="text-[#F2F0EA]">Still being </span>
          <span className="text-[#C9A84C]">forged.</span>
        </h2>
      </motion.div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2"
        style={{ marginTop: '4.5rem', gap: '1.5rem' }}
      >
        {ITEMS.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.09 }}
            className={`rounded-[6px] border bg-[#0B0B0B] ${
              it.active ? 'border-[#3A3120]' : 'border-[#1A1A1A]'
            }`}
            style={{ padding: '2.5rem 2rem' }}
          >
            <span
              className={`inline-block rounded-full text-[10px] font-medium uppercase tracking-[0.2em] ${
                it.active
                  ? 'bg-[#C9A84C] text-[#070707]'
                  : 'border border-[#2A2A2A] text-[#5A5A56]'
              }`}
              style={{ padding: '0.35rem 0.85rem' }}
            >
              {it.phase}
            </span>

            <h3
              className="font-heading text-xl font-semibold text-[#F2F0EA]"
              style={{ marginTop: '1.5rem' }}
            >
              {it.title}
            </h3>

            <p
              className="text-[15px] font-light leading-[1.75] text-[#7C7C78]"
              style={{ marginTop: '0.9rem' }}
            >
              {it.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
