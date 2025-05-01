"use client";
import React, { useEffect, useState } from "react";
import Table from "@/app/common/Table";
import Modal from "@/app/common/Modal";
import Button from "@/app/common/Button";
import EditFormModal from "@/app/common/EditFormModal";
import { useSubcategories } from "@/app/hooks/useSubCategories";
import { format } from "date-fns";
import ActionButtons from "@/app/common/ActionButtons";
import { subcategoryFields } from "@/app/config/admin.config";
import DeleteModal from "@/app/common/DeleteModal";
import { useCategories } from "@/app/hooks/useCategories";

const SubCategoryData = ({ showAddButton, categoryId, requiredAllCategory }) => {
  const { categories } = useCategories();
  console.log("Categories:", !categoryId);

  const [showAddCategory, setShowAddCategory] = useState(false);
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

  const {
    addSubcategory,
    updateSubcategory,
    deleteSubcategory,
    subcategories,
    fetchSubcategoriesByCategory,
    refetch,
  } = useSubcategories(requiredAllCategory);

  // Fetch subcategories by category ID if provided
  useEffect(() => {
    if (categoryId) {
      fetchSubcategoriesByCategory(categoryId);
    } else {
      refetch(); // Fetch all subcategories if no category ID is provided
    }
  }, [categoryId]);

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
  const dynamicFields = subcategoryFields.map((field) =>
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
              updateSubcategory(updatedCategory._id, updatedCategory);
              closeModal();
            }}
          />
        ) : (
          <DeleteModal
            itemName={selectedCategory?.name}
            onDelete={() => {
              deleteSubcategory(selectedCategory?._id);
              closeModal();
            }}
            onCancel={closeModal}
          />
        )}
      </Modal>
    </div>
  );
};

export default SubCategoryData;
