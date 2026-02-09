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

    const baseClasses = `
      inline-flex items-center justify-center gap-2
      rounded-lg font-semibold transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-2
      ${fullWidth ? "w-full" : "w-auto"}
      disabled:opacity-50 disabled:cursor-not-allowed
    `;

    const sizeClasses: Record<ButtonSize, string> = {
      small: "px-3 py-1 text-sm",
      medium: "px-4 py-2 text-base",
      large: "px-6 py-3 text-lg",
    };

    const style: React.CSSProperties = (() => {
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
        className={`${baseClasses} ${sizeClasses[size]}`}
        style={style}
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