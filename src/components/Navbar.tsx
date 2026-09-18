'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { LangToggle } from './LangToggle';

const sections = ['about', 'projects', 'awards', 'experience', 'contact'] as const;
type NavbarProps = { lang: 'en' | 'id'; dict: { nav: Record<typeof sections[number], string> } };

export default function Navbar({ lang, dict }: NavbarProps) {
  const [activeSection, setActiveSection] = useState('about');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const updateActiveSection = () => {
      const referencePoint = 128;
      let currentSection: typeof sections[number] = sections[0];

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element && element.getBoundingClientRect().top <= referencePoint) currentSection = section;
      });

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) {
        currentSection = 'contact';
      }

      setActiveSection(currentSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    document.addEventListener('scroll', updateActiveSection, { passive: true, capture: true });
    window.addEventListener('resize', updateActiveSection);
    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      document.removeEventListener('scroll', updateActiveSection, true);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200/70 bg-white/65 shadow-sm backdrop-blur-xl transition-colors dark:border-white/[0.04] dark:bg-black/25 dark:shadow-none">
      <div className="container mx-auto flex h-20 max-w-6xl items-center justify-between px-6 md:px-10">
        <a href="#top" className="text-xl font-bold tracking-tighter" onClick={closeMenu}>Russell Reece.</a>
        <div className="hidden items-center gap-6 md:flex">
          <div className="flex gap-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            {sections.map((section) => <a key={section} href={`#${section}`} className={`rounded-full px-3 py-2 transition-colors hover:text-gray-950 dark:hover:text-white ${activeSection === section ? 'bg-gray-200/80 text-gray-950 dark:bg-white/10 dark:text-white' : ''}`}>{dict.nav[section]}</a>)}
          </div>
          <div className="ml-2 flex items-center gap-3 border-l border-gray-300 pl-4 dark:border-gray-700"><ThemeToggle /><LangToggle currentLang={lang} /></div>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button type="button" onClick={() => setIsOpen((open) => !open)} aria-expanded={isOpen} aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'} className="grid h-10 w-10 place-items-center rounded-full border border-gray-200 text-gray-700 transition-colors hover:border-primary hover:text-primary dark:border-white/10 dark:text-gray-200">
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <div className={`overflow-hidden border-t border-gray-200/70 bg-white/90 transition-[max-height,opacity] duration-300 dark:border-white/[0.04] dark:bg-black/40 md:hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="container mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
          {sections.map((section) => <a key={section} href={`#${section}`} onClick={closeMenu} className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${activeSection === section ? 'bg-gray-200/80 text-gray-950 dark:bg-white/10 dark:text-white' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5'}`}>{dict.nav[section]}</a>)}
          <div className="mt-2 flex justify-end border-t border-gray-200 pt-3 dark:border-white/10"><LangToggle currentLang={lang} /></div>
        </div>
      </div>
    </nav>
  );
}