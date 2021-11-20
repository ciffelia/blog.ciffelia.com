module.exports = {
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    fontFamily: {
      // https://ics.media/entry/200317/
      serif: `"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", 
    "BIZ UDPGothic", Meiryo, sans-serif`,
      quicksand: 'Quicksand',
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none', // Unset max-width: 65ch on .prose
            fontSize: '16px',
            letterSpacing: '0.1em',
            textAlign: 'justify',
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
