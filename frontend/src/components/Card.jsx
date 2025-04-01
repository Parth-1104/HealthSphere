import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Card = ({ 
  title, 
  badge, 
  description, 
  image, 
  backImage, 
  animationDelay = 0 
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const cardVariants = {
    initial: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: animationDelay / 1000,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        delay: 0.1
      }
    }
  };

  const badgeVariants = {
    initial: { scale: 0 },
    animate: { 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
        delay: (animationDelay / 1000) + 0.2
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      className="w-64 h-80 cursor-pointer perspective-1000 relative"
      onClick={handleFlip}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <AnimatePresence>
        <motion.div 
          className="relative w-full h-full"
          animate={{
            rotateY: isFlipped ? 180 : 0
          }}
          transition={{
            duration: 0.6,
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          style={{
            transformStyle: "preserve-3d"
          }}
        >
          {/* Front of card */}
          <motion.div 
            className="absolute w-full h-full bg-white rounded-lg shadow-lg"
            style={{
              backfaceVisibility: "hidden"
            }}
          >
            <div className="relative h-40 w-full overflow-hidden rounded-t-lg">
              <motion.img 
                src={image} 
                alt={title} 
                className="w-full h-full object-cover"
                animate={{
                  scale: isHovered ? 1.1 : 1
                }}
                transition={{
                  duration: 0.4
                }}
              />
              <motion.div 
                variants={badgeVariants}
                className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs"
              >
                {badge}
              </motion.div>
            </div>
            <motion.div 
              className="p-4"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
            >
              <h3 className="text-xl font-bold mb-2">{title}</h3>
              <p className="text-gray-700">{description}</p>
            </motion.div>
          </motion.div>

          {/* Back of card */}
          <motion.div 
            className="absolute w-full h-full bg-white rounded-lg shadow-lg"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)"
            }}
          >
            <div className="relative h-full w-full overflow-hidden rounded-lg">
              <motion.img 
                src={backImage} 
                alt={`${title} details`} 
                className="w-full h-full object-cover"
                animate={{
                  scale: isHovered ? 1.1 : 1
                }}
                transition={{
                  duration: 0.4
                }}
              />
              <motion.div 
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div 
                  className="text-white text-center"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <h3 className="text-xl font-bold mb-2">{title}</h3>
                  <p className="mb-4">{description}</p>
                  <motion.button 
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default Card;