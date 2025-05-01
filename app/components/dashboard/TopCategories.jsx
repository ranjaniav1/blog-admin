"use client";
import React, { useState } from "react";
import { useCategories } from "@/app/hooks/useCategories";
import { format } from "date-fns";
import Table from "@/app/common/Table";
import Modal from "@/app/common/Modal";
import EditCategory from "@/app/overlay/EditCategory";
import IconButton from "@/app/common/IconButton";
import { MdOutlineModeEditOutline, MdOutlineDelete } from "react-icons/md";
import Button from "@/app/common/Button";

const TopCategories = ({ showUpdatedAt = false, bgPrimary = false }) => {
  const {
    categories,
    loading,
    addCategory,
    deleteCategory,
    error,
    refetch,
    updateCategory,
  } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalType, setModalType] = useState(""); // "edit" | "delete"

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
      render: (val) => format(new Date(val), "PPP"),
    },
  ];

  // Conditionally add the "Updated At" column based on the prop
  if (showUpdatedAt) {
    columns.push({
      label: "Updated At",
      accessor: "updated_at",
      render: (val) => format(new Date(val), "PPP"),
    });
  }

  // Render actions for each row
  const renderActions = (category) => (
    <>
      <IconButton
        Icon={MdOutlineModeEditOutline}
        onClick={() => openModal(category, "edit")}
        aria_label="Edit Category"
        variant="primary"
        tooltip="Edit"
        needBg={true}
      />
      <IconButton
        Icon={MdOutlineDelete}
        onClick={() => openModal(category, "delete")}
        aria_label="Delete Category"
        variant="danger"
        tooltip="Delete"
        needBg={true}
      />
    </>
  );

  // loading state
  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <>
      <Table
        columns={columns}
        data={categories}
        renderActions={renderActions}
        className={bgPrimary ? "card" : ""}
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
              updateCategory(updatedCategory._id, updatedCategory);
              closeModal();
            }}
          />
        ) : (
          <div>
            <p>
              Are you sure you want to delete{" "}
              <strong>{selectedCategory?.name}</strong>?
            </p>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="outline"
                type="button"
                bgColorRequired
                onClick={closeModal}
                className="px-4 py-2 icon-bg rounded-md"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  deleteCategory(selectedCategory?._id);
                  closeModal();
                }}
                variant="danger"
                type="button"
                bgColorRequired
                className="px-4 py-2  rounded-md"
              >
                Confirm Delete
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default TopCategories;
