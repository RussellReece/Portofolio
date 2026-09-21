'use client';
import React from 'react';
import { Mail, Code2, Globe, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

type ContactDictionary = { title: string; description: string; rights: string; cta: string };

export default function Contact({ dict }: { dict: ContactDictionary }) {
  return (
    <section id="contact" className="relative overflow-hidden py-32 bg-zinc-950">
      {/* Vibrant Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/90 via-indigo-900/90 to-blue-900/90 dark:from-violet-950 dark:via-indigo-950 dark:to-zinc-950" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgMzBMMzAgMCA2MCAzMCAzMCA2MHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSsyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+')] opacity-40 mix-blend-overlay" />
      
      {/* Decorative Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-primary/20 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/20 blur-[100px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-6 max-w-3xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white tracking-tight">{dict.title}</h2>
          <p className="text-lg text-white/80 mb-12 font-medium max-w-xl mx-auto leading-relaxed">
            {dict.description}
          </p>
          
          <motion.a 
            href="https://wa.me/6288289387132" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group relative mb-16 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-bold text-indigo-900 shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(255,255,255,0.5)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {dict.cta} 
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </motion.a>
        </motion.div>

        <motion.div 
          className="mb-16 flex justify-center gap-6"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {[
            { icon: Mail, href: "mailto:rafaelrussellreece12@gmail.com", label: "Email" },
            { icon: Code2, href: "https://github.com/RussellReece", label: "GitHub" },
            { icon: Globe, href: "https://linkedin.com/in/russell-reece-625650364", label: "LinkedIn" }
          ].map((item, index) => (
            <motion.a 
              key={item.label}
              href={item.href} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-16 h-16 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white transition-colors hover:bg-white/20 hover:border-white/40"
              whileHover={{ y: -8, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1, type: 'spring', stiffness: 200 }}
              aria-label={item.label}
            >
              <item.icon className="w-7 h-7" />
            </motion.a>
          ))}
        </motion.div>
        
        <motion.footer 
          className="mt-12 border-t border-white/10 pt-8 text-sm text-white/50 font-medium"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <p>© {new Date().getFullYear()} Russell Reece. {dict.rights}</p>
        </motion.footer>
      </div>
    </section>
  );
}
