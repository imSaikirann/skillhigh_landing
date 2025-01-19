import React from 'react';
import banner1 from '../assets/Banner.png';
import banner2 from '../assets/Banner1.png';

export default function VisionMission() {
  const gradientStyle = "bg-gradient-to-r from-[#0D8267] to-[#044233] text-white";

  return (
    <div className="flex flex-col p-6 font-inter space-y-8 sm:space-y-12">
      {/* Vision Section */}
      <section className="flex flex-col md:flex-row items-center gap-6">
        <div className={`${gradientStyle} flex flex-col w-full md:w-1/2 h-auto items-start justify-center rounded-t-lg md:rounded-l-lg p-6 sm:p-8 lg:p-10 space-y-4`}>
          <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">Our Vision</h2>
          <p className="text-sm font-medium sm:text-base lg:text-lg text-gray-100 text-justify">
  Our vision is to bridge the gap between academia and industry by promoting a community of skilled professionals who are job-ready and empowered to succeed. We believe that with the right tools, resources, and mentorship, everyone has the potential to succeed in their chosen fields.
</p>

        </div>
        <div className="w-full md:w-1/2">
          <img
            src={banner1}
            alt="Vision"
            className="h-64 sm:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Mission Section */}
      <section className="flex flex-col-reverse md:flex-row items-center gap-6">
        <div className="w-full md:w-1/2">
          <img
            src={banner2}
            alt="Mission"
            className="h-64 sm:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className={`${gradientStyle} flex flex-col w-full md:w-1/2 h-auto items-center md:items-start justify-center rounded-t-lg md:rounded-r-lg p-6 sm:p-8 lg:p-10 space-y-4`}>
          <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">Our Mission</h2>
          <p className="text-sm sm:text-base font-medium lg:text-lg text-gray-100 text-justify">
            At SkillHigh, we are committed to being your affordable and trusted learning partner worldwide. We equip you with essential practical skills and hands-on experience that prepare you to confidently step into the professional world, ready to make an impact and excel in your career.
          </p>
        </div>
      </section>
    </div>
  );
}
