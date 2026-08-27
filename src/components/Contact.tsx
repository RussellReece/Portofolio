import React from 'react';
import { Mail, Code2, Globe } from 'lucide-react';

export default function Contact({ dict }: { dict: any }) {
  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{dict.title}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-12">
          {dict.description}
        </p>
        
        <div className="flex justify-center gap-6 mb-16">
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
        
        <footer className="text-gray-500 dark:text-gray-600 text-sm border-t border-gray-200 dark:border-gray-800 pt-8 mt-16">
          <p>© {new Date().getFullYear()} Russell Reece. {dict.rights}</p>
        </footer>
      </div>
    </section>
  );
}
