module.exports = {
  
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "node_modules/preline/dist/*.js",
  ],
  darkMode: "class", // 'media'
  theme: {
    extend: {
      fontFamily: {
        head: ['"Exo 2"'],
        body: ["Poppins"],
      },
      colors: {
        tradewind: {
          200:"#d0ece7",
          600:"#91d2c6",
          900: "#62beae"
        },
        cloud: {
          50: "#e9ebef",
          100: "#d3d7e0",
          200: "#bec3d0",
          300: "#a8afc1",
          400: "#929cb1",
          500: "#7c88a1",
          600: "#667492",
          700: "#516082",
          800: "#3b4c73",
          900: "#253863",
        },
        elephant: {
          50: "#e7ebeb",
          100: "#b7c4c4",
          200: "#879c9d",
          300: "#577476",
          400: "#3f6162",
          500: "#274d4f",
          600: "#0f393b",
        },
        elm: {
          50: "#e9f1f2",
          100: "#d2e4e4",
          200: "#bcd6d7",
          300: "#a5c8c9",
          400: "#8fbbbc",
          500: "#78adae",
          600: "#629fa1",
          700: "#4b9193",
          800: "#358486",
          900: "#1e7678",
        },
        confetti: {
          50: "#f5e8ba",
          100: "#f3e3a9",
          200: "#f0dd98",
          300: "#eed787",
          400: "#ebd175",
          500: "#e9cc64",
          600: "#e6c653",
        },
        burntSienna: {
          50: "#fdf2ed",
          100: "#f9d9c9",
          200: "#f5bfa5",
          300: "#f0a580",
          400: "#ee996e",
          500: "#ec8c5c",
          600: "#ea7f4a",
        },
        seaGreen: {
          50: "#ebf5f0",
          100: "#c2e0d1",
          200: "#9acbb2",
          300: "#72b693",
          400: "#5dac84",
          500: "#49a174",
          600: "#359765",
        },
        primary: {
          elm: "#1e7678",
          elephant: "#0f393b",
          springWood: "#f6f5ef",
          confetti: "#e6c653",
        },
        secondary: {
          alto: "#d0d0d0",
          burntSienna: "#ea7f4a",
          seaGreen: "#359765",
        },
      },
    },
  },
  plugins: [require("preline/plugin")],
};
