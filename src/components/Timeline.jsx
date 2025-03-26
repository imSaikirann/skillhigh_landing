import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const phases = [
  { title: 'Student Enrollment Phase', desc: 'Begin your journey with personalized onboarding and resource access.' },
  { title: 'Training Phase', desc: 'Master skills through immersive, expert-led sessions.' },
  { title: 'Project & Practical Learning', desc: 'Apply knowledge in real-world projects with team collaboration.' },
  { title: 'Assessment & Certification', desc: 'Validate your skills with rigorous evaluations and earn credentials.' },
  { title: 'Placement & Career Support', desc: 'Launch your career with tailored guidance and opportunities.' },
  { title: 'Completion & Alumni Network', desc: 'Join a thriving community of achievers and lifelong learners.' },
];

export default function Timeline() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, rotateX: -10 },
    visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const nodeVariants = {
    initial: { scale: 1 },
    animate: { scale: [1, 1.15, 1], transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' } },
  };

  const cardVariants = {
    initial: { scale: 1, rotateX: 0, rotateY: 0 },
    hover: { scale: 1.05, rotateX: 5, rotateY: 5, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <div ref={ref} className="max-w-4xl mx-auto p-6 text-white min-h-screen overflow-hidden">
      <motion.h2
        className="text-xl sm:text-3xl font-extrabold text-center mb-12 text-main"
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        Skillhigh Learning Journey
      </motion.h2>
      <div className="relative">
        {/* Glowing Vertical Line */}
        <motion.div
          className="absolute h-full w-1 bg-main left-1/2 transform -translate-x-1/2 shadow-glow z-0"
          initial={{ height: 0 }}
          animate={inView ? { height: '100%' } : { height: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />

        <motion.div
          className="relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {phases.map((phase, index) => (
            <motion.div
              key={index}
              className={`flex items-center mb-12 w-full ${
                index % 2 === 0 ? 'flex-row-reverse' : ''
              }`}
              variants={itemVariants}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Timeline Node */}
              <motion.div
                className="relative flex-shrink-0 w-10 h-10"
                variants={nodeVariants}
                initial="initial"
                animate={inView ? 'animate' : 'initial'}
              >
                <motion.div
                  className="absolute inset-0 w-full h-full rounded-full bg-main shadow-inner-glow"
                  animate={inView ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                />
                <div className="absolute inset-1 w-8 h-8 bg-white rounded-full flex items-center justify-center text-main font-bold text-lg z-10 border border-main/50">
                  {index + 1}
                </div>
              </motion.div>

              {/* Professional Card */}
              <motion.div
                className={`flex-1 mx-6 p-4 rounded-lg bg-secondary shadow-md ${
                  index % 2 === 0 ? 'text-right' : 'text-left'
                }`}
                variants={cardVariants}
                initial="initial"
                animate={hoveredIndex === index ? 'hover' : 'initial'}
              >
                <div className="bg-main/10 p-3 rounded-t-lg -mt-4 -mx-4">
                  <h3 className="text-lg font-semibold text-main tracking-tight">
                    {phase.title}
                  </h3>
                </div>
                <div className="pt-3">
                  <p className="text-gray-600 text-sm leading-relaxed font-medium">
                    {phase.desc}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}