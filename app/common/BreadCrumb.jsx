"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaAngleRight, FaHome } from "react-icons/fa";


const BreadCrumb = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((seg) => seg);

  if (pathname === "/dashboard") return null;

  const filteredSegments = segments.filter(
    (seg) => seg.toLowerCase() !== "admin" && !/^[a-f0-9]{24}$/i.test(seg)
  );

  const breadcrumbItems = filteredSegments.map((segment, index) => {
    const actualIndex = segments.findIndex((s) => s === segment);
    const href = "/" + segments.slice(0, actualIndex + 1).join("/");
    const label = decodeURIComponent(segment)
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return { href, label };
  });

  // Get page title from pathname
  const getPageTitle = () => {
    const lastSegment = segments[segments.length - 1];
    if (lastSegment && !/^[a-f0-9]{24}$/i.test(lastSegment)) {
      return lastSegment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    }
    const secondLast = segments[segments.length - 2];
    if (secondLast && secondLast !== "admin") {
      return secondLast.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    }
    return "Dashboard";
  };

  const headingTitle = getPageTitle();

  return (
    <div className="px-4 py-3  card mb-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Page Title */}
        <h1 className="heading font-semibold active-text">
          {headingTitle}
        </h1>

        {/* Breadcrumb */}
        <nav className="flex items-center">
          <ol className="flex items-center flex-wrap gap-1">
            <li>
              <Link
                href="/dashboard"
                className="flex items-center gap-1 px-2 py-1 my-rounded transition-all duration-200 hover:bg-hover secondary-text text-sm"
              >
                <FaHome className="w-3 h-3" />
                <span className="hidden sm:inline">Home</span>
              </Link>
            </li>
            
            {breadcrumbItems.map((item, index) => (
              <li key={index} className="flex items-center">
                <FaAngleRight className="mx-1 w-3 h-3 secondary-text" />
                {index !== breadcrumbItems.length - 1 ? (
                  <Link
                    href={item.href}
                    className="px-2 py-1 my-rounded transition-all duration-200 hover:bg-hover secondary-text text-sm"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="px-2 py-1 active-text font-medium text-sm">
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default BreadCrumb;