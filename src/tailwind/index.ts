
import { animations } from './animations';
import { colors } from './colors';
import { typography } from './typography';
import { components } from './components';
import { spacing } from './spacing';
import { effects } from './effects';
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        md: '2rem'
      },
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      ...typography,
      ...colors,
      ...spacing,
      ...animations,
      ...effects
    }
  },
  plugins: [
    require("tailwindcss-animate"),
    components
  ],
} satisfies Config;
