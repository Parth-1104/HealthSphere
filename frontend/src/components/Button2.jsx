import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Button2 = ({ text, href, className = '' }) => {
  const buttonContent = (
    <motion.div
      className={`relative inline-flex items-center justify-center gap-2 px-6 py-3 overflow-hidden rounded-full font-medium transition-all ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.span
        initial={{ opacity: 1, x: 0 }}
        whileHover={{ opacity: 1, x: -4 }}
        className="relative z-10"
      >
        {text}
      </motion.span>
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileHover={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="relative z-10"
      >
        <ArrowRight className="w-5 h-5" />
      </motion.div>
      <motion.div
        className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-blue-600 opacity-0"
        initial={{ opacity: 0, scale: 0 }}
        whileHover={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {buttonContent}
      </a>
    );
  }

  return <button className="inline-block">{buttonContent}</button>;
};

Button2.propTypes = {
  text: PropTypes.string.isRequired,
  href: PropTypes.string,
  className: PropTypes.string
};

export default Button2;