export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#1A1C1E", soft: "#2A2D32" },
        surface: { DEFAULT: "#F2F1F0", raised: "#FFFFFF" },
        accent: {
          DEFAULT: "rgb(var(--accent-rgb) / <alpha-value>)",
          deep: "rgb(var(--accent-deep-rgb) / <alpha-value>)",
          wash: "rgb(var(--accent-rgb) / var(--wash-alpha))",
          glow: "rgb(var(--accent-rgb) / 0.12)",
          contrast: "rgb(var(--accent-contrast-rgb) / <alpha-value>)",
        },
        muted: "#6B6F72",
        line: "#E2E5E8",
      },
      fontFamily: {
        display: ['"Quantico"', "system-ui", "sans-serif"],
        body: ['"Manrope"', "system-ui", "-apple-system", "sans-serif"],
        arabic: ['"Noto Kufi Arabic"', "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": [
          "clamp(2.6rem, 5.6vw, 4.8rem)",
          { lineHeight: "0.98", letterSpacing: "0.01em" },
        ],
        "display-lg": [
          "clamp(2rem, 4vw, 3.2rem)",
          { lineHeight: "0.98", letterSpacing: "0.01em" },
        ],
        "display-md": ["clamp(1.4rem, 2.4vw, 1.9rem)", { lineHeight: "1.05", letterSpacing: "0.01em" }],
      },
      boxShadow: {
        card: "0 1px 3px rgba(26,28,30,0.04), 0 8px 24px rgba(26,28,30,0.06)",
        "card-hover": "0 4px 12px rgba(26,28,30,0.06), 0 16px 40px rgba(26,28,30,0.10)",
        glow: "0 0 0 1px rgb(var(--accent-rgb) / var(--glow-ring-alpha)), 0 10px 30px -12px rgb(var(--accent-rgb) / var(--glow-spread-alpha))",
      },
    },
  },
  plugins: [],
};
