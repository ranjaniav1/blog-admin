"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import TableDropdown from "./TableDropdown";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import Pagination from "./Pagination";

const Table = ({
  columns,
  data,
  renderActions,
  className = "",
  showAddButton,
  AddButton,
  linkUrl,
  pagination,
  dynamicFields = [],
  buttonTitle,
  addFunction = () => {},
  isDashboard = false,
}) => {
  const router = useRouter();
  const defaultVisible = columns.slice(0, 5).map((col) => col.accessor);
  const [visibleColumns, setVisibleColumns] = useState(defaultVisible);

  const filteredColumns = columns.filter((col) =>
    visibleColumns.includes(col.accessor)
  );

  return (
    <div className={`overflow-x-auto my-rounded p-4 ${className}`}>
      {!isDashboard && (
        <div className="flex justify-between items-center mb-2">
          <TableDropdown
            columns={columns}
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
            dynamicFields={dynamicFields}
            addFunction={addFunction}
            buttonTitle={buttonTitle}
          />
          {showAddButton && <AddButton />}
        </div>
      )}
      <table className="min-w-full table-auto text-sm text-left">
        <TableHeader columns={filteredColumns} hasActions={!!renderActions} />
        <TableBody
          data={Array.isArray(data) ? data : [data]}
          columns={filteredColumns}
          renderActions={renderActions}
          linkUrl={linkUrl}
          router={router}
        />
      </table>

      {pagination?.totalPages > 1 && <Pagination pagination={pagination} />}
    </div>
  );
};

export default Table;
