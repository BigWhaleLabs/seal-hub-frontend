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
        'primary-background': 'var(--primary-background)',
        'primary-semi-dimmed': 'var(--primary-semi-dimmed)',
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
