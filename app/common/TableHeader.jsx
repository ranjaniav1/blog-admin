// common/TableHeader.jsx
const TableHeader = ({ columns, hasActions }) => (
  <thead>
    <tr>
      {columns.map((col, index) => (
        <th
          key={col.accessor}
          className={`
            px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider
            ${index === 0 ? 'pl-6' : ''}
            background secondary-text
          `}
        >
          {col.label}
        </th>
      ))}
      {hasActions && (
        <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wider background secondary-text">
          Actions
        </th>
      )}
    </tr>
  </thead>
);

export default TableHeader;