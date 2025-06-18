import React, { useEffect, useRef, useState, memo, useMemo } from 'react';
import { motion, useAnimation, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { HiDownload, HiChevronDown, HiOutlineMail } from 'react-icons/hi';
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Button from './Button'; // Assuming Button is a custom component
import profileImage from '../assets/ghibli_profile.jpg';
import resumeImage from '../assets/Ghanshyam_Hadiya.pdf';

// Optimized SocialButton with memo to prevent unnecessary rerenders
const SocialButton = memo(({ icon, href, color, bg }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`text-gray-300 ${color} ${bg} transition-all w-10 h-10 rounded-full flex items-center justify-center border border-gray-700/50 backdrop-blur-sm`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.1 }}
  >
    {icon}
  </motion.a>
));

// Modern particle animation with reduced count
const Particles = memo(() => {
  // Keeping the particle count at 10 as per the newer version's optimization
  const particles = useMemo(() =>
    Array.from({ length: 10 }).map((_, i) => ({ // Using Array.from for clarity
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? 'rgba(99, 102, 241, 0.5)' : 'rgba(167, 139, 250, 0.5)',
      duration: 3 + Math.random() * 5,
      delay: Math.random() * 3
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            filter: "blur(1px)"
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            y: [0, -20, 0]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
});

// Modern text reveal animation to replace typewriter
const ModernTextReveal = memo(({ jobTitles }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % jobTitles.length);
      }, 500); // Wait for exit animation to complete
    }, 3000);

    return () => clearInterval(interval);
  }, [jobTitles]);

  return (
    <div className="text-indigo-400 relative h-12 flex items-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex} // Key forces re-render on index change
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {jobTitles[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
});

// Optimized ProfileImage with simplified animations and image loading
const ProfileImage = memo(() => (
  <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-96 lg:h-96">
    <motion.div
      className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-md border border-indigo-500/30 shadow-xl shadow-indigo-500/10"
      animate={{ rotate: [0, 0.5, 0, -0.5, 0] }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
    />
    <div className="absolute inset-4 rounded-2xl overflow-hidden bg-gradient-to-br p-[2px] from-indigo-500 via-purple-500 to-indigo-500">
      <div className="w-full h-full rounded-2xl overflow-hidden bg-gray-900 relative">
        <img
          src={profileImage}
          alt="Ghanshyam Hadiya"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/30 to-transparent mix-blend-overlay" />
        <div className="absolute top-0 left-[5%] right-[45%] h-[1px] bg-gradient-to-r from-transparent via-indigo-400/70 to-transparent" />
      </div>
    </div>
    <motion.div
      className="absolute w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 z-[-1]"
      style={{ top: '-5%', right: '-2%' }}
      animate={{ y: [0, -4, 0], rotate: [0, 3, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
));

// Glow background element for enhanced visuals
const GlowBackground = memo(() => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-indigo-600/10 filter blur-[100px]" />
  </div>
));

const Hero = () => {
  const controls = useAnimation();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Optimized scroll transformations
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacitySection = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.97]);

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1, duration: 0.4, ease: "easeOut" }
    })
  };

  const jobTitles = useMemo(() => [
    "Full Stack Developer",
    "React Developer",
    "Node.js Engineer",
    "UI/UX Enthusiast"
  ], []);

  const socialLinks = useMemo(() => [
    { icon: <FiGithub size={20} />, href: "https://github.com/ghanshyamhadiya", color: "hover:text-indigo-400", bg: "hover:bg-indigo-900/50" },
    { icon: <FiLinkedin size={20} />, href: "https://linkedin.com", color: "hover:text-blue-400", bg: "hover:bg-blue-900/50" },
    { icon: <FiTwitter size={20} />, href: "https://twitter.com", color: "hover:text-sky-400", bg: "hover:bg-sky-900/50" }
  ], []);

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="min-h-screen flex items-center bg-gray-900 py-16 md:py-20 relative overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-indigo-900/30 via-gray-900/50 to-purple-900/20"
        style={{ y: yBg }}
      />

      {/* Enhanced background elements */}
      <GlowBackground />

      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(99, 102, 241, 0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          backgroundPosition: '-20px -20px',
          transform: 'perspective(1000px) rotateX(60deg) translateY(-100px)',
          transformOrigin: 'center center'
        }} />
      </div>

      <Particles />

      <motion.div
        className="container mx-auto px-4 lg:px-8 relative z-10"
        style={{ opacity: opacitySection, scale }}
      >
        <div className="flex mt-7 flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
          <motion.div
            className="w-full lg:w-3/5 text-center lg:text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="inline-block p-2 px-4 rounded-full bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-500/20 backdrop-blur-sm mb-4 md:mb-6 mt-4"
              custom={0}
              variants={textVariants}
              initial="hidden"
              animate={controls}
            >
              <span className="text-indigo-300 font-medium text-sm">Hello World, I'm</span>
            </motion.div>

            <motion.h1
              custom={1}
              variants={textVariants}
              initial="hidden"
              animate={controls}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight"
            >
              Ghanshyam <span className="inline-block relative">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-500">Hadiya</span>
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-500/15 via-purple-500/15 to-indigo-500/15 blur-lg -z-10 opacity-40"></span>
              </span>
            </motion.h1>

            <motion.div
              custom={2}
              variants={textVariants}
              initial="hidden"
              animate={controls}
              className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-200 mb-6 md:mb-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2"
            >
              <span>I'm a</span>
              <ModernTextReveal jobTitles={jobTitles} />
            </motion.div>

            <motion.p
              custom={3}
              variants={textVariants}
              initial="hidden"
              animate={controls}
              className="text-gray-300 text-base md:text-lg mb-8 md:mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              I build modern web applications with cutting-edge technologies.
              Passionate about creating elegant solutions to complex problems
              and delivering exceptional user experiences.
            </motion.p>

            <motion.div
              custom={4}
              variants={textVariants}
              initial="hidden"
              animate={controls}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <Button
                href={resumeImage}
                download={true}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-5 py-3 rounded-full transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-indigo-500/30 text-sm md:text-base"
              >
                <HiDownload size={18} className="mr-2" /> Download Resume
              </Button>
              {/* Changed 'href' to 'to' and passed component={Link} */}
              <Button
                primary={false}
                to="/contact" // Use 'to' prop for React Router Link
                component={Link} // Pass Link component
                className="border border-indigo-500/50 text-indigo-300 hover:bg-indigo-800/30 px-5 py-3 rounded-full transition-all duration-200 transform hover:scale-[1.02] text-sm md:text-base"
              >
                <HiOutlineMail size={18} className="mr-2" /> Contact Me
              </Button>
            </motion.div>

            <motion.div
              custom={5}
              variants={textVariants}
              initial="hidden"
              animate={controls}
              className="flex mt-8 md:mt-10 gap-4 md:gap-6 justify-center lg:justify-start"
            >
              {socialLinks.map((social, index) => (
                <SocialButton
                  key={index}
                  href={social.href}
                  icon={social.icon}
                  color={social.color}
                  bg={social.bg}
                />
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="w-full sm:w-3/4 lg:w-2/5 flex justify-center lg:justify-end mt-8 lg:mt-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ProfileImage />
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
};

export default memo(Hero);