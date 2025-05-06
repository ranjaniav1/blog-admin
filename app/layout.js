"use client";

import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
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
        <ToastProvider>
          <AuthProvider>
            {isLogin ? (
              children
            ) : (
              <DashboardLayout>
                <div className="my-rounded">{children}</div>
              </DashboardLayout>
            )}
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
