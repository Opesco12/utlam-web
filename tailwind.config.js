/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/**/*.css"],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        error: "red",
        light: "#d1d1d1",
        lightBg: "#fafafa",
        lightPrimary: "#60C2CF",
        secondary: "#FFA333",
        primary: "#187088",
        text: "#003334",
        white: "#fff",
        border: "#efefef",
      },
    },
  },
  plugins: [],
};
