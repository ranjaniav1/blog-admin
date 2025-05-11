"use client";
import { useEffect, useState } from "react";
import { VscColorMode } from "react-icons/vsc";
import IconButton from "./IconButton";

export default function ThemeToggleButton() {
  const [theme, setTheme] = useState("admin-light");

  const applyTheme = (themeName) => {
    const panelData = localStorage.getItem("panel");
    if (!panelData) return;

    try {
      const panel = JSON.parse(panelData);
      const selectedTheme = panel?.config?.themes?.find(
        (t) => t.name === themeName
      );
      if (!selectedTheme) return;

      const root = document.documentElement;

      // Set background colors
      root.style.setProperty("--body", selectedTheme.background?.body || "#ffffff");
      root.style.setProperty("--buttonbg", selectedTheme.background?.button || "#ffffff");
      root.style.setProperty("--cardbg", selectedTheme.background?.card || "#f9f9f9");
      root.style.setProperty("--headerbg", selectedTheme.background?.header || "#f0f0f0");
      root.style.setProperty("--navbg", selectedTheme.background?.navigation || "#f0f0f0");

      // Set border
      root.style.setProperty("--border", selectedTheme.border?.color || "#ccc");
      root.style.setProperty("--radiuse", selectedTheme.border?.radius || "5px");
      root.style.setProperty("--border-style", selectedTheme.border?.style || "solid");

      // Set icons
      root.style.setProperty("--default-icon", selectedTheme.icon?.default || "#000");
      root.style.setProperty("--main-icon", selectedTheme.icon?.main || "#000");

      // Set effects
      root.style.setProperty("--hover", selectedTheme.effects?.hover || "#e0e0e0");
      root.style.setProperty("--shadow", selectedTheme.effects?.shadow || "rgba(0,0,0,0.1)");

      // Set text
      root.style.setProperty("--button-text", selectedTheme.text?.button || "#000");
      root.style.setProperty("--header-text", selectedTheme.text?.heading || "#000");
      root.style.setProperty("--card-text", selectedTheme.text?.card || "#000");
      root.style.setProperty("--primary-text", selectedTheme.text?.primary || "#000");
      root.style.setProperty("--secondary-text", selectedTheme.text?.secondary || "#666");

      // Set typography
      root.style.setProperty("--font-sans", selectedTheme.typography?.fontFamily || "Inter, sans-serif");
      root.style.setProperty("--font-size", selectedTheme.typography?.fontSizeBase || "16px");
      root.style.setProperty("--heading-font-size", selectedTheme.typography?.headingFontSize || "24px");

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
