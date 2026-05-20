import React, { createContext, useContext, useState } from "react";
import { useSharedValue, withTiming } from "react-native-reanimated";

export interface Theme {
  dark: boolean;
  colors: {
    background: string;
    card: string;
    text: string;
    textSecondary: string;
    border: string;
    primary: string;
    inputBg: string;
    white: string;
    shadow: string;
    divider: string;
    accent: string;
  };
}

export const lightTheme: Theme = {
  dark: false,
  colors: {
    background: "#F7F9FB",
    card: "#FFFFFF",
    text: "#181A20",
    textSecondary: "#6C757D",
    border: "#EEF2F6",
    primary: "#FF6B35",
    inputBg: "#FFFFFF",
    white: "#FFFFFF",
    shadow: "rgba(0, 0, 0, 0.04)",
    divider: "#F1F3F5",
    accent: "#FFF5F1",
  },
};

export const darkTheme: Theme = {
  dark: true,
  colors: {
    background: "#0D0E12",
    card: "#181A20",
    text: "#F8F9FA",
    textSecondary: "#9E9EAE",
    border: "#242630",
    primary: "#FF6B35",
    inputBg: "#1C1E26",
    white: "#FFFFFF",
    shadow: "rgba(0, 0, 0, 0.3)",
    divider: "#242630",
    accent: "#2C1B14",
  },
};

export const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {},
  colors: lightTheme.colors,
  themeProgress: { value: 0 } as any,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const themeProgress = useSharedValue(0);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      themeProgress.value = withTiming(next ? 1 : 0, { duration: 400 });
      return next;
    });
  };

  const colors = isDark ? darkTheme.colors : lightTheme.colors;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, colors, themeProgress }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useAppTheme() {
  return useContext(ThemeContext);
}
