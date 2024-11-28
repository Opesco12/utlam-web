import React from "react";
import "../styles/styledText.css"; // Ensure you have the CSS file for styles

const StyledText = ({
  color,
  children,
  type = "body",
  variant = "regular",
  className,
  style,
  ...props
}) => {
  const textClass = `text ${type} ${variant} ${className || ""}`;

  return (
    <span
      className={textClass}
      style={{ color, ...style }}
      {...props}
    >
      {children}
    </span>
  );
};

export default StyledText;
