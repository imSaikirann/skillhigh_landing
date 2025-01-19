import React from 'react';
import { Link } from 'react-router-dom';

export default function NeedHelp() {
  const gradientStyle = {
    backgroundImage: 'linear-gradient(to right, #0D8267, #044233)',
    color: 'white',
    textAlign: 'center',
  };

  return (
    <div style={gradientStyle} className="font-inter py-12 h-auto flex flex-col rounded-t-xl items-center justify-center px-4 md:px-8 lg:px-16 space-y-4 ">
      {/* EdTech Line */}
      <h2 className="text-lg md:text-2xl lg:text-3xl font-semibold">
        Elevate Your Skills with Leading SkillHigh!
      </h2>

      {/* Call to Action Button */}
      <p className="text-sm md:text-base lg:text-lg max-w-xl">
        Join SkillHigh today and start your journey to becoming industry-ready with hands-on projects and expert-led courses.
      </p>
      
      <Link to="/allcourses">
      <button className="mt-4 bg-white text-main font-bold py-2 px-6 md:px-8 lg:px-10 lg:py-3 rounded-full hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-md hover:shadow-lg">
        Get Started
      </button>

      
      </Link>
      
    </div>
  );
}
