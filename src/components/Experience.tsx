import React from 'react';

const experiences = [
  {
    role: 'Leadership & Project Manager',
    organization: 'HIMASIF',
    year: '2023 - Present',
    description: 'Managed organizational activities, led teams in executing technical events, and improved operational workflows.'
  },
  {
    role: 'Technical Lead',
    organization: 'Onelish Club',
    year: '2023',
    description: 'Spearheaded the development team for internal club platforms and organized coding workshops.'
  },
  {
    role: 'Master of Ceremonies',
    organization: 'International Benchmarking',
    year: '2022',
    description: 'Hosted and facilitated international benchmarking events, demonstrating strong communication and public speaking skills.'
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative bg-black/50">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Experience & Leadership</h2>
        
        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary/50 before:to-transparent">
          {experiences.map((exp, idx) => (
            <div key={idx} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active`}>
              {/* Icon */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-black bg-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
              
              {/* Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass p-6 rounded-2xl glass-hover">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                  <h3 className="font-bold text-xl text-white">{exp.role}</h3>
                  <span className="text-sm font-medium text-primary mt-1 sm:mt-0">{exp.year}</span>
                </div>
                <h4 className="text-gray-300 font-medium mb-3">{exp.organization}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
