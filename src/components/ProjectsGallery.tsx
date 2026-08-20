'use client';
import React, { useState } from 'react';
import { ProjectData } from '@/lib/markdown';

interface Props {
  projects: ProjectData[];
}

const CATEGORIES = ['All', 'Front-End', 'System Analysis', 'Full-Stack'];

export default function ProjectsGallery({ projects }: Props) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = projects.filter(
    (project) => activeCategory === 'All' || project.category === activeCategory
  );

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">A selection of my recent work across system analysis and front-end development.</p>
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
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="glass rounded-2xl overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
              <div className="h-48 bg-gray-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10" />
                {/* Fallback pattern since we don't have real images yet */}
                <div className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-primary/20" />
              </div>
              <div className="p-6 relative z-20 -mt-8">
                <span className="inline-block px-3 py-1 bg-gray-900 text-xs font-semibold rounded-full border border-gray-700 mb-3 text-primary">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map(tech => (
                    <span key={tech} className="text-xs text-gray-500 bg-gray-900/50 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
