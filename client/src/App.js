import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import Navigation from './components/Navigation/Navigation';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import SkillsCarousel from './components/Skills/SkillsCarousel';
import Projects from './components/Projects/Projects';
import CaseStudies from './components/CaseStudies/CaseStudies';
import Blog from './components/Blog/Blog';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import SEOHead from './components/SEO/SEOHead';

// Pages
import ProjectDetail from './pages/ProjectDetail';
import BlogPost from './pages/BlogPost';
import CaseStudyDetail from './pages/CaseStudyDetail';

// Hooks
import useScrollSpy from './hooks/useScrollSpy';

// Contexts
import { ThemeProvider } from './contexts/ThemeContext';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  
  const sections = ['home', 'about', 'skills', 'projects', 'case-studies', 'blog', 'contact'];
  const currentSection = useScrollSpy(sections);

  useEffect(() => {
    setActiveSection(currentSection);
  }, [currentSection]);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider>
      <div className="App">
        <SEOHead />
        
        <Routes>
          <Route path="/" element={
            <>
              <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
              <main>
                <section id="home">
                  <Hero />
                </section>
                <section id="about">
                  <About />
                </section>
                <section id="skills">
                  <SkillsCarousel />
                </section>
                <section id="projects">
                  <Projects />
                </section>
                <section id="case-studies">
                  <CaseStudies />
                </section>
                <section id="blog">
                  <Blog />
                </section>
                <section id="contact">
                  <Contact />
                </section>
              </main>
              <Footer />
              <ScrollToTop />
            </>
          } />
          
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/case-study/:id" element={<CaseStudyDetail />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;