/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rich-black': '#000F0B',
        'dark-green': '#112221',
        'bangladesh-green': '#00BC4C',
        'mountain-meadow': '#22C55E',
        'caribbean-green': '#00E8CF',
        'anti-flash-white': '#F0F2F0',
        'forest': '#054938',
        'basil': '#094534',
        'mint': '#3FEBD0',
      },
    },
  },
  plugins: [],
}