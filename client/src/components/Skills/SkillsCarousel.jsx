import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useApi } from '../../hooks/useApi';

const SkillsCarousel = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const { data: skillsData, loading, error } = useApi('/skills');
  const [currentCategory, setCurrentCategory] = useState('frontend');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const categories = skillsData ? Object.keys(skillsData.categories) : [];
  const currentSkills = skillsData?.categories[currentCategory]?.skills || [];

  useEffect(() => {
    if (!isPaused && currentSkills.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % currentSkills.length);
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [currentSkills.length, isPaused]);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (loading) {
    return (
      <section className="section-padding bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="container-custom">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded-lg mb-12 w-1/2 mx-auto"></div>
            <div className="flex justify-center mb-12">
              <div className="flex space-x-4">
                {[1,2,3,4].map(i => <div key={i} className="h-10 w-20 bg-gray-200 rounded-full"></div>)}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1,2,3,4].map(i => <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>)}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section-padding bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="container-custom text-center">
          <p className="text-red-500">Error loading skills data.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-orange-50" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial="initial"
          animate={inView ? "animate" : "initial"}
          variants={staggerChildren}
        >
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-serif text-center text-gray-800 mb-12">
            Skills & Expertise
            <motion.span
              initial={{ width: 0 }}
              animate={inView ? { width: '120px' } : { width: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="block h-1 bg-gradient-to-r from-terracotta-500 to-gold-400 mt-2 mx-auto"
            />
          </motion.h2>
          
          {/* Category Tabs */}
          <motion.div variants={fadeInUp} className="flex justify-center mb-12">
            <div className="bg-white rounded-full p-2 shadow-xl">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => {
                    setCurrentCategory(category);
                    setCurrentIndex(0);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    currentCategory === category
                      ? 'bg-gradient-to-r from-terracotta-500 to-gold-400 text-white shadow-lg'
                      : 'text-gray-600 hover:text-terracotta-500 hover:bg-gray-50'
                  }`}
                >
                  {skillsData?.categories[category]?.name || category}
                </motion.button>
              ))}
            </div>
          </motion.div>
          
          {/* Skills Grid */}
          <motion.div 
            variants={fadeInUp} 
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCategory}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6"
              >
                {currentSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className={`card p-6 text-center cursor-pointer transition-all duration-300 ${
                      index === currentIndex ? 'ring-2 ring-terracotta-300 shadow-2xl' : ''
                    }`}
                  >
                    <div className="text-4xl mb-3">{skill.icon}</div>
                    <h3 className="font-semibold text-gray-800 mb-2">{skill.name}</h3>
                    
                    {/* Skill Level Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ delay: index * 0.1 + 0.5, duration: 1.2 }}
                        className="h-2 bg-gradient-to-r from-terracotta-500 to-gold-400 rounded-full"
                      />
                    </div>
                    
                    <span className="text-xs text-gray-500">{skill.level}%</span>
                    
                    {/* Tooltip */}
                    {skill.description && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap pointer-events-none z-10"
                      >
                        {skill.description}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {currentSkills.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex 
                      ? 'bg-terracotta-500 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            {/* Pause/Play Indicator */}
            <div className="absolute top-4 right-4">
              <motion.div
                animate={{ opacity: isPaused ? 1 : 0.5 }}
                className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center"
              >
                <span className="material-icons text-sm">
                  {isPaused ? 'play_arrow' : 'pause'}
                </span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsCarousel;