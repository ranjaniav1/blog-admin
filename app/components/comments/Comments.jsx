"use client";

import React, { useState } from "react";
import Table from "@/app/common/Table";
import ActionButtons from "@/app/common/ActionButtons";
import { useToast } from "@/app/context/ToastContext";
import { useComment } from "@/app/hooks/useComments";
import DeleteModal from "@/app/common/DeleteModal";
import Modal from "@/app/common/Modal";

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const Comments = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { showToast } = useToast();
  const { loading, commentsData, removeComment } = useComment();

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);

  const openDeleteModal = (comment) => {
    setSelectedComment(comment);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedComment(null);
    setModalOpen(false);
  };

  const confirmDelete = async () => {
    if (selectedComment) {
      const res = await removeComment(selectedComment._id);
      if (res?.success) {
        showToast("success", "Comment deleted successfully!");
      } else {
        showToast("error", "Failed to delete comment.");
      }
      closeModal();
    }
  };

  const columns = [
    {
      label: "User",
      accessor: "user.fullname",
      render: (_, row) => (
        <span className="font-medium">{row.user.fullname}</span>
      ),
    },
    {
      label: "Article Title",
      accessor: "article.title",
      render: (_, row) => (
        <span className="font-semibold">{row.article.title}</span>
      ),
    },
    {
      label: "Content",
      accessor: "content",
      render: (val) => (
        <div className="max-w-xs line-clamp-2">{val}</div>
      ),
    },
    {
      label: "Flagged",
      accessor: "is_flagged",
      render: (val) =>
        val ? (
          <span className="text-red-500 font-semibold">Yes</span>
        ) : (
          <span className="text-green-500 font-medium">No</span>
        ),
    },
    {
      label: "Created At",
      accessor: "created_at",
      render: (val) => <span className="text-sm">{formatDate(val)}</span>,
    },
    {
      label: "Updated At",
      accessor: "updated_at",
      render: (val) => <span className="text-sm">{formatDate(val)}</span>,
    },
  ];

  const renderActions = (row) => (
    <ActionButtons onDelete={() => openDeleteModal(row)} />
  );

  if (loading) {
    return <div className="text-center py-10">Loading comments...</div>;
  }

  return (
    <div className="primary my-rounded shadow-md bg-white p-4">
      <Table
        columns={columns}
        data={commentsData.comments || []}
        className="primary"
        renderActions={renderActions}
        pagination={false}
        showAddButton={false}
      />

      {/* Delete Confirmation Modal */}
      <Modal isOpen={modalOpen} onClose={closeModal} title="Delete Comment">
        <DeleteModal
          itemName={selectedComment?.user?.fullname || "comment"}
          onDelete={confirmDelete}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
};

export default Comments;
