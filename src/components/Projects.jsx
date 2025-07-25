import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import projectsData from '../data/projectData';
import ProjectCard from './ProjectCard';

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="projects" className="relative min-h-screen bg-gray-950">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-purple-600/10 filter blur-[100px]" />
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-indigo-600/10 filter blur-[100px]" />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, rgba(99, 102, 241, 0.05) 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 py-20 px-4 md:px-8 flex flex-col gap-4 items-center justify-center text-center">
        <div className="max-w-4xl mx-auto">
          <div className={`transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="flex items-center mb-6">
              <ChevronRight className="text-purple-400 mr-3 animate-pulse" size={24} />
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                Featured Projects
              </h2>
            </div>

            <p className="text-gray-400 text-lg md:text-xl mb-16 max-w-3xl leading-relaxed">
              Discover my latest work in web development and software engineering.
              Each project showcases my commitment to creating exceptional digital experiences
              with modern technologies and innovative solutions.
            </p>
          </div>

          {/* Project Cards */}
          <div className="relative">
            {projectsData.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
