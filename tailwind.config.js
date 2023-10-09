/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/**/*.{tsx,js,jsx,ts}"],
  theme: {
    extend: {
      colors: {"black":"#222222","white":"#FFFFFF","darkgray":"#333333","gray":"#555555","lightgray":"#999999","green":"#b5542d","red":"#e5173f",}
    },
  },
  plugins: [],
}

// npx tailwindcss -i ./public/styles/input.css -o ./public/styles/output.css --watch  