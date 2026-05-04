"use client";
import Button from "./Button";
import { GoPlus } from "react-icons/go";
import { SlOptionsVertical } from "react-icons/sl";
import React, { useState, useRef, useEffect } from "react";
import IconButton from "./IconButton";
import { useRouter } from "next/navigation";

const TableDropdown = ({
  columns,
  visibleColumns,
  setVisibleColumns,
  addFunction,
  buttonTitle,
  showAddButton = true,
  addLink = false,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  const router = useRouter();

  const toggleColumn = (accessor) => {
    setVisibleColumns((prev) =>
      prev.includes(accessor)
        ? prev.filter((col) => col !== accessor)
        : [...prev, accessor]
    );
  };

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
      className="flex justify-end items-center gap-2"
      ref={dropdownRef}
    >
      {/* ✅ Add Button */}
      {showAddButton && (
        <Button
          onClick={() =>
            addLink ? router.push(addLink) : addFunction()
          }
          className="p-2 my-rounded flex items-center gap-2 my-border"
        >
          <GoPlus />
          {buttonTitle || "Add"}
        </Button>
      )}

      {/* Column Toggle */}
      <IconButton
        onClick={() => setOpen(!open)}
        className="p-3 my-rounded my-border"
        Icon={SlOptionsVertical}
        needBg
      />

      {open && (
        <div className="absolute card z-10 w-60 my-rounded shadow-lg my-border max-h-60 overflow-y-auto">
          <div className="p-2">
            {columns.map((col) => (
              <label
                key={col.accessor}
                className="flex items-center gap-2 cursor-pointer px-2 py-1"
              >
                <input
                  type="checkbox"
                  checked={visibleColumns.includes(col.accessor)}
                  onChange={() => toggleColumn(col.accessor)}
                />
                <span>{col.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TableDropdown;