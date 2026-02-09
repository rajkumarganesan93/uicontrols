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
  return (
    <ThemeContext.Provider value={themeObj}>
      <div
        style={{
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