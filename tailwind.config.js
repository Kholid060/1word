module.exports = {
  theme: {
    borderRadius: {
      sm: '0.125rem',
      default: '0.25rem',
      md: '0.5rem',
      lg: '0.9375rem',
      full: '9999px',
    },
    extend: {
      colors: {
        primary: 'var(--primary)',
        danger: 'var(--danger)',
        warning: 'var(--warning)',
        secondary: 'var(--secondary)',
      },
      backgroundColor: {
        dark: 'var(--bg-dark)',
        darker: 'var(--bg-darker)',
        default: 'var(--bg-default)',
        light: 'var(--bg-light)',
        lighter: 'var(--bg-lighter)',
      },
      textColor: {
        default: 'var(--text-default)',
        light: 'var(--text-light)',
        lighter: 'var(--text-lighter)',
        dark: 'var(--text-dark)',
      },
    },
  },
  variants: {
    boxShadow: ['group-hover'],
  },
  plugins: [],
};
