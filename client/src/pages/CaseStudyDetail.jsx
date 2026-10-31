import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useApi } from '../hooks/useApi';

const CaseStudyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const { data: caseStudy, loading, error } = useApi(`/casestudies/${id}`);
  const { data: allCaseStudies } = useApi('/casestudies');

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  // Get other case studies for recommendations
  const otherCaseStudies = allCaseStudies?.filter(study => study.id !== id)?.slice(0, 2) || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
        {/* Navigation */}
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-200/50">
          <div className="container-custom py-4">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
        </nav>

        {/* Loading Content */}
        <div className="container-custom py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-64 md:h-96 bg-gray-200 rounded-2xl"></div>
            <div className="h-12 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !caseStudy) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Case Study Not Found</h1>
          <p className="text-gray-600 mb-8">The case study you're looking for doesn't exist or has been moved.</p>
          <Link 
            to="/portfolio" 
            className="btn-primary inline-flex items-center space-x-2"
          >
            <span className="material-icons">arrow_back</span>
            <span>Back to Portfolio</span>
          </Link>
        </div>
      </div>
    );
  }

  const images = [
    caseStudy.image,
    ...(caseStudy.gallery || [])
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-200/50">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/portfolio" 
              className="flex items-center space-x-2 text-gray-600 hover:text-terracotta-600 transition-colors"
            >
              <span className="material-icons">arrow_back</span>
              <span className="font-medium">Back to Portfolio</span>
            </Link>

            {/* Share Button */}
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: caseStudy.title,
                    text: caseStudy.subtitle,
                    url: window.location.href
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  // You could add a toast notification here
                }
              }}
              className="flex items-center space-x-2 text-gray-600 hover:text-terracotta-600 transition-colors"
            >
              <span className="material-icons">share</span>
              <span className="font-medium hidden sm:block">Share</span>
            </button>
          </div>
        </div>
      </nav>

      <motion.div
        ref={ref}
        initial="initial"
        animate={inView ? "animate" : "initial"}
        variants={staggerChildren}
        className="container-custom py-12"
      >
        {/* Hero Section */}
        <motion.div variants={fadeInUp} className="mb-16">
          {/* Image Gallery */}
          <div className="relative mb-8">
            <div className="aspect-video rounded-2xl overflow-hidden bg-gray-100">
              <img 
                src={images[currentImageIndex] || "/api/placeholder/1200/600"} 
                alt={caseStudy.title} 
                className="w-full h-full object-cover" 
              />
            </div>
            
            {/* Image Navigation */}
            {images.length > 1 && (
              <div className="flex justify-center mt-4 space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentImageIndex 
                        ? 'bg-terracotta-500' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            )}
            
            {/* Featured Badge */}
            {caseStudy.featured && (
              <div className="absolute top-6 right-6">
                <span className="bg-gradient-to-r from-terracotta-500 to-gold-400 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  Featured Study
                </span>
              </div>
            )}
          </div>

          {/* Title and Meta */}
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-800 mb-6">
              {caseStudy.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              {caseStudy.subtitle}
            </p>
            
            {/* Tags */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {caseStudy.tags?.map((tag) => (
                <span key={tag} className="bg-terracotta-100 text-terracotta-700 px-4 py-2 rounded-full text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Project Details */}
        <motion.div variants={fadeInUp} className="mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 p-8 bg-white rounded-2xl shadow-lg">
            <div className="text-center">
              <div className="w-12 h-12 bg-terracotta-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="material-icons text-terracotta-600">schedule</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Duration</h3>
              <p className="text-gray-600">{caseStudy.duration}</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-terracotta-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="material-icons text-terracotta-600">person</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Role</h3>
              <p className="text-gray-600">{caseStudy.role}</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-terracotta-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="material-icons text-terracotta-600">business</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Client</h3>
              <p className="text-gray-600">{caseStudy.client || 'Confidential'}</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-terracotta-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="material-icons text-terracotta-600">calendar_today</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Year</h3>
              <p className="text-gray-600">{caseStudy.year}</p>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          {/* Left Column */}
          <motion.div variants={fadeInUp} className="space-y-12">
            {/* Overview */}
            {caseStudy.overview && (
              <div className="card p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="material-icons text-terracotta-600 mr-3">visibility</span>
                  Overview
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {caseStudy.overview}
                </p>
              </div>
            )}

            {/* The Challenge */}
            <div className="card p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="material-icons text-terracotta-600 mr-3">psychology</span>
                The Challenge
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {caseStudy.problem}
              </p>
            </div>

            {/* Process */}
            <div className="card p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="material-icons text-terracotta-600 mr-3">engineering</span>
                Design Process
              </h2>
              {Array.isArray(caseStudy.process) ? (
                <div className="space-y-4">
                  {caseStudy.process.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-terracotta-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                        {index + 1}
                      </div>
                      <p className="text-gray-600 leading-relaxed text-lg">{step}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 leading-relaxed text-lg">{caseStudy.process}</p>
              )}
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div variants={fadeInUp} className="space-y-12">
            {/* The Solution */}
            <div className="card p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="material-icons text-terracotta-600 mr-3">lightbulb</span>
                The Solution
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                {caseStudy.solution}
              </p>
            </div>

            {/* Results */}
            <div className="card p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="material-icons text-terracotta-600 mr-3">trending_up</span>
                Results & Impact
              </h2>
              {Array.isArray(caseStudy.results) ? (
                <div className="space-y-4">
                  {caseStudy.results.map((result, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <span className="material-icons text-green-500 text-xl flex-shrink-0">check_circle</span>
                      <p className="text-gray-600 leading-relaxed text-lg">{result}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 leading-relaxed text-lg">{caseStudy.results}</p>
              )}
            </div>

            {/* Key Learnings */}
            {caseStudy.learnings && (
              <div className="bg-gradient-to-br from-terracotta-50 to-gold-50 rounded-2xl p-8 border border-terracotta-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="material-icons text-terracotta-600 mr-3">school</span>
                  Key Learnings
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg italic">
                  "{caseStudy.learnings}"
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Technologies Used */}
        {caseStudy.technologies && caseStudy.technologies.length > 0 && (
          <motion.div variants={fadeInUp} className="mb-16">
            <div className="card p-8 text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Technologies & Tools</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {caseStudy.technologies.map((tech) => (
                  <span key={tech} className="bg-gray-100 text-gray-700 px-6 py-3 rounded-full font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Other Case Studies */}
        {otherCaseStudies.length > 0 && (
          <motion.div variants={fadeInUp} className="border-t border-gray-200 pt-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Other Case Studies</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {otherCaseStudies.map((study) => (
                <Link 
                  key={study.id} 
                  to={`/case-study/${study.id}`}
                  className="card overflow-hidden group hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={study.image || "/api/placeholder/600/400"} 
                      alt={study.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-terracotta-600 transition-colors">
                      {study.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{study.subtitle}</p>
                    <div className="flex items-center text-terracotta-600 font-medium">
                      <span>View Case Study</span>
                      <span className="material-icons ml-2 group-hover:translate-x-2 transition-transform">arrow_forward</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default CaseStudyDetail;