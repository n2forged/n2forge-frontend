'use client';

import { motion } from 'framer-motion';

export default function LogoAnimation({ width = 400 }: { width?: number }) {
  const viewport = { once: true, amount: 0.4 } as const;

  return (
    <motion.svg
      viewBox="0 0 400 440"
      role="img"
      aria-label="N²Forge — a parabola on dotted axes above the word FORGE"
      style={{ width: '100%', maxWidth: width, height: 'auto', overflow: 'visible' }}
      initial="hidden"
      whileInView="shown"
      viewport={viewport}
    >
      <defs>
        <marker
          id="nfArrow"
          viewBox="0 0 12 12"
          refX="6"
          refY="6"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path
            d="M2 2 L10 6 L2 10"
            fill="none"
            stroke="#E8B95B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>

        <linearGradient id="nfGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F6DC95" />
          <stop offset="55%" stopColor="#E8B95B" />
          <stop offset="100%" stopColor="#B2902F" />
        </linearGradient>

        <radialGradient id="nfPool">
          <stop offset="0%" stopColor="#E8B95B" stopOpacity=".36" />
          <stop offset="100%" stopColor="#E8B95B" stopOpacity="0" />
        </radialGradient>
      </defs>

      <motion.ellipse
        cx="200"
        cy="300"
        rx="132"
        ry="46"
        fill="url(#nfPool)"
        variants={{ hidden: { opacity: 0 }, shown: { opacity: [0.2, 0.4, 0.2] } }}
        transition={{ duration: 6, delay: 2, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.line
        x1="200"
        y1="300"
        x2="200"
        y2="44"
        stroke="#E8B95B"
        strokeWidth="3.5"
        strokeDasharray="0.5 11"
        strokeLinecap="round"
        markerEnd="url(#nfArrow)"
        variants={{ hidden: { opacity: 0 }, shown: { opacity: 0.8 } }}
        transition={{ duration: 0.9, delay: 0.15 }}
      />

      <motion.line
        x1="44"
        y1="300"
        x2="356"
        y2="300"
        stroke="#E8B95B"
        strokeWidth="3.5"
        strokeDasharray="0.5 11"
        strokeLinecap="round"
        markerStart="url(#nfArrow)"
        markerEnd="url(#nfArrow)"
        variants={{ hidden: { opacity: 0 }, shown: { opacity: 0.8 } }}
        transition={{ duration: 0.9, delay: 0.4 }}
      />

      <motion.path
        d="M 78 56 Q 200 544 322 56"
        fill="none"
        stroke="url(#nfGold)"
        strokeWidth="7"
        strokeLinecap="round"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          shown: { pathLength: 1, opacity: 1 },
        }}
        transition={{ duration: 2.1, delay: 0.7, ease: [0.4, 0, 0.2, 1] }}
      />

      <motion.text
        x="200"
        y="372"
        textAnchor="middle"
        fontFamily="'Space Grotesk', sans-serif"
        fontSize="50"
        fontWeight="500"
        letterSpacing="15"
        fill="#F5F5F0"
        variants={{
          hidden: { opacity: 0, y: 22 },
          shown: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.9, delay: 2.8, ease: [0.2, 0.7, 0.3, 1] }}
      >
        FO<tspan fill="#E8B95B">R</tspan>GE
      </motion.text>
    </motion.svg>
  );
}
