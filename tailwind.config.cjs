/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        overlay: 'rgba(0,0,0,0.4)',
        accent: {
          cta: '#E74C3C',
          hover: '#C0392B',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#F8F9FA',
          navigation: '#FFFFFF',
        },
        neutral: {
          light: '#FFFFFF',
          medium: '#6C757D',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Avenir', 'system-ui', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontWeight: {
        hero: '800',
        body: '400',
        nav: '500',
      },
      fontSize: {
        hero: ['2.5rem', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        body: ['1.125rem', { lineHeight: '1.6' }],
        nav: ['1rem', { lineHeight: '1.5' }],
      },
      spacing: {
        section: '6rem',
        container: '2rem',
      },
      borderRadius: {
        cta: '9999px', // fully rounded for button
      },
      maxWidth: {
        'hero': '36rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      boxShadow: {
        header: '0 2px 8px 0 rgba(0,0,0,0.04)',
      },
    },
  },
  plugins: [],
} 