"use client";

import Button from "@/app/common/Button";
import { useState, useEffect } from "react";
import InputField from "@/app/common/InputField";
import { useToast } from "@/app/context/ToastContext";
import { useSettings } from "@/app/hooks/useWebSettings";
import { useThemes } from "@/app/hooks/useTheme";

export default function WebSettingsForm() {
  const { settings, loading, updateWebSettings } = useSettings();
  const { showToast } = useToast();
  const { updateTheme } = useThemes(); // Importing updateTheme function

  const [settingsloading, setSettingLoading] = useState(false);
  const [form, setForm] = useState({});
  const [selectedTheme, setSelectedTheme] = useState("");
  const [allThemes, setAllThemes] = useState([]);
  const [themeChanged, setThemeChanged] = useState(false);

  useEffect(() => {
    if (settings?.webSettings?.config?.themes?.length) {
      const initialTheme = settings.webSettings.config.themes[0];
      setSelectedTheme(initialTheme.name);
      setAllThemes(settings.webSettings.config.themes);
      setForm({
        name: settings.webSettings.name || "",
        footerText: settings.webSettings.footerText || "",
        googleAdsenseCode: settings.webSettings.googleAdsenseCode || "",
        headerLogo: settings.webSettings.headerLogo || "",
        footerLogo: settings.webSettings.footerLogo || "",
        themePalette: initialTheme || {},
      });
    }
  }, [settings]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const path = name.split(".");

    if (path[0] === "themePalette") {
      const updatedPalette = { ...form.themePalette };
      const [, category, key] = path;

      if (!updatedPalette[category]) {
        updatedPalette[category] = {};
      }

      updatedPalette[category][key] = type === "checkbox" ? checked : value;

      setForm((prev) => ({
        ...prev,
        themePalette: updatedPalette,
      }));
      setThemeChanged(true);
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleThemeChange = (e) => {
    const newThemeName = e.target.value;
    const newTheme = allThemes.find((t) => t.name === newThemeName);
    if (newTheme) {
      setSelectedTheme(newThemeName);
      setForm((prev) => ({
        ...prev,
        themePalette: newTheme,
      }));
      setThemeChanged(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSettingLoading(true);

    const formData = new FormData();
    formData.append("name", form.name || "");
    formData.append("footerText", form.footerText || "");
    formData.append("googleAdsenseCode", form.googleAdsenseCode || "");

    // Add uploaded files if any
    if (form.headerLogoFile) formData.append("headerLogo", form.headerLogoFile);
    if (form.footerLogoFile) formData.append("footerLogo", form.footerLogoFile);

    // if theme changed, update the theme
    if (themeChanged) {
      await updateTheme(form.themePalette._id, form.themePalette);
    }

    try {
      const res = await updateWebSettings(settings?.webSettings?._id, formData); // ensure this sends multipart/form-data
      if (res.success) {
        showToast("Settings updated successfully", "success");
      } else {
        showToast(res.message || "Update failed", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Something went wrong!", "error");
    } finally {
      setSettingLoading(false);
    }
  };

  if (loading || !form.themePalette) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 rounded-lg card m-4">
      {/* BASIC SETTINGS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block font-semibold">Website Name</label>
          <InputField
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="mt-2"
            placeholder="Enter Website Name"
            variant="primary"
            size="md"
          />
        </div>

        <div>
          <label className="block font-semibold">Footer Text</label>
          <InputField
            type="text"
            name="footerText"
            value={form.footerText}
            onChange={handleChange}
            className="mt-2"
            placeholder="Enter Footer Text"
            variant="primary"
            size="md"
          />
        </div>

        <div>
          <label className="block font-semibold">Google Adsense Code</label>
          <InputField
            type="text"
            name="googleAdsenseCode"
            value={form.googleAdsenseCode}
            onChange={handleChange}
            className="mt-2"
            placeholder="Enter Adsense Code"
            variant="primary"
            size="md"
          />
        </div>

        {/* Inside your JSX return, probably below InputField components */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Header Logo</label>
          <input
            type="file"
            name="headerLogoFile"
            accept="image/*"
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                headerLogoFile: e.target.files?.[0],
              }))
            }
            className="border rounded px-3 py-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Footer Logo</label>
          <input
            type="file"
            name="footerLogoFile"
            accept="image/*"
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                footerLogoFile: e.target.files?.[0],
              }))
            }
            className="border rounded px-3 py-2 w-full"
          />
        </div>

        {form.headerLogo && (
          <div>
            <h1>Navigation Logo: </h1>
            <img
              src={form.headerLogo}
              alt="Current Header Logo"
              className="w-32 mb-2"
            />
          </div>
        )}
        {form.footerLogo && (
          <div>
            <h1>Footer Logo:</h1>
            <img
              src={form.footerLogo}
              alt="Current Footer Logo"
              className="w-32 mb-2"
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <label className="block font-semibold">Font Family</label>
          <InputField
            type="text"
            name="fontFamily"
            value={form.fontFamily}
            onChange={handleChange}
            className="mt-2"
            placeholder="e.g., Inter, sans-serif"
            variant="primary"
            size="md"
          />
        </div>
        <div>
          <label className="block font-semibold">Base Font Size</label>
          <InputField
            type="text"
            name="fontSizeBase"
            value={form.fontSizeBase}
            onChange={handleChange}
            className="mt-2"
            placeholder="e.g., 16px"
            variant="primary"
            size="md"
          />
        </div>
        <div>
          <label className="block font-semibold">Heading Font Size</label>
          <InputField
            type="text"
            name="headingFontSize"
            value={form.headingFontSize}
            onChange={handleChange}
            className="mt-2"
            placeholder="e.g., 24px"
            variant="primary"
            size="md"
          />
        </div>
        <div>
          <label className="block font-semibold">Border Radius</label>
          <InputField
            type="text"
            name="borderRadius"
            value={form.borderRadius}
            onChange={handleChange}
            className="mt-2"
            placeholder="e.g., 24px"
            variant="primary"
            size="md"
          />
        </div>
      </div>

      {/* divider */}
      <hr className="border-dashed" />

      {/* THEME SELECTOR */}
      <div>
        <label className="block font-semibold">Select Theme</label>
        <select
          value={selectedTheme}
          onChange={handleThemeChange}
          className="mt-2 p-2 my-border my-rounded w-full link-active "
        >
          {allThemes.map((theme) => (
            <option key={theme._id} value={theme.name}>
              {theme.name}
            </option>
          ))}
        </select>
      </div>

      {/* NESTED COLOR PICKERS */}
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
            ].includes(category)
          ) {
            return (
              <div key={category} className="mt-4">
                <h4 className="font-semibold capitalize active-text">
                  {category}
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                  {Object.entries(group).map(([key, val]) => (
                    <div key={key}>
                      <label className="block text-sm font-semibold capitalize">
                        {key}
                      </label>
                      {typeof val === "boolean" ? (
                        <input
                          type="checkbox"
                          name={`themePalette.${category}.${key}`}
                          checked={val}
                          onChange={handleChange}
                          className="h-5 w-5 mt-1"
                        />
                      ) : (
                        <input
                          type="color"
                          name={`themePalette.${category}.${key}`}
                          value={val}
                          onChange={handleChange}
                          className="w-full h-10 my-border my-rounded mt-1"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="flex justify-end w-full">
        <Button
          type="submit"
          disabled={settingsloading}
          className="btn px-3 mt-6 py-3 font-semibold rounded-md buttonbg"
        >
          {settingsloading ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </form>
  );
}
