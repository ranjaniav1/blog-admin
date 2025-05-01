"use client";
import React from "react";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa6";

const BreadCrumb = ({ items = [] }) => {
  return (
    <div className="card px-4 py-3 rounded-xl shadow-sm border border-gray-200 w-full">
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center flex-wrap gap-1 text-sm">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index !== 0 && (
                <FaAngleRight className="mx-2 w-3 h-3" />
              )}

              {index !== items.length - 1 ? (
                <Link
                  href={item.href}
                  className=" px-2.5 py-1 rounded-md icon-bg transition font-medium"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="active px-2.5 py-1 rounded-md font-semibold">
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
