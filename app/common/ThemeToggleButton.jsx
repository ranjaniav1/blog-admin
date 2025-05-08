"use client";
import { useEffect, useState } from "react";
import { VscColorMode } from "react-icons/vsc";
import IconButton from "./IconButton";

export default function ThemeToggleButton() {
  const [theme, setTheme] = useState("light");

  const applyTheme = (theme) => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.style.setProperty("--background", "#1e1e1e");
      root.style.setProperty("--primary", "#0a0a0a");
      root.style.setProperty("--foreground", "#ededed");
      root.style.setProperty("--border", "#27272a");
      root.style.setProperty("--text-primary", "#ededed");
      root.style.setProperty("--text-secondary", "#a1a1aa");
    } else {
      root.style.setProperty("--background", "#f4f4f5");
      root.style.setProperty("--primary", "#fff");
      root.style.setProperty("--foreground", "#171717");
      root.style.setProperty("--border", "#e5e7eb");
      root.style.setProperty("--text-primary", "#171717");
      root.style.setProperty("--text-secondary", "#52525b");
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
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
