'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import CareerPath from './CareerPath';

export default function HeroSection() {
  return (
    <section
      className="relative z-10 flex min-h-screen items-center"
      style={{
        paddingLeft: 'clamp(22px,5vw,64px)',
        paddingRight: 'clamp(22px,5vw,64px)',
        paddingTop: '9.5rem',
        paddingBottom: '5rem',
      }}
    >
      <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1], delay: 0.1 }}
          className="min-w-0"
        >
          <h1
            className="font-extralight tracking-[-0.04em] text-[#F5F5F0]"
            style={{ fontSize: 'clamp(2.6rem,5.4vw,4.1rem)', lineHeight: 1.04, maxWidth: '11ch' }}
          >
            Forge ideas into <span className="font-medium">skills</span>
            <span className="text-[#E8B95B]">.</span>
          </h1>

          <p
            className="text-[#A7ADBB]"
            style={{ marginTop: '1.6rem', maxWidth: '40ch', fontSize: 'clamp(1rem,1.35vw,1.08rem)', lineHeight: 1.85 }}
          >
            Most sheets hand you a list. This is a route — five stops from solving
            at random to walking into a loop knowing what you are looking at.
          </p>

          <p className="text-[0.82rem] text-[#6E7585]" style={{ marginTop: '1.4rem' }}>
            Hover a stop to see what it takes.
          </p>

          <div className="flex flex-wrap items-center gap-3" style={{ marginTop: '2.1rem' }}>
            <Link
              href="/sheet/complete-dsa"
              className="rounded-[12px] text-[15px] font-medium text-[#0A0C11] transition-transform duration-300 hover:-translate-y-0.5"
              style={{
                padding: '15px 30px',
                background: 'linear-gradient(170deg,#F7F7F3,#CFD4E0)',
                boxShadow: '0 10px 30px rgba(190,200,225,.12)',
              }}
            >
              Start at stop one
            </Link>
            <Link
              href="#sheets"
              className="rounded-[12px] border border-white/10 text-[15px] text-[#F5F5F0] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#9B8CFF]/45"
              style={{ padding: '15px 30px', background: 'rgba(255,255,255,.04)' }}
            >
              See the route
            </Link>
          </div>
        </motion.div>

        <div className="min-w-0">
          <CareerPath />
        </div>
      </div>
    </section>
  );
}
