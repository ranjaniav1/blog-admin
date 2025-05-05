"use client";

import React, { useState } from "react";
import Table from "@/app/common/Table";
import { useCreateArticle } from "@/app/hooks/useArticles";
import ActionButtons from "@/app/common/ActionButtons";
import { useRouter } from "next/navigation";
import DeleteModal from "@/app/common/DeleteModal";
import Modal from "@/app/common/Modal";

const Articles = () => {
  const [page, setPage] = useState(1);
  // delete modal state
  const [open, setOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const router = useRouter();

  const { data, loading, addArticle, editArticle, removeArticle } =
    useCreateArticle(page);

  const articleTableColumns = [
    { label: "Title", accessor: "title" },
    { label: "Slug", accessor: "slug" },
    { label: "Excerpt", accessor: "excerpt" },
    { label: "Content", accessor: "content" },
    { label: "Status", accessor: "status" },
    { label: "Read Time", accessor: "read_time" },
    { label: "is Featured", accessor: "is_featured" },
    { label: "is Breaking", accessor: "is_breaking" },
    { label: "Total Reads", accessor: "total_reads" },
    { label: "Total Shares", accessor: "total_shares" },
    { label: "Total Comments", accessor: "total_comments" },
    {
      label: "Author",
      accessor: "createdBy", // optional, only needed if your table needs it
      render: (createdBy) => createdBy?.fullname || "N/A",
    },
    {
      label: "Category",
      accessor: "category_id", // optional
      render: (category) => category?.name || "N/A",
    },

    {
      label: "Tags",
      accessor: "tags",
      render: (tags) => tags.map((t) => t.name).join(", "),
    },
    {
      label: "Image",
      accessor: "image_url",
      render: (url) => (
        <img
          src={url}
          alt="Thumbnail"
          className="h-12 w-12 object-cover my-rounded"
        />
      ),
    },
    {
      label: "Video",
      accessor: "video_url",
      render: (url) => (
        <video src={url} controls className="h-12 w-20 object-cover my-rounded" />
      ),
    },
  ];

  // Render actions for each row
  const renderActions = (Category) => (
    <ActionButtons
      onEdit={(e) => {
        router.push(`/admin/articles/${Category._id}`);
      }}
      onDelete={(e) => {
        e.stopPropagation();
        setOpen(true);
        setSelectedArticle(Category);
      }}
    />
  );

  return (
    <div>
      <Table
        className="primary"
        data={data.articles ?? []}
        columns={articleTableColumns}
        pagination={{
          totalPages: data.totalPages,
          currentPage: data.page,
          onPageChange: (newPage) => setPage(newPage),
        }}
        addFunction={addArticle}
        renderActions={renderActions}
      />

      {/* Delete Article modal */}
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Delete Article"
      >
        <DeleteModal
          itemName={selectedArticle?.name}
          onDelete={() => {
            removeArticle(selectedArticle?._id);
            setOpen(false);
          }}
          onCancel={() => setOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Articles;
