import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Bebas Neue', 'sans-serif'],
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: 'var(--bg-primary)',
        secondary: 'var(--bg-secondary)',
        tertiary: 'var(--bg-tertiary)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        'border-primary': 'var(--border-color)',
        depot: {
          orange: '#EE7125',
          'orange-light': '#FF8A40',
          'orange-dark': '#C85E1A',
          dark: '#111111',
          charcoal: '#1C1C1E',
          slate: '#2C2C2E',
          'slate-light': '#3A3A3C',
          cream: '#FFF8F0',
          muted: '#8A8A8E',
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "depot-hero": "linear-gradient(135deg, #111111 0%, #1C1C1E 50%, #2C1A0E 100%)",
        "depot-orange-glow": "radial-gradient(ellipse at center, rgba(238,113,37,0.3) 0%, transparent 70%)",
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
        'fade-left': 'fadeLeft 0.7s ease forwards',
        'fade-in': 'fadeIn 0.6s ease forwards',
        'shimmer': 'shimmer 2s infinite',
        'pulse-orange': 'pulseOrange 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.4s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        pulseOrange: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(238,113,37,0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(238,113,37,0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      boxShadow: {
        'depot-glow': '0 0 40px rgba(238,113,37,0.25)',
        'depot-card': '0 4px 24px rgba(0,0,0,0.4)',
        'depot-hover': '0 8px 40px rgba(238,113,37,0.2)',
      },
    },
  },
  plugins: [],
};
export default config;