import React from "react";
import { motion } from "framer-motion";
import pattern from "../assets/pm.png";
import Reduced from "../assets/reduced_cost-removebg-preview.png";
import standardization from "../assets/standardization-removebg-preview.png";
import satisfaction from "../assets/satisfaction-removebg-preview.png";
import multimedia from "../assets/multimedia_materils-removebg-preview.png";
import customization from "../assets/customization-removebg-preview.png";
import Cost from "../assets/affordable_prices-removebg-preview.png";

export default function AboutJoin() {
  const gridItems = [
    {
      title: "Experience",
      content: "Gain hands-on exposure with real-world projects that prepare you for the industry.",
      src: standardization,
    },
    {
      title: "Expertise",
      content: "Master cutting-edge skills that top employers demand today.",
      src: Reduced,
    },
    {
      title: "Opportunities",
      content: "Kickstart your career with impactful, career-ready internship experiences.",
      src: customization,
    },
    {
      title: "Flexibility",
      content: "Study anytime, anywhere with programs tailored to your schedule.",
      src: Cost,
    },
    {
      title: "Mentorship",
      content: "Receive personalized guidance from experienced mentors and industry leaders.",
      src: satisfaction,
    },
    {
      title: "Affordability",
      content: "Access quality education through budget-friendly and inclusive programs.",
      src: multimedia,
    },
  ];

  return (
    <div className="relative overflow-hidden font-inter">
      {/* Background Image */}
      <img
        src={pattern}
        alt="Background"
        className="h-[2000px] md:h-[1200px] lg:h-[1000px] object-cover w-full"
      />

      {/* Content wrapper */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-8"
        >
          <h1 className="text-main text-2xl md:text-3xl lg:text-5xl font-bold mb-2 md:mb-4">
            Join SkillHigh Today
          </h1>
          <p className="text-textColor font-medium text-md md:text-lg lg:text-xl mt-3 mb-4 max-w-2xl">
            Your journey to career success starts with the right skills and real-world experience.
          </p>
        </motion.div>

        {/* Grid Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-full max-w-5xl"
        >
          {gridItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="p-6 bg-white border border-gray-200 rounded-lg shadow-md flex flex-col items-center justify-center text-center
                         transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:bg-border"
            >
              <img src={item.src} alt={item.title} className="mb-4 h-24 w-auto object-contain" />
              <h2 className="text-lg sm:text-xl font-semibold mb-2 text-main">{item.title}</h2>
              <p className="text-md text-gray-700 font-medium">{item.content}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
