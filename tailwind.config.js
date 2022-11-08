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
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        tertiary: 'var(--tertiary)',
        error: 'var(--error)',
        'primary-dark': 'var(--primary-dark)',
        'primary-bright': 'var(--primary-bright)',
        'primary-background': 'var(--primary-background)',
        'primary-semi-dimmed': 'var(--primary-semi-dimmed)',
      },
      borderRadius: {
        '5xl': '2.5rem',
      },
      boxShadow: {
        '2xl': '0rem 0.25rem 2.75rem 0rem rgb(0 0 0 / 0.25)',
        lg: '0rem 0rem 1rem 0rem rgb(0 0 0 / 0.25)',
        'button-active': '0rem 0rem 0.375rem rgb(0 0 0 / 1)',
      },
      fontSize: {
        '3.5xl': '2rem',
      },
    },
    container: {
      center: true,
      padding: '2rem',
    },
  },
}
