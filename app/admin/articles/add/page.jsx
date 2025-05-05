"use client";

import BreadCrumb from "@/app/common/BreadCrumb";
import ArticleForm from "@/app/components/articles/ArticleForm";
import React, { useState } from "react";

const page = () => {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    category: "",
    subcategory: "",
    tag_id: [],
    image: null,
    video: null,
    expiry_date: "2026-01-01",
  });
  return (
    <div className="flex flex-col gap-4 p-4">
      <BreadCrumb
        items={[
          { label: "Home", href: "/dashboard" },
          { label: "Articles", href: "/admin/articles" },
          { label: "Add Articles", href: "/admin/articles/add" },
        ]}
      />

      <ArticleForm formData={formData} setFormData={setFormData} />
    </div>
  );
};

export default page;
