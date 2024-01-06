/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "cs-dark": "#161A30",
      },
      fontFamily: {
        roboto: "Roboto",
      },
    },
  },
  plugins: [],
};
