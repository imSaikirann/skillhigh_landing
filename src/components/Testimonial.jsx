import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "../services/axiosConfig";
import { QuoteIcon } from "../assets/icons/icons";
import { Star } from "../assets/icons/icons";

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get("/api/v1/testimonals/allTestimonals");
        setTestimonials(response.data.allTestimonals);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };
    fetchTestimonials();
  }, []);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section className="bg-gradient-to-r from-gray-50 to-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 text-center mb-12">
          Hear from Our Achievers
        </h2>

        {testimonials.length > 0 && (
          <div className="relative">
            <button
              onClick={goToPrevious}
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-main text-white px-3 py-2 rounded-full shadow-lg hover:scale-110 transition-transform"
            >
              &larr;
            </button>

            <div className="overflow-hidden w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  className="flex justify-center"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-8 md:p-12 flex flex-col items-center">
                    <QuoteIcon className="text-main mb-6" size={40} />
                    <p className="text-gray-700 text-center sm:text-lg italic mb-6">
                      "{testimonials[currentIndex].review}"
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-main">
                          {testimonials[currentIndex].name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {testimonials[currentIndex].collageName}
                        </p>
                        <div className="flex mt-2">
                          {[...Array(5)].map((_, index) => (
                            <Star
                              key={index}
                              size={18}
                              color={
                                index < testimonials[currentIndex].stars
                                  ? "#fbbf24"
                                  : "#d1d5db"
                              }
                            />
                          ))}
                        </div>
                      </div>
                      {testimonials[currentIndex].collageLogo && (
                        <img
                          src={testimonials[currentIndex].collageLogo}
                          alt="College Logo"
                          className="w-24 h-24 object-cover rounded-full"
                        />
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              onClick={goToNext}
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-main text-white px-3 py-2  rounded-full shadow-lg hover:scale-110 transition-transform"
            >
              &rarr;
            </button>
          </div>
        )}

        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-main" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
