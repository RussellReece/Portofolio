'use client';
import React, { useState } from 'react';
import { ProjectData } from '@/lib/markdown';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowUpRight, Layers3 } from 'lucide-react';
import Image from 'next/image';

interface Props {
  projects: ProjectData[];
  dict: {
    title: string;
    subtitle: string;
    filters: Record<string, string>;
    viewProject: string;
    alsoBuiltTitle?: string;
    alsoBuiltSubtitle?: string;
  };
}

const CATEGORIES = [
  ['All', 'all'],
  ['Front-End', 'frontEnd'],
  ['System Analysis', 'systemAnalysis'],
  ['Full-Stack', 'fullStack'],
  ['UI / UX', 'uiUx'],
] as const;

export default function ProjectsGallery({ projects, dict }: Props) {
  const [activeCategory, setActiveCategory] = useState('All');
  const params = useParams();
  const lang = params?.lang || 'en';

  const matchesCategory = (category: string) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'UI / UX') {
      return category === 'UI / UX' || category === 'Design Thinking';
    }
    return category === activeCategory;
  };

  /* ── Split featured vs. minor (also-built) ── */
  const featuredProjects = projects.filter((p) => p.featured !== false);
  const alsoBuiltProjects = projects.filter((p) => p.featured === false);

  const filteredFeatured = featuredProjects.filter((p) => matchesCategory(p.category));
  const filteredAlsoBuilt = alsoBuiltProjects.filter((p) => matchesCategory(p.category));

  const getThumbnailStyle = (projectId: string) => {
    switch (projectId) {
      case 'clevago':
        return { objectPosition: 'center', transform: 'scale(1.18)' };
      case 'ks-food':
        return { objectPosition: 'center', transform: 'scale(2)' };
      case 'universal-lms':
        return { objectPosition: '25% center', transform: 'scale(1)' };
      default:
        return { objectPosition: 'center', transform: 'scale(1)' };
    }
  };

  /* ── Discipline colour for category badge ── */
  const getDisciplineClass = (category: string) => {
    if (category === 'System Analysis') return 'tag-a';
    if (category === 'Front-End' || category === 'UI / UX' || category === 'Design Thinking') return 'tag-f';
    if (category === 'Full-Stack') return 'tag-g';
    return '';
  };

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{dict.title}</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{dict.subtitle}</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {CATEGORIES.map(([category, key]) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full transition-all ${
                activeCategory === category
                  ? 'border border-ink bg-ink text-sheet dark:border-white/40 dark:bg-gray-950 dark:text-white'
                  : 'border border-rule bg-panel text-ink hover:border-ink hover:bg-sheet dark:border-white/25 dark:bg-gray-900/90 dark:text-white dark:hover:border-white/60 dark:hover:bg-gray-950 dark:hover:text-white'
              }`}
            >
              {dict.filters[key]}
            </button>
          ))}
        </div>

        {/* Featured cards */}
        {filteredFeatured.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFeatured.map((project, index) => {
              const thumbnailStyle = getThumbnailStyle(project.id);
              return (
                <Link
                  href={`/${lang}/projects/${project.id}`}
                  key={project.id}
                  style={{ animationDelay: `${index * 80}ms` }}
                  className="group block overflow-hidden rounded-2xl border border-gray-200/70 bg-white/60 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/15 dark:border-white/10 dark:bg-white/[0.04] animate-[rise-in_600ms_ease-out_both]"
                >
                  <div className="relative h-52 overflow-hidden bg-gradient-to-br from-primary/80 via-indigo-500 to-cyan-400">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,.32),transparent_30%),linear-gradient(135deg,transparent_45%,rgba(0,0,0,.28))] transition-transform duration-700 group-hover:scale-110" />
                    {project.image && (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        style={{ objectPosition: thumbnailStyle.objectPosition, transform: thumbnailStyle.transform }}
                        className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-110"
                      />
                    )}
                    <Layers3 className="absolute bottom-6 left-6 h-12 w-12 text-white/85 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110" />
                    <span className="absolute right-5 top-5 rounded-full border border-white/30 bg-black/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                      {project.category}
                    </span>
                    <span className="absolute bottom-5 right-5 flex translate-y-3 items-center gap-1 text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      {dict.viewProject}<ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="relative z-20 p-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="inline-block px-3 py-1 bg-white dark:bg-gray-900 text-xs font-semibold rounded-full border border-gray-200 dark:border-gray-700 text-primary">
                        {project.category}
                      </span>
                      {project.year && (
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-white/80 dark:bg-gray-900/80 px-2 py-1 rounded-full backdrop-blur-sm">
                          {project.year}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    {project.role && <p className="text-primary text-sm font-semibold mb-2">{project.role}</p>}
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{project.summary}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="text-xs text-gray-600 dark:text-gray-500 bg-gray-200 dark:bg-gray-900/50 px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* ── Also built — Redline spec: indexed, not carded ── */}
        {filteredAlsoBuilt.length > 0 && (
          <div className="mt-16">
            {/* Rail-style heading */}
            <div className="flex items-baseline gap-4 border-t border-rule pt-8 mb-2">
              <span className="font-archivo text-[15px] font-semibold text-ink dark:text-ink">
                {dict.alsoBuiltTitle ?? 'Also built'}
              </span>
              <span className="text-graphite text-sm">
                {dict.alsoBuiltSubtitle ?? 'Indexed, not carded'}
              </span>
            </div>

            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-ink dark:border-ink">
                  <th className="text-left text-[11.5px] font-semibold text-graphite pb-2 pr-4 w-[30%]">Project</th>
                  <th className="text-left text-[11.5px] font-semibold text-graphite pb-2 pr-4">What it is</th>
                  <th className="text-left text-[11.5px] font-semibold text-graphite pb-2 pr-4 hidden sm:table-cell w-[22%]">Stack</th>
                  <th className="text-left text-[11.5px] font-semibold text-graphite pb-2 hidden md:table-cell w-[10%]">Year</th>
                </tr>
              </thead>
              <tbody>
                {filteredAlsoBuilt.map((project) => (
                  <tr key={project.id} className="border-b border-rule group">
                    <td className="py-3 pr-4 align-top">
                      <Link
                        href={`/${lang}/projects/${project.id}`}
                        className="font-archivo text-[13.5px] font-semibold text-ink dark:text-ink hover:text-frontend transition-colors"
                      >
                        {project.title}
                      </Link>
                    </td>
                    <td className="py-3 pr-4 align-top text-graphite text-[14px] leading-snug">
                      {project.summary}
                    </td>
                    <td className="py-3 pr-4 align-top hidden sm:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {project.techStack.slice(0, 3).map((tech) => (
                          <span key={tech} className={`tag ${getDisciplineClass(project.category)}`}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 align-top text-graphite text-[13px] hidden md:table-cell whitespace-nowrap">
                      {project.year}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
