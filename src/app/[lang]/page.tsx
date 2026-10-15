import Hero from '@/components/Hero';
import About from '@/components/About';
import ProjectsGallery from '@/components/ProjectsGallery';
import Awards from '@/components/Awards';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Navbar from '@/components/Navbar';
import { getSortedProjectsData } from '@/lib/markdown';
import { getDictionary } from '@/lib/dictionaries';
import ClientCosmosBackground from '@/components/ClientCosmosBackground';
import CertificateGallery from '@/components/CertificateGallery';
import CoverageMatrix from '@/components/CoverageMatrix';

export default async function Home({ params }: { params: Promise<{ lang: 'en' | 'id' }> }) {
  const { lang } = await params;
  const projects = getSortedProjectsData(lang);
  const dict = await getDictionary(lang);

  return (
    <main id="top" className="relative z-0 min-h-screen font-[family-name:var(--font-inter)] transition-colors duration-300">
      <ClientCosmosBackground />
      <Navbar lang={lang} dict={dict} />

      <Hero dict={dict.hero} />
      <About dict={dict.about} />

      {/* ── Coverage Matrix: lifecycle × project grid (Redline) ── */}
      <section className="py-16 relative">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="mb-6">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-graphite mb-1">Coverage</h2>
            <p className="text-graphite text-sm">{dict.hero.matrixCaption}</p>
          </div>
          <CoverageMatrix />
        </div>
      </section>

      <ProjectsGallery projects={projects} dict={dict.projects} />
      <Awards dict={dict.awards} lang={lang} />
      <Experience dict={dict.experience} lang={lang} />
      <CertificateGallery lang={lang} />
      <Contact dict={dict.contact} />
    </main>
  );
}
