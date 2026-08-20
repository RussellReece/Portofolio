import React from 'react';

const techStack = [
  'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'HTML', 'CSS', 'JavaScript', 'MySQL', 'Figma', 'Google Apps Script', 'UML'
];

export default function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="glass rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                I merge analytical thinking with technical execution. My philosophy is rooted in understanding the core business processes before writing a single line of code. This dual approach as a System Analyst and Front-End Developer allows me to build solutions that are not just visually stunning, but functionally robust.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Whether it's streamlining supply chains with UML or crafting zero-latency interfaces with Next.js, I strive for excellence in every layer of the stack.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-6">Tech Stack & Tools</h3>
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech) => (
                  <span key={tech} className="px-4 py-2 rounded-full border border-gray-700 bg-gray-800/50 text-sm text-gray-200">
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
