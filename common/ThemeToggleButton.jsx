'use client'

export default function ThemeToggleButton() {
  const toggleTheme = () => {
    const root = document.documentElement;
    const currentBg = getComputedStyle(root)
      .getPropertyValue("--background")
      .trim();
    const isDark = currentBg === "#0a0a0a";

    root.style.setProperty("--background", isDark ? "#ffffff" : "#0a0a0a");
    root.style.setProperty("--foreground", isDark ? "#171717" : "#ededed");
  };

  return (
    <button
      onClick={toggleTheme}
      className="bg-background text-foreground px-4 py-2 rounded"
    >
      Toggle Theme
    </button>
  );
}
