"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

const Table = ({
  columns,
  data,
  renderActions,
  className = "",
  showAddButton,
  AddButton,
  linkUrl,
}) => {
  const router = useRouter();

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
              <th key={col.accessor || col.label} className="px-4 py-3">
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
            <tr
              key={item._id || item.slug}
              className={`border-b transition-all duration-150 cursor-pointer ${
                linkUrl ? "hover:bg-gray-100" : ""
              }`}
              onClick={() => {
                if (linkUrl) router.push(`${linkUrl}/${item._id}/${item.slug}`);
              }}
            >
              {columns.map((col) => (
                <td key={col.accessor || col.label} className="px-4 py-3">
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
