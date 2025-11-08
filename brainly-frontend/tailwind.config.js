/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors :{
        purple : {
          600 : '#5146e5',
          400 : '#716acd',
          200: '#e0e7ff',
        },
        gray:{
          600 : '#dddcdc',
          400 : '#f9fafd',
          1000 : '#a4a6ab' // yeh niche likhe huye dark ke liye
          
        }

      }
    },
  },
  plugins: [],
}