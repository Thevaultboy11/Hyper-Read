const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        ".card": {
          backgroundColor: theme("colors.white"),
          borderRadius: theme("borderRadius.lg"),
          padding: theme("spacing.6"),
          boxShadow: theme("boxShadow.xl"),
        },
      });
    }),
  ],
  enabled: process.env.NODE_ENV === "production",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  options: {
    blacklist: ["container"],
    safelist: [],
  },
  theme: {
    extend: {
      boxShadow: {
        main: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
      },
      colors: {
        primary100: "#80f2f2",
        primary200: "#049dd9",
        primary300: "#0f4466",
        primary400: "#2f327d",
        secondary100: "#ffb36a",
        secondary200: "#ff9f62",
        secondary300: "#fb8c4a",
        warning100: "#f2df80",
        "text-main": "#202020",
        danger200: "#f24646",
        "text-primary": "#4592AF",
        background: "#F0F0F0",
        main: "#ffffff",
      },
      boxShadow: {
        main: "0 12px 4px 0 rgba(0,0,0,0.10)",
      },
    },
    screen: {
      xs: "475px",
      ...defaultTheme.screens,
    },

    fontFamiy: {
      sans: ["Gothic A1", ...fontFamily.sans],
    },
  },
  darkMode: `class`,
};
