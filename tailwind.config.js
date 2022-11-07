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
        secondary: 'var(--secondary)',
        tertiary: 'var(--tertiary)',
        error: 'var(--error)',
        'primary-bright': 'var(--primary-bright)',
        'primary-dark': 'var(--primary-dark)',
        black: {
          background: '#040404',
          'background-purpose': '#12141D',
          'perk-gradient-light': 'rgba(4, 6, 14, 0.9)',
          'perk-gradient-dark': '#04060E',
        },
        gold: {
          dark: '#FA6641',
          light: '#EAE100',
        },
      },
      borderRadius: {
        avatar: '6rem',
        '10xl': '2.5rem',
      },
      boxShadow: {
        '2xl': '0rem 0.25rem 2.75rem 0rem rgb(0 0 0 / 0.25)',
        lg: '0rem 0rem 1rem 0rem rgb(0 0 0 / 0.25)',
        'button-active': '0rem 0rem 0.375rem rgb(0 0 0 / 1)',
      },
      width: {
        chart: '108px',
        time: '95px',
        glass: '107px',
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
