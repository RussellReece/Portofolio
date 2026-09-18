import React from 'react';
import Link from 'next/link';
import { ArrowRight, Building2 } from 'lucide-react';

type ExperienceItem = { slug?: string; role: string; organization: string; year: string; description: string | string[] };
type ExperienceDictionary = { title: string; details: string; items: ExperienceItem[] };

export default function Experience({ dict, lang = 'en' }: { dict: ExperienceDictionary; lang?: string }) {
  const experiences = dict.items;

  return (
    <section id="experience" className="py-24 relative bg-gray-50 dark:bg-black/50">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">{dict.title}</h2>
        
        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary/50 before:to-transparent">
          {experiences.map((exp, idx) => (
            <div key={idx} style={{ animationDelay: `${idx * 100}ms` }} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active animate-[rise-in_600ms_ease-out_both]`}>
              {/* Icon */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-black bg-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
              
              {/* Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass p-6 rounded-2xl glass-hover">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                  <h3 className="font-bold text-xl">{exp.role}</h3>
                  <span className="text-sm font-medium text-primary mt-1 sm:mt-0">{exp.year}</span>
                </div>
                <h4 className="mb-3 flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300"><Building2 className="h-4 w-4 text-primary" />{exp.organization}</h4>
                <ul className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed list-disc list-outside ml-4 space-y-1.5 mb-4">
                  {(Array.isArray(exp.description) ? exp.description : [exp.description]).map((desc: string, i: number) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
                {exp.slug && (
                  <Link 
                    href={`/${lang}/experience/${exp.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors mt-2"
                  >
                    {dict.details}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
