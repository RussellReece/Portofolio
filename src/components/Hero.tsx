'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail, Github, Linkedin, ChevronDown } from 'lucide-react';

/* ─── Animation helpers ──────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.7,
    delay,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8, delay },
});

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const staggerItem = {
  initial: { opacity: 0, y: 14 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

/* ─── Component ──────────────────────────────────────────── */
export default function Hero({ dict }: { dict: any }) {
  return (
    <section className="relative min-h-screen flex items-end pb-16 md:pb-24 overflow-hidden pt-28 md:pt-20">
      {/* Subtle ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-10 relative z-10 max-w-6xl">
        <div className="grid lg:grid-cols-[1fr,auto] gap-12 lg:gap-20 items-end">

          {/* ─── Left: Main content ───────────────────── */}
          <div>
            {/* Status badge */}
            <motion.div {...fadeUp(0.1)} className="mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                             bg-emerald-500/10 dark:bg-emerald-500/10
                             border border-emerald-500/20 dark:border-emerald-500/20
                             text-emerald-700 dark:text-emerald-400 text-sm font-medium">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                Available for opportunities
              </span>
            </motion.div>

            {/* Title block */}
            <motion.h1
              {...fadeUp(0.25)}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6"
            >
              <span className="text-gray-900 dark:text-white">{dict.title}</span>{' '}
              <span className="text-gradient">{dict.gradientText}</span>
              <br className="hidden sm:block" />
              <span className="text-gray-900 dark:text-white">{dict.subtitle}</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              {...fadeUp(0.4)}
              className="text-lg md:text-xl text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mb-10"
            >
              {dict.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              {...fadeUp(0.55)}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12"
            >
              <a
                href="#projects"
                className="group flex items-center justify-center gap-2.5 px-8 py-4
                         bg-primary text-white font-semibold rounded-full
                         shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35
                         hover:-translate-y-0.5 active:translate-y-0
                         transition-all duration-300"
              >
                {dict.viewProjects}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="#"
                className="group flex items-center justify-center gap-2.5 px-8 py-4
                         glass glass-hover font-semibold rounded-full
                         text-gray-800 dark:text-white
                         hover:-translate-y-0.5 active:translate-y-0
                         transition-all duration-300"
              >
                <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                {dict.downloadCv}
              </a>
            </motion.div>

            {/* Metric pills — quick glance credibility */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="flex flex-wrap gap-3"
            >
              {[
                { value: '5+', label: 'Projects' },
                { value: '7+', label: 'Competitions' },
                { value: '4+', label: 'Leadership Roles' },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={staggerItem}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full
                           bg-white/50 dark:bg-white/5
                           border border-gray-200/60 dark:border-white/10
                           backdrop-blur-md"
                >
                  <span className="text-lg font-bold text-gray-900 dark:text-white">{stat.value}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ─── Right: Social links (vertical) ──────── */}
          <motion.div
            {...fadeIn(0.8)}
            className="hidden lg:flex flex-col items-center gap-5 pb-4"
          >
            <div className="flex flex-col gap-3">
              <a
                href="mailto:rafaelrussellreece12@gmail.com"
                className="w-11 h-11 rounded-full glass flex items-center justify-center
                         text-gray-500 dark:text-gray-400
                         hover:text-primary hover:bg-primary/10 hover:border-primary/30
                         transition-all duration-200"
                aria-label="Email"
              >
                <Mail className="w-[18px] h-[18px]" />
              </a>
              <a
                href="https://github.com/RussellReece"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full glass flex items-center justify-center
                         text-gray-500 dark:text-gray-400
                         hover:text-primary hover:bg-primary/10 hover:border-primary/30
                         transition-all duration-200"
                aria-label="GitHub"
              >
                <Github className="w-[18px] h-[18px]" />
              </a>
              <a
                href="https://linkedin.com/in/russell-reece-625650364"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full glass flex items-center justify-center
                         text-gray-500 dark:text-gray-400
                         hover:text-primary hover:bg-primary/10 hover:border-primary/30
                         transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-[18px] h-[18px]" />
              </a>
            </div>
            <div className="w-px h-16 bg-gradient-to-b from-gray-300 dark:from-gray-600 to-transparent" />
          </motion.div>
        </div>

        {/* ─── Scroll indicator ──────────────────────── */}
        <motion.div
          {...fadeIn(1.2)}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs font-medium tracking-widest uppercase text-gray-400 dark:text-gray-500">
            Scroll
          </span>
          <ChevronDown className="w-4 h-4 text-gray-400 dark:text-gray-500 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
