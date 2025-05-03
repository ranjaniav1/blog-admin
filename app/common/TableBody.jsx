const TableBody = ({ data, columns, renderActions, linkUrl, router }) => (
  <tbody>
    {data?.map((item) => (
      <tr
        key={item._id || item.slug}
        className={`border-b transition-all duration-150 cursor-pointer ${
          linkUrl ? "hover:text-pink-700" : ""
        }`}
        onClick={() => {
          if (linkUrl) router.push(`${linkUrl}/${item._id}/${item.slug}`);
        }}
      >
        {/* All table's column mapped here and accessor is a key that used to fetch data from json response */}
        {columns.map((col) => (
          <td key={col.accessor} className="px-4 py-3">
            {col.render
              ? col.render(item[col.accessor], item)
              : item[col.accessor]}
          </td>
        ))}
        {/* action button render here and on that click, stopPropogation() called to prevent push to another route */}
        {renderActions && (
          <td
            className="px-4 py-3 flex justify-center gap-2"
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
