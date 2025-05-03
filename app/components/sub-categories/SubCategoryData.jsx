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

const SubCategoryData = ({ categorySlug, requiredAllCategory }) => {
  const { data } = useCategories();
  const [modalType, setModalType] = useState(""); // "edit" | "delete"
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    addNewsSubcategory,
    updateSubcategory,
    deleteNewsSubcategory,
    subcategories,
    fetchSubcategoriesByCategory,
    refetch,
  } = useSubcategories(requiredAllCategory, currentPage);

  const openModal = (category, type) => {
    setSelectedCategory(category);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedCategory(null);
    setModalType("");
  };

  useEffect(() => {
    if (categorySlug) {
      fetchSubcategoriesByCategory(categorySlug, currentPage);
    } else {
      refetch(currentPage);
    }
  }, [categorySlug, currentPage]);

  const columns = [
    { label: "Name", accessor: "name" },
    { label: "Slug", accessor: "slug" },
    { label: "Description", accessor: "description" },
    { label: "Category", accessor: "category_title" },
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

  const categoryOptions = data?.categories.map((cat) => ({
    label: cat.name,
    value: cat._id,
  }));

  const dynamicFields = subcategoryFields.map((field) =>
    field.name === "category_id"
      ? { ...field, options: categoryOptions }
      : field
  );

  return (
    <div>
      <Table
        columns={columns}
        data={subcategories?.subcategories || []}
        renderActions={renderActions}
        className="card"
        dynamicFields={dynamicFields}
        addFunction={(newSubCategory) => addNewsSubcategory(newSubCategory)}
        pagination={{
          totalPages: Number(subcategories.totalPages),
          currentPage: Number(subcategories.page),
          onPageChange: (newPage) => setCurrentPage(newPage),
        }}
        buttonTitle={'Add Sub Category'}
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
            fields={dynamicFields}
            onSave={(updatedCategory) => {
              updateSubcategory(updatedCategory._id, updatedCategory);
              closeModal();
            }}
          />
        ) : (
          <DeleteModal
            itemName={selectedCategory?.name}
            onDelete={() => {
              deleteNewsSubcategory(selectedCategory?._id);
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
