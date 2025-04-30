import React from 'react';

const LoginForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br bg-article px-4">
      <div className="bg-gray-800 shadow-lg rounded-xl p-8 max-w-md w-full">
        <p className="text-3xl font-bold text-center mb-6">Login to Your Account</p>
        <form className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="••••••••"
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
  );
};

export default LoginForm;
