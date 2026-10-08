'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

type Stop = {
  left: string; top: string;
  cap: string; step: string;
  tag: 'you' | 'live' | 'soon' | 'goal';
  tagText: string; title: string; body: string;
  dot: 'past' | 'start' | 'ahead' | 'goal';
  dir: 'up' | 'down';
  align: 'start' | 'mid' | 'end';
};

const STOPS: Stop[] = [
  {
    left: '6%', top: '87%', cap: 'Today', dot: 'past', dir: 'up', align: 'start',
    step: 'STOP 01', tag: 'you', tagText: 'Where most people are',
    title: 'Solving at random',
    body: 'A problem from here, a problem from there, a tab full of half-read editorials. It feels like work, and it does build something — just not anything that survives until Friday.',
  },
  {
    left: '28%', top: '78%', cap: 'Complete DSA', dot: 'start', dir: 'up', align: 'mid',
    step: 'STOP 02', tag: 'live', tagText: 'Open now',
    title: 'Complete DSA',
    body: 'The first real milestone, and where N²Forge starts you. Every core topic from arrays to graphs, ordered so each problem leans on the one before it. You stop collecting tricks and start recognising shapes.',
  },
  {
    left: '50%', top: '59.5%', cap: 'SDE Sheet', dot: 'ahead', dir: 'up', align: 'mid',
    step: 'STOP 03', tag: 'live', tagText: 'Open now',
    title: 'SDE Sheet',
    body: 'Tighter, harder, built for the weeks before a loop. Nothing here is new material — it is the same patterns under time pressure, which is the only thing an interview actually measures.',
  },
  {
    left: '72%', top: '35%', cap: 'Mock interviews', dot: 'ahead', dir: 'down', align: 'mid',
    step: 'STOP 04', tag: 'soon', tagText: 'In the forge',
    title: 'Mock interviews',
    body: 'Timed rounds with someone watching, scored on how you reason out loud, how you take a hint, and what you do when the first approach breaks. The part nobody practises and everybody is judged on.',
  },
  {
    left: '94%', top: '11%', cap: 'The loop', dot: 'goal', dir: 'down', align: 'end',
    step: 'STOP 05', tag: 'goal', tagText: 'The point of all this',
    title: 'The loop',
    body: 'You open an unseen problem in front of an interviewer and your first thought is what kind of problem it is — not whether you have seen it before. That is the position this route is built to put you in.',
  },
];

const DOT: Record<Stop['dot'], React.CSSProperties> = {
  past:  { borderColor: 'rgba(113,230,225,.5)', background: 'rgba(113,230,225,.22)' },
  start: { borderColor: '#E8B95B', boxShadow: '0 0 0 7px rgba(232,185,91,.1)' },
  ahead: { borderColor: 'rgba(255,255,255,.26)', background: '#0B0D12' },
  goal:  { borderColor: 'rgba(155,140,255,.65)', background: 'rgba(155,140,255,.2)' },
};

const TAG: Record<Stop['tag'], string> = {
  you:   'text-[#6E7585] border-white/10',
  live:  'text-[#71E6E1] border-[#71E6E1]/30',
  soon:  'text-[#E8B95B] border-[#E8B95B]/30',
  goal:  'text-[#9B8CFF] border-[#9B8CFF]/35',
};

