import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // === FONT ===
      fontFamily: {
        sans: [
          "Plus Jakarta Sans",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      // === COLORS — from tokens.json primitive layer ===
      colors: {
        navy: {
          50: "#e8e8f0",
          100: "#c5c6d8",
          200: "#9294b8",
          300: "#5f6298",
          400: "#333780",
          500: "#1a1d5c",
          600: "#101340",
          700: "#0a0d30",
          800: "#060724",
          900: "#03041a",
          950: "#020312",
        },
        orange: {
          50: "#fff3e6",
          100: "#ffe0bf",
          200: "#ffcc99",
          300: "#ffaa55",
          400: "#ff8833",
          500: "#ff6700",
          600: "#e05b00",
          700: "#b84a00",
          800: "#8a3800",
          900: "#5c2500",
        },
        gray: {
          50: "#f8f8f8",
          100: "#edeced",
          200: "#d9d8d9",
          300: "#b8b7b8",
          400: "#8a898a",
          500: "#6b6a6b",
          600: "#4a494a",
          700: "#333233",
          800: "#1f1e1f",
          900: "#121112",
        },
        // Semantic aliases
        surface: {
          DEFAULT: "#0d0f2e",
          light: "#f8f8f8",
        },
        accent: {
          DEFAULT: "#ff6700",
          hover: "#ff8833",
          active: "#e05b00",
        },
      },
      // === SPACING — 8px base ===
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
        "38": "9.5rem",
      },
      // === BORDER RADIUS ===
      borderRadius: {
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "20px",
      },
      // === FONT SIZE — clamp for fluid type ===
      fontSize: {
        hero: [
          "clamp(2.5rem, 5vw, 4.5rem)",
          { lineHeight: "1.08", letterSpacing: "-0.03em", fontWeight: "800" },
        ],
        "heading-1": [
          "clamp(2rem, 4vw, 3.75rem)",
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "heading-2": [
          "clamp(1.5rem, 3vw, 2.25rem)",
          { lineHeight: "1.25", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "heading-3": [
          "clamp(1.25rem, 2vw, 1.5rem)",
          { lineHeight: "1.25", fontWeight: "600" },
        ],
        "body-lg": ["1.125rem", { lineHeight: "1.6" }],
      },
      // === LETTER SPACING ===
      letterSpacing: {
        tighter: "-0.03em",
        tight: "-0.02em",
        wide: "0.05em",
        wider: "0.1em",
      },
      // === SHADOWS ===
      boxShadow: {
        sm: "0 1px 2px rgba(6,7,36,0.06)",
        md: "0 4px 12px rgba(6,7,36,0.08)",
        lg: "0 12px 32px rgba(6,7,36,0.12)",
        xl: "0 24px 48px rgba(6,7,36,0.16)",
        "glow-orange": "0 0 40px rgba(255,103,0,0.25)",
        "glow-navy": "0 0 40px rgba(6,7,36,0.4)",
      },
      // === ANIMATIONS ===
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(24px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "count-up": {
          from: { opacity: "0", transform: "scale(0.8)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        tick: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out forwards",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "slide-in-right": "slide-in-right 0.5s ease-out forwards",
        "count-up": "count-up 0.4s ease-out forwards",
        tick: "tick 20s linear infinite",
      },
      // === TRANSITIONS ===
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      // === BACKDROP ===
      backdropBlur: {
        glass: "20px",
      },
      // === MAX WIDTH ===
      maxWidth: {
        container: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
