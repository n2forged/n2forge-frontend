const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.055'/%3E%3C/svg%3E\")";

export default function Atmosphere() {
  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <span
          className="absolute block rounded-full"
          style={{
            width: '46vw', height: '46vw', right: '8vw', top: '-12vw',
            background: 'rgba(155,140,255,.19)', filter: 'blur(110px)',
          }}
        />
        <span
          className="absolute block rounded-full"
          style={{
            width: '40vw', height: '40vw', right: '-4vw', top: '30vh',
            background: 'rgba(113,230,225,.12)', filter: 'blur(100px)',
          }}
        />
        <span
          className="absolute block rounded-full"
          style={{
            width: '50vw', height: '40vw', left: '-18vw', top: '36vh',
            background: 'rgba(122,167,255,.08)', filter: 'blur(120px)',
          }}
        />
        <span
          className="absolute block rounded-full"
          style={{
            width: '44vw', height: '36vw', left: '6vw', top: '118vh',
            background: 'rgba(155,140,255,.10)', filter: 'blur(120px)',
          }}
        />
      </div>

      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(ellipse 88% 72% at 64% 42%, transparent 34%, rgba(11,13,18,.7) 100%)',
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[2]"
        style={{ backgroundImage: GRAIN, opacity: 0.5 }}
      />
    </>
  );
}
