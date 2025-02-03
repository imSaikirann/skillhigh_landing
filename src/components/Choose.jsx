import React from 'react';
import { motion } from 'framer-motion';
import Monitor from '../assets/MonitorPlay.png';
import Person from '../assets/personsvg.png';
import LockKeyOpen from '../assets/LockKeyOpen.png';

export default function Choose() {
  return (
    <div className="w-full h-auto py-8 px-4 font-inter">
      <h1 className="text-center font-bold text-headings text-2xl sm:text-3xl lg:text-5xl mb-8">
        Why Choose Us
      </h1>
      <div className="flex flex-col sm:flex-row md:flex-wrap lg:flex-nowrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
        {/* Box 1 */}
        <motion.div
          className="bg-border w-full sm:w-[45%] md:w-[30%] lg:w-[25%] h-[350px] rounded-lg flex flex-col items-center justify-center text-center p-6 hover:scale-105 hover:shadow-2xl transition-transform duration-300"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.img
            src={Person}
            className="w-[80px] h-[80px] mb-4"
            alt="Real-World Learning"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          />
          <h2 className="font-bold text-textColor text-lg lg:text-xl mb-3">
            Real-World Learning
          </h2>
          <p className="text-sm font-medium lg:text-base">
            SkillHigh provides practical, hands-on training with projects that align with current industry standards.
          </p>
        </motion.div>

        {/* Box 2 */}
        <motion.div
          className="bg-border w-full sm:w-[45%] md:w-[30%] lg:w-[25%] h-[350px] rounded-lg flex flex-col items-center justify-center text-center p-6 hover:scale-105 hover:shadow-2xl transition-transform duration-300"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.img
            src={Monitor}
            className="w-[80px] h-[80px] mb-4"
            alt="Industry-Aligned Curriculum"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          />
          <h2 className="font-bold text-textColor text-lg lg:text-xl mb-3">
            Industry-Aligned Curriculum
          </h2>
          <p className="text-sm font-medium lg:text-base">
            Our programs collaborate with leading companies to help you gain the skills employers want.
          </p>
        </motion.div>

        {/* Box 3 */}
        <motion.div
          className="bg-border w-full sm:w-[45%] md:w-[30%] lg:w-[25%] h-[350px] rounded-lg flex flex-col items-center justify-center text-center p-6 hover:scale-105 hover:shadow-2xl transition-transform duration-300"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.img
            src={LockKeyOpen}
            className="w-[80px] h-[80px] mb-4"
            alt="Expert Mentorship"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          />
          <h2 className="font-bold text-textColor text-lg lg:text-xl mb-3">
            Expert Mentorship
          </h2>
          <p className="text-sm font-medium lg:text-base">
            Learn from experienced professionals in the field by gaining valuable insights and mentorship.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
