/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",       // all pages/layouts in app directory
    "./src/components/**/*.{js,ts,jsx,tsx}" // any reusable components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};