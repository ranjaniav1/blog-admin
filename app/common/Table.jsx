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
}) => {
  const router = useRouter();
  const defaultVisible = columns.slice(0, 5).map((col) => col.accessor);
  const [visibleColumns, setVisibleColumns] = useState(defaultVisible);

  const filteredColumns = columns.filter((col) =>
    visibleColumns.includes(col.accessor)
  );

  return (
    <div className={`overflow-x-auto rounded-xl p-4 ${className}`}>
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

      <table className="min-w-full table-auto text-sm text-left">
        <TableHeader columns={filteredColumns} hasActions={!!renderActions} />
        <TableBody
          data={data}
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
