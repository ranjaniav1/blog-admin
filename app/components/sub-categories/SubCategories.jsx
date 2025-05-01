"use client";

import { format } from "date-fns";
import React, { useState } from "react";
import Button from "@/app/common/Button";
import EditFormModal from "@/app/common/EditFormModal";
import { useSubcategories } from "@/app/hooks/useSubCategories";
import Table from "@/app/common/Table";
import ActionButtons from "@/app/common/ActionButtons";
import { useCategories } from "@/app/hooks/useCategories"; // <-- your custom hook
import { subcategoryFields as baseSubcategoryFields } from "@/app/config/admin.config";
import EditCategory from "@/app/overlay/EditCategory";
import Modal from "@/app/common/Modal";
import DeleteModal from "@/app/common/DeleteModal";

const SubCategories = ({
  bgPrimary = false,
  showAddButton,
}) => {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const {
    addSubcategory,
    updateSubcategory,
    deleteSubcategory,
    subcategories,
  } = useSubcategories();
  const { categories, loading } = useCategories();
  const [modalType, setModalType] = useState(""); // "edit" | "delete"
  const [selectedCategory, setSelectedCategory] = useState(null);

  const openModal = (category, type) => {
    setSelectedCategory(category);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedCategory(null);
    setModalType("");
  };

  const columns = [
    { label: "Name", accessor: "name" },
    { label: "Slug", accessor: "slug" },
    { label: "Description", accessor: "description" },
    { label: "category", accessor: "category_title" },
    {
      label: "Created At",
      accessor: "created_at",
      render: (val) => {
        const date = new Date(val);
        return isNaN(date) ? "Invalid Date" : format(date, "PPP");
      },
    },
    {
      label: "Updated At",
      accessor: "updated_at",
      render: (val) => {
        const date = new Date(val);
        return isNaN(date) ? "Invalid Date" : format(date, "PPP");
      },
    },
  ];

  const renderActions = (subCategory) => (
    <ActionButtons
      onEdit={() => openModal(subCategory, "edit")}
      onDelete={() => openModal(subCategory, "delete")}
    />
  );
  // Prepare dynamic category options
  const categoryOptions = categories.map((cat) => ({
    label: cat.name,
    value: cat._id,
  }));

  // Inject dynamic options into config
  const dynamicFields = baseSubcategoryFields.map((field) =>
    field.name === "category_id"
      ? { ...field, options: categoryOptions }
      : field
  );

  return (
    <div>
      <div className="flex justify-end items-center mb-4">
        {showAddButton && (
          <Button
            variant="primary"
            bgColorRequired
            onClick={() => setShowAddCategory(!showAddCategory)}
            className="px-4 py-2 rounded-md"
          >
            Add Sub Category
          </Button>
        )}

        {showAddCategory && (
          <EditFormModal
            isOpen={showAddCategory}
            onClose={() => setShowAddCategory(false)}
            title="Add New Sub Category"
            data={{}}
            fields={dynamicFields}
            onSave={(newCategory) => {
              console.log("New Category Data:", newCategory);
              addSubcategory(newCategory);
              setShowAddCategory(false);
            }}
          />
        )}
      </div>
      <Table
        columns={columns}
        data={subcategories}
        renderActions={renderActions}
        className="card"
      />

      <Modal
        isOpen={!!modalType}
        onClose={closeModal}
        title={modalType === "edit" ? "Edit Category" : "Delete Category"}
      >
        {modalType === "edit" ? (
          <EditFormModal
            isOpen={modalType === "edit"}
            onClose={closeModal}
            title="Edit Sub Category"
            data={selectedCategory}
            fields={dynamicFields} // include the dropdown field with options
            onSave={(updatedCategory) => {
              console.log("Updated Category Data:", updatedCategory);
              updateSubcategory(updatedCategory.id, updatedCategory);
              closeModal();
            }}
          />
        ) : (
          <DeleteModal
            itemName={selectedCategory?.name}
            onDelete={() => {
              deleteSubcategory(selectedCategory?.id);
              closeModal();
            }}
            onCancel={closeModal}
          />
        )}
      </Modal>
    </div>
  );
};

export default SubCategories;
