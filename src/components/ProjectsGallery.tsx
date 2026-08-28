'use client';
import React, { useState } from 'react';
import { ProjectData } from '@/lib/markdown';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Props {
  projects: ProjectData[];
  dict: any;
}

const CATEGORIES = ['All', 'Front-End', 'System Analysis', 'Full-Stack'];

export default function ProjectsGallery({ projects, dict }: Props) {
  const [activeCategory, setActiveCategory] = useState('All');
  const params = useParams();
  const lang = params?.lang || 'en';

  const filteredProjects = projects.filter(
    (project) => activeCategory === 'All' || project.category === activeCategory
  );

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{dict.title}</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{dict.subtitle}</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full transition-all ${
                activeCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 dark:bg-gray-800/50 text-gray-700 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Link href={`/${lang}/projects/${project.id}`} key={project.id} className="glass rounded-2xl overflow-hidden group hover:-translate-y-2 transition-transform duration-300 block">
              <div className="h-48 bg-gray-200 dark:bg-gray-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-100 dark:from-gray-900 to-transparent z-10" />
                {/* Fallback pattern */}
                <div className="w-full h-full object-cover opacity-30 dark:opacity-50 group-hover:opacity-100 transition-opacity bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-primary/20" />
              </div>
              <div className="p-6 relative z-20 -mt-8">
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
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{project.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map(tech => (
                    <span key={tech} className="text-xs text-gray-600 dark:text-gray-500 bg-gray-200 dark:bg-gray-900/50 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
