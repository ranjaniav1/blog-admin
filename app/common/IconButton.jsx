import React from "react";

const IconButton = ({
  Icon,
  onClick,
  aria_label,
  className = "",
  style,
  size = "md",
  variant = "default",
  disabled = false,
  tooltip = "",
  type = "button",
  needBg = false,
}) => {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
  };

  const variantClasses = {
    default: "text-foreground hover:text-gray-500",
    primary: "text-blue-600 hover:text-blue-800",
    secondary: "text-gray-600 hover:text-gray-800",
    danger: "text-red-600 hover:text-red-800",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      style={style}
      aria-label={aria_label}
      title={tooltip}
      disabled={disabled}
      className={`flex items-center justify-center ${needBg ? "my-icon" : ""}  rounded-full p-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <Icon className={`${sizeClasses[size]} ${variantClasses[variant]}`} />
    </button>
  );
};

export default IconButton;
