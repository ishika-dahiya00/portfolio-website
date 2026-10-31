import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { formatDate } from '../../utils/helpers';

const Blog = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const { data: blogs, loading, error } = useApi('/blogs');
  const [selectedBlog, setSelectedBlog] = useState(null);

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
                <div key={i} className="bg-gray-200 rounded-xl h-64"></div>
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
          <p className="text-red-500">Error loading blog posts.</p>
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
            Latest Thoughts
          </motion.h2>
          
          <motion.p variants={fadeInUp} className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            Insights, tutorials, and thoughts on design, development, and the 
            ever-evolving world of technology.
          </motion.p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs?.slice(0, 6).map((blog, index) => (
              <motion.article
                key={blog.id || blog.slug}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="card overflow-hidden cursor-pointer group"
                onClick={() => setSelectedBlog(blog)}
              >
                {/* Blog Image (if available) */}
                {blog.image && (
                  <div className="relative overflow-hidden h-48">
                    <img 
                      src={blog.image} 
                      alt={blog.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>{formatDate(blog.date || blog.createdAt)}</span>
                    <span>{blog.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-terracotta-500 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {blog.excerpt}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags?.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Read More Link */}
                  <Link
                    to={`/blog/${blog.slug}`}
                    className="inline-flex items-center text-terracotta-600 hover:text-terracotta-700 font-medium text-sm transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Read More
                    <span className="material-icons text-sm ml-1 transform group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {/* View All Posts Link */}
          <motion.div variants={fadeInUp} className="text-center mt-12">
            <Link
              to="/blog"
              className="btn-secondary inline-flex items-center space-x-2"
            >
              <span>View All Posts</span>
              <span className="material-icons">arrow_forward</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Blog Modal (Quick Preview) */}
      <AnimatePresence>
        {selectedBlog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedBlog(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1 mr-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-3">{selectedBlog.title}</h1>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{formatDate(selectedBlog.date || selectedBlog.createdAt)}</span>
                      <span>•</span>
                      <span>{selectedBlog.readTime}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedBlog(null)}
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    <span className="material-icons">close</span>
                  </button>
                </div>
                
                <div className="prose prose-lg max-w-none mb-8">
                  <p className="text-lg text-gray-600 leading-relaxed">{selectedBlog.excerpt}</p>
                  {selectedBlog.content && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <p className="text-gray-600 leading-relaxed">
                        {selectedBlog.content.substring(0, 500)}...
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    {selectedBlog.tags?.map((tag) => (
                      <span key={tag} className="bg-terracotta-100 text-terracotta-700 px-3 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <Link
                    to={`/blog/${selectedBlog.slug}`}
                    className="btn-primary inline-flex items-center space-x-2"
                  >
                    <span>Read Full Post</span>
                    <span className="material-icons text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Blog;