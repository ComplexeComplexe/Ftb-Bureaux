import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Couleurs French Tech exactes
        'french-tech-blue': {
          DEFAULT: '#000091',
          50: '#e6e6ff',
          100: '#ccccff',
          200: '#9999ff',
          300: '#6666ff',
          400: '#3333ff',
          500: '#000091', // Couleur principale
          600: '#000073',
          700: '#000055',
          800: '#000037',
          900: '#000019',
        },
        'french-tech-red': {
          DEFAULT: '#E1000F',
          50: '#fde6e7',
          100: '#faccd0',
          200: '#f599a1',
          300: '#f06672',
          400: '#eb3343',
          500: '#E1000F', // Couleur principale
          600: '#b4000c',
          700: '#870009',
          800: '#5a0006',
          900: '#2d0003',
        },
        // Couleurs existantes
        primary: "#FF006E", // French Tech pink
        secondary: "#1E3A8A", // Navy blue
        background: "#F8FAFC",
        surface: "#FFFFFF",
      },
      fontFamily: {
        'manrope': ['Manrope', 'sans-serif'],
        'noto-sans': ['Noto Sans', 'sans-serif'],
        'sans': ['Manrope', 'Noto Sans', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      // Configuration pour les container queries
      containers: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
};

export default config;
