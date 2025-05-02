import React from "react";

/**
 * Reusable Button Component
 *
 * Props:
 * - type: "button" | "submit" | "reset"
 * - onClick: function to call on click
 * - className: additional Tailwind classes
 * - children: content inside the button
 * - disabled: boolean to disable the button
 * - bgColorRequired: if true, apply base background styling
 * - variant: "primary" | "outline" | "danger" | "success" | "secondary"
 */
const Button = ({
  type = "button",
  onClick,
  className = "",
  children,
  disabled = false,
  bgColorRequired = false,
  variant = "primary", // default variant
}) => {
  // Define variant-based styles
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-400 bg-transparent",
    danger: "bg-red-600 text-white hover:bg-red-700",
    success: "bg-green-600 text-white hover:bg-green-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
  };

  // Disabled styles override everything
  const baseStyle = disabled
    ? "bg-gray-300 cursor-not-allowed text-white"
    : bgColorRequired
    ? variantStyles[variant] || variantStyles.primary
    : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`text-sm rounded-md focus:outline-none transition-colors ${baseStyle} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
