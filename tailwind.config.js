/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  important: true,
  blackAndWhiteMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 5s linear infinite',
        'spin-fast': 'spin 0.5s linear infinite',
      },},
    variants: {
      extend: {
      },
    },
  },
  plugins: [],
};


