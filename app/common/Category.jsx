import React from "react";
import { format } from "date-fns";
import { MdOutlineModeEditOutline, MdOutlineDelete } from "react-icons/md";
import IconButton from '@/app/common/IconButton'

const Category = ({ category, onEdit, onDelete, showUpdatedAt }) => {
  return (
    <tr
      key={category._id}
      className="border-b transition-all duration-150"
    >
      <td className="px-4 py-3 font-medium">{category.name}</td>
      <td className="px-4 py-3">{category.slug}</td>
      <td className="px-4 py-3">{category.description}</td>
      <td className="px-4 py-3">
        {format(new Date(category.created_at), "PPP")}
      </td>
      {showUpdatedAt && <td className="px-4 py-3">
        {format(new Date(category.updated_at), "PPP")}
      </td>}
      <td className="px-4 py-3 flex gap-2 justify-center">
        <IconButton
          Icon={MdOutlineModeEditOutline}
          onClick={() => onEdit(category)}
          aria_label="Edit Category"
          variant="primary"
          tooltip="Edit"
          needBg={true}
        />
        <IconButton
          Icon={MdOutlineDelete}
          onClick={() => onDelete(category._id)}
          aria_label="Delete Category"
          variant="danger"
          tooltip="Delete"
          needBg={true}
        />
      </td>
    </tr>
  );
};

export default Category;
