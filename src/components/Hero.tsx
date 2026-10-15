'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { KineticPhotoStack } from '@/components/ui/draggable-photo-stack';

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
  scroll: string;
  matrixCaption?: string;
  metrics: { projects: string; competitions: string; leadership: string };
};

/* ─── Component ──────────────────────────────────────────── */
export default function Hero({ dict }: { dict: HeroDictionary }) {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-24 md:pb-24 md:pt-32">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none dark:bg-primary/20 opacity-50" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none dark:bg-blue-500/15 opacity-50" />

      <div className="container mx-auto px-6 md:px-10 relative z-10 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* ─── Left: Main content ───────────────────── */}
          <div className="flex flex-col items-start">
            {/* Title block */}
            <motion.h1
              {...fadeUp(0.15)}
              className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
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
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl mb-10"
            >
              {dict.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              {...fadeUp(0.45)}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12 w-full sm:w-auto"
            >
              <a
                href="#projects"
                className="group flex items-center justify-center gap-2.5 px-8 py-4
                         bg-ink text-sheet font-semibold rounded-full
                         dark:bg-ink dark:text-sheet
                         shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35
                         hover:-translate-y-0.5 active:translate-y-0
                         transition-all duration-300 w-full sm:w-auto"
              >
                {dict.viewProjects}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="/assets/Russell_Reece_CV.pdf"
                download="Russell_Reece_CV.pdf"
                className="group flex items-center justify-center gap-2.5 px-8 py-4
                         glass glass-hover font-semibold rounded-full
                         text-gray-800 dark:text-white border border-gray-200 dark:border-white/10
                         hover:-translate-y-0.5 active:translate-y-0
                         transition-all duration-300 w-full sm:w-auto"
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
                  className="flex flex-col items-start px-5 py-3 rounded-2xl
                           bg-white/60 dark:bg-white/5
                           border border-gray-200/80 dark:border-white/10
                           backdrop-blur-md shadow-sm"
                >
                  <span className="text-2xl font-black text-gray-900 dark:text-white leading-none mb-1">{stat.value}</span>
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ─── Right: Kinetic Photo Stack ─────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center md:justify-end items-start relative w-full pt-1"
          >
            <KineticPhotoStack />
            {/* Decorative glow behind photo */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary/15 via-blue-400/10 to-transparent rounded-full blur-3xl opacity-60 pointer-events-none" />
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-label={dict.scroll}
      >
        <div className="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-primary rounded-full"
          />
        </div>
      </motion.div> */}
    </section>
  );
}
