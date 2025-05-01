"use client";
import { format } from "date-fns";
import Table from "@/app/common/Table";
import Modal from "@/app/common/Modal";
import React, { useState } from "react";
import Button from "@/app/common/Button";
import EditCategory from "@/app/overlay/EditCategory";
import EditFormModal from "@/app/common/EditFormModal";
import ActionButtons from "@/app/common/ActionButtons";
import { useCategories } from "@/app/hooks/useCategories";
import { categoryFields } from "@/app/config/admin.config";
import DeleteModal from "@/app/common/DeleteModal";

const TopCategories = ({
  showUpdatedAt = false,
  bgPrimary = false,
  showAddButton,
}) => {
  const { categories, loading, addCategory, deleteCategory, updateCategory } =
    useCategories();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalType, setModalType] = useState(""); // "edit" | "delete"
  const [showAddCategory, setShowAddCategory] = useState(false);

  const openModal = (category, type) => {
    setSelectedCategory(category);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedCategory(null);
    setModalType("");
  };

  // Define columns for the table
  const columns = [
    { label: "Name", accessor: "name" },
    { label: "Slug", accessor: "slug" },
    { label: "Description", accessor: "description" },
    {
      label: "Created At",
      accessor: "created_at",
      render: (val) => {
        const date = new Date(val);
        return isNaN(date) ? "Invalid Date" : format(date, "PPP");
      },
    },
  ];

  // Conditionally add the "Updated At" column based on the prop
  if (showUpdatedAt) {
    columns.push({
      label: "Updated At",
      accessor: "updated_at",
      render: (val) => {
        const date = new Date(val);
        return isNaN(date) ? "Invalid Date" : format(date, "PPP");
      },
    });
  }

  // Render actions for each row
  const renderActions = (category) => (
    <ActionButtons
      onEdit={() => openModal(category, "edit")}
      onDelete={() => openModal(category, "delete")}
    />
  );

  // loading state
  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <>
      <div className="flex justify-end items-center mb-4">
        {showAddButton && (
          <Button
            variant="primary"
            bgColorRequired
            onClick={() => setShowAddCategory(!showAddCategory)}
            className="px-4 py-2 rounded-md"
          >
            Add Category
          </Button>
        )}
      </div>

      <Table
        columns={columns}
        data={categories}
        renderActions={renderActions}
        className={bgPrimary ? "card" : ""}
      />

      {/* add category modal - seperate form edit and delete */}
      {showAddCategory && (
        <EditFormModal
          isOpen={showAddCategory}
          onClose={() => setShowAddCategory(false)}
          title="Add New Category"
          data={{}} // empty data for adding new
          fields={categoryFields}
          onSave={(newCategory) => {
            addCategory(newCategory);
            setShowAddCategory(false);
          }}
        />
      )}

      <Modal
        isOpen={!!modalType}
        onClose={closeModal}
        title={modalType === "edit" ? "Edit Category" : "Delete Category"}
      >
        {modalType === "edit" ? (
          <EditCategory
            title={"Edit Category"}
            isOpen={modalType === "edit"}
            onClose={closeModal}
            category={selectedCategory}
            onSave={(updatedCategory) => {
              updateCategory(updatedCategory._id, updatedCategory);
              closeModal();
            }}
          />
        ) : (
          <DeleteModal
            itemName={selectedCategory?.name}
            onDelete={() => {
              deleteCategory(selectedCategory?._id);
              closeModal();
            }}
            onCancel={closeModal}
          />
        )}
      </Modal>
    </>
  );
};

export default TopCategories;
