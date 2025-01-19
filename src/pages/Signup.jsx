import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, provider } from '../auth/firebase';
import { signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import axios from '../auth/axiosConfig';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const gradientStyle = {
    backgroundImage: 'linear-gradient(to right, #0D8267, #044233)',
    color: 'white',
    textAlign: 'center',
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();

      const response = await axios.post('/api/v1/user/signup', {
        token,
        email: user.email,
        name: user.displayName,
      });

      if (response.data.success) {
        const { token: jwtToken } = response.data;
        localStorage.setItem('token', jwtToken);
        navigate('/profile');
      }
    } catch (error) {
      console.error('Signup Error:', error.message);
    }
  };

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    // Basic validation
    let isValid = true;
    if (!name) {
      setNameError('Name is required.');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email.');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password || password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!isValid) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();

      const response = await axios.post('/api/v1/user/signup', {
        token,
        email: user.email,
        name: name,
      });

      if (response.data.success) {
        const { token: jwtToken } = response.data;
        localStorage.setItem('token', jwtToken);
        navigate('/profile');
        window.location.reload();
      }
    } catch (error) {
      console.log(error)
      console.error('Error during email signup:', error.message);
      setErrorMessage(error.message);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex items-center justify-center p-5 min-h-screen bg-gray-100 font-inter  rounded-md">
      <div className="w-full max-w-lg p-10 space-y-8 bg-white rounded-xl shadow-xl">
        <h2 className=" text-2xl sm:text-3xl font-semibold text-center text-headings">Sign Up for Skill High</h2>

        <form className="space-y-6" onSubmit={handleEmailSignup}>
          <div className="space-y-2">
            <label htmlFor="name" className="block text-md font-medium text-textColor">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-50"
              placeholder="Enter your name"
              required
            />
            {nameError && <div className="text-red-600 text-sm">{nameError}</div>}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-md font-medium text-textColor">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-50"
              placeholder="Enter your email"
              required
            />
            {emailError && <div className="text-red-600 text-sm">{emailError}</div>}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-md font-medium text-textColor">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-50"
                placeholder="Create your password"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />} 
              </button>
            </div>
            {passwordError && <div className="text-red-600 text-sm">{passwordError}</div>}
          </div>

          {errorMessage && (
            <div className="text-red-600 text-sm text-center">{errorMessage}</div>
          )}

          <button
            style={gradientStyle}
            type="submit"
            className="w-full py-2 font-semibold text-white rounded-lg focus:outline-none focus:ring-2 transition duration-300 transform hover:scale-105"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={handleGoogleSignup}
            className="flex items-center justify-center w-full py-2 bg-white border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <svg
              className="h-6 w-6 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-0.5 0 48 48"
              version="1.1"
            >
              <g id="Icons" fill="none" fillRule="evenodd">
                <g id="Color-" transform="translate(-401.000000, -860.000000)">
                  <g id="Google" transform="translate(401.000000, 860.000000)">
                    <path
                      d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                      fill="#FBBC05"
                    ></path>
                    <path
                      d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                      fill="#EB4335"
                    ></path>
                    <path
                      d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                      fill="#34A853"
                    ></path>
                    <path
                      d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                      fill="#4285F4"
                    ></path>
                  </g>
                </g>
              </g>
            </svg>
            <span className="text-gray-700 font-medium">Continue with Google</span>
          </button>
        </div>

        <p className="mt-4 text-md font-medium text-center text-textColor">
          Already have an account?{' '}
          <Link to="/login" className="text-main hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
