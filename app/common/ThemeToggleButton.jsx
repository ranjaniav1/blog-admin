"use client";
import { useEffect, useState } from "react";
import { VscColorMode } from "react-icons/vsc";
import IconButton from "./IconButton";
import { updateDocElement } from "../utils/theme.util";

export default function ThemeToggleButton() {
  const [theme, setTheme] = useState("admin-light");

  const applyTheme = (themeName) => {
    const panelData = sessionStorage.getItem("panel");
    if (!panelData) return;

    try {
      const panel = JSON.parse(panelData);
      const config = {
        fontFamily: panel.config.fontFamily,
        fontSizeBase: panel.config.fontSizeBase,
        headingFontSize: panel.config.headingFontSize,
        borderRadius: panel.config.borderRadius,
      };

      const selectedTheme = panel?.config?.themes?.find(
        (t) => t.name === themeName
      );
      if (!selectedTheme) return;
      updateDocElement(selectedTheme, config, true);
    } catch (error) {
      console.error("Failed to apply theme:", error);
    }
  };

useEffect(() => {
  const loadAndApplyTheme = () => {
    const panelData = sessionStorage.getItem("panel");
    if (panelData) {
      try {
        const panel = JSON.parse(panelData);
        const savedTheme = panel?.themeName || "admin-default";
        setTheme(savedTheme);
        applyTheme(savedTheme);
      } catch (error) {
        console.error("Failed to load theme from sessionStorage:", error);
      }
    }
  };

  // Initial theme load
  loadAndApplyTheme();

  // Listen for theme updates
  window.addEventListener("panel-updated", loadAndApplyTheme);

  return () => {
    window.removeEventListener("panel-updated", loadAndApplyTheme);
  };
}, []);


const toggleTheme = () => {
  const panelData = JSON.parse(sessionStorage.getItem("panel") || "{}"); // ✅ Fixed
  const newTheme = theme === "admin-dark" ? "admin-default" : "admin-dark";
  const updatedPanel = { ...panelData, themeName: newTheme };

  sessionStorage.setItem("panel", JSON.stringify(updatedPanel)); // ✅ Fixed
  setTheme(newTheme);
  applyTheme(newTheme);
};


  return (
    <IconButton
      Icon={VscColorMode}
      className="text-2xl"
      onClick={toggleTheme}
      aria_label="Toggle Theme"
      tooltip="Toggle Theme"
      needBg
    />
  );
}
