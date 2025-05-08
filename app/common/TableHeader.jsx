const TableHeader = ({ columns, hasActions }) => (
  <thead className="background text-blue-700 uppercase text-sm font-semibold tracking-wider">
    <tr>
      {columns.map((col) => (
        <th
          key={col.accessor}
          className="px-6 py-4 text-left whitespace-nowrap"
        >
          {col.label}
        </th>
      ))}
      {hasActions && (
        <th className="px-6 py-4 text-center whitespace-nowrap">Actions</th>
      )}
    </tr>
  </thead>
);

export default TableHeader;
