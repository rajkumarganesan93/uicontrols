import React, { forwardRef } from "react";
import { useTheme } from "../../utils/themeContext";

export type TextFieldVariant = "outlined" | "filled" | "standard";
export type TextFieldSize = "small" | "medium" | "large";
export type TextFieldType = "text" | "email" | "password" | "number";

export interface ValidationRule {
  type: "required" | "pattern" | "minLength" | "maxLength";
  value?: number | RegExp;
  message: string;
}

export interface TextFieldProps {
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  type?: TextFieldType;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: TextFieldSize;
  variant?: TextFieldVariant;
  validations?: ValidationRule[];
  helperText?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  autoFocus?: boolean;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      id,
      name,
      label,
      placeholder,
      value,
      defaultValue,
      type = "text",
      disabled = false,
      fullWidth = false,
      size = "medium",
      variant = "outlined",
      validations = [],
      helperText,
      onChange,
      readOnly = false,
      autoFocus = false,
    },
    ref
  ) => {
    const theme = useTheme();
    const palette = theme.palette;

    // Run validations
    let errorMessage: string | null = null;
    if (validations.length && value !== undefined) {
      for (const rule of validations) {
        if (rule.type === "required" && !value) {
          errorMessage = rule.message;
          break;
        }
        if (rule.type === "pattern" && rule.value instanceof RegExp && !rule.value.test(value)) {
          errorMessage = rule.message;
          break;
        }
        if (rule.type === "minLength" && typeof rule.value === "number" && value.length < rule.value) {
          errorMessage = rule.message;
          break;
        }
        if (rule.type === "maxLength" && typeof rule.value === "number" && value.length > rule.value) {
          errorMessage = rule.message;
          break;
        }
      }
    }

    // Base style
    const baseStyle: React.CSSProperties = {
      borderRadius: "0.375rem",
      transition: "all 0.2s ease-in-out",
      outline: "none",
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? "not-allowed" : "text",
      width: fullWidth ? "100%" : size === "small" ? "12rem" : size === "large" ? "24rem" : "18rem",
      fontFamily: theme.typography.fontFamily,
    };

    // Size styles
    const sizeStyles: Record<TextFieldSize, React.CSSProperties> = {
      small: { padding: "0.25rem 0.5rem", fontSize: "0.875rem" },
      medium: { padding: "0.5rem 0.75rem", fontSize: "1rem" },
      large: { padding: "0.75rem 1rem", fontSize: "1.125rem" },
    };

    // Variant styles
    const variantStyles: Record<TextFieldVariant, React.CSSProperties> = {
      outlined: {
        border: `1px solid ${errorMessage ? palette.error.main : palette.grey[400]}`,
      },
      filled: {
        backgroundColor: palette.grey[100],
        borderBottom: `2px solid ${errorMessage ? palette.error.main : palette.grey[400]}`,
      },
      standard: {
        borderBottom: `1px solid ${errorMessage ? palette.error.main : palette.grey[500]}`,
      },
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", marginBottom: "1rem" }}>
        {label && (
          <label
            htmlFor={id}
            style={{
              color: disabled ? palette.text.disabled : palette.text.primary,
              fontWeight: 600,
              fontSize: theme.typography.fontSizeMedium,
              fontFamily: theme.typography.fontFamily,
              marginBottom: "0.25rem",
            }}
          >
            {label}
          </label>
        )}
        <input
          id={id}
          name={name}
          ref={ref}
          type={type}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          autoFocus={autoFocus}
          aria-invalid={!!errorMessage}
          aria-describedby={helperText ? `${id}-helper-text` : undefined}
          onChange={onChange}
          style={{
            ...baseStyle,
            ...sizeStyles[size],
            ...variantStyles[variant],
            color: disabled ? palette.text.disabled : palette.text.primary,
          }}
        />
        {(helperText || errorMessage) && (
          <span
            id={`${id}-helper-text`}
            style={{
              color: errorMessage ? palette.error.main : palette.text.secondary,
              fontSize: theme.typography.fontSizeSmall,
              fontFamily: theme.typography.fontFamily,
              marginTop: "0.25rem",
            }}
          >
            {errorMessage || helperText}
          </span>
        )}
      </div>
    );
  }
);

TextField.displayName = "TextField";

export default TextField;