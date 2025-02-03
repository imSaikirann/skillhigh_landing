import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Wave from '../assets/wave.png';
import axios from '../services/axiosConfig';
import Spinner from '../components/Spinner';
import CourseModules from './Module';
export default function Course_Banner() {
  const { id } = useParams(); 
  const [course, setCourse] = useState(null); 
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/api/v1/courses/getSingleCourse/${id}`); 
        setCourse(response.data); 
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchCourse();
  }, [id]);

  const gradientStyle = {
    backgroundImage: 'linear-gradient(to right, #0D8267, #044233)',
    color: 'white',
    textAlign: 'center',
  };

  const handleCourseCheckout = (id) => {
    navigate(`/course/checkout/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
  }

  return (
   <div>
     <div className="relative bg-white overflow-hidden">
      {/* Background Image */}
      <img
        src={Wave}
        alt="Background"
        className="w-full h-[900px] md:h-[800px] lg:h-[600px] object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white opacity-80 pointer-events-none " />

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col md:flex-col lg:flex-row items-center justify-between animate-fadeIn px-6 md:px-2 lg:px-16 z-10 space-y-6 md:space-y-0">
        {/* Text Section */}
        <div className="flex flex-col items-start md:items-start md:text-left w-full md:w-4/5 lg:w-3/5 space-y-4 mt-6 font-inter ">
          <h1  className=" text-main text-3xl md:text-4xl lg:text-6xl font-bold">
            {course.courseName || 'Course Title'}
          </h1>
          <p className="text-textColor font-medium text-md md:text-lg lg:text-lg mt-3 mb-4 w-full">
            {course.courseDescription || 'Course Description'}
          </p>

          {/* Features List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-textColor font-medium text-md md:text-lg lg:text-lg mt-3">
            <div className="flex items-center space-x-2">
              <span className="text-main">✓</span>
              <span>Lifetime Membership</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-main">✓</span>
              <span>3+ Real-World Projects</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-main">✓</span>
              <span>Expert-Led Live Guidance</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-main">✓</span>
              <span>Internship Completion Certification</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-main">✓</span>
              <span>Career Support and Placement Services</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-main">✓</span>
              <span>60 Days Program</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-main">✓</span>
              <span>Periodic Skills Assessment</span>
            </div>
          </div>

          {/* Enroll Button */}
          <div className="flex justify-start md:justify-start gap-4 md:gap-6 mt-3">
            <button
              style={gradientStyle}
              onClick={() => handleCourseCheckout(course.id)}
              className="px-10 py-3 md:px-6 md:py-3 rounded-full text-white font-medium text-sm md:text-base"
            >
              Enroll now
            </button>
          </div>
        </div>

        {/* AI Image */}
        <img
          src={course.courseThumbnail}
          alt="AI Illustration"
          className="w-4/5 md:w-1/2 lg:w-1/3 h-auto object-contain"
        />
      </div>
      
    </div>
    <CourseModules modules={course.modules} />
   </div>
  );
}
