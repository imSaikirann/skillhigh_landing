import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, provider } from '../services/firebase';
import { signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import axios from '../config/apiClient';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import { GoogleIcon } from '../assets/icons/icons';

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
            <GoogleIcon/>
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
