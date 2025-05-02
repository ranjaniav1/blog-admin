"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaPuzzlePiece } from "react-icons/fa";

const ColumnDropdown = ({ columns, visibleColumns, setVisibleColumns }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const toggleColumn = (accessor) => {
    setVisibleColumns((prev) =>
      prev.includes(accessor)
        ? prev.filter((col) => col !== accessor)
        : [...prev, accessor]
    );
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-end text-left right-0 w-full" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-600 rounded-md hover:bg-base-200 focus:outline-none my-2"
      >
        <FaPuzzlePiece />
        Show/Hide Columns
      </button>

      {open && (
        <div className="absolute card z-10 mt-12 w-60 origin-top-right rounded-md shadow-lg bg-base-100 border border-base-content/20 max-h-60 overflow-y-auto">
          <div className="p-2">
            {columns.map((col) => (
              <label
                key={col.accessor}
                className="flex items-center gap-2 cursor-pointer px-2 py-1 hover:bg-base-200 rounded"
              >
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  checked={visibleColumns.includes(col.accessor)}
                  onChange={() => toggleColumn(col.accessor)}
                />
                <span className="text-sm">{col.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColumnDropdown;
