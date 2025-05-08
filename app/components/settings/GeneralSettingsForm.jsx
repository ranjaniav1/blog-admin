"use client";

import React, { useEffect, useState } from "react";
import { useGeneralSettings } from "@/app/hooks/useGeneralSettings";
import InputField from "@/app/common/InputField";

const GeneralSettingsForm = () => {
  const { loading, settings, updateGeneralSettings } = useGeneralSettings();
  const [form, setForm] = useState({
    panelName: "",
    primaryColor: "",
    secondaryColor: "",
    activeColor: "",
    autoDelete: false,
    expireNews: false,
    logo: "",
  });

  useEffect(() => {
    if (settings) {
      setForm({
        panelName: settings.panelName || "",
        primaryColor: settings.primaryColor || "",
        secondaryColor: settings.secondaryColor || "",
        activeColor: settings.activeColor || "",
        autoDelete: settings.autoDelete || false,
        expireNews: settings.expireNews || false,
        logo: settings.logo || "",
      });
    }
  }, [settings]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateGeneralSettings(form);
  };

  if (loading)
    return <p className="text-center text-gray-500">Loading settings...</p>;
  if (!settings)
    return <p className="text-center text-red-500">Failed to load settings.</p>;

  return (
    <div className="p-4">
      <form
        onSubmit={handleSubmit}
        className="primary mx-auto p-6 my-rounded space-y-5"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Panel Name</label>
          <InputField
            name="panelName"
            value={form.panelName}
            onChange={handleChange}
            placeholder="Enter panel name"
            required
            variant="primary"
            size="md"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Primary Color
            </label>
            <input
              type="color"
              name="primaryColor"
              value={form.primaryColor}
              onChange={handleChange}
              className="w-full h-10 rounded border border-gray-300 cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Secondary Color
            </label>
            <input
              type="color"
              name="secondaryColor"
              value={form.secondaryColor}
              onChange={handleChange}
              className="w-full h-10 rounded border border-gray-300 cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Active Color
            </label>
            <input
              type="color"
              name="activeColor"
              value={form.activeColor}
              onChange={handleChange}
              className="w-full h-10 rounded border border-gray-300 cursor-pointer"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Logo URL</label>
          <InputField
            name="logo"
            value={form.logo}
            onChange={handleChange}
            placeholder="https://..."
            variant="primary"
            size="md"
          />
          {form.logo && (
            <img
              src={form.logo}
              alt="Logo Preview"
              className="mt-2 h-16 object-contain"
            />
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="autoDelete"
              checked={form.autoDelete}
              onChange={handleChange}
            />
            <span>Auto Delete</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="expireNews"
              checked={form.expireNews}
              onChange={handleChange}
            />
            <span>Expire News</span>
          </label>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
          >
            Update Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default GeneralSettingsForm;
