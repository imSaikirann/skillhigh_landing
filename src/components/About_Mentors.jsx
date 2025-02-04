import React from 'react';
import Stars from '../assets/stars.png';
import Cofounder from '../assets/Cofounder.jpg';
import Founder from '../assets/founder.jpg';
import Linkedin from '../assets/Linkedin.png';

function Card({ image, title, role, description, link }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col items-center gap-4 shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-border hover:shadow-2xl font-inter max-w-xs">
      <div className="w-32 h-32 overflow-hidden rounded-full shadow-md">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform transform hover:scale-110" />
      </div>
      <h2 className="text-2xl font-semibold text-main">{title}</h2>
      <h3 className="text-lg font-medium text-gray-600">{role}</h3>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img src={Linkedin} alt="LinkedIn Icon" className="w-6 h-6 hover:opacity-80 transition-opacity" />
      </a>
      <p className="text-center text-gray-700 font-medium text-sm">{description}</p>
    </div>
  );
}

export default function AboutMentors() {
  return (
    <div
      className="relative bg-cover bg-center font-inter py-20"
      style={{
        backgroundImage: `url(${Stars})`,
        backgroundRepeat: 'repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center top',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/60 to-white/80"></div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-main mb-6 drop-shadow-md">Meet Our Team</h1>
        <p className="text-lg md:text-xl text-textColor font-medium w-full md:w-2/3 lg:w-1/2 mb-8">
          Our team is driven by passion and expertise, delivering excellence in every endeavor.
        </p>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 mt-12">
          <Card
            image={Founder}
            title="Sai Charan"
            role="CEO & FOUNDER "
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
        </div>
      </div>
    </div>
  );
}
