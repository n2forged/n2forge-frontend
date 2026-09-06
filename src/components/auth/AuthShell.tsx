'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AuthShell({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  children,
  footer,
}: {
  eyebrow: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen bg-[#070707]">
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(201,168,76,.09) 1px, transparent 1px)',
          backgroundSize: '54px 54px',
        }}
      />
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, transparent 30%, rgba(7,7,7,.92) 100%)',
        }}
      />

      <div
        className="relative z-10 flex min-h-screen items-center justify-center"
        style={{ paddingLeft: '7vw', paddingRight: '7vw', paddingTop: '4rem', paddingBottom: '4rem' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          className="w-full max-w-[440px]"
        >
          <Link href="/" className="inline-block font-heading text-2xl font-bold tracking-tight">
            <span className="text-[#F2F0EA]">n</span>
            <span className="align-super text-[13px] text-[#C9A84C]">2</span>
            <span className="ml-1.5 text-[15px] tracking-[0.22em] text-[#F2F0EA]">FORGE</span>
          </Link>

          <div style={{ marginTop: '3rem' }}>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#C9A84C]" />
              <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#C9A84C]">
                {eyebrow}
              </span>
            </div>

            <h1
              className="font-heading text-[2.25rem] font-bold leading-[1.15] tracking-[-0.02em]"
              style={{ marginTop: '1.5rem' }}
            >
              <span className="text-[#F2F0EA]">{title} </span>
              <span className="text-[#C9A84C]">{titleAccent}</span>
            </h1>

            <p
              className="text-[15px] font-light leading-[1.75] text-[#7C7C78]"
              style={{ marginTop: '0.9rem' }}
            >
              {subtitle}
            </p>
          </div>

          <div style={{ marginTop: '2.75rem' }}>{children}</div>

          <div
            className="border-t border-[#1A1A1A] text-center text-sm font-light text-[#7C7C78]"
            style={{ marginTop: '2.5rem', paddingTop: '2rem' }}
          >
            {footer}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
