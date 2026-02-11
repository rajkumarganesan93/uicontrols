// src/utils/themeProvider.tsx
import React from "react";
import DarkTheme from "../themes/darkTheme";
import LightTheme from "../themes/lightTheme";
import { ThemeContext } from "./themeContext";

export type ThemeType = "light" | "dark";

function getTheme(theme: ThemeType) {
  switch (theme) {
    case "light":
      return LightTheme;
    case "dark":
      return DarkTheme;
    default:
      return LightTheme;
  }
}

export function ThemeProvider({
  theme,
  children,
}: {
  theme: ThemeType;
  children: React.ReactNode;
}) {
  const themeObj = getTheme(theme);

  // Build CSS variables from palette
  const cssVars: React.CSSProperties = {
    "--color-primary": themeObj.palette.primary.main,
    "--color-secondary": themeObj.palette.secondary.main,
    "--color-success": themeObj.palette.success.main,
    "--color-warning": themeObj.palette.warning.main,
    "--color-error": themeObj.palette.error.main,
    "--color-info": themeObj.palette.info.main,
    "--color-text-primary": themeObj.palette.text.primary,
    "--color-text-secondary": themeObj.palette.text.secondary,
    "--color-background": themeObj.palette.background.default,
  } as React.CSSProperties;

  return (
    <ThemeContext.Provider value={themeObj}>
      <div
        style={{
          ...cssVars,
          backgroundColor: themeObj.palette.background.default,
          color: themeObj.palette.text.primary,
          minHeight: "100vh",
          padding: "1rem",
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}