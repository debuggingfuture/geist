import React from "react";

interface HeadingProps {
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  children: React.ReactNode;
  className?: string; // For any additional custom styles
}

const sizeClasses: Record<"sm" | "md" | "lg" | "xl" | "2xl" | "3xl", string> = {
  sm: "ui-text-lg",
  md: "ui-text-xl",
  lg: "ui-text-2xl",
  xl: "ui-text-3xl",
  "2xl": "ui-text-4xl",
  "3xl": "ui-text-5xl",
};

function Heading({
  size = "md",
  children,
  className = "",
}: HeadingProps): JSX.Element {
  return (
    <h1 className={`${sizeClasses[size]} ui-font-bold ${className}`}>
      {children}
    </h1>
  );
}

export default Heading;
