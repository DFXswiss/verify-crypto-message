/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dfxRed: {
          100: '#F5516C',
          150: '#E73955',
        },
      },
    },
  },
  plugins: [],
}

