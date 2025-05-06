import React from "react";

const InputField = ({
  value,
  onChange,
  placeholder = "",
  type = "text",
  className = "",
  style = {},
  disabled = false,
  variant = "default",
  size = "md",
  aria_label = "",
  name = "",
  required = false,
}) => {
  const sizeClasses = {
    sm: "text-sm p-2",
    md: "text-base p-3",
    lg: "text-lg p-4",
  };

  const variantClasses = {
    default: "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
    primary: "border-blue-500 focus:border-blue-700 focus:ring-blue-700",
    secondary: "border-gray-500 focus:border-gray-700 focus:ring-gray-700",
    danger: "border-red-500 focus:border-red-700 focus:ring-red-700",
  };

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={style}
      disabled={disabled}
      name={name}
      aria-label={aria_label}
      required={required}
      className={`block w-full my-rounded border ${sizeClasses[size]} ${variantClasses[variant]} ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
    />
  );
};

export default InputField;
