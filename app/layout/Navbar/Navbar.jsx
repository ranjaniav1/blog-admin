"use client";

import React, { useState, useEffect, useRef } from "react";
import IconButton from "@/app/common/IconButton";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosNotificationsOutline, IoMdSearch } from "react-icons/io";
import ThemeToggleButton from "@/app/common/ThemeToggleButton";
import InputField from "@/app/common/InputField";
import { useAuth } from "@/app/context/AuthContext";
import { useToast } from "@/app/context/ToastContext";

const Navbar = ({ onBurgerClick }) => {
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef();

  // Close the dropdown on outside click
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
  const { showToast } = useToast();

  return (
    <>
      <div className="relative">
        <div className="py-6 primary">
          <div className="background flex justify-between p-5 my-rounded">
            <div className="flex items-center gap-2">
              <IconButton
                Icon={RxHamburgerMenu}
                className="text-2xl"
                aria_label="Menu"
                tooltip="Menu"
                onClick={onBurgerClick}
              />
              {/* Desktop search input */}
            </div>

            <div className="right-side-menu flex gap-2 items-center">
              <div className="theme">
                <ThemeToggleButton />
              </div>

              {/* Notification hidden on small */}
              <div className="notification hidden sm:block">
                <IconButton
                  Icon={IoIosNotificationsOutline}
                  aria_label="Notification"
                  tooltip="Notification"
                  needBg
                  onClick={() =>
                    showToast("loading", "Sample Success message!")
                  }
                />
              </div>

              <div className="user flex items-center gap-2">
                <div className="user-image">
                  <img
                    src={
                      user?.avatar_url ||
                      "https://thafd.bing.com/th/id/OIP.LJZkNMsFI9y96XbKcoOBQQHaHa?rs=1&pid=ImgDetMain"
                    }
                    alt="user"
                    className="w-9 h-9 rounded-full"
                  />
                </div>
                <div className="user-name hidden sm:block">
                  {user?.fullname || "Admin12"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile search dropdown */}
        {showSearch && (
          <div ref={searchRef} className="block sm:hidden p-2 w-full">
            <InputField type="search" name="" placeholder="Search..." />
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
