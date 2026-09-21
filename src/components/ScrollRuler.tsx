'use client';

import { useEffect, useRef, useCallback } from 'react';

export default function ScrollRuler() {
  const ticksRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const buildTicks = useCallback(() => {
    const el = ticksRef.current;
    if (!el) return;
    el.innerHTML = '';
    const h = el.getBoundingClientRect().height;
    for (let y = 0; y < h; y += 20) {
      const tick = document.createElement('i');
      const major = Math.round(y) % 100 < 20;
      if (major) tick.className = 'maj';
      tick.style.top = `${y}px`;
      el.appendChild(tick);
      if (major) {
        const label = document.createElement('span');
        label.style.top = `${y + 3}px`;
        label.textContent = String(Math.round(y / 20) * 5);
        el.appendChild(label);
      }
    }
  }, []);

  const updateCursor = useCallback(() => {
    const tEl = ticksRef.current;
    const cEl = cursorRef.current;
    if (!tEl || !cEl) return;
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const pct = max > 0 ? window.scrollY / max : 0;
    const h = tEl.getBoundingClientRect().height;
    cEl.style.top = `${pct * h}px`;
  }, []);

  useEffect(() => {
    buildTicks();
    updateCursor();

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        updateCursor();
        rafRef.current = null;
      });
    };

    const onResize = () => {
      buildTicks();
      updateCursor();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [buildTicks, updateCursor]);

  return (
    <div className="scroll-ruler" aria-hidden="true">
      <div className="ticks" ref={ticksRef} />
      <div className="cursor-line" ref={cursorRef} />
    </div>
  );
}
