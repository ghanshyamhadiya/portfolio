import { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX } from 'react-icons/hi';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/skills', label: 'Skills' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
];

const socialLinks = [
  { icon: <FiGithub />, href: 'https://github.com/ghanshyamhadiya', label: 'GitHub', color: 'hover:text-white' },
  { icon: <FiLinkedin />, href: 'https://www.linkedin.com/in/ghanshyam-hadiya-13971b2bb', label: 'LinkedIn', color: 'hover:text-white' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const mobileMenuVariants = {
    closed: {
      y: '100%',
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const menuItemVariants = {
    closed: { y: 20, opacity: 0 },
    open: { y: 0, opacity: 1 }
  };

  const handleScroll = useCallback(() => {
    const position = window.pageYOffset;
    setScrolled(position > 50);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      <motion.nav
        className={`fixed w-full z-50 transition-all duration-500 ${scrolled
          ? 'bg-gray-950/90 backdrop-blur-sm py-3 shadow-lg shadow-black/30'
          : 'bg-transparent py-5'
          }`}
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          {/* Logo */}
          <motion.div
            className="text-2xl font-black text-white flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link to="/" className="flex items-center" onClick={() => setIsOpen(false)}>
              <span className="text-yellow-400">&lt;</span>
              <span className="text-white">GH</span>
              <span className="text-yellow-400">/&gt;</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="flex space-x-6 mr-6">
              {navLinks.map((link) => (
                <motion.div
                  key={link.href}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={link.href}
                    className={`relative py-2 px-1 text-base font-medium transition-colors ${activePath === link.href
                      ? 'text-yellow-400'
                      : 'text-gray-300 hover:text-white'
                      }`}
                  >
                    {link.label}
                    {activePath === link.href && (
                      <motion.div
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400"
                        layoutId="activeNavSection"
                        transition={{ duration: 0.3, type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Social Icons for Desktop */}
            <div className="flex space-x-4 border-l border-gray-700 pl-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 ${social.color} transition-colors p-2 rounded-full hover:bg-gray-800/70`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden fixed bottom-[5%] left-1/2 -translate-x-1/2 w-[90%] rounded-xl z-40 bg-gray-950/90 backdrop-blur-sm shadow-2xl shadow-black/50 p-4 border border-white/10"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="flex justify-around items-center">
              {navLinks.map(({ href, label }) => (
                <motion.div key={href} variants={menuItemVariants}>
                  <Link
                    to={href}
                    className={`flex flex-col items-center text-sm font-medium transition-colors ${activePath === href
                      ? 'text-yellow-400'
                      : 'text-gray-400 hover:text-white'
                      }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span>{label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default memo(Navbar);
