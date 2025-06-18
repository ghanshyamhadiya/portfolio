import { useState, useEffect, useCallback, memo } from 'react';
import { ChevronRight, ExternalLink, Github, Code } from 'lucide-react';

// Sample projects data - replace with your own
const projectsData = [
  {
    id: 1,
    title: "Wanderlust Listing Platform",
    description: "wanderlustApp is a web platform that allows users to list and manage their properties, featuring user authentication and editing capabilities. It’s designed for property owners and travelers to easily share and update property listings.",
    tags: ["Node.js", "MongoDB", "Express", "EJS"],
    githubLink: "https://github.com/ghanshyamhadiya/wanderlustApp",
    liveLink: "https://wanderlustapp-2.onrender.com/listing",
  },
  {
    id: 2,
    title: "Blog Web App",
    description: "Real-time blog application that allows users to create, edit, and manage their blog posts. Features user authentication and a rich text editor.",
    tags: ["React", "APIs", "Firebase", "CSS3", "Bootstrap"],
    // additional tags can be added here
    githubLink: "https://github.com/ghanshyamhadiya/Blog-web",
    liveLink: "https://blog-webapp-xi.vercel.app/",
  },
  {
    id: 3,
    title: "Expense tracker",
    description: "A full-stack expense tracking web app built with Express, Node.js, and MongoDB. It features authentication, CRUD operations, income and expense tracking, savings goal management, and visual spending insights using Canvas-based charts.",
    tags: ["node.js", "Express", "Mongodb", "Bootstrap"],
    githubLink: "https://github.com/ghanshyamhadiya/expenseTracker/",
    liveLink: "https://expensetracker-00.onrender.com/expense",
  },
];

// Memoized project card component to prevent unnecessary re-renders
const ProjectCard = memo(({ project, isSelected, onClick, isVisible, index }) => (
  <div 
    className={`p-4 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 ${
      isSelected 
        ? 'bg-gray-800 border-l-4 border-purple-500' 
        : 'bg-gray-800/50 hover:bg-gray-800/70'
    }`}
    onClick={onClick}
    style={{ 
      transitionDelay: `${index * 50}ms`, // Reduced delay
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
    }}
  >
    <h3 className="font-medium text-lg text-white mb-2">{project.title}</h3>
    <div className="flex flex-wrap gap-2">
      {project.tags.slice(0, 3).map((tag, i) => (
        <span 
          key={i} 
          className="bg-gray-700 text-purple-300 text-xs px-2 py-1 rounded"
        >
          {tag}
        </span>
      ))}
      {project.tags.length > 3 && (
        <span className="text-gray-400 text-xs px-2 py-1">
          +{project.tags.length - 3} more
        </span>
      )}
    </div>
  </div>
));

// Memoized project details component
const ProjectDetails = memo(({ project, isVisible }) => (
  <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transform transition-all duration-300" 
    style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)'
    }}
  >
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-4">{project.title}</h2>
      <p className="text-gray-300 mb-6">{project.description}</p>
      
      <div className="mb-6 flex flex-wrap gap-2">
        {project.tags.map((tag, index) => (
          <span 
            key={index} 
            className="bg-gray-700 text-purple-300 text-xs px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-4">
        <a 
          href={project.githubLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
        >
          <Github size={16} />
          <span>Repository</span>
        </a>
        <a 
          href={project.liveLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg transition-colors duration-300"
        >
          <ExternalLink size={16} />
          <span>Live Demo</span>
        </a>
      </div>
    </div>
  </div>
));

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // Memoized project selection handler
  const handleSelectProject = useCallback((project) => {
    setSelectedProject(project);
  }, []);

  useEffect(() => {
    // Set visibility for animation when component mounts
    setIsVisible(true);
    
    // Set first project as selected by default
    setSelectedProject(projectsData[0]);
  }, []);

  return (
    <section id="projects" className="relative">
    <div className="bg-gray-900 text-gray-100 py-16 px-4 md:px-8 min-h-screen">
      <div className="max-w-6xl mx-auto mt-8">
        <div className={`transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex items-center mb-6">
            <ChevronRight className="text-purple-500 mr-2" size={20} />
            <h2 className="text-3xl font-bold text-purple-400">Projects</h2>
          </div>
          
          <p className="text-gray-400 mb-10 max-w-2xl">
            Explore my recent work across web development, design, and software engineering. Each project represents my passion for creating intuitive and impactful digital experiences.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Projects Listing - Left Side */}
            <div className="lg:col-span-1">
              <div className="space-y-4">
                {projectsData.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    isSelected={selectedProject?.id === project.id}
                    onClick={() => handleSelectProject(project)}
                    isVisible={isVisible}
                    index={index}
                  />
                ))}
              </div>
            </div>
            
            {/* Project Details - Right Side */}
            <div className="lg:col-span-2">
              {selectedProject && (
                <ProjectDetails 
                  project={selectedProject} 
                  isVisible={isVisible} 
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
}