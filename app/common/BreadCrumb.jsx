"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaAngleRight } from "react-icons/fa6";

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

  const pathNames = [
    "/admin/users",
    "/admin/sub-categories",
    "/admin/categories",
    "/admin/articles",
    "/admin/tags",
  ];

  const matchedPath = pathNames.find((path) => pathname.startsWith(path));

  const currentLabel = breadcrumbItems[breadcrumbItems.length - 1]?.label;

  const headingTitle = matchedPath
    ? `Create and Manage ${currentLabel ? `${currentLabel}` : ""}`
    : currentLabel || "Dashboard";

  return (
    <div className="px-4 py-3 my-rounded border-gray-200 w-full">
      <nav className="Breadcrumb flex justify-start flex-col">
        <div className="heading">
          <h1 className="text-2xl font-semibold active active-text heading">{headingTitle}</h1>
        </div>
        <ol className="flex items-center flex-wrap gap-1 text-sm mt-2">
          <li className="flex items-center">
            <Link
              href="/"
              className="py-1 my-rounded transition font-medium hover:underline"
            >
              Dashboard
            </Link>
          </li>
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="flex items-center">
              <FaAngleRight className="mx-2 w-3 h-3" />
              {index !== breadcrumbItems.length - 1 ? (
                <Link
                  href={item.href}
                  className="py-1 my-rounded transition font-medium hover:underline"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="active px-3 py-1 my-rounded active font-semibold flex items-center justify-center buttonbg">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default BreadCrumb;
