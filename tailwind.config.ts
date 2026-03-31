import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          DEFAULT: "#0A2342",
          light: "#1a3a5c",
          dark: "#06152b",
        },
        gold: {
          DEFAULT: "#D4AF37",
          light: "#e5c654",
          dark: "#b8962e",
        },
        cream: "#FFF8E7",
      },
      fontFamily: {
        heading: ["Montserrat", "sans-serif"],
        body: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        "gradient-ocean": "linear-gradient(135deg, #0A2342 0%, #1a3a5c 100%)",
        "gradient-gold": "linear-gradient(135deg, #D4AF37 0%, #e5c654 100%)",
        "hero-pattern": "url('/hero-bg.svg')",
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "float": "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
