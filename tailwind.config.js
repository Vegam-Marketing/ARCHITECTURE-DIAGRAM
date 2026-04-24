/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Semantic tokens — easy to swap if brand changes
        accent: {
          DEFAULT: '#d97642',
          hover: '#c0652f',
        },
        panel: '#0a0a0a',
      },
      fontFamily: {
        display: ['var(--font-plex-serif)', 'Georgia', 'serif'],
        body: ['var(--font-plex-sans)', 'system-ui', 'sans-serif'],
        'mono-ibm': ['var(--font-plex-mono)', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
};
