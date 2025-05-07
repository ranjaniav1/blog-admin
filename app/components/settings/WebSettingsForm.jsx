"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/app/context/ToastContext";
import InputField from "@/app/common/InputField";
import Button from "@/app/common/Button";

export default function WebSettingsForm({ initialData }) {
  const [form, setForm] = useState(initialData?.webSettings || {});
  const [loading, setLoading] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("default");
  const [allThemes, setAllThemes] = useState(initialData?.allThemePalettes || {});
  const { showToast } = useToast();

  useEffect(() => {
    if (initialData?.webSettings) {
      setForm((prev) => ({
        ...prev,
        themePalette: allThemes[selectedTheme] || {},
      }));
    }
  }, [selectedTheme]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("themePalette.")) {
      const key = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        themePalette: {
          ...prev.themePalette,
          [key]: value,
        },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setSelectedTheme(newTheme);
    setForm((prev) => ({
      ...prev,
      themePalette: allThemes[newTheme],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/settings/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await res.json();
      if (result.success) {
        showToast("success", "Settings updated successfully!");
      } else {
        showToast("error", "Failed to update settings.");
      }
    } catch (error) {
      showToast("error", "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800">Website Settings</h2>

      <div>
        <label className="block font-medium text-gray-700">Website Name</label>
        <InputField
          type="text"
          name="webName"
          value={form.webName || ""}
          onChange={handleChange}
          className="mt-2"
          placeholder="Enter Website Name"
          variant="primary"
          size="md"
        />
      </div>

      <div>
        <label className="block font-medium text-gray-700">Footer Text</label>
        <InputField
          type="text"
          name="footerText"
          value={form.footerText || ""}
          onChange={handleChange}
          className="mt-2"
          placeholder="Enter Footer Text"
          variant="primary"
          size="md"
        />
      </div>

      <div>
        <label className="block font-medium text-gray-700">
          Google Adsense Code
        </label>
        <InputField
          type="text"
          name="googleAdsenseCode"
          value={form.googleAdsenseCode || ""}
          onChange={handleChange}
          className="mt-2"
          placeholder="Enter Adsense Code"
          variant="primary"
          size="md"
        />
      </div>

      {/* Theme selector dropdown */}
      <div>
        <label className="block font-medium text-gray-700">Select Theme</label>
        <select
          value={selectedTheme}
          onChange={handleThemeChange}
          className="mt-2 p-2 border rounded-md w-full"
        >
          {Object.keys(allThemes).map((themeKey) => (
            <option key={themeKey} value={themeKey}>
              {themeKey.charAt(0).toUpperCase() + themeKey.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Color pickers for themePalette */}
      <div>
        <label className="block font-medium text-gray-700 mt-4">Theme Colors</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
          {form.themePalette &&
            Object.entries(form.themePalette).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm text-gray-700 capitalize">
                  {key}
                </label>
                <input
                  type="color"
                  name={`themePalette.${key}`}
                  value={value}
                  onChange={handleChange}
                  className="w-full h-10 border rounded-md mt-1"
                />
              </div>
            ))}
        </div>
      </div>

      <div className="flex justify-end w-full">
        <Button
          type="submit"
          variant="outline"
          bgColorRequired
          disabled={loading}
          className="btn px-3 mt-6 py-3 font-semibold rounded-md hover:bg-white"
        >
          {loading ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </form>
  );
}
