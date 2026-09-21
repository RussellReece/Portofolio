'use client';
import React from 'react';
import { Trophy, ChevronRight, Medal, Award } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Map competition title prefix to slug
const titleToSlug: Record<string, string> = {
  'Semi-Finalist | BPC Logicodix 2025': 'logicodix-2025',
  'Semi-Finalis | BPC Logicodix 2025': 'logicodix-2025',
  'Semi-Finalist | Business Plan Competition GEM 2025': 'gem-2025',
  'Semi-Finalis | Business Plan Competition GEM 2025': 'gem-2025',
  'Semi-Finalist | Business Case Competition DIGICOFEST 2024': 'digicofest-2024',
  'Semi-Finalis | Business Case Competition DIGICOFEST 2024': 'digicofest-2024',
  'Participant | National Business Plan Competition (NBPC) 2 2026': 'nbpc-2026',
  'Peserta | National Business Plan Competition (NBPC) 2 2026': 'nbpc-2026',
  'Participant | PKM-KC 2025': 'pkm-kc-2025',
  'Peserta | PKM-KC 2025': 'pkm-kc-2025',
  'Participant | PKM-KC 2026': 'pkm-kc-2026',
  'Peserta | PKM-KC 2026': 'pkm-kc-2026',
  'Participant | ICT Recursion 2025': 'ict-recursion-2025',
  'Peserta | ICT Recursion 2025': 'ict-recursion-2025',
};

type AwardItem = { title: string; project: string; year: string; slug?: string };
type AwardsDictionary = { title: string; details: string; items: AwardItem[] };

export default function Awards({ dict, lang }: { dict: AwardsDictionary; lang: string }) {
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section id="awards" className="py-24 relative bg-gray-50 dark:bg-zinc-900/50">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3"
          >
            <Trophy className="w-8 h-8 text-yellow-500" />
            {dict.title}
          </motion.h2>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-4"
        >
          {dict.items.map((item, index) => {
            const isSemiFinalist = item.title.includes('Semi-');
            const cleanTitle = item.title.replace(/^(Semi-Finalist|Semi-Finalis|Participant|Peserta) \| /, '');
            const slug = item.slug || titleToSlug[item.title];
            
            const CardContent = (
              <>
                <div className="flex-1 flex flex-col md:flex-row gap-4 items-start md:items-center">
                  <div className={`flex-shrink-0 p-3 rounded-full ${isSemiFinalist ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                    {isSemiFinalist ? <Medal className="w-6 h-6" /> : <Award className="w-6 h-6" />}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider ${isSemiFinalist ? 'bg-amber-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}>
                        {isSemiFinalist ? (lang === 'id' ? 'Semi-Finalis' : 'Semi-Finalist') : (lang === 'id' ? 'Peserta' : 'Participant')}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{cleanTitle}</h3>
                    </div>
                    <p className="text-primary font-medium text-sm mt-1">{item.project}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100 dark:border-gray-800">
                  <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 bg-white/80 dark:bg-gray-800/80 px-4 py-1.5 rounded-full whitespace-nowrap border border-gray-200 dark:border-gray-700 shadow-sm">
                    {item.year}
                  </span>
                  {slug && (
                    <span className="flex items-center gap-1 text-xs font-bold text-primary whitespace-nowrap group-hover:translate-x-1 transition-transform">
                      {dict.details} <ChevronRight className="w-4 h-4" />
                    </span>
                  )}
                </div>
              </>
            );

            if (slug) {
              return (
                <motion.div variants={staggerItem} key={index}>
                  <Link
                    href={`/${lang}/competitions/${slug}`}
                    className="block bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 p-5 md:p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 transition-all duration-300 cursor-pointer"
                  >
                    {CardContent}
                  </Link>
                </motion.div>
              );
            }

            return (
              <motion.div variants={staggerItem} key={index}>
                <div
                  className="bg-white/60 dark:bg-gray-900/60 border border-gray-200/50 dark:border-gray-800/50 p-5 md:p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:shadow-md transition-all duration-300"
                >
                  {CardContent}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
