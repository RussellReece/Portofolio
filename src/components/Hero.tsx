import React from 'react';
import { ArrowRight, Download } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px]" />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          Crafting <span className="text-gradient">Logical Systems</span> <br className="hidden md:block" />
          & Interactive Web Experiences
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          System Analyst & Front-End Developer dedicated to translating complex business processes into seamless, high-performance digital solutions.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#projects" className="flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors">
            View Projects <ArrowRight className="w-5 h-5" />
          </a>
          <a href="#" className="flex items-center gap-2 px-8 py-4 glass glass-hover font-semibold rounded-full text-white">
            <Download className="w-5 h-5" /> Download CV
          </a>
        </div>
      </div>
    </section>
  );
}
