import React from 'react';
import { Mail, Code2, Globe } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Connect</h2>
        <p className="text-gray-400 mb-12">
          I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
        </p>
        
        <div className="flex justify-center gap-6 mb-16">
          <a href="mailto:rafaelrussellreece12@gmail.com" className="w-14 h-14 rounded-full glass flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all">
            <Mail className="w-6 h-6" />
          </a>
          <a href="https://github.com/RussellReece" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full glass flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all">
            <Code2 className="w-6 h-6" />
          </a>
          <a href="https://linkedin.com/in/" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full glass flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all">
            <Globe className="w-6 h-6" />
          </a>
        </div>
        
        <footer className="text-gray-600 text-sm border-t border-gray-800 pt-8 mt-16">
          <p>© {new Date().getFullYear()} Russell Reece. All rights reserved.</p>
        </footer>
      </div>
    </section>
  );
}
