// common/Button.jsx
import React from "react";

const Button = ({
  type = "button",
  onClick,
  className = "",
  children,
  disabled = false,
  variant = "primary",
  size = "md",
  fullWidth = false,
}) => {
  const baseStyles = "my-rounded focus:outline-none transition-all duration-200 flex gap-2 items-center justify-center font-medium";
  
  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };
  
  const variantStyles = {
    primary: "buttonbg text-white hover:opacity-90",
    outline: "my-border bg-transparent hover:bg-hover secondary-text",
    danger: "delete text-white hover:opacity-90",
    success: "bg-green-600 text-white hover:bg-green-700",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
  };
  
  const widthStyle = fullWidth ? "w-full" : "";
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${disabledStyles} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;