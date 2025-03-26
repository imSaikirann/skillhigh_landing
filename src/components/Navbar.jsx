import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/logo.png";
import { AppContext } from "../store/StoreContext";
import { ArrowIcon, DownArrowIcon, ProfileIcon, MenuBar, CloseIcon } from "../assets/icons/icons";

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
  const location = useLocation(); // Get current location (URL path)

  useEffect(() => {
    fetchDepartments();
  }, []);

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    setIsDepartmentDropdownOpen(false);
    setIsCourseDropdownOpen(false);
  };

  const handleNavigate = (id) => {
    if (id) {
      navigate(`/courses/${id}`);
      closeMenu();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (departmentDropdownRef.current && !departmentDropdownRef.current.contains(event.target)) {
        setIsDepartmentDropdownOpen(false);
      }
      if (courseDropdownRef.current && !courseDropdownRef.current.contains(event.target)) {
        setIsCourseDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDepartmentClick = (department) => {
    setSelectedDepartment(department.departmentName);
    setSelectedCourses(department.courses);
    setIsCourseDropdownOpen(true);
  };

  const gradientStyle = {
    backgroundImage: "linear-gradient(to right, #0D8267, #044233)",
    color: "white",
    textAlign: "center",
  };

  const getActiveClass = (path) => {
    return location.pathname === path ? "text-main font-bold" : "text-gray-700";
  };

  return (
    <div className="relative z-50">
      {/* Fixed Navbar */}
      <div className="bg-white fixed top-0 left-0 w-full h-[74px] flex items-center justify-between px-6 md:px-12 lg:px-16 shadow-lg z-50">
        <Link to="/">
          <img src={Logo} alt="Logo" className="h-auto w-[120px] md:w-[160px]" />
        </Link>

        <div className="hidden font-inter md:flex space-x-6 items-center">
          <Link to="/" className={`text-md font-normal cursor-pointer hover:text-gray-700 ${getActiveClass("/")}`}>
            Home
          </Link>
          <Link to="/aboutus" className={`text-md font-normal cursor-pointer hover:text-gray-700 ${getActiveClass("/aboutus")}`}>
            About
          </Link>

          <div className="relative" ref={departmentDropdownRef}>
            <div
              onClick={() => setIsDepartmentDropdownOpen(!isDepartmentDropdownOpen)}
              className="text-md font-normal cursor-pointer flex items-center gap-1 hover:text-gray-700"
            >
              <h1>Courses</h1>
              <DownArrowIcon />
            </div>

            {isDepartmentDropdownOpen && (
              <div className="absolute top-full mt-2 flex gap-4">
                <div className="w-48 bg-white border border-gray-200 shadow-lg rounded-lg p-2 z-10">
                  {departments?.map((department, index) => (
                    <div
                      key={index}
                      onClick={() => handleDepartmentClick(department)}
                      className={`flex items-center justify-between px-4 py-2 text-sm rounded cursor-pointer ${
                        selectedDepartment === department.departmentName ? "bg-main text-white" : "hover:bg-gray-100"
                      }`}
                    >
                      {department.departmentName}
                      <ArrowIcon />
                    </div>
                  ))}
                </div>

                {isCourseDropdownOpen && selectedCourses.length > 0 && (
                  <div
                    ref={courseDropdownRef}
                    className="absolute left-full top-0 w-64 bg-white border border-gray-200 shadow-lg rounded-lg p-2 z-10"
                  >
                    {selectedCourses.map((course, index) => (
                      <button
                        key={index}
                        onClick={() => handleNavigate(course.id)}
                        className="block cursor-pointer px-4 py-2 text-sm hover:bg-gray-100 rounded"
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

        {token ? (
          <Link to="/profile" className="hidden md:block text-main text-3xl font-bold">
            <ProfileIcon />
          </Link>
        ) : (
          <Link to="/signin" className="hidden md:block">
            <button style={gradientStyle} className="text-white font-medium px-5 py-2.5 rounded-full hover:scale-105">
              Sign In
            </button>
          </Link>
        )}

        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2">
          <MenuBar />
        </button>

        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-end">
            <div className="h-full w-3/4 max-w-xs bg-white shadow-lg p-6">
              <button onClick={closeMenu} className="absolute top-4 right-4 p-2 bg-gray-200 hover:bg-gray-300">
                <CloseIcon />
              </button>

              <nav className="mt-10 space-y-6">
                <Link to="/" onClick={closeMenu} className={`block text-lg ${getActiveClass("/")}`}>
                  Home
                </Link>
                <Link to="/aboutus" onClick={closeMenu} className={`block text-lg ${getActiveClass("/aboutus")}`}>
                  About
                </Link>
                <Link to="/allcourses" onClick={closeMenu} className={`block text-lg ${getActiveClass("/allcourses")}`}>
                  Courses
                </Link>
              </nav>

              <div className="mt-8">
                {token ? (
                  <Link to="/profile" onClick={closeMenu}>
                    <button className="w-full text-white bg-main px-4 py-2 rounded-full hover:bg-main-dark">
                      Profile
                    </button>
                  </Link>
                ) : (
                  <Link to="/signin" onClick={closeMenu}>
                    <button className="w-full text-white bg-main px-4 py-2 rounded-full hover:bg-main-dark">
                      Sign In
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Page Content Spacer */}
      <div className="pt-[70px]" />
    </div>
  );
};
