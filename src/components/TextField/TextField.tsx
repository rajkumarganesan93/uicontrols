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
  /** ✅ New autofocus prop */
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

    // Run validations loosely
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

    const baseClasses = `
      block rounded-md transition-all duration-200
      focus:outline-none focus:ring-2
      disabled:opacity-50 disabled:cursor-not-allowed
      placeholder-gray-400
    `;

    const sizeClasses: Record<TextFieldSize, string> = {
      small: "px-2 py-1 text-sm",
      medium: "px-3 py-2 text-base",
      large: "px-4 py-3 text-lg",
    };

    const variantClasses: Record<TextFieldVariant, string> = {
      outlined: `border border-gray-300 focus:ring-[${palette.primary.main}] focus:border-[${palette.primary.main}]`,
      filled: `bg-gray-100 border-b-2 border-gray-300 focus:border-[${palette.primary.main}]`,
      standard: `border-b border-gray-400 focus:border-[${palette.primary.main}]`,
    };

    const errorClasses = errorMessage
      ? `border-[${palette.error.main}] focus:border-[${palette.error.main}] focus:ring-[${palette.error.main}]`
      : "";

    return (
      <div
        className={`flex flex-col mb-4 ${
          fullWidth ? "w-full" : size === "small" ? "w-48" : size === "large" ? "w-96" : "w-72"
        }`}
      >
        {label && (
          <label
            htmlFor={id}
            style={{
              color: disabled ? palette.text.disabled : palette.text.primary,
              fontWeight: 600,
              fontSize: theme.typography.fontSizeMedium,
              fontFamily: theme.typography.fontFamily,
            }}
            className="mb-1"
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
          className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${errorClasses}`}
        />
        {(helperText || errorMessage) && (
          <span
            id={`${id}-helper-text`}
            style={{
              color: errorMessage ? palette.error.main : palette.text.secondary,
              fontSize: theme.typography.fontSizeSmall,
              fontFamily: theme.typography.fontFamily,
            }}
            className="mt-1"
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