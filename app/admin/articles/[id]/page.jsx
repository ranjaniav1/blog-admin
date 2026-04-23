"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useCreateArticle } from "@/app/hooks/useArticles";
import ArticleForm from "@/app/components/articles/ArticleForm";

const page = () => {
  const { id } = useParams();

  const [page, setPage] = React.useState(1);
  const { data, getArticleById } = useCreateArticle(page, id);

  const [formData, setFormData] = React.useState({
    title: "",
    slug: "",
    content: "",
    category: "",
    subcategory: "",
    tag_id: [],
    image: null,
    video: null,
  });

  React.useEffect(() => {
    if (data?.articles) {
      setFormData({
        article_id: id || "",
        title: data.articles.title || "",
        slug: data.articles.slug || "",
        content: data.articles.content || "",
        category: data.articles.category?._id || "",
        subcategory: data.articles.subcategory?._id || "",
        tag_id: data.articles.tags?.map((tag) => tag._id) || [],
        image: data.articles.image_url || null,
        video: data.articles.video_url || null,
        expiry_date: data.articles.expiry_date || null,
        video: null,
      });
    }
  }, [data]);

  return (
    <div className="flex flex-col gap-4 p-4">
      <ArticleForm
        formData={formData}
        setFormData={setFormData}
        isUpdate
      />
    </div>
  );
};

export default page;
