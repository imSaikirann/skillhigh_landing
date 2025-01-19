import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { AppContext } from "../store/StoreContext";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDepartmentDropdownOpen, setIsDepartmentDropdownOpen] = useState(false);
  const [isCourseDropdownOpen, setIsCourseDropdownOpen] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const departmentDropdownRef = useRef(null);
  const courseDropdownRef = useRef(null);
  const { token, departments, fetchDepartments } = useContext(AppContext);
  const navigate = useNavigate();

  // Fetch departments when the component mounts
  useEffect(() => {
    fetchDepartments();
  }, []);

  // Close all menus
  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    setIsDepartmentDropdownOpen(false);
    setIsCourseDropdownOpen(false);
  };

  // Handle navigation to a course
  const handleNavigate = (id) => {
    if (id) {
      navigate(`/courses/${id}`);
      closeMenu();
    } else {
      console.error("Course ID is undefined or null");
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        departmentDropdownRef.current &&
        !departmentDropdownRef.current.contains(event.target)
      ) {
        setIsDepartmentDropdownOpen(false);
      }

      if (
        courseDropdownRef.current &&
        !courseDropdownRef.current.contains(event.target)
      ) {
        setIsCourseDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle department selection
  const handleDepartmentClick = (department) => {
 
    setSelectedDepartment(department.departmentName);
    setSelectedCourses(department.courses);
    setIsCourseDropdownOpen(true);
  };

  const gradientStyle = {
    backgroundImage: 'linear-gradient(to right, #0D8267, #044233)',
    color: 'white',
    textAlign: 'center',
  };
  return (
    <div className="bg-white p-3 relative font-inter z-50">
      <div className="bg-nav h-[65px] sm:h-[70px] rounded-full border-2 border-border flex items-center justify-between px-6 md:px-12 lg:px-16">
        {/* Logo */}
        <Link to="/">
          <img src={Logo} alt="Logo" className="h-auto w-[120px] md:w-[160px]" />
        </Link>

        {/* Navbar Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-md font-normal cursor-pointer hover:text-gray-700">
            Home
          </Link>
          <Link to="/aboutus" className="text-md font-normal cursor-pointer hover:text-gray-700">
            About
          </Link>

          {/* Courses Dropdown */}
          <div className="relative" ref={departmentDropdownRef}>
            <div
              onClick={() => setIsDepartmentDropdownOpen(!isDepartmentDropdownOpen)}
              className="text-md font-normal cursor-pointer flex items-center gap-1 hover:text-gray-700"
            >
              <h1>Courses</h1>
              <DownArrowIcon />
            </div>

            {/* Dropdown Content */}
            {isDepartmentDropdownOpen && (
  <div
    className={`absolute top-full mt-2 flex gap-4 transition-all duration-300 ease-in-out ${
      isDepartmentDropdownOpen
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-[-10px]"
    }`}
  >
    {/* Department Dropdown */}
    <div className="w-48 bg-white border border-gray-200 shadow-lg rounded-lg p-2 z-10">
      {departments?.map((department, index) => (
        <div
          key={index}
          onClick={() => handleDepartmentClick(department)}
          className={`flex items-center justify-between px-4 py-2 text-sm rounded cursor-pointer ${
            selectedDepartment === department.departmentName
              ? "bg-main text-white"
              : "hover:bg-gray-100 text-black"
          }`}
        >
          {department.departmentName}
          <ArrowIcon />
        </div>
      ))}
    </div>

    {/* Courses Dropdown */}
    {isCourseDropdownOpen && selectedCourses.length > 0 && (
      <div
        ref={courseDropdownRef}
        className={`absolute left-full top-0 w-48 sm:w-64 md:w-72 bg-white border border-gray-200 shadow-lg rounded-lg p-2 z-10 transition-all duration-300 ease-in-out ${
          isCourseDropdownOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-[-10px]"
        }`}
      >
        {selectedCourses.map((course, index) => (
          <button
            key={index}
            onClick={() => handleNavigate(course.id)}
            className={`block cursor-pointer px-4 py-2 text-sm sm:text-base hover:bg-gray-100 rounded`}
          >
            {course.courseName}
          </button>
        ))}
      </div>
    )}
  </div>
)}

          </div>
        </div>

        {/* Profile or Sign-In Button */}
        {token ? (
          <Link to="/profile" className="hidden md:block text-main text-3xl font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </Link>
        ) : (
          <Link to="/signin" className="hidden md:block">
<button 
 style={gradientStyle}
  className="text-white font-medium  px-5 py-2.5 rounded-full transition-all duration-300 ease-in-out hover:scale-105 hover:bg-opacity-90"
>
  Sign In
</button>



          </Link>
        )}

           {/* Mobile Menu Toggle */}
           <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2"
          aria-label="Toggle mobile menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-7 h-7 text-main"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
          </svg>
        </button>

        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-end">
            <div className="h-full w-3/4 max-w-xs bg-white shadow-lg p-6 relative z-50">
              {/* Close Button */}
              <button
                onClick={closeMenu}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                aria-label="Close menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-7 h-7 text-main"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Navigation Links */}
              <nav className="mt-10 space-y-6">
                <Link to="/" onClick={closeMenu} className="block text-lg font-semibold text-gray-700 hover:text-main">
                  Home
                </Link>
                <Link
                  to="/aboutus"
                  onClick={closeMenu}
                  className="block text-lg font-semibold text-gray-700 hover:text-main"
                >
                  About
                </Link>
                <Link
                  to="/allcourses"
                  onClick={closeMenu}
                  className="block text-lg font-semibold text-gray-700 hover:text-main"
                >
                  Courses
                </Link>
              </nav>

              {/* Profile or Sign-In */}
              <div className="mt-8">
                {token ? (
                  <Link to="/profile" onClick={closeMenu}>
                    <button className="w-full text-white bg-main px-4 py-2 rounded-full font-semibold hover:bg-main-dark">
                      Profile
                    </button>
                  </Link>
                ) : (
                  <Link to="/signin" onClick={closeMenu}>
                    <button className="w-full text-white bg-main px-4 py-2 rounded-full font-semibold hover:bg-main-dark">
                      Sign In
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Dummy components for missing icons
const DownArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 19.5l7.5-7.5-7.5-7.5" />
  </svg>
);
