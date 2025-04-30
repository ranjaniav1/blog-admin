'use client'

import React, { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('superadmin@gmail.com');
  const [password, setPassword] = useState('superadmin@123');

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left: Login Form */}
      <div className="flex items-center justify-center bg-white px-6 py-10">
        <div className="w-full max-w-md">
          <p className="text-3xl font-bold text-center mb-6">Login to Your Account</p>
          <form className="space-y-5">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Sign In
            </button>
            <div className="text-center text-sm mt-4 text-gray-600">
              Don’t have an account? <a href="/register" className="text-indigo-500 font-medium hover:underline">Register</a>
            </div>
          </form>
        </div>
      </div>

      {/* Right: Background Image */}
      <div
        className="hidden md:block bg-cover bg-center"
        style={{
          backgroundImage: `url('https://i.pinimg.com/736x/e4/62/ba/e462ba4565cf843c6268eb8a4532d82f.jpg')`,
        }}
      />
    </div>
  );
};

export default LoginForm;
