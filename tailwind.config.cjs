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
      width: {
        384: "96rem",
      },
      screens: {
        tall: { raw: "(min-height: 640px)" },
      },
      listStyleType: {
        square: "square",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
