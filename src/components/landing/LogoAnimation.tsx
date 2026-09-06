'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function LogoAnimation() {
  const [showAxes, setShowAxes] = useState(false);
  const [showForge, setShowForge] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowAxes(true), 1500);
    const t2 = setTimeout(() => setShowForge(true), 2300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="relative flex items-center justify-center">
      <div
        className="pointer-events-none absolute h-[420px] w-[420px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,.07), transparent 65%)' }}
      />

      <svg width="420" height="450" viewBox="0 0 400 440" className="relative">
        <defs>
          <marker id="nfArrow" viewBox="0 0 12 12" refX="6" refY="6"
            markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M2 2 L10 6 L2 10" fill="none" stroke="#C9A84C"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
          <linearGradient id="nfGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E3C97A" />
            <stop offset="55%" stopColor="#C9A84C" />
            <stop offset="100%" stopColor="#A98A38" />
          </linearGradient>
        </defs>

        {showAxes && (
          <motion.line
            x1="200" y1="300" x2="200" y2="44"
            stroke="#C9A84C" strokeWidth="3.5"
            strokeDasharray="0.5 11" strokeLinecap="round"
            markerEnd="url(#nfArrow)"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
          />
        )}

        {showAxes && (
          <motion.line
            x1="44" y1="300" x2="356" y2="300"
            stroke="#C9A84C" strokeWidth="3.5"
            strokeDasharray="0.5 11" strokeLinecap="round"
            markerStart="url(#nfArrow)" markerEnd="url(#nfArrow)"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
          />
        )}

        <motion.path
          d="M 78 56 Q 200 544 322 56"
          fill="none"
          stroke="url(#nfGold)"
          strokeWidth="7"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
        />

        {showForge && (
          <motion.text
            x="200" textAnchor="middle"
            fontFamily="'Space Grotesk', sans-serif"
            fontSize="50" fontWeight="500" letterSpacing="15"
            fill="#F2F0EA"
            initial={{ opacity: 0, y: 396 }}
            animate={{ opacity: 1, y: 372 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            FO<tspan fill="#C9A84C">R</tspan>GE
          </motion.text>
        )}
      </svg>
    </div>
  );
}
