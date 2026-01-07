/** @type {import('tailwindcss').Config} */
module.exports = {
  // Fix: Only look at HTML/JS files in the root, or explicitly exclude node_modules
  content: ["./*.{html,js}"], 
  theme: {
    extend: {
      colors: {
        primary: '#FFC107',
        primaryHover: '#FFD54F',
        secondary: '#3B82F6',
        dark: '#0f172a',
        darker: '#020617',
        surface: '#1e293b',
        danger: '#ef4444',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out 4s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scroll-vertical': 'scroll-vertical 40s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'scroll-vertical': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        }
      }
    },
  },
  plugins: [],
}