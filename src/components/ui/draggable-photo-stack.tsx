'use client';

import { useRef, useState, useEffect, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";

export type Photo = {
  id: number;
  title: string;
  place: string;
  year: string;
  src: string;
  tone: string;
};

const INITIAL_PHOTOS: Photo[] = [
  {
    id: 1,
    title: "Russell Reece",
    place: "Casual & Project Lead",
    year: "01",
    src: "/assets/russell-casual.png",
    tone: "#dedbd7",
  },
  {
    id: 2,
    title: "Systems Analyst",
    place: "Professional & Formal",
    year: "02",
    src: "/assets/russell-formal.jpeg",
    tone: "#f2c966",
  },
  {
    id: 3,
    title: "Campus & Research",
    place: "SATU University",
    year: "03",
    src: "/assets/russell-almet3.JPG",
    tone: "#8f799d",
  },
  {
    id: 4,
    title: "Pioneering Strategists",
    place: "Competitions & Projects",
    year: "04",
    src: "/assets/russell-almet2.JPG",
    tone: "#aeb8ce",
  },
];

const GLYPHS = {
  stack: (
    <>
      <rect x="5" y="5" width="14" height="14" rx="2" />
      <path d="M8 2h8M8 22h8" />
    </>
  ),
  fan: (
    <>
      <path d="m5 17 3.1-11.6a2 2 0 0 1 2.45-1.41l7.73 2.07a2 2 0 0 1 1.41 2.45l-3.1 11.6a2 2 0 0 1-2.45 1.41L6.42 19.45A2 2 0 0 1 5 17Z" />
      <path d="M8.5 18.8 4.1 17.6a2 2 0 0 1-1.42-2.45L5.5 4.62" />
    </>
  ),
  shuffle: (
    <>
      <path d="M3 7h3.5c5 0 5 10 10 10H21" />
      <path d="m18 14 3 3-3 3M3 17h3.5c1.5 0 2.6-.9 3.55-2.1M14 8.9C14.9 7.8 16 7 17.5 7H21" />
      <path d="m18 4 3 3-3 3" />
    </>
  ),
  arrow: <path d="m9 18 6-6-6-6" />,
  expand: (
    <>
      <path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5" />
      <path d="m3 8 6-6M21 8l-6-6M3 16l6 6M21 16l-6 6" />
    </>
  ),
  close: <path d="m6 6 12 12M18 6 6 18" />,
} as const;

function Icon({ name, size = 15 }: { name: keyof typeof GLYPHS; size?: number }) {
  return (
    <svg aria-hidden="true" fill="none" height={size} viewBox="0 0 24 24" width={size}>
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.55">
        {GLYPHS[name]}
      </g>
    </svg>
  );
}

export function KineticPhotoStack() {
  const [photos, setPhotos] = useState(INITIAL_PHOTOS);
  const [mode, setMode] = useState<"stack" | "fan">("stack");
  const [drag, setDrag] = useState({ x: 0, y: 0, active: false });
  const [thrown, setThrown] = useState<"left" | "right" | null>(null);
  const [shufflePulse, setShufflePulse] = useState(false);
  const start = useRef({ x: 0, y: 0 });
  const top = photos[0];

  const rotateDeck = (direction: "left" | "right") => {
    if (thrown || mode === "fan") return;
    setThrown(direction);
    window.setTimeout(() => {
      setPhotos((current) => [...current.slice(1), current[0]]);
      setThrown(null);
      setDrag({ x: 0, y: 0, active: false });
    }, 340);
  };

  const pointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (mode !== "stack" || thrown) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    start.current = { x: event.clientX, y: event.clientY };
    setDrag({ x: 0, y: 0, active: true });
  };

  const pointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.active || mode !== "stack") return;
    const x = event.clientX - start.current.x;
    const y = event.clientY - start.current.y;
    setDrag({ x, y, active: true });
  };

  const pointerUp = () => {
    if (!drag.active) return;
    if (Math.abs(drag.x) > 80) rotateDeck(drag.x > 0 ? "right" : "left");
    else {
      setDrag({ x: 0, y: 0, active: false });
    }
  };

  const shuffle = () => {
    if (shufflePulse || thrown) return;

    setShufflePulse(true);
    setMode("stack");

    const settleDelay = mode === "fan" ? 430 : 0;

    window.setTimeout(() => setThrown("right"), settleDelay);
    window.setTimeout(() => {
      setPhotos((current) => [...current.slice(1), current[0]]);
      setThrown(null);
    }, settleDelay + 340);

    window.setTimeout(() => setThrown("left"), settleDelay + 440);
    window.setTimeout(() => {
      setPhotos((current) => [...current.slice(1), current[0]]);
      setThrown(null);
      setShufflePulse(false);
    }, settleDelay + 780);
  };

  const mid = (photos.length - 1) / 2;

  return (
    <div className="kps-wrapper">
      <style>{STYLES}</style>
      <div className="kps-shell" aria-label="Draggable kinetic photo stack">
        <div className={`kps-stage ${mode} ${shufflePulse ? "shuffling" : ""}`}>
          <div className="kps-grain" />
          <div className="kps-controls">
            <div className="kps-switch" role="group" aria-label="Layout">
              <button
                aria-label="Stack view"
                className={mode === "stack" ? "active" : ""}
                onClick={() => setMode("stack")}
                type="button"
              >
                <Icon name="stack" />
              </button>
              <button
                aria-label="Fan view"
                className={mode === "fan" ? "active" : ""}
                onClick={() => setMode("fan")}
                type="button"
              >
                <Icon name="fan" />
              </button>
            </div>
            <button
              className="kps-shuffle"
              disabled={shufflePulse || Boolean(thrown)}
              onClick={shuffle}
              type="button"
            >
              <Icon name="shuffle" />
              <span>Shuffle</span>
            </button>
          </div>

          <div className="kps-deck" aria-live="polite">
            {[...photos].reverse().map((photo, reverseIndex) => {
              const index = photos.length - 1 - reverseIndex;
              const isTop = index === 0;
              const stackRotates = [-2.8, 2.4, -1.6, 3.2, -2.5];
              const stackRotate = stackRotates[index % stackRotates.length];
              const offset = index - mid;
              const fanX = offset * (mode === "fan" ? 95 : 95);
              const fanY = Math.abs(offset) * 16;
              const fanRotate = offset * 6.5;
              const topTransform =
                isTop && mode === "stack"
                  ? `translate3d(${drag.x}px,${drag.y}px,0) rotate(${drag.x * 0.045}deg)`
                  : undefined;
              const style = {
                "--stack-x": `${index * 5}px`,
                "--stack-y": `${index * 5}px`,
                "--stack-r": `${stackRotate}deg`,
                "--fan-x": `${fanX}px`,
                "--fan-y": `${fanY}px`,
                "--fan-r": `${fanRotate}deg`,
                "--card-tone": photo.tone,
                zIndex: photos.length - index,
                transform: topTransform,
              } as CSSProperties;

              return (
                <div
                  className={`kps-card ${isTop ? "top" : ""} ${isTop && thrown ? `thrown-${thrown}` : ""}`}
                  key={photo.id}
                  onPointerCancel={pointerUp}
                  onPointerDown={isTop ? pointerDown : undefined}
                  onPointerMove={isTop ? pointerMove : undefined}
                  onPointerUp={isTop ? pointerUp : undefined}
                  style={style}
                  role="img"
                  aria-label={photo.title}
                >
                  <span className="kps-photo">
                    <img alt={photo.title} draggable="false" src={photo.src} />
                    <span className="kps-shine" />
                  </span>
                  <span className="kps-card-copy">
                    <span>
                      <b>{photo.title}</b>
                      <small>{photo.place}</small>
                    </span>
                    <em>{photo.year}</em>
                  </span>
                </div>
              );
            })}
          </div>

          {mode === "stack" && (
            <div className="kps-nav">
              <button aria-label="Previous photo" onClick={() => rotateDeck("left")} type="button">
                <Icon name="arrow" />
              </button>
              <button aria-label="Next photo" onClick={() => rotateDeck("right")} type="button">
                <Icon name="arrow" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const STYLES = `
.kps-wrapper {
  --bg: var(--bg-color, #f1f3f2);
  --panel: var(--panel, #f7f9f8);
  --ink: var(--ink, #101c1f);
  --muted: var(--graphite, #56656a);
  --line: var(--rule, #c6cfcd);
  --soft: rgba(0, 0, 0, 0.05);
  --card: #fcfbf9;
  width: 100%;
  max-width: 520px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dark .kps-wrapper {
  --bg: #121415;
  --panel: #181b1c;
  --ink: #f1f3f2;
  --muted: #8d989a;
  --line: rgba(255, 255, 255, 0.12);
  --soft: rgba(255, 255, 255, 0.08);
  --card: #e8e3d9;
}

.kps-shell {
  width: 100%;
  position: relative;
}

.kps-controls {
  position: absolute;
  z-index: 25;
  top: -20px;
  right: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.kps-switch {
  display: flex;
  padding: 3px;
  border: 1px solid var(--line);
  border-radius: 9px;
  background: var(--soft);
  backdrop-filter: blur(8px);
}

.kps-switch button,
.kps-shuffle,
.kps-nav button {
  border: 0;
  color: var(--muted);
  cursor: pointer;
  transition: transform 0.16s, background-color 0.16s, color 0.16s, opacity 0.16s;
}

.kps-switch button {
  width: 30px;
  height: 28px;
  display: grid;
  place-items: center;
  border-radius: 6px;
  background: transparent;
}

.kps-switch button.active {
  background: var(--panel);
  color: var(--ink);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.kps-shuffle {
  height: 34px;
  padding: 0 11px;
  display: flex;
  align-items: center;
  gap: 6px;
  border: 1px solid var(--line);
  border-radius: 9px;
  background: var(--panel);
  color: var(--ink);
  font-size: 12px;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.kps-shuffle:hover:not(:disabled) {
  background: var(--soft);
}

.kps-shuffle:disabled {
  cursor: default;
  opacity: 0.48;
}

.kps-shuffle:active:not(:disabled),
.kps-switch button:active,
.kps-nav button:active {
  transform: scale(0.95);
}

.kps-stage {
  height: 440px;
  position: relative;
  isolation: isolate;
}

.kps-grain {
  display: none;
}

.kps-deck {
  position: absolute;
  left: 50%;
  top: 48%;
  width: 275px;
  height: 380px;
  transform: translate(-50%, -50%);
  perspective: 1100px;
}

.kps-card {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 10px 10px 0;
  border: 1px solid rgba(30, 29, 26, 0.16);
  border-radius: 12px;
  background: var(--card);
  color: #171714;
  text-align: left;
  box-shadow: 0 16px 40px rgba(29, 26, 19, 0.15), 0 2px 7px rgba(29, 26, 19, 0.09);
  transform: translate3d(var(--stack-x), var(--stack-y), 0) rotate(var(--stack-r));
  transform-origin: 50% 88%;
  transition: transform 0.48s cubic-bezier(0.2, 0.85, 0.25, 1), box-shadow 0.25s, filter 0.25s;
  cursor: grab;
  touch-action: none;
  user-select: none;
}

.kps-card.top {
  cursor: grab;
}

.kps-card.top:active {
  cursor: grabbing;
  box-shadow: 0 24px 70px rgba(29, 26, 19, 0.22);
}

.kps-photo {
  position: relative;
  display: block;
  width: 100%;
  height: 305px;
  overflow: hidden;
  border-radius: 6px;
  background: var(--card-tone);
}

.kps-photo img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  pointer-events: none;
  filter: saturate(0.96) contrast(1);
  transition: filter 0.3s;
}

.kps-shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(115deg, transparent 35%, rgba(255, 255, 255, 0.24) 47%, transparent 58%);
  transform: translateX(-120%);
  transition: transform 0.8s;
}

.kps-card:hover .kps-shine {
  transform: translateX(120%);
}

.kps-card-copy {
  height: 62px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 0 4px;
}

.kps-card-copy > span {
  display: grid;
  gap: 2px;
}

.kps-card-copy b {
  font-size: 13px;
  font-weight: 620;
  letter-spacing: -0.01em;
  color: #171714;
}

.kps-card-copy small {
  color: #77736b;
  font-size: 10.5px;
}

.kps-card-copy em {
  font: 10px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  color: #77736b;
  font-style: normal;
  font-weight: 600;
}

.kps-card.thrown-right {
  animation: kps-throw-right 0.34s ease-in forwards;
}

.kps-card.thrown-left {
  animation: kps-throw-left 0.34s ease-in forwards;
}

.kps-stage.fan .kps-deck {
  width: 260px;
}

.kps-stage.fan .kps-card {
  transform: translate3d(var(--fan-x), var(--fan-y), 0) rotate(var(--fan-r));
  cursor: default;
}

.kps-stage.fan .kps-card:hover {
  transform: translate3d(var(--fan-x), calc(var(--fan-y) - 14px), 0) rotate(var(--fan-r));
  z-index: 30 !important;
  box-shadow: 0 28px 65px rgba(29, 26, 19, 0.28);
}

.kps-nav {
  position: absolute;
  z-index: 25;
  right: 12px;
  bottom: 6px;
  display: flex;
  gap: 6px;
}

.kps-nav button {
  width: 35px;
  height: 35px;
  display: grid;
  place-items: center;
  border: 1px solid var(--line);
  border-radius: 50%;
  background: var(--panel);
  color: var(--ink);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.kps-nav button:first-child {
  transform: rotate(180deg);
}

.kps-nav button:first-child:active {
  transform: rotate(180deg) scale(0.95);
}

.kps-nav button:hover {
  background: var(--soft);
}



@keyframes kps-throw-right {
  0% { transform: translate3d(0, 0, 0) rotate(-2.5deg); opacity: 1; }
  45% { transform: translate3d(58%, 2px, 0) rotate(11deg); opacity: 1; }
  100% { transform: translate3d(18%, 20px, 0) rotate(3deg) scale(0.97); opacity: 0; }
}

@keyframes kps-throw-left {
  0% { transform: translate3d(0, 0, 0) rotate(-2.5deg); opacity: 1; }
  45% { transform: translate3d(-58%, 2px, 0) rotate(-11deg); opacity: 1; }
  100% { transform: translate3d(-18%, 20px, 0) rotate(-3deg) scale(0.97); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .kps-wrapper * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

@media (max-width: 640px) {
  .kps-wrapper {
    max-width: 320px;
  }
  .kps-stage {
    height: 460px;
  }
  .kps-deck {
    width: 240px;
    height: 335px;
  }
  .kps-photo {
    height: 265px;
  }
  .kps-card-copy {
    height: 56px;
  }
  .kps-controls {
    top: 14px;
    right: 14px;
  }
  .kps-shuffle {
    height: 30px;
    padding: 0 8px;
    font-size: 11px;
  }
  .kps-nav {
    right: 14px;
    bottom: 14px;
  }
}
`;
