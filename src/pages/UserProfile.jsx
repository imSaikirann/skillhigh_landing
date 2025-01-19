import React, { useState, useEffect, useContext } from 'react';
import axios from '../auth/axiosConfig';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../store/StoreContext';
import Spinner from '../components/Spinner';

const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setToken, setCheckoutData } = useContext(AppContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found in localStorage');
          setLoading(false);
          return;
        }

        const response = await axios.get('/api/v1/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setUserData(response.data);
        } else if (response.status === 401) {
          // Token is expired or invalid, remove it from localStorage
          localStorage.removeItem('token');
          setToken(null);  // Update context
          navigate('/login');  // Redirect to login page or homepage
          console.error('Unauthorized - Token removed');
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        if (error.response && error.response.status === 401) {
          // Handle 401 error in case of network issues or other causes
          localStorage.removeItem('token');
          setToken(null);  // Update context
          navigate('/login');  // Redirect to login page or homepage
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [setToken, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 font-inter bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 grid grid-cols-1 md:grid-cols-2 items-center gap-4">
        <div className="flex items-center space-x-4">
          <div className="bg-main text-white rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-2xl font-bold">
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
          </div>
          <div>
            <h1 className="text-lg sm:text-2xl font-semibold text-gray-800">
              {userData.name || 'User'}
            </h1>
            <p className="text-sm sm:text-lg text-gray-500">
              {userData.email || 'Email not available'}
            </p>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="px-4 sm:px-6 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Courses Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
          Enrolled Courses
        </h2>
        {userData.purchase && userData.purchase.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userData.purchase.map((course, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-main text-white rounded-full w-8 h-8 flex items-center justify-center font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-md font-medium text-gray-700">
                      {course.courseName || `Course ${index + 1}`}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Purchased by: {course.name}
                </p>
                <p className="text-sm text-gray-600">Email: {course.email}</p>
                <p className="text-sm text-gray-600 font-semibold">
                  Price: ₹{course.price}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center flex-col justify-center py-8">
            <p className="text-lg text-gray-500 italic mb-4">
              You haven't enrolled in any courses yet!
            </p>
            <Link to="/allcourses">
              <button className="px-6 py-3 bg-main text-white font-medium rounded-lg shadow  transition flex items-center">
                Explore Courses
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5 ml-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
