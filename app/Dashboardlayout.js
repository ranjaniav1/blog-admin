"use client";

import Footer from "./layout/Fotter/Footer";
import Sidebar from "./layout/Sidebar/Sidebar";
import Navbar from "./layout/Navbar/Navbar";
import { useState } from "react";
import BreadCrumb from "./common/BreadCrumb";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - Desktop always visible */}
      <div className="hidden md:block h-full">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Drawer */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={toggleSidebar}
          />
          <div className="relative w-72 h-full shadow-lg z-50">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Navbar onBurgerClick={toggleSidebar} />
        <BreadCrumb
          items={[
            { label: "Home", href: "/dashboard" },
            { label: "Dashboard", href: "/dashboard" },
          ]}
        />
        <main className="flex-1 p-6">{children}</main>
        <Footer />
      </div>
    </div>
  );
}