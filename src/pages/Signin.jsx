import React, { useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { auth, provider } from '../services/firebase';
import { signInWithPopup, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import axios from '../config/apiClient';
import { GoogleIcon } from '../assets/icons/icons';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const gradientStyle = {
    backgroundImage: 'linear-gradient(to right, #0D8267, #044233)',
    color: 'white',
    textAlign: 'center',
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleEmailPasswordSignin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();

      const response = await axios.post('/api/v1/user/signin', {
        token,
        email: user.email,
      });

      if (response.data.success) {
        const { token: jwtToken } = response.data;
        localStorage.setItem('token', jwtToken);
        window.location.href = '/profile';
      }
    } catch (error) {
      setErrorMessage(error.message || 'Error signing in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();

      const response = await axios.post('/api/v1/user/signin', {
        token,
        email: user.email,
      });

      if (response.data.success) {
        const { token: jwtToken } = response.data;
        localStorage.setItem('token', jwtToken);
        window.location.href = '/profile';
      }
    } catch (error) {
      setErrorMessage(error.message || 'Error signing in with Google.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setErrorMessage('Password reset email sent! Check your inbox.');
    } catch (error) {
      setErrorMessage(error.message || 'Error sending password reset email.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  bg-gray-100 font-inter p-1 rounded-md">
      <div className="w-full max-w-lg p-8 space-y-8 bg-white rounded-xl shadow-lg transform transition-all duration-500 ease-in-out">
        <h2 className=" text-2xl sm:text-3xl font-semibold text-center text-main mb-6">Sign In to Skill High</h2>

        <form className="space-y-6 " onSubmit={handleEmailPasswordSignin}>
          <div className="space-y-4">
            <label htmlFor="email" className="block text-md font-medium text-textColor">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-50 transition duration-200"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="space-y-4">
            <label htmlFor="password" className="block text-md font-medium text-textColor">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-50 transition duration-200"
              placeholder="Enter your password"
              required
            />
          </div>

          {errorMessage && <p className="text-sm text-red-600 text-center">{errorMessage}</p>}

          <button
            style={gradientStyle}
            type="submit"
            className={`w-full py-3 text-white font-medium rounded-lg focus:outline-none focus:ring-2 mt-4 transition duration-200 ${loading ? 'bg-gray-400 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

          <div className="flex items-center justify-between mt-4">
            <Link
              to="#"
              onClick={handleForgotPassword}
              className="text-sm text-main  hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={handleGoogleSignin}
            className={`flex items-center justify-center w-full py-3 bg-white border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-200 ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
            disabled={loading}
          >
           <GoogleIcon/>  
            <span className="text-gray-700 font-medium">Sign in with Google</span>
          </button>
        </div>

        <p className="mt-6 text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-main font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
