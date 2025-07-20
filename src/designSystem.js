export const designSystem = {
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
  font: {
    family: 'Avenir, system-ui, Helvetica, Arial, sans-serif',
    weight: {
      hero: 900,
      body: 400,
      nav: 500,
    },
    size: {
      hero: 'clamp(2.5rem, 5vw, 4rem)',
      body: 'clamp(1rem, 2vw, 1.25rem)',
      nav: '1rem',
    },
  },
  spacing: {
    section: '6rem',
    container: '2rem',
  },
  borderRadius: {
    cta: '0.75rem',
  },
}; 