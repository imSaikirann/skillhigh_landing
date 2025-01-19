import React, { useEffect, useState, useRef } from "react";
import axios from "../auth/axiosConfig";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

export default function Mentors() {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    async function fetchMentors() {
      try {
        const res = await axios.get("/api/v1/mentors/getAllMentors");
 
        setMentors(res.data.mentors);
      } catch (error) {
        console.error("Failed to fetch mentors:", error);
      }
    }
    fetchMentors();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-16 font-inter bg-gray-50">
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-headings mb-12 text-center">
        Meet Our Mentors
      </h1>

      {/* Swiper Component */}
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: false, 
        }}
        modules={[Autoplay]}
        onAutoplayStart={() => console.log("Autoplay started")}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        className="w-full px-4 sm:px-8 lg:px-16"
      >
        {mentors.map((mentor, index) => (
          <SwiperSlide key={index}>
            <div className="relative flex-shrink-0 w-full h-96 sm:h-96 rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-2xl hover:scale-105 transition-transform duration-300">
              {/* Image */}
              <img
                src={mentor.photo}
                alt={mentor.name}
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/90"></div>
              {/* Text */}
              <div className="absolute bottom-6 left-4 right-4 sm:bottom-8 sm:left-6 sm:right-6 space-y-2 text-center text-white">
                <h3 className="font-bold text-lg sm:text-xl">{mentor.name}</h3>
                <p className="text-xs sm:text-sm md:text-base">{mentor.qualification}</p>
                <p className="text-xs sm:text-sm md:text-base">{mentor.company}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
