import Hero from '@/components/Hero';
import About from '@/components/About';
import ProjectsGallery from '@/components/ProjectsGallery';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import { getSortedProjectsData } from '@/lib/markdown';

export default async function Home() {
  const projects = getSortedProjectsData();

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#ededed] font-[family-name:var(--font-geist-sans)] selection:bg-primary/30">
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b-0 border-white/5">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tighter">Russell Reece.</span>
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      <Hero />
      <About />
      <ProjectsGallery projects={projects} />
      <Experience />
      <Contact />
    </main>
  );
}
