import { createContext, useContext } from "react";
import LightTheme from "../themes/lightTheme";

export const ThemeContext = createContext(LightTheme);

export function useTheme() {
  return useContext(ThemeContext);
}