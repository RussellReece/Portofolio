'use client';

import { useEffect, useRef, useCallback } from 'react';

export interface StatItem {
  value: string;        // The raw displayed value, e.g. "30+" or "~100"
  numericTarget?: number; // Numeric portion to count up to
  prefix?: string;      // e.g. "~"
  suffix?: string;      // e.g. "+"
  label: string;
  discipline?: 'a' | 'f' | 'g';
}

export default function StatStrip({ stats }: { stats: StatItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const disciplineVar = (d?: string) => {
    switch (d) {
      case 'a': return 'var(--analysis)';
      case 'f': return 'var(--frontend)';
      case 'g': return 'var(--fullstack)';
      default: return 'var(--fullstack)';
    }
  };

  const countUp = useCallback((fig: Element) => {
    const n = fig.querySelector('.stat-n') as HTMLElement;
    if (!n || n.dataset.done) return;
    n.dataset.done = '1';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const raw = n.textContent?.trim() || '';
    const m = raw.match(/^([~]?)(\d+)(\+?)(.*)$/);
    if (!m || reduceMotion) return;

    const prefix = m[1];
    const target = parseInt(m[2], 10);
    const suffix = m[3] + m[4];
    const dur = 750;
    let t0: number | null = null;

    n.textContent = `${prefix}0${suffix}`;

    const step = (t: number) => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = Math.round(target * eased);
      n.textContent = `${prefix}${v}${suffix}`;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || hasAnimated.current) return;

    if (!('IntersectionObserver' in window)) {
      el.querySelectorAll('.stat-fig').forEach((f) => {
        countUp(f);
        f.classList.add('inview');
      });
      hasAnimated.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            countUp(en.target);
            en.target.classList.add('inview');
            observer.unobserve(en.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    el.querySelectorAll('.stat-fig').forEach((f) => observer.observe(f));
    hasAnimated.current = true;

    return () => observer.disconnect();
  }, [countUp]);

  return (
    <div ref={containerRef} className="stat-strip my-6">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="stat-fig"
          style={{ '--c': disciplineVar(stat.discipline) } as React.CSSProperties}
        >
          <b className="stat-n">{stat.value}</b>
          <span className="stat-label">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
