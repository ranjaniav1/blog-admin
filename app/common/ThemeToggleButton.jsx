"use client";
import { useEffect, useState } from "react";
import { VscColorMode } from "react-icons/vsc";
import IconButton from "./IconButton";

export default function ThemeToggleButton() {
  const [theme, setTheme] = useState("admin-light");

  // Function to apply a theme to the document root
  const applyTheme = (themeName) => {
    const panelData = localStorage.getItem("panel");
    if (!panelData) return;

    try {
      const panel = JSON.parse(panelData);
      const selectedTheme = panel?.config?.themes?.find(
        (t) => t.name === themeName // Match the theme name properly
      );

      if (!selectedTheme) return;

      const root = document.documentElement;

      // Apply background colors
      root.style.setProperty(
        "--background",
        selectedTheme.background.body || "#ffffff"
      );
      
      root.style.setProperty(
        "--card",
        selectedTheme.background.card || "#f2f2f2"
      );

      root.style.setProperty(
        "--primary",
        selectedTheme.background.button || "#2563eb"
      );
      root.style.setProperty(
        "--foreground",
        selectedTheme.text.card || "#333333"
      );

      // Apply border and radius
      root.style.setProperty(
        "--border",
        selectedTheme.border.color || "#d1d5db"
      );
      root.style.setProperty("--rounded", selectedTheme.border.radius || "5px");

      // Apply text colors
      root.style.setProperty(
        "--text-primary",
        selectedTheme.text.primary || "#1f2937"
      );
      root.style.setProperty(
        "--text-secondary",
        selectedTheme.text.secondary || "#6b7280"
      );

      // Apply font and size
      root.style.setProperty(
        "--font-size-base",
        selectedTheme.typography?.fontSizeBase || "16px"
      );
    } catch (error) {
      console.error("Failed to apply theme:", error);
    }
  };

  // Load theme from localStorage on mount
  useEffect(() => {
    const panelData = localStorage.getItem("panel");
    if (panelData) {
      try {
        const panel = JSON.parse(panelData);
        const savedTheme = panel?.themeName || "admin-light"; // Default to "admin-light"
        setTheme(savedTheme);
        applyTheme(savedTheme);
      } catch (error) {
        console.error("Failed to load theme from localStorage:", error);
      }
    }
  }, []);

  // Toggle between themes and update localStorage
  const toggleTheme = () => {
    const newTheme = theme === "admin-dark" ? "admin-light" : "admin-dark";
    setTheme(newTheme);

    // Get the current panel from localStorage and update themeName
    const panelData = JSON.parse(localStorage.getItem("panel") || "{}");

    // Update localStorage with the new theme
    const updatedPanel = { ...panelData, themeName: newTheme };
    localStorage.setItem("panel", JSON.stringify(updatedPanel));

    // Apply the new theme to the page
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
