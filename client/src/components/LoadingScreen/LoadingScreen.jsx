import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center z-50"
    >
      <div className="text-center">
        {/* Animated Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            delay: 0.1 
          }}
          className="mb-8"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-terracotta-500 to-gold-400 rounded-full flex items-center justify-center shadow-2xl">
            <span className="text-white font-serif text-2xl font-bold">I</span>
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-serif text-gray-800 mb-4"
        >
          Loading...
        </motion.h2>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-1">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{
                repeat: Infinity,
                duration: 1,
                delay: index * 0.2,
                repeatType: "reverse"
              }}
              className="w-3 h-3 bg-terracotta-400 rounded-full"
            />
          ))}
        </div>

        {/* Progress Bar */}
        <motion.div className="w-48 h-1 bg-gray-200 rounded-full mt-8 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-terracotta-500 to-gold-400 rounded-full"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
