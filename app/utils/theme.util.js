export const updateDocElement = (
  selectedTheme,
  newFont,
  isTypoUpdated = false
) => {
  const root = document.documentElement;

  // Set background colors
  root.style.setProperty("--body", selectedTheme.background?.body || "#ffffff");
  root.style.setProperty(
    "--buttonbg",
    selectedTheme.background?.button || "#ffffff"
  );
  root.style.setProperty(
    "--cardbg",
    selectedTheme.background?.card || "#f9f9f9"
  );
  root.style.setProperty(
    "--headerbg",
    selectedTheme.background?.header || "#f0f0f0"
  );
  root.style.setProperty(
    "--navbg",
    selectedTheme.background?.navigation || "#f0f0f0"
  );

  // Set border
  root.style.setProperty("--border", selectedTheme.border?.color || "#ccc");
  root.style.setProperty("--radiuse", selectedTheme.border?.radius || "5px");
  root.style.setProperty(
    "--border-style",
    selectedTheme.border?.style || "solid"
  );

  // Set icons
  root.style.setProperty(
    "--default-icon",
    selectedTheme.icon?.default || "#000"
  );
  root.style.setProperty("--main-icon", selectedTheme.icon?.main || "#000");

  // Set effects
  root.style.setProperty("--hover", selectedTheme.effects?.hover || "#e0e0e0");
  root.style.setProperty(
    "--shadow",
    selectedTheme.effects?.shadow || "rgba(0,0,0,0.1)"
  );

  // Set text
  root.style.setProperty("--button-text", selectedTheme.text?.button || "#000");
  root.style.setProperty(
    "--header-text",
    selectedTheme.text?.heading || "#000"
  );
  root.style.setProperty("--card-text", selectedTheme.text?.card || "#000");
  root.style.setProperty(
    "--primary-text",
    selectedTheme.text?.primary || "#000"
  );
  root.style.setProperty(
    "--secondary-text",
    selectedTheme.text?.secondary || "#666"
  );

  // Set typography
  root.style.setProperty(
    "--font-sans",
    isTypoUpdated
      ? newFont.fontFamily
      : selectedTheme.config?.fontFamily || "Inter, sans-serif"
  );
  root.style.setProperty(
    "--font-size",
    isTypoUpdated
      ? newFont.fontSizeBase
      : selectedTheme.config?.fontSizeBase || "16px"
  );
  root.style.setProperty(
    "--heading-font-size",
    isTypoUpdated
      ? newFont.headingFontSize
      : selectedTheme.config?.headingFontSize || "24px"
  );
  root.style.setProperty(
    "--radiuse",
    isTypoUpdated
      ? newFont.borderRadius
      : selectedTheme.config?.borderRadius || "24px"
  );
};
