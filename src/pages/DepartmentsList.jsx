import React, { useContext, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { AppContext } from '../store/StoreContext';

const DepartmentsList = () => {
  const { courses, selectedDepartmentCourses, fetchCoursesByDepartmentId } = useContext(AppContext);
  const [activeDepartmentId, setActiveDepartmentId] = useState(null);
  const navigate = useNavigate()
  if (!courses) {
    return <div className="text-center py-10">Loading...</div>;
  }

  const handleExploreClick = async (id) => {
    navigate(`/department/courses/${id}`)
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((department) => (
          <div
            key={department.id}
            className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 flex flex-col justify-between h-[350px]"
          >
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {department.departmentName}
              </h2>
              <p className="text-gray-600 mb-4 h-[100px] overflow-hidden">
                {department.description}
              </p>
            </div>

   
           <button
              className="mt-auto bg-main text-white py-2 px-4 rounded-md transition duration-300"
              onClick={() => handleExploreClick(department.id)}
            >
              Explore Courses
            </button>
         
          </div>
        ))}
      </div>

      {/* Conditionally render selected department courses */}
      {activeDepartmentId && (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Courses in Department
          </h3>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {selectedDepartmentCourses.length > 0 ? (
              selectedDepartmentCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
                >
                  <img
                    src={course.courseThumbnail}
                    alt={course.courseName}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <h4 className="text-lg font-semibold text-gray-800">
                    {course.courseName}
                  </h4>
                  <p className="text-gray-600 mt-2">{course.courseDescription}</p>
                  <p className="text-gray-500 mt-1">Course Count: {course.courseCount}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No courses available for this department.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentsList;
