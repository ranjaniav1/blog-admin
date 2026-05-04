"use client";

import IconButton from "@/app/common/IconButton";
import { RxHamburgerMenu } from "react-icons/rx";
import InputField from "@/app/common/InputField";
import { useAuth } from "@/app/context/AuthContext";
import React, { useState, useEffect, useRef } from "react";
import ThemeToggleButton from "@/app/common/ThemeToggleButton";
import { useGeneralSettings } from "@/app/hooks/useGeneralSettings";
import { FiSearch, FiBell } from "react-icons/fi";

const Navbar = ({ onBurgerClick }) => {
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef();
  const { settings } = useGeneralSettings();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { user } = useAuth();

  return (
    <div className="sticky top-0 z-30">
      <div className="nav shadow-sm">
        <div className="flex justify-between items-center p-4 my-rounded">
          <div className="flex items-center gap-3">
            
            
            {/* Search Bar - Desktop */}
            <div className="hidden md:block relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <InputField
                type="search"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-80 rounded-lg border border-border focus:ring-2 focus:ring-primary-text focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-3 items-center">
            {/* Mobile Search Button */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="md:hidden p-2 hover:bg-hover rounded-lg transition-all duration-200"
            >
              <FiSearch size={20} className="icon-default" />
            </button>

            {/* Notification Bell */}
            <button className="relative p-2 hover:bg-hover rounded-lg transition-all duration-200">
              <FiBell size={20} className="icon-default" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Theme Toggle */}
            <ThemeToggleButton />

            {/* User Profile */}
            <div className="user flex items-center gap-2 cursor-pointer hover:bg-hover rounded-lg p-1 transition-all duration-200">
              <div className="user-image">
                <img
                  src={
                    user?.avatar_url ||
                    "https://ui-avatars.com/api/?name=Admin&background=3b82f6&color=fff"
                  }
                  alt="user"
                  className="w-9 h-9 rounded-full object-cover"
                />
              </div>
              <div className="user-name hidden sm:block text-sm font-medium">
                {user?.fullname || "Admin User"}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search Dropdown */}
        {showSearch && (
          <div ref={searchRef} className="md:hidden p-3 border-t my-border">
            <InputField
              type="search"
              placeholder="Search..."
              className="w-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;