'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowRight, Building2, BriefcaseBusiness } from 'lucide-react';
import { motion } from 'framer-motion';

type ExperienceItem = { slug?: string; role: string; organization: string; year: string; description: string | string[] };
type ExperienceDictionary = { title: string; details: string; items: ExperienceItem[] };

export default function Experience({ dict, lang = 'en' }: { dict: ExperienceDictionary; lang?: string }) {
  const experiences = dict.items;

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 30 },
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
    <section id="experience" className="py-24 relative bg-gray-50/50 dark:bg-black/20 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-3xl md:text-4xl font-extrabold mb-16 text-center flex items-center justify-center gap-3"
        >
          <BriefcaseBusiness className="w-8 h-8 text-primary" />
          {dict.title}
        </motion.h2>
        
        {/* Enhanced Glowing Timeline Line */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[3px] before:bg-gradient-to-b before:from-transparent before:via-primary before:to-transparent before:shadow-[0_0_15px_rgba(59,130,246,0.5)] dark:before:shadow-[0_0_15px_rgba(59,130,246,0.3)]"
        >
          {experiences.map((exp, idx) => (
            <motion.div variants={staggerItem} key={idx} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group`}>
              {/* Icon */}
              <div className="flex items-center justify-center w-11 h-11 rounded-full border-4 border-white dark:border-zinc-950 bg-primary text-white shadow-lg shadow-primary/30 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform duration-300 group-hover:scale-110">
                <div className="w-2.5 h-2.5 bg-white rounded-full" />
              </div>
              
              {/* Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/80 dark:bg-zinc-900/80 p-6 md:p-8 rounded-2xl border border-gray-200/50 dark:border-gray-800/50 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
                  <h3 className="font-extrabold text-xl text-gray-900 dark:text-white leading-tight">{exp.role}</h3>
                  <span className="text-sm font-bold text-primary mt-2 sm:mt-0 bg-primary/10 px-3 py-1 rounded-full">{exp.year}</span>
                </div>
                <h4 className="mb-4 flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300"><Building2 className="h-4 w-4 text-primary" />{exp.organization}</h4>
                <ul className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed list-disc list-outside ml-4 space-y-2 mb-4">
                  {(Array.isArray(exp.description) ? exp.description : [exp.description]).map((desc: string, i: number) => (
                    <li key={i} className="pl-1">{desc}</li>
                  ))}
                </ul>
                {exp.slug && (
                  <Link 
                    href={`/${lang}/experience/${exp.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors mt-2 group/link"
                  >
                    {dict.details}
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
