/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./index.html', './src/**/!(tailwind).{ts,tsx}'],
  theme: {
    fontFamily: {
      primary: ['"Space Grotesk"', 'sans-serif'],
    },
    extend: {
      colors: {
        'formal-accent': 'var(--formal-accent)',
        accent: 'var(--accent)',
        'accent-semi-transparent': 'var(--accent-semi-transparent)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        tertiary: 'var(--tertiary)',
        error: 'var(--error)',
        'primary-dark': 'var(--primary-dark)',
        'primary-bright': 'var(--primary-bright)',
        'primary-background': 'var(--primary-background)',
        'primary-semi-dimmed': 'var(--primary-semi-dimmed)',
        'primary-dimmed': 'var(--primary-dimmed)',
      },
      borderRadius: {
        '5xl': '2.5rem',
      },
      boxShadow: {
        '2xl': '0rem 0rem 1.75rem 0rem rgb(0 0 0 / 0.25)',
        lg: '0rem 0rem 1rem 0rem rgb(0 0 0 / 0.25)',
        'button-active': '0rem 0rem 0.375rem rgb(0 0 0 / 1)',
        card: '0rem 0.25rem 2.75rem 0rem rgb(0 0 0 / 0.25), inset 0px 0px 1rem rgb(0 0 0 / 0.25)',
      },
      fontSize: {
        '2.5xl': '1.625rem',
        '3.5xl': '2rem',
      },
      screens: {
        xs: '22.5rem',
      },
      dropShadow: {
        accent: '0rem 0rem 0.625rem var(--accent)',
        secondary: '0 0 0.625rem var(--secondary)',
        gold: '0rem 0rem 1rem rgba(254, 216, 35, 0.4)',
      },
      width: {
        'full-105': '105%',
      },
      strokeWidth: {
        1.5: '1.5',
        3: 3,
      },
      padding: {
        25: '6.25rem',
      },
    },
    container: {
      center: true,
      padding: '2rem',
    },
  },
}
