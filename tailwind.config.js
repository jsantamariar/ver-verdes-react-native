/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#65AA68",
        secondary: "#1E533D",
        header: "#FFFFFF",
        background: "#F3F3F3",
      },
    },
  },
  plugins: [],
};
