import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';  // Import motion from framer-motion

export default function NeedHelp() {
  const gradientStyle = {
    backgroundImage: 'linear-gradient(to right, #0D8267, #044233)',
    color: 'white',
    textAlign: 'center',
  };

  return (
    <motion.div
      style={gradientStyle}
      className="font-inter py-16 h-auto flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 space-y-6 rounded-2xl"
      initial={{ opacity: 0, y: 50 }}   // Start with opacity 0 and position 50px below
      whileInView={{ opacity: 1, y: 0 }}   // Animate to full opacity and 0px position when in view
      transition={{ duration: 1.5, ease: 'easeInOut' }}      // Smooth transition for 1.5 seconds
      viewport={{ once: true }}          // Trigger the animation once when the element enters the viewport
    >
      {/* EdTech Line */}
      <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white mb-4">
        Elevate Your Skills with Leading SkillHigh!
      </h2>

      {/* Description Text */}
      <p className="text-base md:text-lg lg:text-xl text-white max-w-2xl mx-auto mb-6">
        Join SkillHigh today and start your journey to becoming industry-ready with hands-on projects and expert-led courses. We provide practical skills that will make you stand out in the job market.
      </p>
      
      {/* Call to Action Button */}
      <Link to="/allcourses">
        <motion.button
          className="mt-4 bg-white text-main font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          whileHover={{ scale: 1.05 }}   // Scale up on hover for a better effect
          whileTap={{ scale: 0.95 }}    // Slightly shrink on tap for interaction feedback
        >
          Get Started
        </motion.button>
      </Link>
    </motion.div>
  );
}
