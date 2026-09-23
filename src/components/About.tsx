'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

/** Unified tech stack data — each item carries its icon, colours, and label. */
type TechItem = {
  label: string;
  bg: string;
  svg?: string;
  text?: string;
  fit?: string;
  invert?: boolean;
};

const TECH_ITEMS: TechItem[] = [
  { label: 'Next.js',   svg: 'nextjs',            bg: '#000000', invert: true },
  { label: 'React',     svg: 'react',             bg: '#282C34' },
  { label: 'TypeScript', svg: 'typescript',        bg: '#3178C6' },
  { label: 'Tailwind CSS', svg: 'tailwindcss',     bg: '#0B1120' },
  { label: 'HTML',       svg: 'html5',             bg: '#E34F26' },
  { label: 'CSS',        svg: 'css3',              bg: '#1572B6' },
  { label: 'JavaScript', svg: 'javascript',        bg: '#F7DF1E' },
  { label: 'MySQL',      svg: 'mysql',             bg: '#FFFFFF' },
  { label: 'Figma',      svg: 'figma',             bg: '#FFFFFF', fit: 'w-[46%] h-[46%]' },
  { label: 'Google Apps Script', text: 'GAS', bg: '#0F9D58' },
  { label: 'UML',        text: 'UML',  bg: '#EFA500' },
];

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
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

function TechIcon({ item }: { item: TechItem }) {
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
          src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${item.svg}/${item.svg}-original.svg`}
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

type AboutDictionary = { title: string; p1: string; p2: string; techTitle: string };

export default function About({ dict }: { dict: AboutDictionary }) {
  return (
    <section id="about" className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="glass rounded-3xl p-8 md:p-12">
          {/* ── About text ─────────────────────────────── */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="flex flex-col gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="relative order-first flex w-full aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-100/50 dark:bg-gray-900/50 text-gray-400 dark:text-gray-600 md:hidden"
              >
                <Image src="/assets/russell-formal.jpeg" alt="Russell Reece" fill sizes="100vw" className="object-cover" />
                <div className="text-center p-6">
                  <div className="bg-gray-200 dark:bg-gray-800 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="font-medium text-sm">Replace with your photo</p>
                </div>
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className="text-3xl md:text-4xl font-extrabold mb-2"
              >
                {dict.title}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
              >
                {dict.p1}
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
              >
                {dict.p2}
              </motion.p>
            </div>

            {/* ── Unified Tech Stack Grid ──────────────── */}
            <div className="flex flex-col items-center md:items-start">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="relative mb-10 hidden w-full aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-100/50 dark:bg-gray-900/50 text-gray-400 dark:text-gray-600 md:flex flex-col"
              >
                <Image src="/assets/russell-formal.jpeg" alt="Russell Reece" fill sizes="(max-width: 1024px) 50vw, 420px" className="object-cover" />
                <div className="text-center p-6">
                  <div className="bg-gray-200 dark:bg-gray-800 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-4">
                    <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="font-medium text-sm">Replace with your photo</p>
                </div>
              </motion.div>
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="text-xl font-semibold mb-5 text-center md:text-left w-full"
              >
                {dict.techTitle}
              </motion.h3>

              <motion.div
                className="flex flex-wrap gap-2.5 justify-center md:justify-start"
                variants={gridVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
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
