"use client";
import React, { useState } from "react";
import Category from "@/app/common/Category";
import { useCategories } from "@/app/hooks/userCategories";
import Modal from "@/app/common/Modal";

const TopCategories = () => {
  const { categories, loading } = useCategories();
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

  const handleDelete = () => {
    console.log("Deleting:", selectedCategory._id);
    closeModal();
  };

  const handleEdit = () => {
    console.log("Editing:", selectedCategory.name);
    closeModal();
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <>
      <div className="overflow-x-auto shadow-md rounded-xl border p-4">
        <table className="min-w-full table-auto text-sm text-left">
          <thead className="icon-bg uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Created At</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((category) => (
              <Category
                key={category._id}
                category={category}
                onEdit={() => openModal(category, "edit")}
                onDelete={() => openModal(category, "delete")}
              />
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={!!modalType}
        onClose={closeModal}
        title={modalType === "edit" ? "Edit Category" : "Delete Category"}
      >
        {modalType === "edit" ? (
          <div>
            <p>Edit form for <strong>{selectedCategory?.name}</strong></p>
            <button onClick={handleEdit} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
              Save Changes
            </button>
          </div>
        ) : (
          <div>
            <p>Are you sure you want to delete <strong>{selectedCategory?.name}</strong>?</p>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={closeModal} className="px-4 py-2 icon-bg rounded-md">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded-md">Confirm Delete</button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default TopCategories;
