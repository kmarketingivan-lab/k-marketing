"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";

type Theme = "dark" | "light";

const ThemeContext = createContext<{
  theme: Theme;
  mounted: boolean;
  toggleTheme: () => void;
}>({
  theme: "dark",
  mounted: false,
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize from DOM (set by blocking script in root layout) to avoid flash
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark") ? "dark" : "light";
    }
    return "light";
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("km-theme") as Theme | null;
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("km-theme", theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, mounted, toggleTheme }}>
      <MotionConfig reducedMotion="user">
        {children}
      </MotionConfig>
    </ThemeContext.Provider>
  );
}
