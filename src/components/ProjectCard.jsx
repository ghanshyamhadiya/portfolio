import { motion } from 'framer-motion';
import { ExternalLink, Github, Star } from 'lucide-react';

const ProjectCard = ({ project, index, scrollYProgress, totalCards }) => {
  const progress = Math.max(0, Math.min(1, (scrollYProgress * totalCards) - index));
  const nextProgress = Math.max(0, Math.min(1, (scrollYProgress * totalCards) - (index + 1)));

  const translateY = -progress * 50;
  const baseScale = 1 - progress * 0.05;
  // Add smooth scale increase when card is visible (progress < 0.8)
  const visibilityScale = progress < 0.8 ? 1.05 : 1;
  const finalScale = baseScale * visibilityScale;
  const opacity = 1 - nextProgress * 1.2;
  const zIndex = totalCards - index;

  // Show gradient border when card is visible
  const showGradient = progress < 0.8 && progress > 0.1;

  return (
    <motion.div
      className="sticky top-20 sm:top-24 md:top-28 h-fit mb-4 sm:mb-6 md:mb-8"
      style={{
        transform: `translateY(${translateY}px) scale(${finalScale})`,
        opacity,
        zIndex,
        pointerEvents: progress >= 1 ? 'none' : 'auto',
      }}
      transition={{ 
        scale: { duration: 0.3, ease: "easeOut" },
        transform: { duration: 0.1 }
      }}
    >
      <div className="group relative w-full rounded-2xl sm:rounded-3xl transition-all duration-300 hover:scale-[1.02] hover:z-50">
        {/* Gradient border - shows when card is visible */}
        <div 
          className={`absolute -inset-0.5 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-teal-400 to-blue-500 blur-md transition-opacity duration-500 ${
            showGradient ? 'opacity-75' : 'opacity-0'
          }`} 
        />
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-black/50 backdrop-blur-xl border border-white/10 shadow-2xl">
          <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 sm:mb-6 md:mb-8">
              <div className="flex gap-2 sm:gap-3 items-center mb-2 sm:mb-0">
                <span className="text-xs sm:text-sm text-gray-400">{project.year}</span>
                <span className="text-xs px-2 sm:px-3 py-1 rounded-full border text-green-300 border-green-500/20 bg-green-500/10">
                  {project.status}
                </span>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              {project.title}
            </h3>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
              {project.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="text-xs sm:text-sm px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full bg-white/5 border border-white/10 text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-3 sm:gap-4 flex-col sm:flex-row">
              <a 
                href={project.githubLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-white transition-all border border-white/10 text-sm sm:text-base"
              >
                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                View Code
              </a>
              <a 
                href={project.liveLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-teal-400 to-blue-500 hover:shadow-lg px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-white transition-all text-sm sm:text-base"
              >
                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                Live Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;