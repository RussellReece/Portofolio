'use client';

import { useEffect, useRef, useCallback } from 'react';

export interface DiagramNode {
  id: string;
  label: string;
  sublabel?: string;
  note: string;
  x: number;
  y: number;
  width: number;
  height: number;
  discipline: 'a' | 'f' | 'g'; // analysis, frontend, fullstack
}

export interface DiagramLine {
  d: string; // SVG path d attribute
  dashed?: boolean;
}

export interface DiagramAnnotation {
  text: string;
  x: number;
  y: number;
}

export interface SystemDiagramProps {
  viewBox: string;
  ariaLabel: string;
  caption: string;
  date: string;
  defaultCallout: string;
  nodes: DiagramNode[];
  lines: DiagramLine[];
  annotations?: DiagramAnnotation[];
  sectionLabels?: { text: string; x: number; y: number }[];
  separatorY?: number;
}

export default function SystemDiagram({
  viewBox,
  ariaLabel,
  caption,
  date,
  defaultCallout,
  nodes,
  lines,
  annotations = [],
  sectionLabels = [],
  separatorY,
}: SystemDiagramProps) {
  const frameRef = useRef<HTMLElement>(null);
  const calloutRef = useRef<HTMLParagraphElement>(null);
  const hasObserved = useRef(false);

  const primeFrame = useCallback(() => {
    const frame = frameRef.current;
    if (!frame || frame.dataset.primed) return;
    frame.dataset.primed = '1';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const boxes = frame.querySelectorAll('.dg-box');
    boxes.forEach((b, i) => {
      (b as HTMLElement).style.setProperty('--bd', `${i * 70}ms`);
    });

    const lineEls = frame.querySelectorAll('.dg-l');
    lineEls.forEach((ln, i) => {
      try {
        const pathEl = ln as SVGPathElement;
        const len = pathEl.getTotalLength();
        pathEl.style.strokeDasharray = String(len);
        pathEl.style.strokeDashoffset = reduceMotion ? '0' : String(len);
        pathEl.style.setProperty('--ld', `${220 + i * 90}ms`);
      } catch { /* non-path elements */ }
    });
  }, []);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || hasObserved.current) return;
    hasObserved.current = true;

    if (!('IntersectionObserver' in window)) {
      primeFrame();
      frame.classList.add('inview');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            primeFrame();
            requestAnimationFrame(() => {
              frame.classList.add('inview');
              frame.querySelectorAll('.dg-l').forEach((ln) => {
                (ln as SVGPathElement).style.strokeDashoffset = '0';
              });
            });
            observer.unobserve(frame);
          }
        });
      },
      { threshold: 0.28 }
    );

    observer.observe(frame);
    return () => observer.disconnect();
  }, [primeFrame]);

  const handleNodeEnter = (note: string) => {
    if (calloutRef.current) {
      calloutRef.current.textContent = note;
      calloutRef.current.classList.remove('is-default');
    }
  };

  const handleNodeLeave = () => {
    if (calloutRef.current) {
      calloutRef.current.textContent = defaultCallout;
      calloutRef.current.classList.add('is-default');
    }
  };

  const disciplineVar = (d: string) => {
    switch (d) {
      case 'a': return 'var(--analysis)';
      case 'f': return 'var(--frontend)';
      case 'g': return 'var(--fullstack)';
      default: return 'var(--analysis)';
    }
  };

  return (
    <figure ref={frameRef} className="diagram-frame">
      <div className="plate">
        <svg viewBox={viewBox} role="img" aria-label={ariaLabel} style={{ display: 'block', width: '100%', height: 'auto', minWidth: 540, margin: '0 auto', maxWidth: 820 }}>
          {/* Section labels */}
          {sectionLabels.map((sl, i) => (
            <text key={i} className="dg-s" x={sl.x} y={sl.y}>{sl.text}</text>
          ))}

          {/* Optional separator line */}
          {separatorY != null && (
            <line x1={14} y1={separatorY} x2={parseInt(viewBox.split(' ')[2]) - 14} y2={separatorY} stroke="var(--rule)" strokeWidth="1" />
          )}

          {/* Nodes */}
          {nodes.map((node) => (
            <g
              key={node.id}
              className="diagram-node"
              tabIndex={0}
              role="button"
              style={{ '--c': disciplineVar(node.discipline) } as React.CSSProperties}
              onMouseEnter={() => handleNodeEnter(node.note)}
              onFocus={() => handleNodeEnter(node.note)}
              onMouseLeave={handleNodeLeave}
              onBlur={handleNodeLeave}
            >
              <title>{node.note}</title>
              <rect
                className={`dg-box ${node.discipline}`}
                x={node.x}
                y={node.y}
                width={node.width}
                height={node.height}
                rx={2}
              />
              <text className="dg-t" x={node.x + node.width / 2} y={node.y + (node.sublabel ? node.height * 0.42 : node.height * 0.58)} textAnchor="middle">
                {node.label}
              </text>
              {node.sublabel && (
                <text className="dg-s" x={node.x + node.width / 2} y={node.y + node.height * 0.72} textAnchor="middle">
                  {node.sublabel}
                </text>
              )}
            </g>
          ))}

          {/* Lines */}
          {lines.map((line, i) => (
            <path
              key={i}
              className="dg-l"
              d={line.d}
              strokeDasharray={line.dashed ? '3 3' : undefined}
            />
          ))}

          {/* Annotations */}
          {annotations.map((ann, i) => (
            <text key={i} className="dg-note" x={ann.x} y={ann.y}>{ann.text}</text>
          ))}
        </svg>
      </div>
      <figcaption>
        <span>{caption}</span>
        <span>{date}</span>
      </figcaption>
      <p
        ref={calloutRef}
        className="diagram-callout is-default"
        data-default={defaultCallout}
      >
        {defaultCallout}
      </p>
    </figure>
  );
}
