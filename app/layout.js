"use client";

import { AuthProvider } from "./context/AuthContext";
import DashboardLayout from "./Dashboardlayout";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { usePathname } from "next/navigation";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isLogin = pathname === "/login";

  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <AuthProvider>
          {isLogin ? children : <DashboardLayout>{children}</DashboardLayout>}
        </AuthProvider>
      </body>
    </html>
  );
}
