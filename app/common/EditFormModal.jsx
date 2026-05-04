"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import InputField from "./InputField";
import Button from "./Button";

// Dynamically import TinyEditor
const TinyEditor = dynamic(() => import("./TinyEditor"), {
  ssr: false,
  loading: () => <div className="h-[300px] border rounded animate-pulse bg-gray-100" />,
});

export const SimpleForm = ({
  fields,
  data,
  onSubmit,
  onClose,
  isSubmitting,
}) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const initial = {};
    fields.forEach((f) => {
      initial[f.name] = data?.[f.name] ?? "";
    });
    setFormData(initial);
  }, [data, fields]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditorChange = (content, editor) => {
    setFormData((prev) => ({
      ...prev,
      content: content,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const valid = fields
      .filter((f) => f.required)
      .every((f) => {
        const value = formData[f.name];
        if (f.type === "editor") {
          return value?.toString().trim() && value !== "<p></p>" && value !== "";
        }
        return value?.toString().trim();
      });

    if (!valid) {
      alert("Fill all required fields");
      return;
    }

    onSubmit(formData);
  };

  const renderField = (field) => {
    switch (field.type) {
      case "editor":
        return (
          <div className="border rounded my-rounded overflow-hidden">
            <TinyEditor
              handleEditorChange={handleEditorChange}
              formData={formData}
            />
          </div>
        );

      case "textarea":
        return (
          <textarea
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleChange}
            rows={field.rows || 5}
            placeholder={field.placeholder}
            className="w-full my-border my-rounded p-2 focus:outline-none focus:ring-2 focus:ring-primary-text/20"
          />
        );

      case "select":
        return (
          <select
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleChange}
            className="w-full my-border my-rounded p-2 focus:outline-none focus:ring-2 focus:ring-primary-text/20"
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case "checkbox":
        return (
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name={field.name}
              checked={!!formData[field.name]}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-600">{field.label}</span>
          </div>
        );

      case "file":
        return (
          <input
            type="file"
            name={field.name}
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setFormData((prev) => ({
                  ...prev,
                  [field.name]: file,
                }));
              }
            }}
            accept={field.accept || "image/*"}
            className="w-full my-border my-rounded p-2"
          />
        );

      default:
        return (
          <InputField
            name={field.name}
            type={field.type || "text"}
            value={formData[field.name] || ""}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {fields.map((field) => (
        <div key={field.name}>
          {field.type !== "checkbox" && (
            <label className="block mb-1 text-sm font-medium">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
          {renderField(field)}
        </div>
      ))}

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button
          type="button"
          onClick={onClose}
          variant="outline"
          className="px-4 py-2"
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          className="px-4 py-2 buttonbg text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
};