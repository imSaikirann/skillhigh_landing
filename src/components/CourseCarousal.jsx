import React, { useEffect, useRef, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Spinner from "../components/Spinner";
import { AppContext } from "../store/StoreContext";
import { useNavigate } from "react-router-dom";
import { ChartIcon,ArrowPathIcon,AcademicIcon } from '../assets/icons/icons';

const CoursesCarousel = () => {
  const navigate = useNavigate();
  const firstSwiperRef = useRef(null);
  const secondSwiperRef = useRef(null);
  const { fetchAllCourses, courses, loading, error } = useContext(AppContext);


  const items = [
    // { text: "Lifetime access", checked: <ArrowPathIcon /> },
    { text: "All levels", checked: <AcademicIcon /> },
    { text: "Assignments", checked: <ChartIcon /> },
  ];

  useEffect(() => {
    // Fetch courses if empty
    if (courses.length === 0) {
      fetchAllCourses();
    }
  }, [courses.length, fetchAllCourses]);

  useEffect(() => {
    // Ensure Swiper updates and autoplay start when courses are loaded
    if (courses.length > 0) {
      if (firstSwiperRef.current?.swiper) {
        firstSwiperRef.current.swiper.update();
        firstSwiperRef.current.swiper.autoplay.start();
      }
      if (secondSwiperRef.current?.swiper) {
        secondSwiperRef.current.swiper.update();
        secondSwiperRef.current.swiper.autoplay.start();
      }
    }
  }, [courses]);

  const firstHalf = courses.slice(0, Math.ceil(courses.length / 0));
  // const secondHalf = courses.slice(Math.ceil(courses.length / 2));

 
  const handleSelectedCourse = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  const gradientStyle = {
    backgroundImage: "linear-gradient(to right, #0D8267, #044233)",
    color: "white",
    textAlign: "center",
  };

  const scrollLeft = (swiperRef) => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const scrollRight = (swiperRef) => {
    if (swiperRef.current?.swiper) {
      
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <div className="p-3 md:p-6 font-inter bg-gray-50 rounded-md min-h-screen flex flex-col items-center">
      <h1 className="text-lg md:text-3xl lg:text-5xl font-bold text-main mb-4">
        Explore Our Courses
      </h1>
      <p className="text-textColor text-md font-medium sm:text-2xl mb-8 text-center max-w-3xl">
        Find the course that suits your interests and skills!
      </p>

      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <Spinner />
        </div>
      ) : error ? (
        <p className="text-center text-red-500 mt-10">Error: {error}</p>
      ) : (
        <>
          {/* First Carousel */}
          <div className="relative w-full max-w-7xl mb-10">
            <div
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-main text-white px-3 py-2 cursor-pointer rounded-full z-10"
              onClick={() => scrollLeft(firstSwiperRef)}
            >
              &#x25C0;
            </div>
            <Swiper
           
             ref={firstSwiperRef}
             spaceBetween={30}
             slidesPerView={1}
             loop={true}
             autoplay={{
               delay: 1500,
               disableOnInteraction: false,
             }}
             speed={2000}
             modules={[Autoplay]}
              breakpoints={{
                480: { slidesPerView: 2 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1440: { slidesPerView: 3 },
              }}
            >
              {firstHalf.map((course, index) => (
                <SwiperSlide key={index}>
                  <CourseCard course={course} gradientStyle={gradientStyle} handleSelectedCourse={handleSelectedCourse} items={items} />
                </SwiperSlide>
              ))}
            </Swiper>
            <div
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-main text-white px-3 py-2 rounded-full cursor-pointer z-10"
              onClick={() => scrollRight(firstSwiperRef)}
            >
              &#x25B6;
            </div>
          </div>

          {/* Second Carousel
          <div className="relative w-full max-w-7xl mb-10">
            <div
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-main text-white px-3 py-2 rounded-full cursor-pointer z-10"
              onClick={() => scrollLeft(secondSwiperRef)}
            >
              &#x25C0;
            </div>
            <Swiper
              ref={secondSwiperRef}
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 1500,
                disableOnInteraction: false,
              }}
              speed={2000}
              modules={[Autoplay]}
              breakpoints={{
                480: { slidesPerView: 2 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1440: { slidesPerView: 3 },
              }}
            >
              {secondHalf.map((course, index) => (
                <SwiperSlide key={index}>
                  <CourseCard course={course} gradientStyle={gradientStyle} handleSelectedCourse={handleSelectedCourse} items={items} />
                </SwiperSlide>
              ))}
            </Swiper>
            <div
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-main text-white px-3  py-2 rounded-full cursor-pointer z-10"
              onClick={() => scrollRight(secondSwiperRef)}
            >
              &#x25B6;
            </div>
          </div> */}
        </>
      )}
    </div>
  );
};

const CourseCard = ({ course, gradientStyle, handleSelectedCourse, items }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl w-full min-h-md">
    <div className="relative">
      <img
        src={course.courseThumbnail}
        alt={course.courseName}
        className="w-full h-full object-cover rounded-lg shadow-md"
      />
      <div className="absolute top-2 left-2 bg-main text-white px-3 py-1 rounded-full text-sm">
        {course.departmentName}
      </div>
    </div>
    <div className="flex flex-col flex-grow mt-4">
      <h2 className="text-lg font-bold text-main text-center mb-2">{course.courseName}</h2>
      <p
  className="text-textColor font-medium text-sm text-justify mb-4 line-clamp-3"
  style={{ hyphens: "auto", wordBreak: "break-word", wordSpacing: "0.05em" }}
>
  {course.courseDescription}...
</p>

    </div>
    <button
      style={gradientStyle}
      onClick={() => handleSelectedCourse(course.id)}
      className="px-6 py-2 rounded-md font-semibold text-white bg-main hover:bg-main-dark transition "
    >
      Enroll Now
    </button>
    <div className="mt-4 border-t pt-4">
      <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-600">
        {items.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span className="capitalize text-xs">{item.text}</span>
            {item.checked && <span className="text-main font-bold">{item.checked}</span>}
          </div>
        ))}
      </div>
    </div>
  </div>
);


export default CoursesCarousel;
