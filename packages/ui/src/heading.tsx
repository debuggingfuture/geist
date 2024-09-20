import React from "react";

interface HeadingProps {
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  children: React.ReactNode;
  className?: string; // For any additional custom styles
}

const sizeClasses: Record<"sm" | "md" | "lg" | "xl" | "2xl" | "3xl", string> = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
  xl: "text-3xl",
  "2xl": "text-4xl",
  "3xl": "text-5xl",
};

function Heading({
  size = "md",
  children,
  className = "",
}: HeadingProps): JSX.Element {
  return (
    <h1 className={`${sizeClasses[size]} font-bold ${className}`}>
      {children}
    </h1>
  );
}

export default Heading;
