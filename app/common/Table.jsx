"use client";
import TableBody from "./TableBody";
import Pagination from "./Pagination";
import TableHeader from "./TableHeader";
import { useRouter } from "next/navigation";
import TableDropdown from "./TableDropdown";
import React, { useState, useMemo } from "react";
import InputField from "./InputField";

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
  addLink = false,
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const defaultVisible = columns.slice(0, 5).map((col) => col.accessor);
  const [visibleColumns, setVisibleColumns] = useState(defaultVisible);
  const [filters, setFilters] = useState({});

  const filteredColumns = columns.filter((col) =>
    visibleColumns.includes(col.accessor)
  );

  const filterableColumns = columns.filter((col) => col.filterable);

  // ✅ Get unique values for filterable columns
  const filterOptions = useMemo(() => {
    const options = {};
    filterableColumns.forEach((col) => {
      const set = new Set();
      data.forEach((item) => {
        const value = item[col.accessor];
        if (Array.isArray(value)) {
          value.forEach((v) => set.add(v?.name));
        } else if (typeof value === "object") {
          set.add(value?.name);
        } else {
          set.add(value);
        }
      });
      options[col.accessor] = Array.from(set);
    });
    return options;
  }, [data, filterableColumns]);

  // ✅ Filtered data based on dynamic filters
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesFilters = Object.entries(filters).every(
        ([accessor, value]) => {
          if (value === "all") return true;
          const itemValue = item[accessor];
          if (Array.isArray(itemValue))
            return itemValue.some((v) => v?.name === value);
          if (typeof itemValue === "object") return itemValue?.name === value;
          return itemValue === value;
        }
      );

      const matchesSearch =
        searchQuery.trim() === "" ||
        Object.values(item).some((val) => {
          if (typeof val === "string") {
            return val.toLowerCase().includes(searchQuery.toLowerCase());
          }
          if (typeof val === "object" && val?.name) {
            return val.name.toLowerCase().includes(searchQuery.toLowerCase());
          }
          return false;
        });

      return matchesFilters && matchesSearch;
    });
  }, [data, filters, searchQuery]);

  return (
    <div className={`overflow-x-auto my-rounded p-4 ${className}`}>
      {!isDashboard && (
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-wrap md:flex-nowrap items-center gap-4 w-full">
            {/* Search Bar */}
            <div className="relative w-64">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 focus:ring-2">
                🔍
              </span>
              <InputField
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="pl-10 pr-4 py-2 my-rounded w-full focus:outline-none focus:ring-2 transition duration-200"
                variant="primary"
                size="md"
              />
            </div>

            {/* Dropdown Filters */}
            {filterableColumns.map((col) => (
              <div key={col.accessor} className="relative w-48">
                <select
                  className="w-full appearance-none my-border py-2 pl-4 pr-10 my-rounded focus:outline-none focus:ring-2 transition secondary-text"
                  value={filters[col.accessor] || "all"}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      [col.accessor]: e.target.value,
                    }))
                  }
                >
                  <option value="all">All {col.label}</option>
                  {filterOptions[col.accessor]?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  ▼
                </div>
              </div>
            ))}
          </div>

          {showAddButton && <AddButton />}

          <TableDropdown
            columns={columns}
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
            dynamicFields={dynamicFields}
            addFunction={addFunction}
            buttonTitle={buttonTitle}
            showAddButton={showAddButton}
            addLink={addLink}
          />
        </div>
      )}

      <table className="min-w-full min-h-full table-auto text-left">
        <TableHeader columns={filteredColumns} hasActions={!!renderActions} />
        <TableBody
          data={Array.isArray(filteredData) ? filteredData : [filteredData]}
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
