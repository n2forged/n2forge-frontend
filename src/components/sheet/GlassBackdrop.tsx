'use client';

export default function GlassBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <style>{`
        @keyframes nfDrift1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(60px, -40px) scale(1.12); }
        }
        @keyframes nfDrift2 {
          0%, 100% { transform: translate(0, 0) scale(1.05); }
          50% { transform: translate(-70px, 50px) scale(0.95); }
        }
        @keyframes nfDrift3 {
          0%, 100% { transform: translate(0, 0) scale(0.95); }
          50% { transform: translate(40px, 60px) scale(1.1); }
        }
      `}</style>

      <div
        className="absolute rounded-full"
        style={{
          width: '620px',
          height: '620px',
          top: '-180px',
          left: '-120px',
          background: 'radial-gradient(circle, rgba(255,184,77,.16), transparent 68%)',
          filter: 'blur(60px)',
          animation: 'nfDrift1 22s ease-in-out infinite',
        }}
      />

      <div
        className="absolute rounded-full"
        style={{
          width: '700px',
          height: '700px',
          top: '12%',
          right: '-240px',
          background: 'radial-gradient(circle, rgba(155,140,255,.18), transparent 68%)',
          filter: 'blur(70px)',
          animation: 'nfDrift2 28s ease-in-out infinite',
        }}
      />

      <div
        className="absolute rounded-full"
        style={{
          width: '540px',
          height: '540px',
          bottom: '-160px',
          left: '28%',
          background: 'radial-gradient(circle, rgba(77,217,230,.12), transparent 68%)',
          filter: 'blur(64px)',
          animation: 'nfDrift3 25s ease-in-out infinite',
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.015) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
    </div>
  );
}
