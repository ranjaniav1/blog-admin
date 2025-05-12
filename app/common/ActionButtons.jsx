"use client";
import React from "react";
import { MdOutlineModeEditOutline, MdOutlineDelete } from "react-icons/md";

const ActionButtons = ({ onEdit, onDelete, tooltip = true }) => {
  return (
    <div className="inline-flex my-rounded overflow-hidden my-border">
      {onEdit && (
        <button
          onClick={(e) => onEdit(e)}
          className="inline-flex items-center gap-1 p-3 font-medium text-white bg-blue-600 hover:bg-blue-700 transition"
          title={tooltip ? "Edit" : ""}
        >
          <MdOutlineModeEditOutline className="" />
        </button>
      )}
      {onDelete && (
        <button
          onClick={(e) => onDelete(e)}
          className="inline-flex items-center gap-1 p-3 font-medium text-white delete transition"
          title={tooltip ? "Delete" : ""}
        >
          <MdOutlineDelete className="" />
        </button>
      )}
    </div>
  );
};

export default ActionButtons;
