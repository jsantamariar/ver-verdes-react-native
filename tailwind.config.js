/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#344F1F",
        secondary: "#F4991A",
        header: "#FFFFFF",
        background: "#F9F5F0",
      },
    },
  },
  plugins: [],
};
