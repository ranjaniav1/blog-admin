const TableHeader = ({ columns, hasActions }) => (
    <thead className="icon-bg uppercase text-xs">
      <tr>
        {columns.map((col) => (
          <th key={col.accessor} className="px-4 py-3">
            {col.label}
          </th>
        ))}
        {hasActions && <th className="px-4 py-3 text-center">Actions</th>}
      </tr>
    </thead>
  );
  
  export default TableHeader;
  