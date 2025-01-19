import React from 'react';
import Wave from '../assets/wave.png';
import Person from '../assets/person.png';
import { Link } from 'react-router-dom';
export default function Hero2() {
  const gradientStyle = {
    backgroundImage: 'linear-gradient(to right, #0D8267, #044233)',
    color: 'white',
    textAlign: 'center',
  };
  return (
    <div className="relative bg-white overflow-hidden font-inter">
      {/* Background Image */}
      <img
        src={Wave}
        alt="Background"
        className="w-full h-[700px] md:h-[600px] lg:h-[700px] object-cover"
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-transparent opacity-90 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-l from-white via-transparent to-transparent opacity-90 pointer-events-none" />

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col md:flex-row-reverse items-center justify-between  z-10  space-y-4 md:gap-4">
        
        {/* Text Content */}
        <div className="flex flex-col mb-6 p-2 text-left md:text-left">
          <h1  style={{
              backgroundImage: 'linear-gradient(to right, #0D8267, #044233)',
              backgroundSize: '100%',
              backgroundRepeat: 'repeat',
            }} className=" text-transparent bg-clip-text text-3xl md:text-3xl lg:text-5xl font-bold mb-2 md:mb-4">
          Innovative & Effective E-learning Platform
          </h1>
          <p className="text-textColor font-medium text-md md:text-lg lg:text-xl mt-3 mb-4 w-full">
          SkillHigh is the go-to platform for aspiring professionals. Our affordable virtual programs provide expert guidance and project-based training to make you job-ready and accelerate your career. Don't just prepare for your job-launch it with SkillHigh.

          </p>
          
          {/* Buttons */}
          <div className="flex justify-start md:justify-start gap-4 md:gap-6 mt-3">
          <Link to="/aboutus">
          <button  style={{
      ...gradientStyle,
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)', 
    }} className="px-4 py-3 md:px-8 md:py-4 rounded-full text-white font-medium text-sm md:text-base mt-3 
    transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-md hover:shadow-lg">
            Learn more
            </button>
           
          </Link>
          </div>
        </div>

        {/* Hero Image */}
        <img
          src={Person}
          alt="Hero Illustration"
          className="w-4/5 md:w-1/2 lg:w-1/3 h-auto object-contain mb-6 md:mb-0"
        />
      </div>

      {/* Additional Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent opacity-90 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-90 pointer-events-none" />
    </div>
  );
}
