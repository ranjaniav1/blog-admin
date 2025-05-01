"use client";

import React, { useState } from "react";
import { useAuthHook } from "@/app/hooks/useAuthHook";
import Button from "@/app/common/Button";

const LoginForm = () => {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("admin@123");
  const { login, loading } = useAuthHook();

  // submit form 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (!result.success) {
      alert(result.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="flex items-center justify-center bg-white px-6 py-10">
        <div className="w-full max-w-md">
          <p className="text-3xl font-bold text-center mb-6">
            Login to Your Account
          </p>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
            <div className="text-center text-sm mt-4 text-gray-600">
              Don’t have an account?{" "}
              <a
                href="/register"
                className="text-indigo-500 font-medium hover:underline"
              >
                Register
              </a>
            </div>
          </form>
        </div>
      </div>
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
