// common/InputField.jsx
import React from "react";

const InputField = ({
  value,
  onChange,
  placeholder = "",
  type = "text",
  className = "",
  style = {},
  disabled = false,
  aria_label = "",
  name = "",
  required = false,
}) => {
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
      className={`block w-full my-rounded card focus:outline-none focus:ring-2 focus:ring-primary-text/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className} p-2.5`}
    />
  );
};

export default InputField;