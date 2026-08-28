import React from 'react';
import { Trophy } from 'lucide-react';

export default function Awards({ dict }: { dict: any }) {
  return (
    <section id="awards" className="py-24 relative bg-gray-50 dark:bg-zinc-900/50">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-500" />
            {dict.title}
          </h2>
        </div>

        <div className="space-y-6">
          {dict.items.map((item: any, index: number) => (
            <div key={index} className="glass p-6 md:p-8 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:-translate-y-1 transition-transform duration-300">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-primary font-medium">{item.project}</p>
              </div>
              <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 bg-white/80 dark:bg-gray-800/80 px-4 py-2 rounded-full whitespace-nowrap border border-gray-200 dark:border-gray-700">
                {item.year}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
