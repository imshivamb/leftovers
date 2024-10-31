/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
    theme: {
      extend: {
        colors: {
          // Primary - A warm, energetic rose color
          primary: {
            50: '#fff1f2',
            100: '#ffe4e6',
            200: '#fecdd3',
            300: '#fda4af',
            400: '#fb7185',
            500: '#f43f5e',  // Main brand color
            600: '#e11d48',
            700: '#be123c',
            800: '#9f1239',
            900: '#881337',
          },
          // Secondary - A calming purple for contrast
          secondary: {
            50: '#faf5ff',
            100: '#f3e8ff',
            200: '#e9d5ff',
            300: '#d8b4fe',
            400: '#c084fc',
            500: '#a855f7',  // Accent color
            600: '#9333ea',
            700: '#7e22ce',
            800: '#6b21a8',
            900: '#581c87',
          },
          // Neutral - Soft grays for UI elements
          neutral: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
          },
          // Success - A soft green for positive actions
          success: '#22c55e',
          // Warning - A warm yellow for cautions
          warning: '#f59e0b',
          // Error - A bright red for errors
          error: '#ef4444',
        },
      },
    },
    plugins: [],
  }