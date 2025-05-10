"use client";

import React, { useEffect, useState } from "react";
import { useGeneralSettings } from "@/app/hooks/useGeneralSettings";
import InputField from "@/app/common/InputField";
import Button from "@/app/common/Button";
import { useThemes } from "@/app/hooks/useTheme";
import { useToast } from "@/app/context/ToastContext";

const GeneralSettingsForm = () => {
  const { loading, settings, updateGeneralSettings } = useGeneralSettings();
  const { updateTheme } = useThemes();
  const { showToast } = useToast();

  const [form, setForm] = useState({});
  const [allThemes, setAllThemes] = useState([]);
  const [themeChange, setThemeChange] = useState(false);

  useEffect(() => {
    const storedSettings = JSON.parse(localStorage.getItem("panel"));

    if (storedSettings) {
      console.log("Loaded Settings from LocalStorage:", storedSettings);
      const initialTheme = storedSettings?.config?.themes?.[0];

      setForm({
        panelName: storedSettings?.panelName || "",
        expireNews: storedSettings?.expireNews || false,
        headerLogo: storedSettings?.logo || "",
        selectedTheme: storedSettings?.themeName || "",
        fontFamily: storedSettings?.config?.fontFamily || "",
        fontSizeBase: storedSettings?.config?.fontSizeBase || "",
        headingFontSize: storedSettings?.config?.headingFontSize || "",
        borderRadius: storedSettings?.config?.borderRadius || "",
        themePalette: initialTheme || {}, // Set the theme palette as per the stored settings
      });

      setAllThemes(storedSettings?.config?.themes || []);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const path = name.split(".");

    if (path[0] === "themePalette") {
      const updatedPalette = { ...form.themePalette };
      const [_, category, key] = path;
      updatedPalette[category][key] = type === "checkbox" ? checked : value;

      setForm((prev) => ({
        ...prev,
        themePalette: updatedPalette,
      }));
      setThemeChange(true);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleThemeChange = (e) => {
    const newThemeName = e.target.value;
    const theme = allThemes.find((t) => t.name === newThemeName);
    if (theme) {
      setForm((prev) => ({
        ...prev,
        selectedTheme: newThemeName,
        themePalette: theme, // Change theme palette on theme change
      }));
    }
    setThemeChange(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (themeChange) {
        const updatedTheme = {
          ...form.themePalette,
          name: form.selectedTheme,
        };
        await updateTheme(updatedTheme._id, updatedTheme);
      }
      console.log("updated color pallete", form.themePalette);
      await updateGeneralSettings(form);
      console.log("Updated panel Settings");
      showToast("success", "Settings updated successfully.");
    } catch (error) {
      console.error(error);
      showToast("error", "Failed to update settings.");
    }
  };

  if (loading || !form.themePalette) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 rounded-lg card m-4">
      {/* Basic Settings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block font-medium text-gray-700">Panel Name</label>
          <InputField
            type="text"
            name="panelName"
            value={form.panelName}
            onChange={handleChange}
            className="mt-2"
            placeholder="Enter Panel Name"
            variant="primary"
            size="md"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Expire News</label>
          <input
            type="checkbox"
            name="expireNews"
            checked={form.expireNews}
            onChange={handleChange}
            className="mt-2"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Logo</label>
          <InputField
            type="text"
            name="headerLogo"
            value={form.headerLogo}
            onChange={handleChange}
            className="mt-2"
            placeholder="Enter Logo URL"
            variant="primary"
            size="md"
          />
        </div>
      </div>

      {/* Theme Selector */}
      <div>
        <label className="block font-medium text-gray-700">Select Theme</label>
        <select
          value={form.selectedTheme}
          onChange={handleThemeChange}
          className="mt-2 p-2 border rounded-md w-full"
        >
          {allThemes.map((theme) => (
            <option key={theme.name} value={theme.name}>
              {theme.name}
            </option>
          ))}
        </select>
      </div>

      {/* Theme Colors */}
      <div>
        <h3 className="mt-4 font-medium text-gray-800">Theme Colors</h3>
        {form.themePalette &&
          Object.entries(form.themePalette).map(([category, group]) => {
            if (
              typeof group === "object" &&
              ![
                "_id",
                "name",
                "createdBy",
                "createdAt",
                "updatedAt",
                "__v",
              ].includes(category)
            ) {
              return (
                <div key={category} className="mt-4">
                  <h4 className="font-semibold text-gray-700 capitalize">
                    {category}
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                    {Object.entries(group).map(([key, val]) => (
                      <div key={key}>
                        <label className="block text-sm text-gray-700 capitalize">
                          {key}
                        </label>
                        <input
                          type={typeof val === "boolean" ? "checkbox" : "color"}
                          name={`themePalette.${category}.${key}`}
                          checked={typeof val === "boolean" ? val : undefined}
                          value={typeof val === "boolean" ? undefined : val}
                          onChange={handleChange}
                          className="w-full h-10 border rounded-md mt-1"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
            return null;
          })}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          variant="primary"
          bgColorRequired
          disabled={loading}
          className="px-6 py-3 font-semibold rounded-md"
        >
          {loading ? "Saving..." : "Update Settings"}
        </Button>
      </div>
    </form>
  );
};

export default GeneralSettingsForm;
