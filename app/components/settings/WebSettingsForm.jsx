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
      const [_, category, key] = path;
      updatedPalette[category][key] = type === "checkbox" ? checked : value;

      setForm((prev) => ({
        ...prev,
        themePalette: updatedPalette,
      }));
      setThemeChanged(true); // Mark theme as changed
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleThemeChange = (e) => {
    const newThemeName = e.target.value;
    const theme = allThemes.find((t) => t.name === newThemeName);
    if (theme) {
      setSelectedTheme(newThemeName);
      setForm((prev) => ({
        ...prev,
        themePalette: theme,
      }));
      setThemeChanged(true); // Mark theme as changed
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSettingLoading(true);
    try {
      // 1. Update theme only if changed
      if (themeChanged) {
        await updateTheme(form.themePalette._id, form.themePalette);
      }

      // 2. Always update web settings
      await updateWebSettings(settings?._id, form);

      showToast("success", "Settings updated successfully!");
      setThemeChanged(false); // reset change flag
    } catch (error) {
      console.error(error);
      showToast("error", "Something went wrong.");
    } finally {
      setSettingLoading(false);
    }
  };

  if (loading || !form.themePalette) return <p>Loading...</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 rounded-lg card m-4"
    >
      {/* BASIC SETTINGS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block font-medium text-gray-700">
            Website Name
          </label>
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
          <label className="block font-medium text-gray-700">Footer Text</label>
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
          <label className="block font-medium text-gray-700">
            Google Adsense Code
          </label>
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
      </div>

      {/* THEME SELECTOR */}
      <div>
        <label className="block font-medium text-gray-700">Select Theme</label>
        <select
          value={selectedTheme}
          onChange={handleThemeChange}
          className="mt-2 p-2 border rounded-md w-full"
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

      <div className="flex justify-end w-full">
        <Button
          type="submit"
          variant="primary"
          bgColorRequired
          disabled={settingsloading}
          className="btn px-3 mt-6 py-3 font-semibold rounded-md"
        >
          {settingsloading ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </form>
  );
}
