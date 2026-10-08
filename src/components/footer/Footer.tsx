import Link from 'next/link';

const COLUMNS = [
  {
    heading: 'Sheets',
    links: [
      ['All sheets', '/sheets'],
      ['Complete DSA', '/sheet/complete-dsa'],
      ['SDE Sheet', '/sheet/sde-sheet'],
    ],
  },
  {
    heading: 'Platform',
    links: [
      ['Mock Interview', '/mock-interview'],
      ['GitHub', 'https://github.com/n2forged'],
    ],
  },
  {
    heading: 'Connect',
    links: [
      ['LinkedIn', '#'],
      ['Instagram', '#'],
      ['X', '#'],
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className="relative z-10 border-t border-white/10"
      style={{
        paddingLeft: 'clamp(22px,5vw,64px)',
        paddingRight: 'clamp(22px,5vw,64px)',
        paddingTop: '3.5rem',
        paddingBottom: '2.75rem',
      }}
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-wrap items-start" style={{ gap: '2.5rem' }}>
          <div style={{ flex: '1 1 280px' }}>
            <Link href="/" className="flex items-baseline text-[17px] font-medium tracking-[-0.01em]">
              <span className="text-[#F5F5F0]">n</span>
              <span className="align-super text-[10px] text-[#E8B95B]">2</span>
              <span className="ml-[7px] text-[12px] font-normal tracking-[0.2em] text-[#A7ADBB]">
                FORGE
              </span>
            </Link>
            <p
              className="text-[0.88rem] leading-[1.8] text-[#6E7585]"
              style={{ marginTop: '1.1rem', maxWidth: '34ch' }}
            >
              Forge ideas into skills. Built by two engineers who got tired of
              memorising solutions.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading} style={{ minWidth: '130px' }}>
              <h4 className="text-[0.78rem] font-medium text-[#A7ADBB]">{col.heading}</h4>
              <ul className="flex flex-col" style={{ marginTop: '1rem', gap: '0.7rem' }}>
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-[0.88rem] text-[#6E7585] transition-colors hover:text-[#F5F5F0]"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="flex flex-wrap items-center justify-between border-t border-white/[.05] text-[0.8rem] text-[#6E7585]"
          style={{ gap: '1.1rem', marginTop: '3rem', paddingTop: '1.6rem' }}
        >
          <span>&copy; 2026 N&sup2;Forge</span>
          <span className="flex items-center gap-5">
            <Link href="#" className="transition-colors hover:text-[#A7ADBB]">Privacy</Link>
            <Link href="#" className="transition-colors hover:text-[#A7ADBB]">Terms</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
