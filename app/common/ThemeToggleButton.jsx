"use client";
import { useEffect, useState } from "react";
import { VscColorMode } from "react-icons/vsc";
import IconButton from "./IconButton";
import { updateDocElement } from "../utils/theme.util";

export default function ThemeToggleButton() {
  const [theme, setTheme] = useState("admin-light");

  const applyTheme = (themeName) => {
    const panelData = localStorage.getItem("panel");
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
      console.log("Selected Theme:", selectedTheme);
      if (!selectedTheme) return;
      updateDocElement(selectedTheme, config, true);
    } catch (error) {
      console.error("Failed to apply theme:", error);
    }
  };

  useEffect(() => {
    const panelData = localStorage.getItem("panel");
    if (panelData) {
      try {
        const panel = JSON.parse(panelData);
        const savedTheme = panel?.themeName || "admin-light";
        setTheme(savedTheme);
        applyTheme(savedTheme);
      } catch (error) {
        console.error("Failed to load theme from localStorage:", error);
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "admin-dark" ? "admin-light" : "admin-dark";
    setTheme(newTheme);
    const panelData = JSON.parse(localStorage.getItem("panel") || "{}");
    const updatedPanel = { ...panelData, themeName: newTheme };
    localStorage.setItem("panel", JSON.stringify(updatedPanel));
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
