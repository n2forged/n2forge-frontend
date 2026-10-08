import Link from 'next/link';
import Navbar from '@/components/navbar/Navbar';
import Atmosphere from '@/components/landing/Atmosphere';
import Footer from '@/components/footer/Footer';

export const metadata = {
  title: 'Sheets — N²Forge',
  description: 'Curated DSA sheets, sequenced so each problem earns the next.',
};

const SHEETS = [
  { name: 'Complete DSA', slug: 'complete-dsa', live: true, sub: 'Foundation track',
    desc: 'Every core topic from arrays to graphs, sequenced so each problem earns the next. Start here if you want the whole picture.' },
  { name: 'SDE Sheet', slug: 'sde-sheet', live: true, sub: 'Interview track',
    desc: 'Tight, high-signal, built for the weeks before a loop. Same patterns, less room to wander.' },
  { name: 'Blind 75', slug: 'blind-75', live: false, sub: 'The classic shortlist',
    desc: 'The list everyone starts from, with our ordering and explanations layered on top.' },
  { name: 'Handpicked 100', slug: 'handpicked-100', live: false, sub: 'Our own pick',
    desc: 'A hundred problems we keep returning to, chosen for what each one teaches rather than how often it is asked.' },
];

export default function SheetsPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip" style={{ background: '#0B0D12' }}>
      <Atmosphere />
      <Navbar />

      <div className="relative z-10">
        <section
          style={{
            paddingLeft: 'clamp(22px,5vw,64px)',
            paddingRight: 'clamp(22px,5vw,64px)',
            paddingTop: '9.5rem',
            paddingBottom: 'clamp(70px,9vw,110px)',
          }}
        >
          <div className="mx-auto max-w-[1240px]">
            <h1
              className="font-extralight tracking-[-0.04em] text-[#F5F5F0]"
              style={{ fontSize: 'clamp(2.2rem,4.6vw,3.3rem)', lineHeight: 1.08, maxWidth: '14ch' }}
            >
              Four tracks. One philosophy.
            </h1>
            <p
              className="text-[#A7ADBB]"
              style={{ marginTop: '1.4rem', maxWidth: '52ch', fontSize: '1.02rem', lineHeight: 1.85 }}
            >
              Every sheet is ordered, not sorted. Pick the one that matches where
              you are — you can move between them whenever you like.
            </p>

            <div
              className="grid grid-cols-1 md:grid-cols-2"
              style={{ marginTop: '3.5rem', gap: '1.25rem' }}
            >
              {SHEETS.map((s) => {
                const body = (
                  <>
                    <div className="flex items-start justify-between gap-5">
                      <div className="min-w-0">
                        <h2
                          className={`font-light tracking-[-0.025em] ${s.live ? 'text-[#F5F5F0]' : 'text-[#A7ADBB]'}`}
                          style={{ fontSize: '1.65rem' }}
                        >
                          {s.name}
                        </h2>
                        <p className="text-[0.78rem] tracking-[0.06em] text-[#6E7585]" style={{ marginTop: '0.5rem' }}>
                          {s.sub}
                        </p>
                      </div>
                      {!s.live && (
                        <span
                          className="shrink-0 rounded-full border border-[#E8B95B]/30 text-[0.65rem] tracking-[0.1em] text-[#E8B95B]"
                          style={{ padding: '3px 10px' }}
                        >
                          Soon
                        </span>
                      )}
                    </div>

                    <p
                      className="text-[0.94rem] leading-[1.75] text-[#A7ADBB]"
                      style={{ marginTop: '1.4rem' }}
                    >
                      {s.desc}
                    </p>

                    <span
                      className={`mt-auto block text-[0.88rem] ${s.live ? 'text-[#71E6E1]' : 'text-[#6E7585]'}`}
                      style={{ paddingTop: '2rem' }}
                    >
                      {s.live ? 'Open the sheet' : 'In the forge'}
                    </span>
                  </>
                );

                const cls = 'flex h-full flex-col rounded-[20px] border border-white/10';
                const st = {
                  padding: '2.1rem 2rem',
                  background: 'linear-gradient(170deg,rgba(255,255,255,.05),rgba(255,255,255,.014))',
                } as const;

                return s.live ? (
                  <Link
                    key={s.slug}
                    href={`/sheet/${s.slug}`}
                    className={`${cls} transition-colors hover:border-[#9B8CFF]/40`}
                    style={st}
                  >
                    {body}
                  </Link>
                ) : (
                  <div key={s.slug} className={cls} style={{ ...st, opacity: 0.5 }}>
                    {body}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
