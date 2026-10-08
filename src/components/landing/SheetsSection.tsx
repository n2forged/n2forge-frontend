'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

const SHEETS = [
  { name: 'Complete DSA', slug: 'complete-dsa', live: true,
    desc: 'Every core topic from arrays to graphs, sequenced so each problem earns the next.' },
  { name: 'SDE Sheet', slug: 'sde-sheet', live: true,
    desc: 'Tight, high-signal, built for the weeks before a loop.' },
  { name: 'Blind 75', slug: 'blind-75', live: false,
    desc: 'The list everyone starts from, with our ordering and explanations on top.' },
  { name: 'Handpicked 100', slug: 'handpicked-100', live: false,
    desc: 'A hundred problems we keep returning to, chosen for what each one teaches.' },
];

const GUT = 'clamp(22px,5vw,64px)';

export default function SheetsSection() {
  const railRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const rail = railRef.current;
      const track = trackRef.current;
      const bar = barRef.current;
      if (!rail || !track) return;

      if (window.innerWidth < 768) {
        track.style.transform = '';
        if (bar) bar.style.width = '0%';
        return;
      }

      const total = rail.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const p = Math.min(1, Math.max(0, -rail.getBoundingClientRect().top / total));
      const travel = Math.max(0, track.scrollWidth - window.innerWidth + 40);
      track.style.transform = `translateX(${(-p * travel).toFixed(1)}px)`;
      if (bar) bar.style.width = `${(p * 100).toFixed(1)}%`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section ref={railRef} id="sheets" className="relative z-10 md:h-[300vh]">
      <div className="flex flex-col justify-center overflow-hidden py-16 md:sticky md:top-0 md:h-screen md:py-0">
        <div style={{ paddingLeft: GUT, paddingRight: GUT }}>
          <div className="mx-auto max-w-[1240px]">
            <h2
              className="font-extralight tracking-[-0.035em] text-[#F5F5F0]"
              style={{ fontSize: 'clamp(1.7rem,3.6vw,2.5rem)', lineHeight: 1.2 }}
            >
              Four tracks. One philosophy.
            </h2>
            <p className="text-[0.9rem] text-[#6E7585]" style={{ marginTop: '0.9rem' }}>
              Keep scrolling to move across them.
            </p>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex w-full flex-col gap-4 md:w-auto md:flex-row md:gap-[22px]"
          style={{ paddingLeft: GUT, paddingRight: GUT, marginTop: '2.75rem', willChange: 'transform' }}
        >
          {SHEETS.map((s) => {
            const inner = (
              <>
                <h3 className="font-light tracking-[-0.025em] text-[#F5F5F0]" style={{ fontSize: '1.6rem' }}>
                  {s.name}
                </h3>
                <p className="text-[0.92rem] leading-[1.75] text-[#A7ADBB]" style={{ marginTop: '0.75rem' }}>
                  {s.desc}
                </p>
                <span
                  className={`block text-[0.84rem] ${s.live ? 'text-[#71E6E1]' : 'text-[#E8B95B]'}`}
                  style={{ marginTop: '1.3rem' }}
                >
                  {s.live ? 'Open' : 'In the forge'}
                </span>
              </>
            );

            const cls =
              'flex flex-col justify-end rounded-[20px] border border-white/10 md:h-[min(44vh,340px)] md:flex-[0_0_min(74vw,370px)]';
            const st = {
              padding: '28px 28px',
              background: 'linear-gradient(170deg,rgba(255,255,255,.05),rgba(255,255,255,.012))',
            } as const;

            return s.live ? (
              <Link key={s.slug} href={`/sheet/${s.slug}`} className={`${cls} transition-colors hover:border-[#9B8CFF]/40`} style={st}>
                {inner}
              </Link>
            ) : (
              <div key={s.slug} className={cls} style={{ ...st, opacity: 0.5 }}>
                {inner}
              </div>
            );
          })}
        </div>

        <div style={{ paddingLeft: GUT, paddingRight: GUT, marginTop: '2.5rem' }}>
          <div className="mx-auto hidden h-[2px] max-w-[1240px] rounded-full bg-white/[.06] md:block">
            <span
              ref={barRef}
              className="block h-full rounded-full"
              style={{ width: 0, background: 'linear-gradient(90deg,#71E6E1,#9B8CFF)' }}
            />
          </div>

          <div className="mx-auto max-w-[1240px] md:hidden" style={{ marginTop: '2rem' }}>
            <Link href="/sheets" className="text-[0.9rem] text-[#71E6E1]">
              See all sheets
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
