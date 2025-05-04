"use client";

import React from "react";
import { useParams } from "next/navigation";
import BreadCrumb from "@/app/common/BreadCrumb";
import { useCreateArticle } from "@/app/hooks/useArticles";

const page = ({ article }) => {
  const { id } = useParams();

  const [page, setPage] = React.useState(1);
  const {} = useCreateArticle(page);

  const [formData, setFormData] = React.useState({
    title: article.title,
    slug: article.slug,
    content: article.content,
    category: article.category._id,
    subCategory: article.subCategory._id,
    tags: article.tags.map((tag) => tag._id),
    image: null,
    video: null,
  });

  return (
    <div>
      <BreadCrumb
        items={[
          { label: "Home", href: "/dashboard" },
          { label: "Articles", href: "/admin/articles" },
          { label: "Edit Articles", href: `/admin/articles/${id}` },
        ]}
      />
      <ArticleForm article={formData} setFormData={setFormData} />
    </div>
  );
};

export default page;
