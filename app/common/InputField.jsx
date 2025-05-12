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
      className={`block w-full my-rounded my-border  ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
    />
  );
};

export default InputField;
