import React, { useEffect, useRef, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Spinner from "../components/Spinner";
import { AppContext } from "../store/StoreContext";
import { useNavigate } from "react-router-dom";

const CoursesCarousel = () => {
  const navigate = useNavigate();
  const firstSwiperRef = useRef(null);
  const secondSwiperRef = useRef(null);
  const { fetchAllCourses, courses, loading, error } = useContext(AppContext);


  const items = [
    { text: "Lifetime access", checked: <ArrowPathIcon /> },
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

  const firstHalf = courses.slice(0, Math.ceil(courses.length / 2));
  const secondHalf = courses.slice(Math.ceil(courses.length / 2));

 
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

          {/* Second Carousel */}
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
          </div>
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

const AcademicIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
  </svg>
);

const ArrowPathIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
      <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>

  )
}

const ChartIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
    </svg>
  )
}
export default CoursesCarousel;
