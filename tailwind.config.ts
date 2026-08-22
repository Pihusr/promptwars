import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#070A13",
        foreground: "#F8FAFC",
        navy: {
          950: "#050811",
          900: "#0A0F1D",
          850: "#0E1528",
          800: "#131C35",
          700: "#1E2C52",
          600: "#2B3D6E",
        },
        charcoal: {
          900: "#0F1117",
          800: "#181B23",
          700: "#242834",
          600: "#363C4D",
        },
        brand: {
          green: {
            light: "#34D399",
            DEFAULT: "#10B981",
            dark: "#059669",
            glow: "rgba(16, 185, 129, 0.25)",
          },
          red: {
            light: "#F87171",
            DEFAULT: "#EF4444",
            dark: "#DC2626",
            glow: "rgba(239, 68, 68, 0.25)",
          },
          cyan: {
            light: "#67E8F9",
            DEFAULT: "#06B6D4",
            dark: "#0891B2",
          },
          indigo: {
            DEFAULT: "#6366F1",
            dark: "#4F46E5",
          },
        },
        border: "rgba(255, 255, 255, 0.08)",
        card: {
          DEFAULT: "rgba(14, 21, 40, 0.75)",
          hover: "rgba(19, 28, 53, 0.9)",
          solid: "#0D1424",
        },
        muted: {
          DEFAULT: "#94A3B8",
          foreground: "#64748B",
        },
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.375rem",
      },
      boxShadow: {
        "glow-green": "0 0 25px -5px rgba(16, 185, 129, 0.35)",
        "glow-red": "0 0 25px -5px rgba(239, 68, 68, 0.35)",
        "glow-cyan": "0 0 25px -5px rgba(6, 182, 212, 0.35)",
        "card": "0 4px 20px -2px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "tech-grid": "linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
