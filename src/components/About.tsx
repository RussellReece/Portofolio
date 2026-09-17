'use client';

import React from 'react';
import { motion } from 'framer-motion';

/** Unified tech stack data — each item carries its icon, colours, and label. */
const TECH_ITEMS = [
  { label: 'Next.js',   svg: 'nextjs_icon_dark', bg: '#000000', invert: true },
  { label: 'React',     svg: 'react',             bg: '#282C34' },
  { label: 'TypeScript', svg: 'typescript',        bg: '#3178C6' },
  { label: 'Tailwind CSS', svg: 'tailwindcss',     bg: '#0B1120' },
  { label: 'HTML',       svg: 'html5',             bg: '#E34F26' },
  { label: 'CSS',        svg: 'css',               bg: '#1572B6' },
  { label: 'JavaScript', svg: 'javascript',        bg: '#F7DF1E' },
  { label: 'MySQL',      svg: 'mysql',             bg: '#FFFFFF' },
  { label: 'Figma',      svg: 'figma',             bg: '#FFFFFF', fit: 'w-[46%] h-[46%]' },
  { label: 'Google Apps Script', text: 'GAS', bg: '#0F9D58' },
  { label: 'UML',        text: 'UML',  bg: '#EFA500' },
] as const;

/** Container-level stagger animation. */
const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

/** Per-item entrance animation. */
const itemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

function TechIcon({ item }: { item: (typeof TECH_ITEMS)[number] }) {
  const hasImage = 'svg' in item && item.svg;
  return (
    <div
      className="relative w-9 h-9 rounded-xl overflow-hidden shadow-sm shrink-0
                 grid place-items-center"
      style={{ backgroundColor: item.bg }}
    >
      {/* Top-highlight shine */}
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-b from-white/20 to-transparent" />
      {hasImage ? (
        <img
          src={`https://svgl.app/library/${item.svg}.svg`}
          alt=""
          draggable={false}
          className={`object-contain ${item.fit ?? 'w-[54%] h-[54%]'} ${item.invert ? 'brightness-0 invert' : ''}`}
        />
      ) : (
        <span className="text-white font-bold text-[9px] leading-none select-none">
          {'text' in item ? item.text : ''}
        </span>
      )}
    </div>
  );
}

export default function About({ dict }: { dict: any }) {
  return (
    <section id="about" className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="glass rounded-3xl p-8 md:p-12">
          {/* ── About text ─────────────────────────────── */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{dict.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {dict.p1}
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {dict.p2}
              </p>
            </div>

            {/* ── Unified Tech Stack Grid ──────────────── */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-xl font-semibold mb-5 text-center md:text-left w-full">
                {dict.techTitle}
              </h3>

              <motion.div
                className="flex flex-wrap gap-2.5 justify-center md:justify-start"
                variants={gridVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                {TECH_ITEMS.map((item) => (
                  <motion.div
                    key={item.label}
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.06,
                      boxShadow: `0 0 18px 2px ${item.bg}44`,
                    }}
                    className="group flex items-center gap-2 pl-1 pr-3.5 py-1
                               rounded-full border border-gray-200/60 dark:border-white/10
                               bg-white/60 dark:bg-white/5
                               backdrop-blur-md
                               cursor-default transition-colors duration-200
                               hover:border-primary/40 dark:hover:border-primary/40
                               hover:bg-white/80 dark:hover:bg-white/10"
                  >
                    <TechIcon item={item} />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200
                                     group-hover:text-gray-900 dark:group-hover:text-white
                                     transition-colors whitespace-nowrap">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
