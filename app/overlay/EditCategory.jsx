import React from "react";
import EditFormModal from "../common/EditFormModal";

const categoryFields = [
  { name: "name", label: "Name", placeholder: "Enter category name", required: true },
  { name: "slug", label: "Slug", placeholder: "Enter slug", required: true },
  { name: "description", label: "Description", type: "textarea", placeholder: "Description" },
];

const EditCategory = ({ isOpen, onClose, category, onSave, title }) => {
  return (
    <EditFormModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      data={category}
      fields={categoryFields}
      onSave={onSave}
    />
  );
};

export default EditCategory;
