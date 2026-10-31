import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Hero = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [displayText, setDisplayText] = useState('');
  const fullText = "Hello, I'm Ishika";
  
  useEffect(() => {
    if (inView) {
      let index = 0;
      const timer = setInterval(() => {
        if (index <= fullText.length) {
          setDisplayText(fullText.slice(0, index));
          index++;
        } else {
          clearInterval(timer);
        }
      }, 100);
      
      return () => clearInterval(timer);
    }
  }, [inView]);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const scrollToProjects = () => {
    document.getElementById('projects').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-50 pt-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1] 
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-terracotta-200 to-gold-200 rounded-full opacity-20"
        />
        <motion.div
          animate={{ 
            rotate: [360, 0],
            scale: [1.1, 1, 1.1] 
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-8 -left-8 w-96 h-96 bg-gradient-to-tr from-gold-200 to-terracotta-200 rounded-full opacity-20"
        />
      </div>

      <div className="container-custom relative z-10" ref={ref}>
        <motion.div 
          initial="initial"
          animate={inView ? "animate" : "initial"}
          variants={staggerChildren}
          className="text-center"
        >
          {/* Profile Image */}
          <motion.div variants={fadeInUp} className="mb-8">
            <div className="relative">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-8 rounded-full overflow-hidden border-4 border-white shadow-2xl relative z-10"
              >
                <img 
                  src="/api/placeholder/160/160" 
                  alt="Ishika" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              {/* Floating elements around profile */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-0 right-0 w-6 h-6 bg-terracotta-400 rounded-full"
              />
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute bottom-4 left-0 w-4 h-4 bg-gold-400 rounded-full"
              />
            </div>
          </motion.div>
          
          {/* Main Heading with Typewriter Effect */}
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-serif text-gray-800 mb-6">
            <span className="inline-block min-h-[1.2em]">
              {displayText}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-terracotta-500"
              >
                |
              </motion.span>
            </span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            <span className="bg-gradient-to-r from-terracotta-500 to-gold-500 bg-clip-text text-transparent font-semibold">
              Frontend Developer & UX Designer
            </span>
            <br />
            crafting beautiful, user-centered digital experiences
          </motion.p>

          {/* Tags */}
          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-3 mb-12">
            {['React', 'Node.js', 'UX Design', 'Figma', 'TypeScript'].map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="px-4 py-2 bg-white/80 backdrop-blur-sm text-sm text-gray-700 rounded-full shadow-md hover:shadow-lg transition-shadow"
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 20px 40px rgba(212, 163, 115, 0.3)" 
              }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToProjects}
              className="btn-primary text-lg px-8 py-4"
            >
              View My Work
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="ml-2 inline-block"
              >
                →
              </motion.span>
            </motion.button>
            
            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center"
            >
              <span className="material-icons mr-2">download</span>
              Download Resume
            </motion.a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            variants={fadeInUp}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center text-gray-400"
            >
              <span className="text-sm mb-2">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1 h-3 bg-gray-400 rounded-full mt-2"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;