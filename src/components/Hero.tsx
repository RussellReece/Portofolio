import React from 'react';
import { ArrowRight, Download } from 'lucide-react';

export default function Hero({ dict }: { dict: any }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px]" />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          {dict.title} <span className="text-gradient">{dict.gradientText}</span> <br className="hidden md:block" />
          {dict.subtitle}
        </h1>
        <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
          {dict.description}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#projects" className="flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-full shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all duration-300">
            {dict.viewProjects} <ArrowRight className="w-5 h-5" />
          </a>
          <a href="#" className="flex items-center gap-2 px-8 py-4 glass glass-hover font-semibold rounded-full text-gray-900 dark:text-white">
            <Download className="w-5 h-5" /> {dict.downloadCv}
          </a>
        </div>
      </div>
    </section>
  );
}
