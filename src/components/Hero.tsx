'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';

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

type HeroDictionary = {
  portfolioLabel: string;
  name: string;
  title: string;
  gradientText: string;
  subtitle: string;
  description: string;
  viewProjects: string;
  downloadCv: string;
  metrics: { projects: string; competitions: string; leadership: string };
};

/* ─── Component ──────────────────────────────────────────── */
export default function Hero({ dict }: { dict: HeroDictionary }) {
  return (
    <section className="relative flex min-h-screen items-end overflow-hidden pb-16 pt-36 md:pb-24 md:pt-28">
      {/* Subtle ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-10 relative z-10 max-w-6xl">
        <div className="mx-auto max-w-4xl">

          {/* ─── Left: Main content ───────────────────── */}
          <div>
            {/* Title block */}
            <motion.p {...fadeUp(0.1)} className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-gray-800 dark:text-white">
              {dict.portfolioLabel}
            </motion.p>
            <motion.h1
              {...fadeUp(0.15)}
              className="mb-6 text-3xl font-extrabold leading-[1.08] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
            >
              <span className="block text-gray-900 dark:text-white">{dict.name}</span>
              <span className="text-gray-900 dark:text-white">{dict.title}</span>{' '}
              <span className="text-gradient">{dict.gradientText}</span>
              <br className="hidden sm:block" />
              <span className="text-gray-900 dark:text-white">{dict.subtitle}</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              {...fadeUp(0.3)}
              className="text-lg md:text-xl text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mb-10"
            >
              {dict.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              {...fadeUp(0.45)}
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
                { value: '5+', label: dict.metrics.projects },
                { value: '7+', label: dict.metrics.competitions },
                { value: '4+', label: dict.metrics.leadership },
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

        </div>

      </div>
    </section>
  );
}
