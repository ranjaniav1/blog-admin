"use client";
import Button from "./Button";
import { GoPlus } from "react-icons/go";
import { SlOptionsVertical } from "react-icons/sl";
import EditFormModal from "./EditFormModal";
import React, { useState, useRef, useEffect } from "react";

const ColumnDropdown = ({ columns, visibleColumns, setVisibleColumns, dynamicFields, addFunction, buttonTitle }) => {
  const [open, setOpen] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
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
    <div
      className="flex justify-end text-left right-0 w-full items-center gap-2"
      ref={dropdownRef}
    >
      {/* -------------------------------------- Add button ------------------------------------ */}

      <Button
        variant="outline"
        bgColorRequired
        onClick={() => setShowAddCategory(!showAddCategory)}
        className="p-2 my-rounded h-max flex items-center gap-2"
      >
        <GoPlus />
        {buttonTitle || "Add "}
      </Button>

      {showAddCategory && (
        <EditFormModal
          isOpen={showAddCategory}
          onClose={() => setShowAddCategory(false)}
          title={buttonTitle}
          data={{}}
          fields={dynamicFields}
          onSave={(newCategory) => {
            console.log("New Category Data:", newCategory);
            addFunction(newCategory);
            setShowAddCategory(false);
          }}
        />
      )}

      {/* ----------------------------- show / hide column feature -------------------------------------- */}

      <Button
        variant="outline"
        bgColorRequired
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium my-rounded hover:bg-base-200 focus:outline-none my-2"
      >
        <SlOptionsVertical />
        Show/Hide Columns
      </Button>

      {open && (
        <div className="absolute primary z-10 w-60 origin-top-right my-rounded shadow-lg bg-base-100 border border-base-content/20 max-h-60 overflow-y-auto">
          <div className="p-2">
            {columns.map((col) => (
              <label
                key={col.accessor}
                className="flex items-center gap-2 cursor-pointer px-2 py-1 hover:bg-base-200 my-rounded"
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
