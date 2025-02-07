import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { motion } from "framer-motion";
import Spinner from "../components/Spinner";
import { AppContext } from "../store/StoreContext";
import { ChartIcon, ArrowPathIcon, AcademicIcon, SearchIcon, ProjectIcon } from "../assets/icons/icons";

export default function AllCourses() {
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const navigate = useNavigate();
  const { fetchAllCourses, courses, loading, error, setCourseId } = useContext(AppContext);

  const items = [
    { text: "All levels", checked: <ChartIcon /> },
    { text: "Projects", checked: <ProjectIcon /> },
    { text: "Internships", checked: <AcademicIcon /> },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (courses.length === 0) {
      fetchAllCourses();
    } else {
      setFilteredCourses(courses);
    }
  }, [courses, fetchAllCourses]);

  const debounceSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const newTimeout = setTimeout(() => {
      const filtered = courses.filter((course) =>
        course.courseName.toLowerCase().includes(searchValue)
      );
      setFilteredCourses(filtered);
    }, 300);

    setDebounceTimeout(newTimeout);
  };

  const handleSelectedCourse = (courseId) => {
    setCourseId(courseId);
    navigate(`/courses/${courseId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-10 h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-6 font-inter bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-headings mb-2">Explore Our Courses</h1>
            <p className="text-textColor font-medium">Find the course that suits your interests and skills!</p>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-96">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={debounceSearch}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
            />
            <SearchIcon className="absolute top-3 left-3 text-gray-400" />
          </div>
        </div>
      </div>

      {/* No Courses Found Message */}
      {filteredCourses.length === 0 && searchTerm && (
        <div className="text-center text-gray-500 mt-10">No courses found for "{searchTerm}"</div>
      )}

      {/* Courses Grid */}
      {filteredCourses.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
              className="flex flex-col bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Thumbnail */}
              <div className="relative flex justify-center items-center w-full h-56 bg-gray-100">
                <img
                  src={course.courseThumbnail}
                  alt={`${course.courseName} Thumbnail`}
                  className="object-cover w-full h-full"
                />
                <div className="absolute top-2 left-2 bg-gradient-to-r from-main to-green-900 text-white px-4 py-1 rounded-full text-xs font-semibold">
                  {course.departmentName}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col p-6 flex-grow">
                <h3 className="text-lg sm:text-xl font-semibold text-main mb-3">{course.courseName}</h3>
                <p className="text-sm text-gray-600 mb-5 line-clamp-3 font-medium">
                  {course.courseDescription.slice(0, 128)}...
                </p>

                <button
                  className="block w-full bg-gradient-to-r from-green-900 to-main text-white text-center py-3 rounded-lg font-semibold transition-all  hover:to-main-dark"
                  onClick={() => handleSelectedCourse(course.id)}
                >
                  See Course
                </button>
              </div>

              {/* Feature List */}
              <div className="mt-4 border-t p-4 bg-gray-50">
                <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-600">
                  {items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="capitalize text-xs font-medium text-gray-700">{item.text}</span>
                      {item.checked && <span className="text-main font-bold">{item.checked}</span>}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
