import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';

export default function Login() {

    const router = useRouter()
  const [userRole, setUserRole] = useState('student'); // Default to 'student'

  const handleClick = () => {
    router.push(`/${userRole}`);
  }

  return (
    <div className="min-h-screen bg-blue-500  flex items-center justify-center">
      <div className="bg-white outline-dashed h-[80vh] p-8 rounded-lg shadow-md w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center mb-6">
          <img src="/logo.jfif" alt="AttendEase Logo" className="h-12 w-12" />
          <h2 className="text-2xl font-bold text-gray-800 ml-2">AttendEase</h2>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Login to Your Account</h3>

        {/* Role Selection */}
        <div className="flex justify-center mb-4">
          <button 
            onClick={() => setUserRole('student')}
            className={`px-4 py-2 rounded-l-md ${userRole === 'student' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Student
          </button>
          <button 
            onClick={() => setUserRole('teacher')}
            className={`px-4 py-2 rounded-r-md ${userRole === 'teacher' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Teacher
          </button>
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
            Email
          </label>
          <div className="flex items-center border-2 rounded-md">
            <FaUser className="text-gray-500 ml-3" />
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full p-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
            Password
          </label>
          <div className="flex items-center border-2 rounded-md">
            <FaLock className="text-gray-500 ml-3" />
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full p-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Login Button */}
        <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300" onClick={handleClick}>
          Login
        </button>

        {/* Registration Link */}
        <div className="mt-4 text-center">
          <p className="text-gray-600">Don't have an account? 
            <a href="/register" className="text-blue-600 hover:underline ml-1">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
}
