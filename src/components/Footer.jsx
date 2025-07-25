import React, { useState, memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineCode, HiOutlineMail } from 'react-icons/hi';
import { FiGithub, FiLinkedin } from 'react-icons/fi';

const SocialButton = memo(({ icon, href, label, color, bg }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`text-gray-300 w-10 h-10 rounded-full flex items-center justify-center border border-gray-700/50 backdrop-blur-sm transition-all duration-300 ${color} ${bg}`}
    whileHover={{ scale: 1.05, y: -3 }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.1 }}
    aria-label={label}
  >
    {icon}
  </motion.a>
));

const Footer = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const currentYear = new Date().getFullYear();

  const socialLinks = useMemo(() => [
    {
      icon: <FiGithub size={18} />,
      href: 'https://github.com/ghanshyamhadiya',
      label: 'GitHub',
      color: "hover:text-yellow-400",
      bg: "hover:bg-gray-800"
    },
    {
      icon: <FiLinkedin size={18} />,
      href: 'https://www.linkedin.com/in/ghanshyam-hadiya-13971b2bb',
      label: 'LinkedIn',
      color: "hover:text-yellow-400",
      bg: "hover:bg-gray-800"
    },
    {
      icon: <HiOutlineMail size={18} />,
      href: 'mailto:ghanshyamhadiya013@gmail.com',
      label: 'Email',
      color: "hover:text-yellow-400",
      bg: "hover:bg-gray-800"
    }
  ], []);

  const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.footer
      className="bg-gray-950 py-8 relative overflow-hidden font-inter"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-white/5 filter blur-[80px]" />
        <div className="absolute bottom-1/3 right-1/4 w-1/3 h-1/3 rounded-full bg-yellow-400/5 filter blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          className="text-center mb-6"
          variants={itemVariants}
        >
          <motion.h2
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-white mb-2 inline-block"
            whileHover={{ scale: 1.03 }}
          >
            Ghanshyam Hadiya
          </motion.h2>
          <p className="text-gray-300 max-w-md mx-auto text-base leading-relaxed">
            Building digital experiences with creativity and code.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-8"
          variants={itemVariants}
        >
          {socialLinks.map((link, index) => (
            <motion.div
              key={index}
              className="relative"
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <SocialButton
                href={link.href}
                icon={link.icon}
                label={link.label}
                color={link.color}
                bg={link.bg}
              />
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white text-gray-900 text-xs py-0.5 px-2 rounded-md whitespace-nowrap shadow-lg"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 2 }}
                    transition={{ duration: 0.15 }}
                  >
                    {link.label}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="border-t border-gray-800 pt-4 text-center"
          variants={itemVariants}
        >
          <p className="text-gray-400 text-xs">
            &copy; {currentYear} Ghanshyam Hadiya. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default memo(Footer);