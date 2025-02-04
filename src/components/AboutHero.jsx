import React from "react";
import { motion } from "framer-motion";
import Three from "../assets/Three.png";
import { Link } from "react-router-dom";

export const AboutHero = () => {
  const gradientStyle = {
    backgroundImage: "linear-gradient(to right, #0D8267, #044233)",
    color: "white",
    textAlign: "center",
  };

  return (
    <div
      className="relative h-screen bg-cover bg-center font-inter"
      style={{ backgroundImage: `url(${Three})` }}
    >
      {/* Optional Overlay */}
      <div className="absolute inset-0 opacity-50"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mt-4 text-4xl md:text-5xl font-bold text-transparent bg-clip-text"
          style={{
            backgroundImage: "linear-gradient(to right, #0D8267, #044233)",
            backgroundSize: "100%",
            backgroundRepeat: "repeat",
          }}
        >
          Bridging the Gap Between Classroom Knowledge and Career Success
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          className="mt-4 text-xl md:text-2xl text-black w-full md:w-3/4"
        >
          Welcome to SkillHigh! We connect aspiring professionals with industry
          leaders through immersive programs that equip you with the skills to
          elevate your career.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.6 }}
        >
          <Link to="/profile">
            <button
              style={gradientStyle}
              className="px-4 py-3 md:px-8 md:py-3 rounded-full text-white font-medium text-sm md:text-base mt-4"
            >
              Take the First Step
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};
