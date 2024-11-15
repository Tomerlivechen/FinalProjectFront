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
  plugins: [
    function ({addUtilities}) {
      const newUtilities = {
        ".scrollbar-dark" : {
          scrollbarWidth : "thin",
          scrollbarColor : "rgb(00 80 80) black",
        },
        ".scrollbar-light" : {
          scrollbarWidth : "thin",
          scrollbarColor : "rgb(3 105 161) rgb(224 242 254)",
        },
        ".scrollbar-webkit-dark" : {
          "&::-webkit-scrollbar-dark" : {
            width : "8px"
          },
          "&::-webkit-scrollbar-dark-track" : {
            background : "black"
          },
          "&::-webkit-scrollbar-dark-thumb" : {
            backgroundColor : "rgb(00 80 80)",
            borderRadius: "20px",
            border: "1px solid rgb(00 B0 B0)"
          },},

          ".scrollbar-webkit-light" : {
            "&::-webkit-scrollbar" : {
              width : "8px"
            },
            "&::-webkit-scrollbar-light-track" : {
              background : "rgb(224 242 254)"
            },
            "&::-webkit-scrollbar-light-thumb" : {
              backgroundColor : "rgb(3 105 161)",
              borderRadius: "20px",
              border: "1px solid rgb(224 242 254)"
            },
      }
    }
    addUtilities(newUtilities,["responsive", "hover"])
    },
  ],
};


