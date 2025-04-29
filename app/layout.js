"use client";

import "./globals.css";
import Navbar from "./layout/Navbar/Navbar";
import Footer from "./layout/Fotter/Footer";
import Sidebar from "./layout/Sidebar/Sidebar";
import { Geist, Geist_Mono } from "next/font/google";
import { useState } from "react";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <div className="flex h-full relative">
          {/* Sidebar for large screens */}
          <div
            className={`bg-white transition-all duration-300 ease-in-out z-40 
              ${sidebarOpen ? "w-64" : "w-0"} 
              overflow-hidden hidden md:block`}
          >
            <Sidebar />
          </div>

          {/* Sidebar Drawer for small screens */}
          {sidebarOpen && (
            <div className="md:hidden fixed inset-0 z-50 flex">
              {/* Backdrop */}
              <div
                className="fixed inset-0 bg-black opacity-50"
                onClick={() => setSidebarOpen(false)}
              />
              {/* Sidebar Drawer */}
              <div
                className={`relative w-64 bg-white shadow-lg h-full z-50 transition-transform duration-300 transform ${
                  sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
              >
                <Sidebar />
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 flex flex-col min-h-screen w-full">
            <Navbar onBurgerClick={() => setSidebarOpen(!sidebarOpen)} />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
