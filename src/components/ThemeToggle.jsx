import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { toggleTheme } from '../features/themeSlice';

const ThemeToggle = () => {
  const { darkMode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <motion.button
      onClick={handleToggle}
      className="p-2 rounded-full bg-darkCard hover:bg-opacity-80 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {darkMode ? (
        <FiSun className="text-yellow-300" size={20} />
      ) : (
        <FiMoon className="text-blue-300" size={20} />
      )}
    </motion.button>
  );
};

export default ThemeToggle;