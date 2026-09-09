import React from 'react';
import { Trophy, ChevronRight } from 'lucide-react';
import Link from 'next/link';

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

export default function Awards({ dict, lang }: { dict: any; lang: string }) {
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
          {dict.items.map((item: any, index: number) => {
            const slug = titleToSlug[item.title];
            const CardContent = (
              <>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-primary font-medium">{item.project}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 bg-white/80 dark:bg-gray-800/80 px-4 py-2 rounded-full whitespace-nowrap border border-gray-200 dark:border-gray-700">
                    {item.year}
                  </span>
                  {slug && (
                    <span className="flex items-center gap-1 text-xs font-semibold text-violet-600 dark:text-violet-400 whitespace-nowrap">
                      Details <ChevronRight className="w-3 h-3" />
                    </span>
                  )}
                </div>
              </>
            );

            if (slug) {
              return (
                <Link
                  key={index}
                  href={`/${lang}/competitions/${slug}`}
                  className="glass p-6 md:p-8 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:-translate-y-1 transition-transform duration-300 cursor-pointer block"
                >
                  {CardContent}
                </Link>
              );
            }

            return (
              <div
                key={index}
                className="glass p-6 md:p-8 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:-translate-y-1 transition-transform duration-300"
              >
                {CardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
