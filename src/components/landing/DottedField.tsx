'use client';

import { useEffect, useRef } from 'react';

export default function DottedField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let dots: { x: number; y: number; ox: number; oy: number }[] = [];
    const SPACING = 54;
    const RADIUS = 170;

    const build = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      dots = [];
      for (let x = SPACING / 2; x < window.innerWidth; x += SPACING) {
        for (let y = SPACING / 2; y < window.innerHeight; y += SPACING) {
          dots.push({ x, y, ox: x, oy: y });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (const d of dots) {
        const dx = d.ox - mouse.current.x;
        const dy = d.oy - mouse.current.y;
        const dist = Math.hypot(dx, dy);

        let tx = d.ox, ty = d.oy, alpha = 0.075, size = 1;

        if (dist < RADIUS) {
          const f = (1 - dist / RADIUS) ** 2;
          tx = d.ox + (dx / (dist || 1)) * f * 16;
          ty = d.oy + (dy / (dist || 1)) * f * 16;
          alpha = 0.075 + f * 0.5;
          size = 1 + f * 1.1;
        }

        d.x += (tx - d.x) * 0.1;
        d.y += (ty - d.y) * 0.1;

        ctx.beginPath();
        ctx.arc(d.x, d.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${alpha})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; };

    build();
    draw();
    window.addEventListener('resize', build);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', build);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0" aria-hidden="true" />;
}
