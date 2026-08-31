'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onComplete: () => void;
}

type Stage =
  | 'on2-appear'
  | 'hammer-swing'
  | 'impact'
  | 'shatter'
  | 'n2-float'
  | 'parabola-draw'
  | 'axes-draw'
  | 'forge-appear'
  | 'logo-settle';

export default function LogoAnimation({ onComplete }: Props) {
  const [stage, setStage] = useState<Stage>('on2-appear');
  const [sparks, setSparks] = useState<{ id: number; x: number; y: number }[]>([]);
  const [screenShake, setScreenShake] = useState(false);

  useEffect(() => {
    const timeline: { stage: Stage; delay: number }[] = [
      { stage: 'on2-appear', delay: 500 },
      { stage: 'hammer-swing', delay: 1500 },
      { stage: 'impact', delay: 2200 },
      { stage: 'shatter', delay: 2500 },
      { stage: 'n2-float', delay: 3000 },
      { stage: 'parabola-draw', delay: 3800 },
      { stage: 'axes-draw', delay: 5000 },
      { stage: 'forge-appear', delay: 5800 },
      { stage: 'logo-settle', delay: 6600 },
    ];

    const timers = timeline.map(({ stage, delay }) =>
      setTimeout(() => {
        setStage(stage);
        if (stage === 'impact') {
          setScreenShake(true);
          setSparks(
            Array.from({ length: 12 }, (_, i) => ({
              id: i,
              x: Math.random() * 200 - 100,
              y: Math.random() * 200 - 100,
            }))
          );
          setTimeout(() => {
            setScreenShake(false);
            setSparks([]);
          }, 400);
        }
        if (stage === 'logo-settle') {
          setTimeout(onComplete, 1000);
        }
      }, delay)
    );

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const showOn2 = ['on2-appear', 'hammer-swing'].includes(stage);
  const showHammer = stage === 'hammer-swing';
  const showImpact = stage === 'impact';
  const showShatter = stage === 'shatter';
  const showN2Float = stage === 'n2-float';
  const showParabola = ['parabola-draw', 'axes-draw', 'forge-appear', 'logo-settle'].includes(stage);
  const showAxes = ['axes-draw', 'forge-appear', 'logo-settle'].includes(stage);
  const showForge = ['forge-appear', 'logo-settle'].includes(stage);
  const isSettled = stage === 'logo-settle';

  return (
    <div
      className="relative w-[400px] h-[400px] flex items-center justify-center"
      style={{
        animation: screenShake ? 'shake 0.3s ease-in-out' : undefined,
      }}
    >
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translate(0, 0); }
          20% { transform: translate(-8px, 4px); }
          40% { transform: translate(8px, -4px); }
          60% { transform: translate(-4px, 8px); }
          80% { transform: translate(4px, -8px); }
        }
        @keyframes breathe {
          0%, 100% { filter: drop-shadow(0 0 8px #C9A84C); }
          50% { filter: drop-shadow(0 0 24px #C9A84C); }
        }
      `}</style>

      {/* O(n²) */}
      <AnimatePresence>
        {showOn2 && (
          <motion.div
            key="on2"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute font-heading font-bold text-[#C9A84C]"
            style={{ fontSize: '80px', filter: 'drop-shadow(0 0 20px #C9A84C)' }}
          >
            O(n²)
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hammer */}
      <AnimatePresence>
        {showHammer && (
          <motion.div
            key="hammer"
            initial={{ x: 180, y: -180, rotate: -45, opacity: 1 }}
            animate={{ x: 0, y: 0, rotate: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, ease: 'easeIn' }}
            className="absolute z-10"
          >
            <svg width="80" height="80" viewBox="0 0 80 80">
              <rect x="35" y="42" width="8" height="32" rx="2" fill="#444" stroke="#C9A84C" strokeWidth="1"/>
              <rect x="12" y="12" width="56" height="30" rx="4" fill="#2a2a2a" stroke="#C9A84C" strokeWidth="1.5"/>
              <rect x="12" y="12" width="56" height="10" rx="4" fill="#C9A84C" opacity="0.5"/>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Impact Flash */}
      <AnimatePresence>
        {showImpact && (
          <motion.div
            key="flash"
            initial={{ opacity: 1, scale: 0.3 }}
            animate={{ opacity: 0, scale: 4 }}
            transition={{ duration: 0.4 }}
            className="absolute w-24 h-24 rounded-full"
            style={{ background: 'radial-gradient(circle, #C9A84C, transparent)' }}
          />
        )}
      </AnimatePresence>

      {/* Sparks */}
      <AnimatePresence>
        {sparks.map((spark) => (
          <motion.div
            key={spark.id}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: spark.x, y: spark.y, opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="absolute w-2 h-2 rounded-full bg-[#C9A84C]"
          />
        ))}
      </AnimatePresence>

      {/* O( shatters left */}
      <AnimatePresence>
        {showShatter && (
          <motion.div
            key="o-shatter"
            initial={{ x: -30, opacity: 1 }}
            animate={{ x: -200, y: -120, opacity: 0, rotate: -60, scale: 0.2 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="absolute font-heading font-bold text-[#C9A84C]"
            style={{ fontSize: '80px' }}
          >
            O(
          </motion.div>
        )}
      </AnimatePresence>

      {/* ) shatters right */}
      <AnimatePresence>
        {showShatter && (
          <motion.div
            key="bracket-shatter"
            initial={{ x: 30, opacity: 1 }}
            animate={{ x: 200, y: 120, opacity: 0, rotate: 60, scale: 0.2 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="absolute font-heading font-bold text-[#C9A84C]"
            style={{ fontSize: '80px' }}
          >
            )
          </motion.div>
        )}
      </AnimatePresence>

      {/* n² floating */}
      <AnimatePresence>
        {showN2Float && (
          <motion.div
            key="n2-float"
            initial={{ opacity: 1, y: 0, scale: 1 }}
            animate={{ y: [0, -15, 0, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 1.2 }}
            className="absolute font-heading font-bold text-[#C9A84C]"
            style={{ fontSize: '80px', filter: 'drop-shadow(0 0 15px #C9A84C)' }}
          >
            n²
          </motion.div>
        )}
      </AnimatePresence>

      {/* Parabola + Logo */}
      <AnimatePresence>
        {showParabola && (
          <motion.div
            key="parabola"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute"
            style={{
              animation: isSettled ? 'breathe 2.5s ease-in-out infinite' : undefined,
            }}
          >
            <svg width="300" height="300" viewBox="0 0 300 300">
              <defs>
                <marker id="arrowUp" viewBox="0 0 10 10" refX="5" refY="10"
                  markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 10 L 5 0 L 10 10" fill="none" stroke="#C9A84C" strokeWidth="2"/>
                </marker>
                <marker id="arrowRight" viewBox="0 0 10 10" refX="10" refY="5"
                  markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10" fill="none" stroke="#C9A84C" strokeWidth="2"/>
                </marker>
                <marker id="arrowLeft" viewBox="0 0 10 10" refX="0" refY="5"
                  markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 10 0 L 0 5 L 10 10" fill="none" stroke="#C9A84C" strokeWidth="2"/>
                </marker>
              </defs>

              {/* Parabola curve */}
              <motion.path
                d="M 50 260 Q 150 60 250 260"
                fill="none"
                stroke="#C9A84C"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              />

              {/* Y axis */}
              {showAxes && (
                <motion.line
                  x1="150" y1="270" x2="150" y2="20"
                  stroke="#C9A84C"
                  strokeWidth="2"
                  markerEnd="url(#arrowUp)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6 }}
                />
              )}

              {/* X axis */}
              {showAxes && (
                <motion.line
                  x1="20" y1="260" x2="280" y2="260"
                  stroke="#C9A84C"
                  strokeWidth="2"
                  markerEnd="url(#arrowRight)"
                  markerStart="url(#arrowLeft)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                />
              )}

              {/* n² inside parabola */}
              <motion.text
                x="125" y="200"
                fill="white"
                fontSize="40"
                fontFamily="Space Grotesk, sans-serif"
                fontWeight="bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                n<tspan fontSize="22" dy="-14">2</tspan>
              </motion.text>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FORGE */}
      <AnimatePresence>
        {showForge && (
          <motion.div
            key="forge"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="absolute font-heading font-bold tracking-[12px] text-white"
            style={{ fontSize: '28px', top: '240px' }}
          >
            FORGE
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}