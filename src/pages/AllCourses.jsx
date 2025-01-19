import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Spinner from "../components/Spinner";
import { AppContext } from "../store/StoreContext";

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
            <svg
              className="absolute top-3 right-3 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              width="20"
              height="20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
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

const AcademicIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
    </svg>
  );
};

const ArrowPathIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
  );
};

const ChartIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
    </svg>
  );
};
