const { nextui } = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        "dark": {
          extend: "dark",
          colors:{
            neutral: {
              white: "#FFFFFF",
              white80: "#FFFFFF80",
              black: "#000000",
              darkGrey: "#333333",
              grey: "#767E86",
              grey1: "#F5F6F7",
              blue: "#172432",
              purple: "#742BEC",
              purple80: "#742BEC80",
            },
            primary: {
              25: "#D3D6DE",  // Very light shade
              50: "#A6ACBC",  // Light shade
              100: "#7A829A", // Light-medium shade
              200: "#4D5978", // Medium shade
              300: "#202F56", // Medium-dark shade
              400: "#1A273F", // Darker shade
              500: "#141F2D", // Dark shade
              600: "#101925", // Darker
              700: "#0B121B", // Very dark
              800: "#060C1A", // Original color
              900: "#030609", // Almost black
              DEFAULT: "#060C1A",
            },
            secondary: {
              25: "#D6D8DE",  // Very light shade
              50: "#ADB1BC",  // Light shade
              100: "#858A9A", // Light-medium shade
              200: "#5D6378", // Medium shade
              300: "#343C56", // Medium-dark shade
              400: "#2A3044", // Darker shade
              500: "#202533", // Dark shade
              600: "#191D28", // Darker
              700: "#12141D", // Very dark
              800: "#0E1421", // Original color
              900: "#07090F", // Almost black
              DEFAULT: "#0E1421",
            },
          }
        },
        "light": {
          extend: "light",
          colors:{
            neutral: {
              white: "#FFFFFF",
              white80: "#FFFFFF95",
              black: "#000000",
              darkGrey: "#333333",
              grey: "#767E86",
              grey1: "#F5F6F7",
              blue: "#172432",
              purple: "#742BEC",
              purple80: "#742BEC80",
            },
            primary: {
              25: "#D3D6DE",  // Very light shade
              50: "#A6ACBC",  // Light shade
              100: "#7A829A", // Light-medium shade
              200: "#4D5978", // Medium shade
              300: "#5386FD", // Medium-blue shade (your provided color)
              400: "#2F4AA6", // Darker blue shade
              500: "#1E3C89", // Even darker blue
              600: "#1A2E72", // Darker with less brightness
              700: "#132258", // Very dark blue
              800: "#0C1A45", // Very dark blue
              900: "#080F32", // Almost black
              DEFAULT: "#5386FD", // Your original color
            },
            secondary: {
              25: "#D6D8DE",  // Very light shade
              50: "#ADB1BC",  // Light shade
              100: "#858A9A", // Light-medium shade
              200: "#5D6378", // Medium shade
              300: "#343C56", // Medium-dark shade
              400: "#2A3044", // Darker shade
              500: "#202533", // Dark shade
              600: "#191D28", // Darker
              700: "#12141D", // Very dark
              800: "#0E1421", // Original color
              900: "#07090F", // Almost black
              DEFAULT: "#0E1421",
            },
          }
        },
      }
    })
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'layout': '80px 1fr',
        'layout-container': '60% 1fr',
      },
      gridTemplateRows: {
        'layout': '260px 180px 1fr',
      },
      screens:{
        'xl-lg': '1460px',
      },
    },
  },
};
