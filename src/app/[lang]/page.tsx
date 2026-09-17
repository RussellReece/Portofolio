import Hero from '@/components/Hero';
import About from '@/components/About';
import ProjectsGallery from '@/components/ProjectsGallery';
import Awards from '@/components/Awards';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import { getSortedProjectsData } from '@/lib/markdown';
import { getDictionary } from '@/lib/dictionaries';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LangToggle } from '@/components/LangToggle';
import ClientCosmosBackground from '@/components/ClientCosmosBackground';

export default async function Home({ params }: { params: Promise<{ lang: 'en' | 'id' }> }) {
  const { lang } = await params;
  const projects = getSortedProjectsData();
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen font-[family-name:var(--font-inter)] transition-colors duration-300 relative z-0">
      <ClientCosmosBackground />
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-sm dark:shadow-none transition-all duration-300">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tighter">Russell Reece.</span>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-6 text-sm font-medium text-gray-500 dark:text-gray-400">
              <a href="#about" className="hover:text-black dark:hover:text-white transition-colors">{dict.nav.about}</a>
              <a href="#projects" className="hover:text-black dark:hover:text-white transition-colors">{dict.nav.projects}</a>
              <a href="#awards" className="hover:text-black dark:hover:text-white transition-colors">{dict.nav.awards}</a>
              <a href="#experience" className="hover:text-black dark:hover:text-white transition-colors">{dict.nav.experience}</a>
              <a href="#contact" className="hover:text-black dark:hover:text-white transition-colors">{dict.nav.contact}</a>
            </div>
            
            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-300 dark:border-gray-700">
              <ThemeToggle />
              <LangToggle currentLang={lang} />
            </div>
          </div>
        </div>
      </nav>

      <Hero dict={dict.hero} />
      <About dict={dict.about} />
      <ProjectsGallery projects={projects} dict={dict.projects} />
      <Awards dict={dict.awards} lang={lang} />
      <Experience dict={dict.experience} />
      <Contact dict={dict.contact} />
    </main>
  );
}
