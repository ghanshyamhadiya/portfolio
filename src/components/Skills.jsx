import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileCode2, Palette, SquareCode, Atom, GitFork,
  Server, Rocket, Database, Send, Package, Grid
} from 'lucide-react';

const Skills = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const skillCategories = [
    { id: 'all', label: 'All Skills' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'tools', label: 'Tools & Others' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 150, damping: 12, duration: 0.4 }
    },
    exit: { opacity: 0, y: -20, scale: 0.9, transition: { duration: 0.2 } },
    hover: {
      y: -5,
      boxShadow: '0 8px 20px -4px rgba(99, 102, 241, 0.3)',
      borderColor: '#8B5CF6',
      scale: 1.03,
      rotate: 1
    }
  };

  const frontendSkills = [
    { name: 'HTML5', icon: <FileCode2 className="text-4xl sm:text-5xl text-[#E34F26]" />, category: 'frontend' },
    { name: 'CSS3', icon: <Palette className="text-4xl sm:text-5xl text-[#1572B6]" />, category: 'frontend' },
    { name: 'JavaScript', icon: <SquareCode className="text-4xl sm:text-5xl text-[#F7DF1E]" />, category: 'frontend' },
    { name: 'React', icon: <Atom className="text-4xl sm:text-5xl text-[#61DAFB]" />, category: 'frontend' },
    { name: 'Redux', icon: <GitFork className="text-4xl sm:text-5xl text-[#764ABC]" />, category: 'frontend' },
    { name: 'Tailwind CSS', icon: <Palette className="text-4xl sm:text-5xl text-[#06B6D4]" />, category: 'frontend' },
    { name: 'Bootstrap', icon: <Grid className="text-4xl sm:text-5xl text-[#563D7C]" />, category: 'frontend' },
  ];

  const backendSkills = [
    { name: 'Node.js', icon: <Server className="text-4xl sm:text-5xl text-[#339933]" />, category: 'backend' },
    { name: 'Express', icon: <Rocket className="text-4xl sm:text-5xl text-white" />, category: 'backend' },
    { name: 'MongoDB', icon: <Database className="text-4xl sm:text-5xl text-[#47A248]" />, category: 'backend' },
    { name: 'SQL', icon: <Database className="text-4xl sm:text-5xl text-[#00758F]" />, category: 'backend' },
    { name: 'EJS', icon: <SquareCode className="text-4xl sm:text-5xl text-[#A91E50]" />, category: 'backend' },
  ];

  const toolsSkills = [
    { name: 'Postman', icon: <Send className="text-4xl sm:text-5xl text-[#FFCA28]" />, category: 'tools' },
    { name: 'Git', icon: <GitFork className="text-4xl sm:text-5xl text-[#F05032]" />, category: 'tools' },
    { name: 'NPM', icon: <Package className="text-4xl sm:text-5xl text-[#CB3833]" />, category: 'tools' }
  ];

  const allSkills = [...frontendSkills, ...backendSkills, ...toolsSkills];

  const getFilteredSkills = () => {
    if (activeFilter === 'all') return allSkills;
    return allSkills.filter(skill => skill.category === activeFilter);
  };

  return (
    <section id="skills" className="py-16 sm:py-20 md:py-24 bg-gray-950 relative">
      {/* Consistent Background - Start */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Subtle, consistent radial gradients */}
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-purple-600/10 filter blur-[100px]" />
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-indigo-600/10 filter blur-[100px]" />
        {/* Unified dot pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, rgba(99, 102, 241, 0.05) 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }} />
      </div>
      {/* Consistent Background - End */}

      <div className="container mt-9 mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(to right, #818cf8, #a78bfa, #818cf8)' }}>
              Technical Skills
            </span>
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          ></motion.div>
          <motion.p
            className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Here are the technologies I work with to bring ideas to life.
          </motion.p>
        </motion.div>

{/* Filter Buttons */}
        <motion.div
          className="flex justify-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="flex flex-wrap gap-2 sm:gap-3 p-2 bg-gray-900/50 backdrop-blur-lg rounded-2xl border border-gray-800/50">
            {skillCategories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeFilter === category.id
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.icon}
                <span className="text-sm sm:text-base">{category.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {getFilteredSkills().map((skill) => (
                <motion.div
                  key={`${activeFilter}-${skill.name}`}
                  className="bg-gray-800/70 backdrop-blur-sm p-4 sm:p-6 rounded-xl flex flex-col items-center justify-center transition-all duration-300 border border-gray-700 group hover:border-indigo-500"
                  variants={itemVariants}
                  whileHover="hover"
                  layout
                  layoutId={skill.name}
                >
                  <motion.div
                    className="mb-3 sm:mb-4 group-hover:text-white"
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    transition={{ duration: 0.3 }}
                  >
                    {skill.icon}
                  </motion.div>
                  <h4 className="text-gray-300 group-hover:text-white font-medium text-center text-sm sm:text-base">
                    {skill.name}
                  </h4>
                  <motion.div
                    className="w-0 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 mt-2 rounded-full"
                    whileHover={{ width: '60%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          className="mt-12 sm:mt-16 bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-6 md:p-8 rounded-xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-center bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to right, #ec4899, #8b5cf6)' }}>My Learning Journey</h3>
          <div className="flex flex-col md:flex-row justify-around items-center gap-6">
            <div className="flex-1 flex flex-col items-center p-4 border border-gray-700 rounded-lg bg-gray-800/50 hover:bg-gray-700/60 transition-colors duration-300 transform hover:scale-105">
              <div className="text-indigo-400 text-4xl sm:text-5xl font-bold mb-2">1+</div>
              <div className="text-gray-300 text-center text-sm sm:text-base">Years of Web Development</div>
            </div>
            <div className="flex-1 flex flex-col items-center p-4 border border-gray-700 rounded-lg bg-gray-800/50 hover:bg-gray-700/60 transition-colors duration-300 transform hover:scale-105">
              <div className="text-indigo-400 text-4xl sm:text-5xl font-bold mb-2">15+</div>
              <div className="text-gray-300 text-center text-sm sm:text-base">Technologies Mastered</div>
            </div>
            <div className="flex-1 flex flex-col items-center p-4 border border-gray-700 rounded-lg bg-gray-800/50 hover:bg-gray-700/60 transition-colors duration-300 transform hover:scale-105">
              <div className="text-indigo-400 text-4xl sm:text-5xl font-bold mb-2">3+</div>
              <div className="text-gray-300 text-center text-sm sm:text-base">Major Projects Completed</div>
            </div>
          </div>
          <div className="text-gray-400 text-center mt-6 italic text-sm sm:text-base">
            Always growing, always learning - the journey never ends!
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;