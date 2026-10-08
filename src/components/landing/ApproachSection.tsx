'use client';

import { motion } from 'framer-motion';

const STEPS = [
  { n: '01', title: 'Understand', desc: 'Read until the constraints tell you what shape the answer takes.' },
  { n: '02', title: 'Think', desc: 'Reach for the pattern before the code. Brute force first, then sharpen.' },
  { n: '03', title: 'Experiment', desc: 'Trace edge cases by hand. Break your approach before the judge does.' },
  { n: '04', title: 'Solve', desc: 'Write it clean. Optimise only once correctness is proven.' },
  { n: '05', title: 'Build', desc: 'Revisit, re-derive, and connect it to what you have already forged.' },
];

export default function ApproachSection() {
  return (
    <section
      className="relative z-10"
      style={{
        paddingLeft: 'clamp(22px,5vw,64px)',
        paddingRight: 'clamp(22px,5vw,64px)',
        paddingTop: 'clamp(64px,8vw,104px)',
        paddingBottom: 'clamp(64px,8vw,104px)',
      }}
    >
      <div className="mx-auto max-w-[1240px]">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="grid grid-cols-1 items-end gap-9 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-20"
        >
          <h2
            className="font-extralight tracking-[-0.03em] text-[#F5F5F0]"
            style={{ fontSize: 'clamp(1.7rem,3.9vw,2.8rem)', lineHeight: 1.3, maxWidth: '16ch' }}
          >
            Most sheets hand you a list. A list is not a path.
          </h2>

          <p
            className="text-[#A7ADBB]"
            style={{ maxWidth: '46ch', fontSize: '1.02rem', lineHeight: 1.9 }}
          >
            Two hundred problems in arbitrary order teaches you two hundred tricks
            and no instinct. We order them so each one leans on the last, and we
            name what the problem is really testing before you open it.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5" style={{ marginTop: '3.25rem' }}>
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              className="border-t border-white/10"
              style={{ padding: '1.9rem 1.6rem 0.6rem', paddingLeft: i === 0 ? 0 : undefined }}
            >
              <span className="font-mono text-[11px] tracking-[0.2em] text-[#6E7585]">{s.n}</span>
              <h3
                className="font-normal tracking-[-0.01em] text-[#F5F5F0]"
                style={{ marginTop: '1.1rem', fontSize: '1.02rem' }}
              >
                {s.title}
              </h3>
              <p
                className="text-[0.9rem] leading-[1.8] text-[#A7ADBB]"
                style={{ marginTop: '0.7rem' }}
              >
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
