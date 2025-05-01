import React, { useEffect, useState } from "react";
import Modal from "./Modal"; // Reusable modal component
import InputField from "./InputField"; // Reusable input field component
import Button from "./Button";

/**
 * EditFormModal - Renders a modal with either a form UI or a JSON editor to edit entity data.
 */
const EditFormModal = ({ isOpen, onClose, title, data, fields, onSave }) => {
  const [formData, setFormData] = useState({}); // Stores current field values
  const [isJsonMode, setIsJsonMode] = useState(false); // Toggle between form and JSON mode
  const [jsonText, setJsonText] = useState(""); // Stores the raw JSON string if editing as JSON

  // Runs whenever `data` or `fields` change (initial load or new item to edit)
  useEffect(() => {
    if (data) {
      const initial = {};
      // Populate formData with field values from `data`, or default to ""
      fields.forEach((field) => {
        initial[field.name] = data[field.name] ?? "";
      });
      setFormData(initial);
      setJsonText(JSON.stringify(initial, null, 2)); // Format the data as pretty-printed JSON
    }
  }, [data, fields]);

  // Handle changes in individual form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle typing into the JSON textarea
  const handleJsonChange = (e) => {
    setJsonText(e.target.value);
  };

  // Handle Save button click
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isJsonMode) {
      try {
        const parsed = JSON.parse(jsonText);

        // Validate required fields in JSON
        const requiredFieldsValid = fields
          .filter((f) => f.required)
          .every((f) => parsed[f.name]?.trim?.());

        if (requiredFieldsValid) {
          onSave({ ...data, ...parsed }); // Save merged data
          onClose();
        } else {
          alert("All required fields must be filled in JSON.");
        }
      } catch {
        alert("Invalid JSON format.");
      }
    } else {
      // Validate required fields in form mode
      const requiredFieldsValid = fields
        .filter((f) => f.required)
        .every((f) => formData[f.name]?.trim?.());

      if (requiredFieldsValid) {
        onSave({ ...data, ...formData }); // Save merged data
        onClose();
      } else {
        alert("All required fields must be filled.");
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      {/* Toggle button between Form and JSON modes */}
      <div className="flex justify-end mb-4">
        <Button
          type="button"
          onClick={() => setIsJsonMode(!isJsonMode)}
          className="text-sm text-blue-600 hover:underline"
        >
          {isJsonMode ? "Switch to Form Mode" : "Switch to JSON Mode"}
        </Button>
      </div>

      {/* Form submission handler */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Render inputs if not in JSON mode */}
        {!isJsonMode ? (
          fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              {/* Render textarea if specified */}
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  rows={field.rows || 3}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder={field.placeholder}
                  required={field.required}
                />
              ) : (
                <InputField
                  name={field.name}
                  type={field.type || "text"}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required={field.required}
                />
              )}
            </div>
          ))
        ) : (
          // Render JSON textarea editor
          <>
            <label className="block text-sm font-medium text-gray-700">
              Edit JSON
            </label>
            <textarea
              rows={10}
              value={jsonText}
              onChange={handleJsonChange}
              className="w-full font-mono rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder='{"name": "Example", "slug": "example", "description": "..." }'
            />
          </>
        )}

        {/* Action buttons */}
        <div className="flex justify-end gap-2 pt-2">
          <Button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm  rounded-md hover:cursor-pointer"
            variant="outline"
            bgColorRequired
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="success"
            className="px-4 py-2 text-sm"
            bgColorRequired
          >
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditFormModal;
