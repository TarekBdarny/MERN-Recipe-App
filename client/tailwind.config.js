/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7e22ce",
        secondary: "#e3e3e3",
        "primary-hover": "#9333ea",
        error: "#e11d48",
        background: "#1c2229",
        create: "#22c55e",
      },
    },
  },
  plugins: [daisyui],
};
