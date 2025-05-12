import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import InputField from "./InputField";
import Button from "./Button";

const EditFormModal = ({ isOpen, onClose, title, data, fields, onSave }) => {
  const [formData, setFormData] = useState({});
  const [isJsonMode, setIsJsonMode] = useState(false);
  const [jsonText, setJsonText] = useState("");

  useEffect(() => {
    if (data) {
      const initial = {};
      fields.forEach((field) => {
        initial[field.name] = data[field.name] ?? "";
      });
      setFormData(initial);
      setJsonText(JSON.stringify(initial, null, 2));
    }
  }, [data, fields]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleJsonChange = (e) => {
    setJsonText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToValidate = isJsonMode ? JSON.parse(jsonText || "{}") : formData;

    const requiredFieldsValid = fields
      .filter((f) => f.required)
      .every((f) => dataToValidate[f.name]?.toString().trim?.());

    if (!requiredFieldsValid) {
      alert("All required fields must be filled.");
      return;
    }

    try {
      const finalData = isJsonMode ? JSON.parse(jsonText) : formData;
      onSave({ ...data, ...finalData });
      onClose();
    } catch {
      alert("Invalid JSON format.");
    }
  };

  const renderField = (field) => {
    switch (field.type) {
      case "textarea":
        return (
          <textarea
            name={field.name}
            rows={field.rows || 3}
            value={formData[field.name] || ""}
            onChange={handleChange}
            className="mt-1 block w-full my-rounded my-border sm:text-sm"
            placeholder={field.placeholder}
            required={field.required}
          />
        );

      case "file":
        return (
          <input
            type="file"
            name={field.accessor}
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                // Handle the file upload
                setFormData((prev) => ({
                  ...prev,
                  [field.accessor]: file, // Store the file object in the formData
                }));
              }
            }}
            className="mt-1 block w-full my-border border-dashed p-1.5 my-rounded"
            required={field.required}
          />
        );

      case "checkbox":
        return (
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              // name={field.name}
              checked={!!formData[field.name]}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [field.name]: e.target.checked,
                }))
              }
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              required={field.required}
            />
            <span className="ml-2 text-sm text-gray-700">
              {field.message || field.label}
            </span>
          </label>
        );

      case "select":
        return (
          <select
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            required={field.required}
            className="mt-1 block w-full my-rounded my-border sm:text-sm p-3"
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
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
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex justify-end mb-4">
        <Button
          type="button"
          onClick={() => setIsJsonMode(!isJsonMode)}
          className="active-text hover:underline border-none"
        >
          {isJsonMode ? "Switch to Form Mode" : "Switch to JSON Mode"}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isJsonMode ? (
          fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              {renderField(field)}
            </div>
          ))
        ) : (
          <>
            <label className="block text-sm font-medium text-gray-700">
              Edit JSON
            </label>
            <textarea
              rows={10}
              value={jsonText}
              onChange={handleJsonChange}
              className="w-full font-mono my-rounded  my-border"
              placeholder='{"name": "Example", "slug": "example", "description": "..." }'
            />
          </>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <Button
            type="button"
            onClick={onClose}
            className="px-4 py-2 my-rounded"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="px-4 py-2 buttonbg"
          >
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditFormModal;
