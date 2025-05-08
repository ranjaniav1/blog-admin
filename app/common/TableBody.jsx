const TableBody = ({ data, columns, renderActions, linkUrl, router }) => (
  <tbody className="text-lg">
    {data?.map((item, index) => (
      <tr
        key={item._id || item.slug || index}
        className={`border-b transition-colors duration-150 cursor-pointer ${
          linkUrl ? "hover:text-blue-600" : ""
        }`}
        onClick={() => {
          if (linkUrl) router.push(`${linkUrl}/${item._id}/${item.slug}`);
        }}
      >
        {columns.map((col) => (
          <td
            key={col.accessor}
            className="px-6 py-4 whitespace-nowrap align-middle"
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
