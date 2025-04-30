// context/AuthContext.js
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Optional: You could fetch user from API if token exists (more secure)
    const token = Cookies.get("access_token");
    const userData = localStorage.getItem("user");
    console.log("Token from AuthContext:", token);
    console.log("User from AuthContext:", user);
    if (!token && !userData) {
      setUser(null);
    }
    if (userData) {
      setUser(JSON.parse(userData)); // Set user from local storage
    }
    // You can add API call here to fetch user data by token if needed
  }, []);

  const loginContext = (accessToken, userData) => {
    Cookies.set("access_token", accessToken, { expires: 1 });
    setUser(userData); // Only store in memory (React context)
    // Optionally, you can store user data in cookies or local storage if needed
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, loginContext, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
