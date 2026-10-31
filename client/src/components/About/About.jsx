import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useAbout } from '../../hooks/useAbout';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const { aboutData, loading, error } = useAbout();

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

  if (loading) {
    return (
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded-lg mb-6 w-1/2 mx-auto"></div>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
              <div className="h-96 bg-gray-200 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <p className="text-red-500">Error loading about information.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial="initial"
          animate={inView ? "animate" : "initial"}
          variants={staggerChildren}
          className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Content */}
          <motion.div variants={fadeInUp}>
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-800 mb-6 leading-tight"
            >
              About Me
              <motion.span
                initial={{ width: 0 }}
                animate={inView ? { width: '100%' } : { width: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="block h-1 bg-gradient-to-r from-terracotta-500 to-gold-400 mt-2"
              />
            </motion.h2>

            <motion.div variants={fadeInUp} className="prose prose-lg max-w-none mb-8">
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {aboutData?.bio || "I'm a passionate frontend developer and UX designer who loves creating beautiful, user-centered digital experiences."}
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center p-4 bg-gradient-to-br from-terracotta-50 to-gold-50 rounded-xl">
                <div className="text-3xl font-bold text-terracotta-600 mb-1">3+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-gold-50 to-terracotta-50 rounded-xl">
                <div className="text-3xl font-bold text-terracotta-600 mb-1">50+</div>
                <div className="text-sm text-gray-600">Projects Completed</div>
              </div>
            </motion.div>

            {/* Location and Availability */}
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <span className="material-icons text-terracotta-500">location_on</span>
                <span>{aboutData?.location || "Chandigarh, India"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-icons text-green-500">circle</span>
                <span>Available for freelance</span>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={fadeInUp} className="flex space-x-4">
              {aboutData?.social && Object.entries(aboutData.social).map(([platform, url]) => (
                <motion.a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-gradient-to-br from-terracotta-500 to-gold-400 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <span className="material-icons text-lg">
                    {platform === 'github' && 'code'}
                    {platform === 'linkedin' && 'work'}
                    {platform === 'dribbble' && 'palette'}
                    {platform === 'twitter' && 'alternate_email'}
                  </span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Image */}
          <motion.div variants={fadeInUp} className="relative">
            <div className="relative max-w-md mx-auto">
              {/* Background decoration */}
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute -inset-4 bg-gradient-to-br from-terracotta-200 to-gold-200 rounded-3xl opacity-20"
              />
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative rounded-3xl overflow-hidden shadow-2xl bg-white p-2"
              >
                <img 
                  src={aboutData?.photo || "/api/placeholder/400/500"} 
                  alt="About Ishika" 
                  className="w-full h-96 lg:h-[500px] object-cover rounded-2xl"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-2 bg-gradient-to-t from-black/20 to-transparent rounded-2xl pointer-events-none" />
                
                {/* Floating badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 1, type: "spring" }}
                  className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-xl"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-700">Available</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Decorative elements */}
              <motion.div
                animate={{ y: [-20, 20, -20] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute -top-6 -left-6 w-12 h-12 bg-terracotta-300 rounded-full opacity-40"
              />
              <motion.div
                animate={{ y: [20, -20, 20] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-8 -right-8 w-8 h-8 bg-gold-400 rounded-full opacity-60"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
