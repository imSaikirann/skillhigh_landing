import React, { useState, useEffect } from "react";
import axios from "../auth/axiosConfig";

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [isScrolling, setIsScrolling] = useState(true);

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

  useEffect(() => {
    if (isScrolling) {
      const interval = setInterval(() => {
        goToNext();
      }, 5000); // Auto-scroll every 5 seconds

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [currentIndex, isScrolling]);

  const isLargeScreen = window.innerWidth >= 768;
  const cardsToShow = isLargeScreen ? 2 : 1;

  // Adjust goToNext function
  const goToNext = () => {
    setCurrentIndex((prevIndex) => {
      // Calculate next index based on the number of cards to show
      const nextIndex = prevIndex + cardsToShow;
      return nextIndex < testimonials.length ? nextIndex : 0; // Loop back to the start if we've reached the end
    });
  };

  // Adjust goToPrevious function
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => {
      // Calculate previous index based on the number of cards to show
      const prevIndexCalc = prevIndex - cardsToShow;
      return prevIndexCalc >= 0 ? prevIndexCalc : testimonials.length - cardsToShow; // Loop back to the end if we go past the start
    });
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-screen-xl mx-auto text-center px-4">
        <h2 className="text-4xl sm:text-5xl font-bold text-headings mb-8">
          Hear from Our Achievers
        </h2>

        <div
          className={`grid gap-8 ${
            isLargeScreen ? "grid-cols-2" : "grid-cols-1"
          }`}
        >
          {testimonials
            .slice(currentIndex, currentIndex + cardsToShow)
            .map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white shadow-xl rounded-lg p-6 transition-transform duration-300 transform hover:scale-105"
              >
                <blockquote>
                  <svg
                    className="h-16 mx-auto mb-4 text-main"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 27"
                    fill="none"
                  >
                    <path
                      d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                      fill="currentColor"
                    />
                  </svg>
                  <p className="text-gray-700 italic mb-6">
                    "{testimonial.review}"
                  </p>
                  <figcaption className="flex items-center justify-center space-x-4 mt-6">
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-main">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm  font-medium text-gray-500">
                        {testimonial.collageName}
                      </p>
                    </div>
                  </figcaption>
                </blockquote>
              </div>
            ))}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={goToPrevious}
            className="bg-main text-white p-4 rounded-full hover:bg-gray-700 transition-colors duration-300"
          >
            <span className="text-3xl">←</span>
          </button>
          <button
            onClick={goToNext}
            className="bg-main text-white p-4 rounded-full hover:bg-gray-700 transition-colors duration-300"
          >
            <span className="text-3xl">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
