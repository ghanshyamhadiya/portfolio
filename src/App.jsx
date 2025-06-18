import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import from react-router-dom

import Navbar from './components/Navbar';
import Hero from './components/Hero';
// import About from './components/About'; // If you decide to add it back later
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

import './index.css';

function App() {
  const { darkMode } = useSelector((state) => state.theme);

  // Apply dark mode class to document when component mounts or theme changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Router> {/* Wrap your entire app with Router */}
      <div className={`${darkMode ? 'dark bg-darkBg' : 'bg-white'} min-h-screen transition-colors duration-300`}>
        <Navbar />
        <main >
          <Routes> 
            <Route path="/" element={
              <>
                <Hero />
              </>
            } /> 
            <Route path="/skills" element={<Skills />} /> 
            <Route path="/projects" element={<Projects />} /> 
            <Route path="/contact" element={<Contact />} />  
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;