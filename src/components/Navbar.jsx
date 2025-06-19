import { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation

// Navigation links - updated to reflect typical route paths
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/skills', label: 'Skills' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
];

// Social links - consolidated and using Fi icons for consistency with current usage
const socialLinks = [
  { icon: <FiGithub />, href: 'https://github.com/ghanshyamhadiya', label: 'GitHub', color: 'hover:text-gray-100 group-hover:text-violet-300' },
  { icon: <FiLinkedin />, href: 'https://www.linkedin.com/in/ghanshyam-hadiya-13971b2bb', label: 'LinkedIn', color: 'hover:text-gray-100 group-hover:text-blue-300' },
   ];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation(); // Get current location (pathname)
  const [activePath, setActivePath] = useState(location.pathname); // Initialize with current path

  // Removed memoized NavLink component as we'll use Link directly
  // Removed memoized SocialIcon component as it's not strictly necessary with Link

  // Animation variants (remain the same)
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
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.4,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const menuItemVariants = {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  // Memoized scroll handler
  const handleScroll = useCallback(() => {
    const position = window.pageYOffset;
    setScrolled(position > 50);
  }, []);

  // Toggle mobile menu with memoized handler
  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  // Update activePath when location changes
  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);


  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <motion.nav
        className={`fixed w-full z-50 transition-all duration-500 ${scrolled
            ? 'bg-gray-900/95 backdrop-blur-lg py-3 shadow-lg shadow-black/30 border-b border-violet-900/30'
            : 'bg-transparent py-5'
          }`}
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          {/* Logo - now links to home route */}
          <motion.div
            className="text-xl font-bold text-white flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link to="/" className="flex items-center" onClick={() => setIsOpen(false)}> {/* Link to home, close menu */}
              <motion.span
                className="text-violet-400 mr-1"
                animate={{
                  opacity: [1, 0.7, 1],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                &lt;
              </motion.span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400">Ghanshyam</span>
              <motion.span
                className="text-violet-400 ml-1"
                animate={{
                  opacity: [1, 0.7, 1],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.2
                }}
              >
                /&gt;
              </motion.span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="flex space-x-6 mr-6">
              {navLinks.map((link) => (
                <motion.div // Wrap Link with motion.div for animations
                  key={link.href}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={link.href}
                    className={`relative py-2 px-1 text-base font-medium transition-colors ${activePath === link.href
                        ? 'text-white' // Active link style
                        : 'text-gray-300 hover:text-white'
                      }`}
                  >
                    {link.label}
                    {activePath === link.href && ( // Show underline for active link
                      <motion.div
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-violet-500 to-indigo-500"
                        layoutId="activeNavSection"
                        transition={{ duration: 0.3, type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Social Icons for Desktop (no change needed here as they use external links) */}
            <div className="flex space-x-4 border-l border-gray-700 pl-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 ${social.color} group transition-colors p-2 rounded-full hover:bg-gray-800/70`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button (no change needed here) */}
          <motion.button
            onClick={toggleMenu}
            className="md:hidden text-gray-200 focus:outline-none p-2 rounded-lg hover:bg-gray-800/70"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden fixed top-[64px] left-0 right-0 bottom-0 bg-gray-900/95 backdrop-blur-sm z-40 flex flex-col px-4"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="flex items-center flex-col space-y-4 mt-8 gap-5 ">
              {navLinks.map(({ href, label }) => (
                <motion.div // Wrap Link with motion.div for animations
                  key={href}
                  variants={menuItemVariants}
                >
                  <Link
                    to={href}
                    className={`px-4 py-3 text-lg rounded-md ${activePath === href
                        ? 'text-purple-400 font-medium bg-purple-400/10'
                        : 'text-gray-300'
                      } hover:text-purple-400 hover:bg-purple-400/5 transition-all duration-200`}
                    onClick={() => setIsOpen(false)} // Close menu on link click
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Social Icons for Mobile (no change needed here as they use external links) */}
            <motion.div
              className="mt-auto mb-8 flex justify-center space-x-6"
              variants={menuItemVariants}
            >
              {socialLinks.map(({ href, icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 flex flex-col items-center space-y-1 transition-colors duration-200"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  {icon}
                  <span className="text-xs">{label}</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
