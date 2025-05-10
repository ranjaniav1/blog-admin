"use client";
import { format } from "date-fns";
import Table from "@/app/common/Table";
import Modal from "@/app/common/Modal";
import React, { useState } from "react";
import EditCategory from "@/app/overlay/EditCategory";
import EditFormModal from "@/app/common/EditFormModal";
import ActionButtons from "@/app/common/ActionButtons";
import { useCategories } from "@/app/hooks/useCategories";
import { categoryFields } from "@/app/config/admin.config";
import DeleteModal from "@/app/common/DeleteModal";

const TopCategories = ({
  showUpdatedAt = false,
  bgPrimary = false,
  isDashboard = false,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalType, setModalType] = useState(""); // "edit" | "delete"

  const {
    data,
    loading,
    addNewsCategory,
    deleteNewsCategory,
    updateNewsCategory,
  } = useCategories(currentPage);

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
  const renderActions = (Category) => (
    <ActionButtons
      onEdit={(e) => {
        e.stopPropagation();
        openModal(Category, "edit");
      }}
      onDelete={(e) => {
        e.stopPropagation();
        openModal(Category, "delete");
      }}
    />
  );

  // loading state
  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <>
      <Table
        columns={columns}
        linkUrl={`/admin/sub-categories`}
        data={isDashboard ? data.categories.slice(0, 3) : data?.categories}
        renderActions={renderActions}
        className={bgPrimary ? "card" : ""}
        pagination={
          !isDashboard && {
            totalPages: Number(data.totalPages),
            currentPage: Number(data.page),
            onPageChange: (newPage) => setCurrentPage(newPage),
          }
        }
        addFunction={(newCategory) => addNewsCategory(newCategory)}
        dynamicFields={categoryFields}
        buttonTitle={"Add Category"}
        isDashboard={isDashboard}
      />

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
              updateNewsCategory(updatedCategory._id, updatedCategory);
              closeModal();
            }}
          />
        ) : (
          <DeleteModal
            itemName={selectedCategory?.name}
            onDelete={() => {
              deleteNewsCategory(selectedCategory?._id);
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
