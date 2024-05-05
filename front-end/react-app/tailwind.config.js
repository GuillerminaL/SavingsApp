import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
    flowbite.content()
  ],
  theme: {
    extend: {},
  },
  mode: 'jit',
  plugins: [flowbite.plugin()],
};
