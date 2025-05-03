"use client";

import React, { useState } from "react";
import Table from "@/app/common/Table";
import { useCreateArticle } from "@/app/hooks/useArticles";

// TODO: Add a function to fetch articles from the server or API and CRUD operations
const Articles = () => {
  const [page, setPage] = useState(1);

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
    { label: "Author", accessor: "createdBy.fullname" },
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
          className="h-12 w-12 object-cover rounded"
        />
      ),
    },
    {
      label: "Video",
      accessor: "video_url",
      render: (url) => (
        <video src={url} controls className="h-12 w-20 object-cover rounded" />
      ),
    },
  ];

  const { data } = useCreateArticle(page);
  return (
    <div>
      <Table
        className="primary"
        data={data?.articles ?? []}
        columns={articleTableColumns}
      />
    </div>
  );
};

export default Articles;
