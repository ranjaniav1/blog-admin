"use client";

import BreadCrumb from "@/app/common/BreadCrumb";
import ArticleForm from "@/app/components/articles/ArticleForm";
import React, { useState } from "react";

const page = () => {
  const defaultExpiryDate = new Date();
  defaultExpiryDate.setFullYear(defaultExpiryDate.getFullYear() + 1); // 1 year ahead
  const formattedDate = defaultExpiryDate.toISOString().split("T")[0]; // format: YYYY-MM-DD

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    category: "",
    subcategory: "",
    tag_id: [],
    image: null,
    video: null,
    expiry_date: formattedDate, // set dynamically
  });

  return (
    <div className="flex flex-col gap-4 p-4">
      <ArticleForm formData={formData} setFormData={setFormData} />
    </div>
  );
};

export default page;