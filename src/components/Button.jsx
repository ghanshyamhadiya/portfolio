import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // <--- IMPORTANT: Import Link

const Button = memo(({
  children,
  primary = true,
  onClick,
  className = '',
  to, // React Router 'to' prop
  type = 'button',
  download = false,
  href = null, // Regular 'href' for <a> tags
  icon = null,
  size = 'md'
}) => {
  // Enhanced base styles with better sizing options
  const baseStyles = "rounded-lg font-semibold transition-all flex items-center justify-center gap-2";

  // Size variants
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  // Enhanced color schemes with better contrast
  const primaryStyles = "bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-500 hover:to-indigo-500 hover:shadow-lg shadow-indigo-600/30 border border-indigo-500/30";
  const secondaryStyles = "bg-transparent border-2 border-violet-500 text-violet-300 hover:bg-violet-900/30 hover:text-violet-200 hover:shadow-lg shadow-violet-600/20";

  const buttonStyles = `${baseStyles} ${sizeStyles[size]} ${primary ? primaryStyles : secondaryStyles} ${className}`;

  const buttonVariants = {
    hover: {
      scale: 1.03,
      boxShadow: primary ?
        '0 10px 25px -5px rgba(99, 102, 241, 0.4)' :
        '0 10px 25px -5px rgba(139, 92, 246, 0.25)'
    },
    tap: { scale: 0.97 }
  };

  // Determine which component to render based on props
  let Component = 'button'; // Default to a button
  const propsToPass = {
    onClick,
    className: buttonStyles,
    whileHover: "hover",
    whileTap: "tap",
    variants: buttonVariants,
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.2 }
  };

  if (to) {
    Component = Link; // Render React Router's Link
    propsToPass.to = to; // Pass 'to' prop to Link
  } else if (href) {
    Component = 'a'; // Render a standard anchor tag
    propsToPass.href = href; // Pass 'href' prop to <a>
    if (download) {
      propsToPass.download = download; // Pass 'download' to <a> if specified
    }
    propsToPass.target = "_blank"; // Good practice for external links
    propsToPass.rel = "noopener noreferrer"; // Security for external links
  } else {
    propsToPass.type = type; // Pass 'type' to <button>
  }

  return (
    <motion.div
      className="inline-block" // Ensure motion.div doesn't break flex layout
      whileHover={{ scale: 1.03 }} // Apply hover animation to the wrapper
      whileTap={{ scale: 0.97 }} // Apply tap animation to the wrapper
    >
      <Component
        {...propsToPass} 
      >
        {icon && <span className="text-lg">{icon}</span>}
        {children}
      </Component>
    </motion.div>
  );
});

export default Button;