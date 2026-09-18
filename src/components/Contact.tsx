import React from 'react';
import { Mail, Code2, Globe, ArrowUpRight } from 'lucide-react';

type ContactDictionary = { title: string; description: string; rights: string; cta: string };

export default function Contact({ dict }: { dict: ContactDictionary }) {
  return (
    <section id="contact" className="relative overflow-hidden pb-8 pt-24">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-cyan-400/10" />
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{dict.title}</h2>
        <p className="text-gray-900 dark:text-gray-300 mb-12 font-medium">
          {dict.description}
        </p>
        
        <a href="https://wa.me/6288289387132" target="_blank" rel="noopener noreferrer" className="group relative mb-12 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/35">{dict.cta} <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
        <div className="mb-16 flex justify-center gap-6">
          <a href="mailto:rafaelrussellreece12@gmail.com" className="w-14 h-14 rounded-full glass flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all text-gray-800 dark:text-gray-200">
            <Mail className="w-6 h-6" />
          </a>
          <a href="https://github.com/RussellReece" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full glass flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all text-gray-800 dark:text-gray-200">
            <Code2 className="w-6 h-6" />
          </a>
          <a href="https://linkedin.com/in/russell-reece-625650364" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full glass flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all text-gray-800 dark:text-gray-200">
            <Globe className="w-6 h-6" />
          </a>
        </div>
        
        <footer className="mt-8 border-t border-gray-200 pt-6 text-sm text-gray-500 dark:border-gray-800 dark:text-gray-600">
          <p>© {new Date().getFullYear()} Russell Reece. {dict.rights}</p>
        </footer>
      </div>
    </section>
  );
}
