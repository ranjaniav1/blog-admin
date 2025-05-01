"use client";
import React from "react";

const Table = ({
  columns,
  data,
  renderActions,
  className = "",
  showAddButton,
  AddButton,
}) => {
  return (
    <div
      className={`overflow-x-auto shadow-md rounded-xl border p-4 ${className}`}
    >
      {showAddButton && (
        <div className="flex justify-end">
          <AddButton />
        </div>
      )}
      <table className="min-w-full table-auto text-sm text-left">
        <thead className="icon-bg uppercase text-xs">
          <tr>
            {columns.map((col) => (
              <th key={col.accessor} className="px-4 py-3">
                {col.label}
              </th>
            ))}
            {renderActions && (
              <th className="px-4 py-3 text-center">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id} className="border-b transition-all duration-150">
              {columns.map((col) => (
                <td key={col.accessor} className="px-4 py-3">
                  {col.render
                    ? col.render(item[col.accessor], item)
                    : item[col.accessor]}
                </td>
              ))}
              {renderActions && (
                <td className="px-4 py-3 flex justify-center gap-2">
                  {renderActions(item)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
