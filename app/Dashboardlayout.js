"use client";

import Navbar from "./layout/Navbar/Navbar";
import Footer from "./layout/Fotter/Footer";
import Sidebar from "./layout/Sidebar/Sidebar";
import { useState } from "react";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-screen bg-white z-40 transition-all duration-300 ease-in-out hidden md:block ${
          sidebarOpen ? "w-64" : "w-0"
        } overflow-hidden`}
      >
        <Sidebar />
      </div>

      {/* Mobile Sidebar Drawer */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setSidebarOpen(false)}
          />
          <div
            className={`relative w-64 bg-white shadow-lg h-full z-50 transition-transform duration-300 transform ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Content with Left Margin for Sidebar */}
      <div
        className={`flex flex-col min-h-screen transition-all duration-300 ${
          sidebarOpen ? "md:ml-64" : "md:ml-0"
        }`}
      >
        <Navbar onBurgerClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}
