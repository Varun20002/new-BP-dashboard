/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#DC2626', // CoinDCX Red/Orange
        secondary: '#111827', // Gray-900 (Main text)
        muted: '#6B7280', // Gray-500 (Muted text)
        surface: '#FFFFFF', // Cards/White
        background: '#F9FAFB', // Slate-50 (App BG)
        success: '#059669', // Green
        error: '#DC2626', // Red
        warning: '#D97706', // Amber
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'], // Clean sans-serif
      }
    },
  },
  plugins: [],
}

