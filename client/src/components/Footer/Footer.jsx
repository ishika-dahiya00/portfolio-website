import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SOCIAL_LINKS, CONTACT_INFO } from '../../utils/constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <footer className="bg-gray-900 text-white py-16 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid md:grid-cols-4 gap-8"
        >
          {/* Brand Section */}
          <motion.div variants={fadeInUp} className="md:col-span-2">
            <Link to="/" className="group">
              <h3 className="text-3xl font-serif mb-4 group-hover:text-terracotta-400 transition-colors">
                Ishika
              </h3>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Frontend Developer & UX Designer crafting beautiful, user-centered digital experiences 
              with modern web technologies and thoughtful design principles.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 mb-6">
            <div className="flex items-center space-x-3 text-gray-400">
                <span className="material-icons text-sm">email</span>
                <a 
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="hover:text-terracotta-400 transition-colors"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <span className="material-icons text-sm">location_on</span>
                <span>{CONTACT_INFO.location}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {Object.entries(SOCIAL_LINKS).map(([platform, url]) => (
                <motion.a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 bg-gray-800 hover:bg-terracotta-500 rounded-full flex items-center justify-center transition-all duration-300"
                >
                  <span className="material-icons text-sm">
                    {platform === 'github' && 'code'}
                    {platform === 'linkedin' && 'work'}
                    {platform === 'dribbble' && 'palette'}
                    {platform === 'twitter' && 'alternate_email'}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'About', href: '#about' },
                { name: 'Projects', href: '#projects' },
                { name: 'Skills', href: '#skills' },
                { name: 'Blog', href: '#blog' },
                { name: 'Contact', href: '#contact' }
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-terracotta-400 transition-colors flex items-center space-x-2 group"
                  >
                    <span className="material-icons text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      arrow_forward
                    </span>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-lg font-semibold mb-6 text-white">Services</h4>
            <ul className="space-y-3">
              {[
                'Frontend Development',
                'UX/UI Design',
                'Web Applications',
                'Design Systems',
                'Consulting'
              ].map((service) => (
                <li key={service} className="text-gray-400 flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-terracotta-500 rounded-full"></span>
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="border-t border-gray-800 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Ishika. Made with{' '}
              <span className="text-red-500 animate-pulse">❤️</span> and lots of{' '}
              <span className="text-yellow-600">☕</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-terracotta-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-terracotta-400 transition-colors">
                Terms of Service
              </Link>
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span>Available for freelance</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;