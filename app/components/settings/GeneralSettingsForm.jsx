"use client";

import React, { useEffect, useState } from "react";
import { useGeneralSettings } from "@/app/hooks/useGeneralSettings";
import InputField from "@/app/common/InputField";
import Button from "@/app/common/Button";
import { useThemes } from "@/app/hooks/useTheme";
import { useToast } from "@/app/context/ToastContext";
import { updateDocElement } from "@/app/utils/theme.util";

const GeneralSettingsForm = () => {
  const { loading, settings, updateGeneralSettings } = useGeneralSettings();
  const { updateTheme } = useThemes();
  const { showToast } = useToast();

  const [form, setForm] = useState({});
  const [allThemes, setAllThemes] = useState([]);
  const [themeChange, setThemeChange] = useState(false);

  useEffect(() => {
    const storedSettings = JSON.parse(sessionStorage.getItem("panel"));
    if (storedSettings) {
      const initialTheme = storedSettings?.config?.themes?.[0];

      setForm({
        panelName: storedSettings?.panelName || "",
        expireNews: storedSettings?.expireNews || false,
        headerLogo: storedSettings?.logo || "",
        themeName: initialTheme?.name || "",
        fontFamily: storedSettings?.config?.fontFamily || "",
        fontSizeBase: storedSettings?.config?.fontSizeBase || "",
        headingFontSize: storedSettings?.config?.headingFontSize || "",
        borderRadius: storedSettings?.config?.borderRadius || "",
        themePalette: initialTheme || {},
      });

      setAllThemes(storedSettings?.config?.themes || []);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const path = name.split(".");

    // Handle file input
    if (type === "file") {
      setForm((prev) => ({
        ...prev,
        [name]: files[0],
      }));
      return;
    }

    if (path[0] === "themePalette") {
      const updatedPalette = { ...form.themePalette };
      const [, category, key] = path;
      updatedPalette[category][key] = type === "checkbox" ? checked : value;

      setForm((prev) => ({
        ...prev,
        themePalette: updatedPalette,
      }));
      setThemeChange(true);
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleThemeChange = (e) => {
    const newThemeName = e.target.value;
    const theme = allThemes.find((t) => t.name === newThemeName);
    if (theme) {
      setForm((prev) => ({
        ...prev,
        themeName: newThemeName,
        themePalette: theme,
      }));
    }
    setThemeChange(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("panelName", form.panelName);
      formData.append("expireNews", form.expireNews);
      formData.append("themeName", form?.themePalette?.name);

      const config = {
        fontFamily: form.fontFamily,
        fontSizeBase: form.fontSizeBase,
        headingFontSize: form.headingFontSize,
        borderRadius: form.borderRadius,
      };
      formData.append("config", JSON.stringify(config));

      if (form.headerLogo instanceof File) {
        formData.append("logo", form.headerLogo);
      }

      if (themeChange && form.themePalette?._id) {
        const updatedTheme = {
          ...form.themePalette,
          name: form.themeName,
        };
        await updateTheme(updatedTheme._id, updatedTheme);
      }

      await updateGeneralSettings(formData);

      const panelData = JSON.parse(sessionStorage.getItem("panel"));
      const appliedTheme = panelData?.config?.themes?.find(
        (t) => t.name === panelData?.themeName
      );

      if (appliedTheme) {
        updateDocElement(appliedTheme, config, true);
      }

      showToast("success", "Settings updated successfully.");
    } catch (error) {
      console.error(error);
      showToast("error", "Failed to update settings.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-6 p-6 my-rounded card">
        {/* Basic Settings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block font-semibold">Panel Name</label>
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
            <label className="block font-semibold">Logo</label>
            {form.headerLogo && typeof form.headerLogo === "string" && (
              <div className="mt-2 mb-2">
                <img
                  src={form.headerLogo}
                  alt="Current Logo"
                  className="w-32 h-auto rounded border"
                />
              </div>
            )}
            <InputField
              type="file"
              name="headerLogo"
              onChange={handleChange}
              className="mt-2"
            />
          </div>
          <div>
            <label className="block font-semibold">Expire News</label>
            <input
              type="checkbox"
              name="expireNews"
              checked={form.expireNews}
              onChange={handleChange}
              className="mt-2"
            />
          </div>
        </div>

        {/* Typography Settings */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <InputField
            label="Font Family"
            type="text"
            name="fontFamily"
            value={form.fontFamily}
            onChange={handleChange}
            placeholder="e.g., Inter, sans-serif"
            className="mt-2"
          />
          <InputField
            label="Base Font Size"
            type="text"
            name="fontSizeBase"
            value={form.fontSizeBase}
            onChange={handleChange}
            placeholder="e.g., 16px"
            className="mt-2"
          />
          <InputField
            label="Heading Font Size"
            type="text"
            name="headingFontSize"
            value={form.headingFontSize}
            onChange={handleChange}
            placeholder="e.g., 24px"
            className="mt-2"
          />
          <InputField
            label="Border Radius"
            type="text"
            name="borderRadius"
            value={form.borderRadius}
            onChange={handleChange}
            placeholder="e.g., 24px"
            className="mt-2"
          />
        </div>

        <hr className="border-dashed" />

        {/* Theme Selector */}
        <div>
          <label className="block font-semibold">Select Theme</label>
          <select
            value={form.themeName}
            onChange={handleThemeChange}
            className="mt-2 p-2 my-rounded my-border w-full link-active"
          >
            {allThemes.map((theme) => (
              <option key={theme.name} value={theme.name}>
                {theme.name}
              </option>
            ))}
          </select>
        </div>

        {/* Theme Palette Editor */}
        <div>
          {Object.entries(form.themePalette).map(([category, group]) => {
            if (
              typeof group === "object" &&
              ![
                "_id",
                "name",
                "createdBy",
                "createdAt",
                "updatedAt",
                "__v",
                "typography",
                "effects",
              ].includes(category)
            ) {
              return (
                <div key={category} className="mt-4">
                  <h4 className="font-semibold active-text capitalize">
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
                          className="w-full h-10 my-border my-rounded mt-1"
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

        {/* Submit */}
        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            disabled={loading}
            className="px-6 py-3 font-semibold rounded-md buttonbg"
          >
            {loading ? "Saving..." : "Update Settings"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default GeneralSettingsForm;
