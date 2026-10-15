'use client';

import { useEffect, useRef, useState } from 'react';

/* ─── Data ───────────────────────────────────────────────── */
const COLS = ['Discover', 'Model', 'Design', 'Build', 'Ship'];

const ROWS: { name: string; phases: ('' | 'a' | 'f' | 'g')[] }[] = [
  { name: 'KSFOOD',          phases: ['a', 'a', 'g', 'g', ''] },
  { name: 'ClevaGO',         phases: ['a', 'a', 'a', '', ''] },
  { name: 'Empact',          phases: ['', '', 'f', 'f', 'f'] },
  { name: 'UrbanFresh',      phases: ['g', 'g', 'g', 'g', 'g'] },
  { name: 'Universal LMS',   phases: ['', '', 'f', 'f', 'f'] },
  { name: 'Eatventory',      phases: ['f', 'f', 'f', '', ''] },
  { name: 'Design Thinking', phases: ['f', 'f', 'f', '', ''] },
];

const HUE_MAP: Record<string, string> = {
  a: 'var(--analysis)',
  f: 'var(--frontend)',
  g: 'var(--fullstack)',
};

/* ─── Component ─────────────────────────────────────────── */
export default function CoverageMatrix({ caption }: { caption?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  let dotIndex = 0;

  return (
    <figure ref={ref} className="skill-matrix">
      {/* Header row */}
      <div className="matrix-h">
        <div>Coverage</div>
        {COLS.map((col) => (
          <div key={col}>{col}</div>
        ))}
      </div>

      {/* Project rows */}
      {ROWS.map((row) => (
        <div className="matrix-r" key={row.name}>
          <b>{row.name}</b>
          {row.phases.map((phase, j) => {
            const isOn = phase !== '';
            const delay = isOn ? dotIndex++ * 45 : 0;
            return (
              <div
                key={`${row.name}-${j}`}
                className={`matrix-cell ${isOn && inView ? 'on' : isOn ? '' : 'off'}`}
                style={isOn ? {
                  '--c': HUE_MAP[phase],
                  '--d': `${delay}ms`,
                } as React.CSSProperties : undefined}
              >
                <i />
              </div>
            );
          })}
        </div>
      ))}

      {/* Caption */}
      <figcaption
        style={{
          fontSize: '11.5px',
          color: 'var(--graphite)',
          padding: '10px 14px',
          borderTop: '1px solid var(--rule)',
        }}
      >
        {caption || 'Where each project sat in the delivery lifecycle. Fill colour marks the discipline I worked in.'}
      </figcaption>
    </figure>
  );
}
