/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',  /* Internet Explorer 10+ */
          'scrollbar-width': 'none',     /* Firefox */
        },
        '.no-scrollbar::-webkit-scrollbar': {
          'display': 'none',  /* Safari and Chrome */
        },
      });
    }
  ],
}
