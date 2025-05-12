"use client";

import React, { useState } from "react";
import TinyEditor from "@/app/common/TinyEditor";
import Button from "@/app/common/Button";
import { useCategories } from "@/app/hooks/useCategories";
import { useSubcategories } from "@/app/hooks/useSubCategories";
import { useTags } from "@/app/hooks/useTags";
import { useCreateArticle } from "@/app/hooks/useArticles"; // Import the custom hook
import InputField from "@/app/common/InputField";

const ArticleForm = ({ formData, setFormData, isUpdate }) => {
  console.log("ArticleForm data:", formData);

  const { data: categories } = useCategories();
  const { subcategories } = useSubcategories(true, 1);
  const { data: tags } = useTags();

  const { loading, error, success, addArticle, editArticle } =
    useCreateArticle(); // Using the custom hook

  const handleChange = (e, name) => {
    setFormData({ ...formData, [name]: e.target.value });
  };

  const handleFileChange = (e, name) => {
    setFormData({ ...formData, [name]: e.target.files[0] });
  };

  const handleEditorChange = (content) => {
    setFormData({ ...formData, content });
  };

  const handleCategoryChange = (id) => {
    setFormData({ ...formData, category: id });
  };

  const handleSubCategoryChange = (id) => {
    setFormData({ ...formData, subcategory: id });
  };

  const handleTagChange = (e) => {
    const selectedTags = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData({ ...formData, tag_id: selectedTags });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if image is selected before submitting
    if (!formData.image) {
      alert("Image is required.");
      return;
    }

    const form = new FormData();
    form.append("title", formData.title);
    form.append("slug", formData.slug);
    form.append("content", formData.content);
    form.append("category", formData.category);
    form.append("subcategory", formData.subcategory);
    form.append("tag_id", JSON.stringify(formData.tag_id));
    form.append("published_at", formData.published_at);
    form.append("expiry_date", formData.expiry_date);

    form.append("image", formData.image); // Append the image file

    // Optionally append video if provided
    if (formData.video) {
      form.append("video", formData.video);
    }

    // Now call the addArticle function with the FormData
    isUpdate ? editArticle(formData) : addArticle(formData); // Use FormData instead of JSON
    setFormData({
      title: "",
      slug: "",
      content: "",
      category: "",
      subcategory: "",
      tag_id: [],
      image: null,
      video: null,
      expiry_date: new Date().toISOString().split("T")[0], // reset properly
      published_at: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card p-6 max-w-full shadow-md my-rounded grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {/* Title */}
      <div className="flex flex-col">
        <label className="mb-1 font-semibold text-gray-700">Title</label>
        <InputField
          type="text"
          name="title"
          value={formData.title}
          onChange={(e) => handleChange(e, "title")}
          className="my-border my-rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      {/* Slug */}
      <div className="flex flex-col">
        <label className="mb-1 font-semibold text-gray-700">Slug</label>
        <InputField
          type="text"
          name="slug"
          value={formData.slug}
          onChange={(e) => handleChange(e, "slug")}
          className="my-border my-rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      {/* Content (TinyMCE Editor) */}
      <div className="flex flex-col col-span-full">
        <label className="mb-1 font-semibold text-gray-700">Content</label>
        <TinyEditor
          formData={formData}
          handleEditorChange={handleEditorChange}
        />
      </div>

      {/* Category Dropdown */}
      <div className="flex flex-col">
        <label className="mb-1 font-semibold text-gray-700">Category</label>
        <select
          name="category"
          value={formData?.category || ""}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="my-border my-rounded px-3 py-2 focus:outline-none focus:ring-2 link-active"
          required
        >
          <option value="">Select Category</option>
          {categories?.categories?.map((category) => (
            <option key={category?._id} value={category._id} className="link-active">
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Sub-category Dropdown */}
      <div className="flex flex-col">
        <label className="mb-1 font-semibold text-gray-700">Sub Category</label>
        <select
          name="subCategory"
          value={formData?.subcategory || ""}
          onChange={(e) => handleSubCategoryChange(e.target.value)}
          className="my-border my-rounded px-3 py-2 focus:outline-none focus:ring-2 link-active"
          required
        >
          <option value="">Select Sub Category</option>
          {subcategories?.subcategories?.map((subcategory) => (
            <option key={subcategory?._id} value={subcategory._id} className="link-active">
              {subcategory.name}
            </option>
          ))}
        </select>
      </div>

      {/* Tags Dropdown with checkboxes */}
      <div className="flex flex-col">
        <label className="mb-1 font-semibold text-gray-700">Tags</label>
        <select
          multiple
          value={formData?.tag_id }
          onChange={handleTagChange}
          className="my-border my-rounded px-3 py-2 focus:outline-none focus:ring-2 link-active"
          required
        >
          {tags?.tags?.map((tag) => (
            <option key={tag?._id} value={tag._id} className="link-active">
              {tag.name}
            </option>
          ))}
        </select>
      </div>

      {/* Image File Input */}
      <div className="flex flex-col">
        <label className="mb-1 font-semibold text-gray-700">Image</label>
        {isUpdate && (
          <img src={formData.image} alt="" className="h-[200px] w-full" />
        )}
        <InputField
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, "image")}
          className="border-dashed my-border my-rounded px-3 py-2 focus:outline-none focus:ring-2"
        />
      </div>

      {/* Expiry Date Picker */}
      <div className="flex flex-col">
        <label className="mb-1 font-semibold text-gray-700">Publiser Date</label>
        <InputField
          type="date"
          name="expiry_date"
          value={formData.published_at}
          onChange={(e) => handleChange(e, "published_at")}
          className="my-border my-rounded px-3 py-2 focus:outline-none focus:ring-2"
          required
        />
      </div>
     
      <div className="flex flex-col">
        <label className="mb-1 font-semibold text-gray-700">Expiry Date</label>
        <InputField
          type="date"
          name="expiry_date"
          value={formData.expiry_date}
          onChange={(e) => handleChange(e, "expiry_date")}
          className="my-border my-rounded px-3 py-2 focus:outline-none focus:ring-2"
          required
        />
      </div>

      {/* Video File Input */}
      <div className="flex flex-col">
        <label className="mb-1 font-semibold text-gray-700">Video</label>
        <InputField
          type="file"
          accept="video/*"
          onChange={(e) => handleFileChange(e, "video")}
          className="border-dashed my-border my-rounded px-3 py-2 focus:outline-none focus:ring-2"
        />
      </div>

      {/* Submit Button */}
      <div className="mt-6 col-span-full flex justify-end">
        <Button
          type="submit"
          className="text-white px-6 py-2 my-rounded transition buttonbg"
        >
          {isUpdate
            ? loading
              ? "Updating..."
              : "Update Article"
            : loading
            ? "Submitting..."
            : "Submit Article"}
        </Button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </form>
  );
};

export default ArticleForm;
