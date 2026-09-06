import Link from 'next/link';

const COLUMNS = [
  {
    heading: 'Sheets',
    links: [
      ['The Anvil', '/sheet/complete-dsa'],
      ['The Blueprint', '/sheet/sde-sheet'],
      ['Tempered Steel', '/sheet/product-based'],
      ['First Strike', '/sheet/service-based'],
    ],
  },
  {
    heading: 'Platform',
    links: [
      ['All Problems', '/sheet'],
      ['Roadmap', '/#roadmap'],
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
      className="relative z-10 border-t border-[#141414]"
      style={{ paddingLeft: '7vw', paddingRight: '7vw', paddingTop: '5rem', paddingBottom: '3rem' }}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr]"
        style={{ gap: '3rem' }}
      >
        <div>
          <Link href="/" className="font-heading text-xl font-bold tracking-tight">
            <span className="text-[#F2F0EA]">n</span>
            <span className="align-super text-[12px] text-[#C9A84C]">2</span>
            <span className="ml-1.5 text-[14px] tracking-[0.22em] text-[#F2F0EA]">FORGE</span>
          </Link>
          <p
            className="max-w-xs text-sm font-light leading-[1.8] text-[#5A5A56]"
            style={{ marginTop: '1.5rem' }}
          >
            Forge ideas into skills. Built by two engineers who got tired of
            memorizing solutions.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.heading}>
            <h4 className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#C9A84C]">
              {col.heading}
            </h4>
            <ul className="flex flex-col" style={{ marginTop: '1.5rem', gap: '0.9rem' }}>
              {col.links.map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm font-light text-[#7C7C78] transition-colors hover:text-[#F2F0EA]"
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
        className="flex flex-wrap items-center justify-between gap-4 border-t border-[#141414]"
        style={{ marginTop: '4rem', paddingTop: '2rem' }}
      >
        <p className="text-xs tracking-wide text-[#5A5A56]">
          &copy; 2026 N&sup2;Forge. Temper your logic.
        </p>
        <div className="flex items-center gap-6 text-xs text-[#5A5A56]">
          <Link href="#" className="transition-colors hover:text-[#7C7C78]">Privacy</Link>
          <Link href="#" className="transition-colors hover:text-[#7C7C78]">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
