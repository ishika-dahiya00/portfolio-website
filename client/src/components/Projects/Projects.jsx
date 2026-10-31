import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [filter, setFilter] = useState('all');
  const { data: projects, loading, error } = useApi('/projects');

  const categories = ['all', 'Web Application', 'Mobile App', 'Developer Tool'];

  const filteredProjects = projects?.filter(project => 
    filter === 'all' || project.category === filter
  ) || [];

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
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded-lg mb-12 w-1/2 mx-auto"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1,2,3].map(i => (
                <div key={i} className="bg-gray-200 rounded-xl h-80"></div>
              ))}
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
          <p className="text-red-500">Error loading projects.</p>
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
        >
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-serif text-center text-gray-800 mb-6">
            Featured Projects
          </motion.h2>
          
          <motion.p variants={fadeInUp} className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            A collection of projects that showcase my skills in frontend development, 
            UX design, and problem-solving.
          </motion.p>

          {/* Filter Buttons */}
          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setFilter(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  filter === category
                    ? 'bg-gradient-to-r from-terracotta-500 to-gold-400 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category === 'all' ? 'All Projects' : category}
              </motion.button>
            ))}
          </motion.div>
          
          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="group card overflow-hidden cursor-pointer"
                layout
              >
                {/* Project Image */}
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={project.image || "/api/placeholder/400/300"} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex space-x-2">
                        {project.liveUrl && (
                          <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white/90 text-gray-800 px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="material-icons text-sm">launch</span>
                            <span>Live Demo</span>
                          </motion.a>
                        )}
                        {project.githubUrl && (
                          <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white/90 text-gray-800 px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="material-icons text-sm">code</span>
                            <span>Code</span>
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-gradient-to-r from-terracotta-500 to-gold-400 text-white px-3 py-1 rounded-full text-xs font-medium">
                        Featured
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Project Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-xl text-gray-800 group-hover:text-terracotta-500 transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-xs text-terracotta-600 bg-terracotta-50 px-2 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.stack?.slice(0, 3).map((tech) => (
                      <span key={tech} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                    {project.stack?.length > 3 && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        +{project.stack.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* View Details Link */}
                  <Link
                    to={`/project/${project.id}`}
                    className="inline-flex items-center text-terracotta-600 hover:text-terracotta-700 font-medium text-sm transition-colors"
                  >
                    View Details
                    <span className="material-icons text-sm ml-1 transform group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Projects Link */}
          <motion.div variants={fadeInUp} className="text-center mt-12">
            <Link
              to="/projects"
              className="btn-secondary inline-flex items-center space-x-2"
            >
              <span>View All Projects</span>
              <span className="material-icons">arrow_forward</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
