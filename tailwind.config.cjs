/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#fff",
        secondary: "#001027",
        accent: "#001b41",
        "accent-bright": "#434c6d",
      },
      screens: {
        tall: { raw: "(min-height: 640px)" },
      },
      listStyleType: {
        square: "square",
      },
    },
  },
  plugins: [],
};
