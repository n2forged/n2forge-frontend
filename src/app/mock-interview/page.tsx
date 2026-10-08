import Link from 'next/link';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import DottedField from '@/components/landing/DottedField';

export const metadata = {
  title: 'Mock Interview — N²Forge',
  description: 'Structured mock interviews, launching soon.',
};

export default function MockInterviewPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#070707]">
      <DottedField />
      <div
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{ background: 'radial-gradient(ellipse at 50% 30%, transparent 40%, rgba(7,7,7,.9) 100%)' }}
      />
      <Navbar />

      <section
        className="relative z-10 flex min-h-screen items-center"
        style={{ paddingLeft: '7vw', paddingRight: '7vw', paddingTop: '9rem', paddingBottom: '7rem' }}
      >
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-[#C9A84C]" />
            <span className="text-xs font-medium uppercase tracking-[0.28em] text-[#C9A84C]">
              Launching soon
            </span>
          </div>

          <h1
            className="font-heading font-bold leading-[1.08] tracking-[-0.025em] text-[2.5rem] sm:text-[3.4rem] lg:text-[4rem]"
            style={{ marginTop: '2rem' }}
          >
            <span className="text-[#F2F0EA]">Mock </span>
            <span className="text-[#C9A84C]">Interviews.</span>
          </h1>

          <p
            className="text-lg font-light leading-[1.85] text-[#7C7C78]"
            style={{ marginTop: '2rem' }}
          >
            Timed rounds with a real interviewer, scored on the things that
            actually decide a loop — how you reason out loud, how you handle a
            hint, and what you do when the first approach breaks.
          </p>

          <p
            className="text-[15px] font-light leading-[1.8] text-[#5A5A56]"
            style={{ marginTop: '1.5rem' }}
          >
            We are building this after the sheets are complete. Until then, the
            sheets are the fastest way to get ready.
          </p>

          <div className="flex flex-wrap items-center gap-4" style={{ marginTop: '3rem' }}>
            <Link
              href="/sheet/complete-dsa"
              className="rounded-[4px] bg-[#C9A84C] font-heading text-base font-semibold tracking-wide text-[#070707] transition-all duration-300 hover:bg-[#E3C97A]"
              style={{ padding: '1.1rem 2.5rem' }}
            >
              Start with the sheets &rarr;
            </Link>
            <Link
              href="/"
              className="rounded-[4px] border border-[#2A2A2A] font-heading text-base font-medium tracking-wide text-[#F2F0EA] transition-all duration-300 hover:border-[#C9A84C] hover:text-[#C9A84C]"
              style={{ padding: '1.1rem 2.5rem' }}
            >
              Back home
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
