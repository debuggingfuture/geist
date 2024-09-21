interface BadgeProps {
  text: string;
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "error";
  size?: "xs" | "sm" | "md" | "lg";
}

const getBadgeColor = (colorProp: BadgeProps["color"]): string => {
  if (colorProp) {
    return {
      primary: "ui-badge-primary",
      secondary: "ui-badge-secondary",
      accent: "ui-badge-accent",
      info: "ui-badge-info",
      success: "ui-badge-success",
      warning: "ui-badge-warning",
      error: "ui-badge-error",
    }[colorProp];
  }

  return "ui-badge-primary";
};

const getBadgeSize = (sizeProp: BadgeProps["size"]): string => {
  if (sizeProp) {
    return {
      xs: "ui-badge-xs",
      sm: "ui-badge-sm",
      md: "ui-badge-md",
      lg: "ui-badge-lg",
    }[sizeProp];
  }

  return "ui-badge-md";
};

function Badge({
  text,
  color = "primary",
  size = "md",
}: BadgeProps): JSX.Element {
  return (
    <span className={`ui-badge ${getBadgeColor(color)} ${getBadgeSize(size)}`}>
      {text}
    </span>
  );
}

export default Badge;
