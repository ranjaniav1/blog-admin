"use client";
import React from "react";
import { MdOutlineModeEditOutline, MdOutlineDelete } from "react-icons/md";

const ActionButtons = ({ onEdit, onDelete, tooltip = true }) => {
  return (
    <div className="inline-flex rounded-md shadow-sm overflow-hidden border border-gray-300">
      {onEdit && (
        <button
          onClick={(e) => onEdit(e)}
          className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition"
          title={tooltip ? "Edit" : ""}
        >
          <MdOutlineModeEditOutline className="text-lg" />
        </button>
      )}
      {onDelete && (
        <button
          onClick={(e) => onDelete(e)}
          className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition"
          title={tooltip ? "Delete" : ""}
        >
          <MdOutlineDelete className="text-lg" />
        </button>
      )}
    </div>
  );
};

export default ActionButtons;
