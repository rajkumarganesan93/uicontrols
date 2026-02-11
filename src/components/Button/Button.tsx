import React, { forwardRef } from "react";
import { useTheme } from "../../utils/themeContext";

export type ButtonVariant = "contained" | "outlined" | "text";
export type ButtonSize = "small" | "medium" | "large";
export type ButtonColor =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info";

export interface ButtonProps {
  id?: string;
  name?: string;
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  disabled?: boolean;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: () => void;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      id,
      name,
      label,
      variant = "contained",
      size = "medium",
      color = "primary",
      disabled = false,
      fullWidth = false,
      startIcon,
      endIcon,
      onClick,
    },
    ref
  ) => {
    const themeObj = useTheme();
    const palette = themeObj.palette[color];

    // Base style applied to all buttons
    const baseStyle: React.CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      borderRadius: "0.5rem",
      fontWeight: 600,
      transition: "all 0.2s ease-in-out",
      outline: "none",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      width: fullWidth ? "100%" : "auto",
    };

    // Size styles
    const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
      small: { padding: "0.25rem 0.75rem", fontSize: "0.875rem" },
      medium: { padding: "0.5rem 1rem", fontSize: "1rem" },
      large: { padding: "0.75rem 1.5rem", fontSize: "1.125rem" },
    };

    // Variant styles
    const variantStyle: React.CSSProperties = (() => {
      switch (variant) {
        case "contained":
          return {
            backgroundColor: disabled ? palette.disabled : palette.main,
            color: disabled
              ? themeObj.palette.text.disabled
              : palette.contrastText,
            border: "none",
            boxShadow: !disabled ? themeObj.shadows.light : "none",
          };
        case "outlined":
          return {
            backgroundColor: "transparent",
            color: disabled
              ? themeObj.palette.text.disabled
              : palette.main,
            border: `2px solid ${palette.main}`,
          };
        case "text":
          return {
            backgroundColor: "transparent",
            color: disabled
              ? themeObj.palette.text.disabled
              : palette.main,
            border: "none",
          };
        default:
          return {};
      }
    })();

    return (
      <button
        id={id}
        name={name}
        ref={ref}
        onClick={onClick}
        disabled={disabled}
        style={{ ...baseStyle, ...sizeStyles[size], ...variantStyle }}
      >
        {startIcon}
        {label}
        {endIcon}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;