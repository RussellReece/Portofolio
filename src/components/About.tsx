import React from 'react';

const techStack = [
  'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'HTML', 'CSS', 'JavaScript', 'MySQL', 'Figma', 'Google Apps Script', 'UML'
];

export default function About({ dict }: { dict: any }) {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="glass rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{dict.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {dict.p1}
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {dict.p2}
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-6">{dict.techTitle}</h3>
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech) => (
                  <span key={tech} className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-100/50 dark:bg-gray-800/50 text-sm text-gray-700 dark:text-gray-200">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
