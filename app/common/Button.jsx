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
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`my-rounded focus:outline-none transition-colors flex gap-1 items-center ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
