"use client";
import { format } from "date-fns";
import Table from "@/app/common/Table";
import Modal from "@/app/common/Modal";
import React, { useState } from "react";
import EditFormModal from "@/app/common/EditFormModal";
import ActionButtons from "@/app/common/ActionButtons";
import { useTags } from "@/app/hooks/useTags"; // You must create this
import { tagFields } from "@/app/config/admin.config"; // Define dynamic fields for tags
import DeleteModal from "@/app/common/DeleteModal";

const Tags = ({ showUpdatedAt = false, bgPrimary = false }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTag, setSelectedTag] = useState(null);
  const [modalType, setModalType] = useState(""); // "edit" | "delete"
  const [showAddTag, setShowAddTag] = useState(false);

  const { data, loading, addNewsTag, deleteNewsTag, updateNewsTag } =
    useTags(currentPage);

  const openModal = (tag, type) => {
    setSelectedTag(tag);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedTag(null);
    setModalType("");
  };

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

  const renderActions = (tag) => (
    <ActionButtons
      onEdit={(e) => {
        e.stopPropagation();
        openModal(tag, "edit");
      }}
      onDelete={(e) => {
        e.stopPropagation();
        openModal(tag, "delete");
      }}
    />
  );

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <>
      <Table
        columns={columns}
        data={data?.tags}
        renderActions={renderActions}
        className={bgPrimary ? "card" : ""}
        pagination={{
          totalPages: Number(data.totalPages),
          currentPage: Number(data.page),
          onPageChange: (newPage) => setCurrentPage(newPage),
        }}
        addFunction={(newTag) => addNewsTag(newTag)}
        dynamicFields={tagFields}
        buttonTitle={"Add Tag"}
      />

      {/* -------------------------- add tags modal -------------------------- */}
      {showAddTag && (
        <EditFormModal
          isOpen={showAddTag}
          onClose={() => setShowAddTag(false)}
          title="Add New Tag"
          data={{}}
          fields={tagFields}
          onSave={(newTag) => {
            addNewsTag(newTag);
            setShowAddTag(false);
          }}
        />
      )}

      {/* -------------------- update and delete tags modal ------------------- */}

      <Modal
        isOpen={!!modalType}
        onClose={closeModal}
        title={modalType === "edit" ? "Edit Tag" : "Delete Tag"}
      >
        {modalType === "edit" ? (
          <EditFormModal
            isOpen
            onClose={closeModal}
            title="Edit Tag"
            data={selectedTag}
            fields={tagFields}
            onSave={(updatedTag) => {
              console.log("Updated Tag:", updatedTag);
              updateNewsTag(updatedTag._id, updatedTag);
              closeModal();
            }}
          />
        ) : (
          <DeleteModal
            itemName={selectedTag?.name}
            onDelete={() => {
              deleteNewsTag(selectedTag?._id);
              closeModal();
            }}
            onCancel={closeModal}
          />
        )}
      </Modal>
    </>
  );
};

export default Tags;
