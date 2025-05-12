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
  return (
    <button
      type={type}
      onClick={onClick}
      style={style}
      aria-label={aria_label}
      title={tooltip}
      disabled={disabled}
      className={`flex items-center justify-center ${
        needBg ? "my-icon" : ""
      }  rounded-full p-2.5 disabled:opacity-50 disabled:cursor-not-allowed icon-dafault ${className}`}
    >
      <Icon className={"icon-default"} />
    </button>
  );
};

export default IconButton;
