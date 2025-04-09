import React from 'react';
import { motion } from 'framer-motion';
import Button2 from './Button2';
import { ChevronDown } from 'lucide-react';

const Video = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-blue-200 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-blue-300 rounded-full blur-3xl"
        />
      </div>

      {/* Content Container */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
      >
        {/* Subtitle with Icon */}
        <motion.div 
          variants={fadeIn}
          className="flex gap-3 items-center justify-center mb-6"
        >
          <motion.div 
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center"
          >
            <div className="w-4 h-4 rounded-full bg-blue-500" />
          </motion.div>
          <h2 className="text-blue-900 text-xl md:text-2xl font-medium tracking-wide">
            From travel to treatment we handle it all
          </h2>
        </motion.div>

        {/* Main Title */}
        <motion.h1 
          variants={fadeIn}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-blue-950 mb-8"
        >
          Booking Meditrip
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Got Easier
          </span>
        </motion.h1>

        {/* Features */}
        <motion.div 
          variants={fadeIn}
          className="text-blue-800 text-lg sm:text-xl md:text-2xl font-medium mb-12"
        >
          <p className="max-w-2xl mx-auto">
            Crypto payments and Personal Assistant throughout the trip
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div 
          variants={fadeIn}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6"
        >
          <Button2 
            href="#speciality" 
            text="Book Appointment"
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white transform hover:scale-105 transition-all duration-300"
          />
          <Button2 
            text="About Us"
            className="bg-white hover:bg-blue-50 text-blue-600 border-2 border-blue-200 transform hover:scale-105 transition-all duration-300"
          />
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-blue-400 flex flex-col items-center gap-2"
          >
            <ChevronDown className="w-6 h-6" />
            <span className="text-sm font-medium">Scroll Down</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Video;