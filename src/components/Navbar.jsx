import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { AppContext } from "../store/StoreContext";
import { 
  ArrowIcon,
  DownArrowIcon,
  ProfileIcon,
  MenuBar, 
  CloseIcon
} from '../assets/icons/icons';


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
                className={`absolute top-full mt-2 flex gap-4 transition-all duration-300 ease-in-out ${isDepartmentDropdownOpen
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
                      className={`flex items-center justify-between px-4 py-2 text-sm rounded cursor-pointer ${selectedDepartment === department.departmentName
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
                    className={`absolute left-full top-0 w-48 sm:w-64 md:w-72 bg-white border border-gray-200 shadow-lg rounded-lg p-2 z-10 transition-all duration-300 ease-in-out ${isCourseDropdownOpen
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
          <ProfileIcon/>
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
      <MenuBar/>
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
              <CloseIcon/>
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


