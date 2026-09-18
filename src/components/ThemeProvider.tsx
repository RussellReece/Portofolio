"use client";

import * as React from "react";

type Theme = "light" | "dark" | "system";
type ThemeProviderProps = React.PropsWithChildren<{
  defaultTheme?: Theme;
  enableSystem?: boolean;
  attribute?: "class";
  disableTransitionOnChange?: boolean;
}>;

type ThemeContextValue = {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children, defaultTheme = "dark", enableSystem = true }: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<Theme>(defaultTheme);

  React.useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme") as Theme | null;
    React.startTransition(() => setTheme(storedTheme ?? defaultTheme));
  }, [defaultTheme]);

  React.useEffect(() => {
    const resolvedTheme = theme === "system" && enableSystem ? getSystemTheme() : theme;
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
    document.documentElement.style.colorScheme = resolvedTheme;
    window.localStorage.setItem("theme", theme);
  }, [enableSystem, theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
