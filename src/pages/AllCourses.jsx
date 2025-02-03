import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Spinner from "../components/Spinner";
import { AppContext } from "../store/StoreContext";
import { ChartIcon,ArrowPathIcon,AcademicIcon, SearchIcon } from '../assets/icons/icons';

export default function AllCourses() {
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState(null); // Store the timeout reference
  const navigate = useNavigate();
  const { fetchAllCourses, courses, loading, error, setCourseId } = useContext(AppContext);

  const items = [
    { text: "Lifetime access", checked: <ArrowPathIcon /> },
    { text: "All levels", checked: <AcademicIcon /> },
    { text: "Assignments", checked: <ChartIcon /> },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch courses only once
  useEffect(() => {
    if (courses.length === 0) {
      fetchAllCourses();
    } else {
      setFilteredCourses(courses);
    }
  }, [courses, fetchAllCourses]);

  // Debounce function
  const debounceSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);

    // Clear previous timeout
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Set new timeout for debouncing
    const newTimeout = setTimeout(() => {
      const filtered = courses.filter((course) =>
        course.courseName.toLowerCase().includes(searchValue)
      );
      setFilteredCourses(filtered);
    }, 500); // Adjust the debounce time (500ms)

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
    <div className="p-6 font-inter bg-gray-50 rounded-md min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h1 className=" text-3xl md:text-4xl font-bold text-headings mb-2">Explore Our Courses</h1>
            <p className="text-textColor font-medium">Find the course that suits your interests and skills!</p>
          </div>
          {/* Search Input */}
          <div className="relative w-full sm:w-96">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={debounceSearch}  // Use the debounceSearch function here
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
            />
            <SearchIcon/>
          </div>
        </div>
      </div>

      {/* No Courses Found Message */}
      {filteredCourses.length === 0 && searchTerm && (
        <div className="text-center text-gray-500 mt-10">
          No courses found for "{searchTerm}"
        </div>
      )}

      {/* Courses Grid */}
      {filteredCourses.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg"
            >
              {/* Thumbnail */}
              <div className="relative flex justify-center items-center w-full h-56 bg-gray-100">
                <img
                  src={course.courseThumbnail}
                  alt={`${course.courseName} Thumbnail`}
                  className="object-contain max-w-full max-h-full"
                />
                <div className="absolute top-2 left-2 bg-main text-white px-3 py-1 rounded-full text-sm">
                  {course.departmentName}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col p-4 flex-grow">
                <h3 className=" text-lg sm:text-xl font-semibold text-main mb-2">{course.courseName}</h3>
                <p className="text-sm text-textColor mb-4 line-clamp-3 font-medium">
                  {course.courseDescription.slice(0, 128)}...
                </p>
                <p className="text-gray-700 font-medium text-sm mb-4">Lessons: {course.courseCount}</p>
                <button
                  className="block w-full bg-main text-white text-center py-2 rounded-lg font-medium transition-colors hover:bg-main-dark"
                  onClick={() => handleSelectedCourse(course.id)}
                >
                  See Course
                </button>
              </div>

              {/* Feature List */}
              <div className="mt-4 border-t p-4">
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
          ))}
        </div>
      )}
    </div>
  );
}