export default function CareerPath() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="w-full min-w-0">
      <div className="relative flex w-full flex-col lg:block lg:aspect-[600/400]">
        <svg
          viewBox="0 0 600 400"
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="nfWalked" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#71E6E1" stopOpacity=".2" />
              <stop offset="100%" stopColor="#E8B95B" stopOpacity=".8" />
            </linearGradient>
          </defs>
          <motion.path
            d="M 36 348 C 96 342 128 332 168 312 C 222 286 248 272 300 238 C 356 202 390 176 432 140 C 486 94 528 66 566 44"
            fill="none" stroke="rgba(255,255,255,.13)" strokeWidth="2" strokeLinecap="round"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
            viewport={{ once: true }} transition={{ duration: 2.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          />
          <motion.path
            d="M 36 348 C 96 342 128 332 168 312"
            fill="none" stroke="url(#nfWalked)" strokeWidth="3" strokeLinecap="round"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
            viewport={{ once: true }} transition={{ duration: 2.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          />
        </svg>

        {STOPS.map((s, i) => (
          <div
            key={s.cap}
            style={{ left: s.left, top: s.top }}
            className="relative ml-[7px] w-full border-l border-white/10 pl-[26px] lg:absolute lg:ml-0 lg:w-auto lg:border-0 lg:pl-0 lg:-translate-x-1/2 lg:-translate-y-1/2"
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.45 + i * 0.17, ease: [0.18, 0.9, 0.24, 1] }}
            >
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="group relative block w-full py-3 text-left hover:z-20 focus-visible:z-20 lg:w-auto lg:py-0 lg:text-center"
              >
                <span className="flex items-center gap-3 lg:flex-col lg:gap-[9px]">
                  <span
                    className="relative -ml-[34px] block h-[15px] w-[15px] shrink-0 rounded-full border-2 transition-transform duration-300 group-hover:scale-[1.32] group-focus-visible:scale-[1.32] lg:ml-0"
                    style={DOT[s.dot]}
                  >
                    {s.dot === 'start' && (
                      <>
                        <span className="absolute rounded-full bg-[#E8B95B]" style={{ left: 2.5, top: 2.5, right: 2.5, bottom: 2.5 }} />
                        <motion.span
                          className="absolute rounded-full border border-[#E8B95B]/45"
                          style={{ inset: -9 }}
                          animate={{ scale: [0.6, 1.7], opacity: [0.9, 0] }}
                          transition={{ duration: 3.4, repeat: Infinity, ease: [0.2, 0.6, 0.3, 1] }}
                        />
                      </>
                    )}
                  </span>
                  <span className="whitespace-nowrap text-[14.5px] text-[#6E7585] transition-colors group-hover:text-[#F5F5F0] group-focus-visible:text-[#F5F5F0] lg:text-[12.5px]">
                    {s.cap}
                  </span>
                </span>

                <span
                  className={[
                    open === i ? 'block' : 'hidden',
                    'mt-3 w-full rounded-[16px] border border-white/10 lg:mt-0 lg:block lg:absolute lg:w-[300px]',
                    'lg:invisible lg:opacity-0 lg:transition-all lg:duration-300',
                    'lg:group-hover:visible lg:group-hover:opacity-100 lg:group-focus-visible:visible lg:group-focus-visible:opacity-100',
                    s.dir === 'up' ? 'lg:bottom-[calc(100%+10px)]' : 'lg:top-[calc(100%+10px)]',
                    s.align === 'mid' ? 'lg:left-1/2 lg:-ml-[150px]' : '',
                    s.align === 'start' ? 'lg:left-[-6px]' : '',
                    s.align === 'end' ? 'lg:right-[-6px]' : '',
                  ].join(' ')}
                  style={{
                    padding: '20px 22px',
                    background: 'linear-gradient(170deg,rgba(23,30,43,.94),rgba(14,19,28,.94))',
                    backdropFilter: 'blur(26px)',
                    WebkitBackdropFilter: 'blur(26px)',
                    boxShadow: '0 1px 0 rgba(255,255,255,.09) inset, 0 28px 70px rgba(0,0,0,.6)',
                  }}
                >
                  <span className="flex flex-wrap items-center gap-[10px]">
                    <span className="text-[.68rem] tracking-[0.1em] text-[#6E7585]">{s.step}</span>
                    <span className={`rounded-full border text-[.65rem] tracking-[0.07em] ${TAG[s.tag]}`} style={{ padding: '3px 9px' }}>
                      {s.tagText}
                    </span>
                  </span>
                  <span className="mt-3 block text-[1.12rem] font-normal tracking-[-0.02em] text-[#F5F5F0]">
                    {s.title}
                  </span>
                  <span className="mt-2 block text-[.88rem] leading-[1.72] text-[#A7ADBB]">
                    {s.body}
                  </span>
                </span>
              </button>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
