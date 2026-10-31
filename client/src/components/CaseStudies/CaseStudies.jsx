import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useApi } from '../../hooks/useApi';

const CaseStudies = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const { data: caseStudies, loading, error } = useApi('/casestudies');
  const [selectedCase, setSelectedCase] = useState(null);

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
      <section className="section-padding bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="container-custom">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded-lg mb-12 w-1/2 mx-auto"></div>
            <div className="space-y-8">
              {[1, 2].map(i => (
                <div key={i} className="bg-gray-200 rounded-2xl h-64"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section-padding bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="container-custom text-center">
          <p className="text-red-500">Error loading case studies.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-gradient-to-br from-orange-50 to-yellow-50" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial="initial"
          animate={inView ? "animate" : "initial"}
          variants={staggerChildren}
        >
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-serif text-center text-gray-800 mb-6">
            UX Case Studies
          </motion.h2>
          
          <motion.p variants={fadeInUp} className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            Deep dives into my design process, from research and ideation to 
            prototyping and user testing.
          </motion.p>
          
          <div className="space-y-8">
            {caseStudies?.map((study, index) => (
              <motion.div
                key={study.id}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="card overflow-hidden cursor-pointer group"
                onClick={() => setSelectedCase(study)}
              >
                <div className="md:flex">
                  <div className="md:w-1/2 relative overflow-hidden">
                    <img 
                      src={study.image || "/api/placeholder/600/400"} 
                      alt={study.title} 
                      className="w-full h-64 md:h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                    
                    {/* Featured Badge */}
                    {study.featured && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-gradient-to-r from-terracotta-500 to-gold-400 text-white px-3 py-2 rounded-full text-sm font-medium">
                          Featured Study
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="md:w-1/2 p-8">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <span>{study.duration}</span>
                      <span>•</span>
                      <span>{study.role}</span>
                      {study.year && (
                        <>
                          <span>•</span>
                          <span>{study.year}</span>
                        </>
                      )}
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 group-hover:text-terracotta-500 transition-colors">
                      {study.title}
                    </h3>
                    
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                      {study.subtitle}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {study.tags?.map((tag) => (
                        <span key={tag} className="text-xs bg-terracotta-100 text-terracotta-700 px-3 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* CTA */}
                    <div className="flex items-center text-terracotta-600 font-medium group-hover:text-terracotta-700 transition-colors">
                      <span>Read Case Study</span>
                      <motion.span 
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="material-icons ml-2"
                      >
                        arrow_forward
                      </motion.span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedCase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedCase(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative">
                <img 
                  src={selectedCase.image} 
                  alt={selectedCase.title} 
                  className="w-full h-64 md:h-80 object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                <button
                  onClick={() => setSelectedCase(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <span className="material-icons">close</span>
                </button>
                
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{selectedCase.title}</h1>
                  <p className="text-lg opacity-90">{selectedCase.subtitle}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Meta Info */}
                <div className="grid md:grid-cols-4 gap-6 mb-12 p-6 bg-gray-50 rounded-xl">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Duration</h4>
                    <p className="text-gray-600">{selectedCase.duration}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Role</h4>
                    <p className="text-gray-600">{selectedCase.role}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Client</h4>
                    <p className="text-gray-600">{selectedCase.client || 'Confidential'}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Year</h4>
                    <p className="text-gray-600">{selectedCase.year}</p>
                  </div>
                </div>

                {/* Case Study Sections */}
                <div className="grid lg:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">The Challenge</h3>
                    <p className="text-gray-600 mb-8 leading-relaxed">{selectedCase.problem}</p>
                    
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Process</h3>
                    {Array.isArray(selectedCase.process) ? (
                      <ul className="space-y-2 text-gray-600">
                        {selectedCase.process.map((step, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <span className="w-6 h-6 bg-terracotta-500 text-white rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                              {index + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-600 leading-relaxed">{selectedCase.process}</p>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">The Solution</h3>
                    <p className="text-gray-600 mb-8 leading-relaxed">{selectedCase.solution}</p>
                    
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Results</h3>
                    {Array.isArray(selectedCase.results) ? (
                      <ul className="space-y-2 text-gray-600">
                        {selectedCase.results.map((result, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <span className="material-icons text-green-500 text-lg">check_circle</span>
                            <span>{result}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-600 leading-relaxed">{selectedCase.results}</p>
                    )}
                    
                    <div className="mt-8 p-6 bg-terracotta-50 rounded-xl">
                      <h4 className="font-semibold text-gray-800 mb-2">Key Learnings</h4>
                      <p className="text-gray-600 italic">{selectedCase.learnings}</p>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex flex-wrap gap-3">
                    {selectedCase.tags?.map((tag) => (
                      <span key={tag} className="bg-terracotta-100 text-terracotta-700 px-4 py-2 rounded-full text-sm font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CaseStudies;