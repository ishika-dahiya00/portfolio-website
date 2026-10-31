import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Markdown from 'markdown-to-jsx';
import { useApi } from '../hooks/useApi';
import { formatDate } from '../utils/helpers';
import SEOHead from '../components/SEO/SEOHead';

const BlogPost = () => {
  const { slug } = useParams();
  const { data: post, loading, error } = useApi(`/blogs/${slug}`);

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-24">
        <div className="container-custom max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              {[1,2,3,4,5].map(i => <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white pt-24">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-serif text-gray-800 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link to="/#blog" className="btn-primary">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24">
      <SEOHead
        title={`${post.title} - Ishika's Blog`}
        description={post.excerpt}
      />
      
      <article className="container-custom max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="mb-12">
            <Link
              to="/#blog"
              className="inline-flex items-center text-terracotta-600 hover:text-terracotta-700 mb-6"
            >
              <span className="material-icons mr-2">arrow_back</span>
              Back to Blog
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-serif text-gray-800 mb-6">
              {post.title}
            </h1>
            
            <div className="flex items-center space-x-6 text-gray-500 mb-8">
              <span>{formatDate(post.date || post.createdAt)}</span>
              <span>•</span>
              <span>{post.readTime}</span>
              <span>•</span>
              <span>By Ishika</span>
            </div>

            {/* Tags */}
            {post.tags && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="bg-terracotta-100 text-terracotta-700 px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-12">
            {post.content ? (
              <Markdown
                options={{
                  overrides: {
                    h1: { props: { className: 'text-4xl font-serif text-gray-800 mb-6' } },
                    h2: { props: { className: 'text-3xl font-serif text-gray-800 mb-4 mt-8' } },
                    h3: { props: { className: 'text-2xl font-semibold text-gray-800 mb-3 mt-6' } },
                    p: { props: { className: 'text-gray-600 leading-relaxed mb-6' } },
                    a: { props: { className: 'text-terracotta-600 hover:text-terracotta-700' } },
                    code: { props: { className: 'bg-gray-100 px-2 py-1 rounded text-sm' } },
                    pre: { props: { className: 'bg-gray-900 text-white p-4 rounded-lg overflow-x-auto' } },
                    blockquote: { props: { className: 'border-l-4 border-terracotta-500 pl-6 italic text-gray-700 my-6' } },
                  }
                }}
              >
                {post.content}
              </Markdown>
            ) : (
              <p className="text-gray-600 leading-relaxed">{post.excerpt}</p>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Enjoyed this post?</h3>
                <p className="text-gray-600">Share it with others or leave a comment.</p>
              </div>
              
              <div className="flex space-x-4">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <span className="material-icons text-sm">share</span>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors"
                >
                  <span className="material-icons text-sm">work</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </article>
    </div>
  );
};

export default BlogPost;