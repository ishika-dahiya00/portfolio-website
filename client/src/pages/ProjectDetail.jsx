import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApi } from '../hooks/useApi';
import SEOHead from '../components/SEO/SEOHead';

const ProjectDetail = () => {
  const { id } = useParams();
  const { data: project, loading, error } = useApi(`/projects/${id}`);

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-24">
        <div className="container-custom">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded-xl mb-8"></div>
            <div className="space-y-4">
              {[1,2,3].map(i => <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-white pt-24">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-serif text-gray-800 mb-4">Project Not Found</h1>
          <p className="text-gray-600 mb-8">The project you're looking for doesn't exist.</p>
          <Link to="/#projects" className="btn-primary">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24">
      <SEOHead
        title={`${project.title} - Ishika's Portfolio`}
        description={project.description}
      />
      
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="mb-12">
            <Link
              to="/#projects"
              className="inline-flex items-center text-terracotta-600 hover:text-terracotta-700 mb-6"
            >
              <span className="material-icons mr-2">arrow_back</span>
              Back to Projects
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4">
              {project.title}
            </h1>
            <p className="text-xl text-gray-600 mb-6">{project.description}</p>
            
            <div className="flex flex-wrap gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center space-x-2"
                >
                  <span className="material-icons">launch</span>
                  <span>Live Demo</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex items-center space-x-2"
                >
                  <span className="material-icons">code</span>
                  <span>View Code</span>
                </a>
              )}
            </div>
          </div>

          {/* Project Image */}
          <div className="mb-12">
            <img
              src={project.image || "/api/placeholder/800/500"}
              alt={project.title}
              className="w-full h-96 object-cover rounded-2xl shadow-2xl"
            />
          </div>

          {/* Project Details */}
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                <h2>About This Project</h2>
                <p className="lead">{project.longDescription || project.description}</p>
                
                {project.features && (
                  <div>
                    <h3>Key Features</h3>
                    <ul>
                      {project.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.challenges && (
                  <div>
                    <h3>Challenges</h3>
                    <p>{project.challenges}</p>
                  </div>
                )}

                {project.solutions && (
                  <div>
                    <h3>Solutions</h3>
                    <p>{project.solutions}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-8">
              {/* Project Info */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold text-gray-800 mb-4">Project Info</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-700">Category</h4>
                    <p className="text-gray-600">{project.category}</p>
                  </div>
                  {project.year && (
                    <div>
                      <h4 className="font-semibold text-gray-700">Year</h4>
                      <p className="text-gray-600">{project.year}</p>
                    </div>
                  )}
                  {project.status && (
                    <div>
                      <h4 className="font-semibold text-gray-700">Status</h4>
                      <p className="text-gray-600">{project.status}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold text-gray-800 mb-4">Tech Stack</h3>
                <div className="space-y-2">
                  {project.stack?.map((tech) => (
                    <div key={tech} className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-terracotta-500 rounded-full"></span>
                      <span className="text-gray-600">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;