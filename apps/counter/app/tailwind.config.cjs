/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        "1/2": "calc(1/2 * 100%)",
        "1/3": "calc(1/3 * 100%)",
        "2/3": "calc(2/3 * 100%)",
        "1/4": "calc(1/4 * 100%)",
        "2/4": "calc(2/4 * 100%)",
        "3/4": "calc(3/4 * 100%)",
        "1/5": "calc(1/5 * 100%)",
        "2/5": "calc(2/5 * 100%)",
        "3/5": "calc(3/5 * 100%)",
        "4/5": "calc(4/5 * 100%)",
        "1/6": "calc(1/6 * 100%)",
        "2/6": "calc(2/6 * 100%)",
        "3/6": "calc(3/6 * 100%)",
        "4/6": "calc(4/6 * 100%)",
        "5/6": "calc(5/6 * 100%)",
        "1/12": "calc(1/12 * 100%)",
        "2/12": "calc(2/12 * 100%)",
        "3/12": "calc(3/12 * 100%)",
        "4/12": "calc(4/12 * 100%)",
        "5/12": "calc(5/12 * 100%)",
        "6/12": "calc(6/12 * 100%)",
        "7/12": "calc(7/12 * 100%)",
        "8/12": "calc(8/12 * 100%)",
        "9/12": "calc(9/12 * 100%)",
        "10/12": "calc(10/12 * 100%)",
        "11/12": "calc(11/12 * 100%)",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
