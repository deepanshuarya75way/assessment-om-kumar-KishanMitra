import flowbite from "flowbite/plugin";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0B132B",   // Navbar background
        secondary: "#1C2541", // Another shade
        accent: "#3A506B",    // Accent buttons
        highlight: "#5BC0BE", // Highlight color
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        navbar: "0 4px 6px -1px rgba(0,0,0,0.1)",
      },
      borderRadius: {
        xl2: "1rem", // custom radius
      },
      screens: {
        'tablet': { 'min': '768px', 'max': '1023px' }, // custom tablet breakpoint
      },
    },
  },
  plugins: [flowbite],
  
};
