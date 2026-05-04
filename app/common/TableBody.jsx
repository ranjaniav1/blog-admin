// common/TableBody.jsx
const TableBody = ({ data, columns, renderActions, linkUrl, router }) => (
  <tbody className="text-wrap truncate">
    {data?.map((item, index) => (
      <tr
        key={item._id || item.slug || index}
        className={`border-b transition-colors duration-150 hover:bg-hover ${
          linkUrl ? "link cursor-pointer" : ""
        }`}
        onClick={() => {
          if (linkUrl) router.push(`${linkUrl}/${item._id}/${item.slug}`);
        }}
      >
        {columns.map((col) => (
          <td
            key={col.accessor}
            className="px-6 py-4 min-w-[10px]  whitespace-normal break-words align-top"
          >
            {col.render
              ? col.render(item[col.accessor], item)
              : item[col?.accessor]}
          </td>
        ))}
        {renderActions && (
          <td
            className="px-6 py-4 whitespace-nowrap flex justify-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            {renderActions(item)}
          </td>
        )}
      </tr>
    ))}
  </tbody>
);

export default TableBody;