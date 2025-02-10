import React from 'react';
import { motion } from 'framer-motion';
import Stars from '../assets/stars.png';
import Cofounder from '../assets/Cofounder.jpg';
import Founder from '../assets/founder.jpg';
import { LinkedInIcon } from '../assets/icons/icons';

function Card({ image, title, role, description, link }) {
  return (
    <motion.div
      className="bg-white border border-gray-300 rounded-2xl p-6 flex flex-col items-center gap-4 shadow-lg max-w-sm min-h-[450px] justify-between"
      whileHover={{ scale: 1.05, boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)' }}
      transition={{ type: 'spring', stiffness: 200, damping: 10 }}
    >
      <div className="w-32 h-32 overflow-hidden rounded-full shadow-md">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-main mt-4">{title}</h2>
        <h3 className="text-lg font-medium text-gray-500">{role}</h3>
        <p className="text-gray-600 font-medium text-sm mt-2 mb-4">{description}</p>
      </div>
      <motion.a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-700 hover:text-main flex items-center space-x-2 "
        whileHover={{ scale: 1.1 }}
      >
        <LinkedInIcon />
        <span>View LinkedIn</span>
      </motion.a>
    </motion.div>
  );
}

export default function AboutMentors() {
  return (
    <div
      className="relative bg-cover bg-center py-20 font-inter"
      style={{
        backgroundImage: `url(${Stars})`,
        backgroundRepeat: 'repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center top',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/60 to-white/90"></div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-main mb-8 drop-shadow-md"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          
        >
          Meet Our Team
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-gray-700 font-medium max-w-3xl mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Our team is driven by passion and expertise, delivering excellence in every endeavor.
        </motion.p>

        {/* Cards Section */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <Card
            image={Founder}
            title="Sai Charan"
            role="CEO & FOUNDER"
            description="At SkillHigh, we're committed to bridging the gap between education and industry, empowering students with in-demand skills for successful careers."
            link="https://www.linkedin.com/in/sai-charan-996648202/"
          />
          <Card
            image={Cofounder}
            title="Karthikeya"
            role="COO & CO-FOUNDER"
            description="Our mission is to create a transformative learning experience, equipping students with the tools to excel in their professional journeys."
            link="https://www.linkedin.com/in/k8703/"
          />
        </motion.div>
      </div>
    </div>
  );
}
